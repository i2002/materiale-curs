import { Prisma, Resource } from "@prisma/client";
import prisma from "@/lib/prisma";
import { cache } from "react";


/**
 * Determine query arguments from url input
 * @param courseSlug the slug of the course
 * @param path the URL path accessed
 * @returns where query conditions or null if invalid url
 */
function getResourceWhereInput(courseSlug: string, path: string[]): Prisma.ResourceWhereInput | null {
  if (path == undefined) {
    return {
      course: { slug: courseSlug },
      parentId: null
    };
  } else if (path.length == 2 && path[0] == "resource") {
    return {
      course: { slug: courseSlug },
      id: path[1]
    };
  }

  return null;
}


/**
 * Query a resource by the inputed url.
 * @param courseSlug the slug of the course
 * @param path the URL path accessed
 * @returns 
 */
export const getResource = cache(async (courseSlug: string, path: string[]) => {
  let condition = getResourceWhereInput(courseSlug, path);
  if(!condition) {
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
 * @param courseSlug the slug of the course
 * @param path the URL path accessed
 * @returns 
 */
export const getResourceChildren = cache(async (courseSlug: string, path: string[]) => {
  let res = await getResource(courseSlug, path);
  if (!res) {
    return null;
  }

  return await prisma.resource.findMany({
    where: { parentId: res.id },
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
 * @param courseSlug the slug of the course
 * @param path the URL path accessed
 * @returns 
 */
export const getResourcePath = cache(async (courseSlug: string, urlPath: string[]): Promise<ResourcePath | null> => {
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
});
