import { Prisma, Resource } from "@prisma/client";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { adminPermissionOrThrow } from "@/lib/controllers/usersController";


/**
 * Create a new resource.
 *
 * @param name the name of the resource
 * @param type the type of the resource (can be folder or file)
 * @param parentId the id of the parent resource
 * @param courseId the id of the parent course
 * @returns the newly created resource
 */
export async function createResource(name: string, type: string, parentId: string, courseId: number) {
  await adminPermissionOrThrow();

  // FIXME: upload pysical files

  let res = await prisma.resource.create({
    data: {
      name: name,
      type: type,
      parentId: parentId,
      courseId: courseId
    }
  });

  return res;
}


/**
 * Recursively delete the specified resources and their children.
 * 
 * @param resIds the ids of the resources to be deleted
 */
export async function deleteResources(resIds: string[]) {
  await adminPermissionOrThrow();

  await prisma.resource.deleteMany({
    where: { id: { in: resIds } }
  });

  // FIXME: recursive delete
  // FIXME: delete physical files
}


/**
 * Query a resource by the inputed url.
 * @param courseSlug the slug of the course
 * @param path the URL path accessed
 * @returns 
 */
type IGetResourceOverload = {
  (course: number, resource: string | undefined): Promise<Resource | null>;
  (course: string, resource: string[]): Promise<Resource | null>;
}

export const getResource: IGetResourceOverload = cache(async (course: unknown, resource: unknown) => {
  let condition: Prisma.ResourceWhereInput = {};

  switch(typeof course) {
    case "string":
      condition.course = { slug: course }
      break;
    case "number":
      condition.course = { id: course }
      break;
  }

  if (resource == undefined) {
    condition.parentId = null;
  } else if (Array.isArray(resource) && resource.length == 2 && resource[0] == "resource") {
    condition.id = resource[1];
  } else if (typeof resource == "string") {
    condition.id = resource;
  } else {
    return null;
  }

  return await prisma.resource.findFirst({
    where: condition,
    include: {
      fileData: true
    }
  });
});

const augumentedResource = Prisma.validator<Prisma.ResourceDefaultArgs>()({
  include: {
    fileData: true,
    _count: {
      select: {
        children: true
      }
    }
  }
});


export type AugumentedResource = Prisma.ResourceGetPayload<typeof augumentedResource>;

/**
 * Query the children of a resource.
 *
 * @param resource the parent resource
 * @returns 
 */
export const getResourceChildren = cache(async (resource: Resource | null) => {
  if (!resource) {
    return null;
  }

  return await prisma.resource.findMany({
    where: { parentId: resource.id },
    ...augumentedResource,
    orderBy: [
      { type: "desc" },
      { name: "asc" }
    ]
  });
});

type PathSegment = {
  name: string;
  id: string;
}


export type ResourcePath = Array<PathSegment>;

/**
 * Get the path (root resource, route segments and leaf resource) of a specified resource.
 * @param resource the resource object
 * @returns 
 */
export const getResourcePath = cache(async (resource: Resource | null): Promise<ResourcePath | null> => {
  if (resource == null) {
    return null;
  }

  // query the segments  
  let segments: Array<PathSegment> = [{
    name: resource.name,
    id: resource.id
  }];

  try {
    while(resource.parentId) {
      resource = await prisma.resource.findUniqueOrThrow({ where: { id: resource.parentId } });
  
      segments.push({
        name: resource.name,
        id: resource.id
      });
    }
  } catch {}

  // build the result object
  let path = [];
  for (let i = segments.length - 2; i >= 0; i--) {
    path.push(segments[i]);
  }

  return path;
});
