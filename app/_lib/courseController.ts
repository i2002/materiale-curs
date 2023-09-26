import { Prisma, Resource } from "@prisma/client";
import prisma from "./prisma";

/**
 * Query all courses info.
 * @returns 
 */
export async function getCourses() {
  return await prisma.course.findMany({
    orderBy: [
      { year: "asc" },
      { semester: "asc" },
      { name: "asc" }
    ]
  });
}

/**
 * Query a course info.
 * @param slug the course slug
 * @returns 
 */
export async function getCourse(slug: string) {
  return await prisma.course.findUnique({
    where: { slug: slug }
  });
}

/**
 * Parse input URL to determine the id of the requested resource.
 * @param courseSlug the slug of the course
 * @param path the URL path accessed
 * @returns 
 */
async function parseResourceId(courseSlug: string, path: string[]) {
  if (path == undefined) {
    let course = await getCourse(courseSlug);
    return course?.rootFolderId ?? null;
  }

  if (path[0] != "resource" || path.length != 2) {
    return null;
  }

  return path[1];
}

/**
 * Query a resource by the inputed url.
 * @param courseSlug the slug of the course
 * @param path the URL path accessed
 * @returns 
 */
export async function getResource(courseSlug: string, path: string[]) {
  let resId = await parseResourceId(courseSlug, path);
  if (!resId) {
    return null;
  }

  return await prisma.resource.findUnique({
    where: { id: resId },
    include: {
      fileData: true
    }
  });
}

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

// export type AugumentedResource = Prisma.ResourceGetPayload<typeof augumentedResource>;

/**
 * Query the children of a resource.
 * @param courseSlug the slug of the course
 * @param path the URL path accessed
 * @returns 
 */
export async function getResourceChildren(courseSlug: string, path: string[]) {
  let resId = await parseResourceId(courseSlug, path);
  if (!resId) {
    return null;
  }

  return await prisma.resource.findMany({
    where: { parentId: resId },
    ...augumentedResource,
    orderBy: [
      { type: "desc" },
      { name: "asc" }
    ]
  });
}

type PathSegment = {
  name: string;
  id: string;
}

export type ResourcePath = Array<PathSegment>;

/**
 * Get the path (root resource, route segments and leaf resource) of a specified resource.
 * @param courseSlug the slug of the course
 * @param path the URL path accessed
 * @returns 
 */
export async function getResourcePath(courseSlug: string, urlPath: string[]): Promise<ResourcePath | null> {
  let res: Resource | null = await getResource(courseSlug, urlPath);
  if (res == null) {
    return null;
  }

  // query the segments  
  let segments: Array<PathSegment> = [{
    name: res.name,
    id: res.id
  }];

  try {
    while(res.parentId) {
      res = await prisma.resource.findUniqueOrThrow({ where: { id: res.parentId } });
  
      segments.push({
        name: res.name,
        id: res.id
      });
    }
  } catch {}

  // build the result object
  let path = [];
  for (let i = segments.length - 2; i >= 0; i--) {
    path.push(segments[i]);
  }

  return path;
}
