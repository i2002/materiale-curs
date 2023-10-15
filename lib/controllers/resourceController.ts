import { Prisma, Resource } from "@prisma/client";
import prisma from "@/lib/prisma";
import { cache } from "react";


/**
 * Query a resource by the inputed url.
 * @param courseSlug the slug of the course
 * @param path the URL path accessed
 * @returns 
 */
type IGetResourceOverload = {
  (course: number, resource: string | undefined): any;
  (course: string, resource: string[]): any;
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
