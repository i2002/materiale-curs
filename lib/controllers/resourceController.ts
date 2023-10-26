import { Prisma, Resource } from "@prisma/client";
import prisma, { augumentedResourceArgs } from "@/lib/prisma";
import { cache } from "react";
import { adminPermissionOrThrow } from "@/lib/controllers/usersController";
import { createFile, deleteFile } from "./fsController";
import { revalidatePath } from "next/cache";


/**
 * Create a new folder resource.
 *
 * @param name the name of the resource
 * @param parentId the id of the parent resource
 * @param courseId the id of the parent course
 * @returns the newly created resource
 */
export async function createFolderResource(name: string, parentId: string | undefined, courseId: number) {
  await adminPermissionOrThrow();

  let parent = await getResource(parentId, courseId);
  if (parent == null) {
    throw new Error("Parent resource not found");
  }

  let res = await prisma.resource.create({
    data: {
      name: name,
      type: "folder",
      parentId: parent.id,
      courseId: courseId
    }
  });

  return res;
}


/**
 * Create and upload a new file resource.
 * 
 * @param parentId the id of the parent resource
 * @param couresId the id of the parent course
 * @param file the uploaded file
 */
export async function createFileResource(parentId: string | undefined, couresId: number, file: File) {
  await adminPermissionOrThrow();

  const parent = await getResource(parentId, couresId);
  if (!parent) {
    return null;
  }

  let res = await prisma.resource.create({
    data: {
      name: file.name,
      type: "file",
      parentId: parent.id,
      courseId: couresId,
      fileData: { create: {
        mimeType: file.type,
        size: file.size,
        path: `${couresId}/${parent.id}/${file.name}`
      } }
    },
    include: {
      course: true
    }
  });

  await createFile(res.id, couresId, Buffer.from(await file.arrayBuffer()));

  revalidatePath(`/admin/courses/view/${couresId}/files`);
  revalidatePath(`/courses/${res.course.slug}`);
  return res;
}


/**
 * Recursively delete the resource and its children.
 *
 * @param resId the id of the resource to be deleted
 */
export async function deleteResource(resId: string) {
  await adminPermissionOrThrow();

  // get resource
  let res = await prisma.resource.findUnique({
    where: { id: resId },
    include: {
      children: true
    }
  });

  if (res == null) {
    return null;
  }

  // delete children
  for (const child of res.children) {
    await deleteResource(child.id);
  }

  // delete physical file
  if (res.type == "file") {
    await deleteFile(res.id, res.courseId);
  }

  // delete resource
  await prisma.resource.delete({
    where: { id: res.id },
    include: {
      fileData: true
    }
  });
}


/**
 * Query a resource by a combination of resource and course ids.
 *
 * @param resource the id of the resource (undefined to get the root resource of course, string or single item )
 * @param course the parent course (can be either the slug or the id, or undefined if any)
 * @returns the requested resource or null if not found
 */
export const getResource = cache(async (resource: string | string[] | undefined, course?: string | number) => {
  let condition: Prisma.ResourceWhereInput = {};

  // resource condition
  if (resource == undefined) {
    condition.parentId = null;
  } else if (Array.isArray(resource) && resource.length == 1) {
    condition.id = resource[0];
  } else if (typeof resource == "string") {
    condition.id = resource;
  } else {
    return null;
  }

  // course condition
  if (typeof course == "string") {
    condition.course = { slug: course }
  } else if (typeof course == "number") {
    condition.course = { id: course }
  } else if (course == undefined && resource == undefined) {
    return null;
  }

  return await prisma.resource.findFirst({
    where: condition,
    include: {
      fileData: true
    }
  });
});


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
    ...augumentedResourceArgs,
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
