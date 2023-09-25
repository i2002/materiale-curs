import { Prisma, Resource } from "@prisma/client";
import prisma from "./prisma";

export async function getCourses() {
  return await prisma.course.findMany({
    orderBy: [
      { year: "asc" },
      { semester: "asc" },
      { name: "asc" }
    ]
  });
}

export async function getCourse(slug: string) {
  return await prisma.course.findUnique({
    where: { slug: slug }
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

export type AugumentedResource = Prisma.ResourceGetPayload<typeof augumentedResource>;

export async function getResource(resId: string | undefined, courseSlug: string) {
  if (!resId) {
    let course = await getCourse(courseSlug);
    if (!course) {
      return null;
    }

    resId = course.rootFolderId;
  }

  return await prisma.resource.findUnique({
    where: { id: resId },
    include: {
      children: {
        ...augumentedResource,
        orderBy: [
          { type: "desc" },
          { name: "asc" }
        ]
      },
      fileData: true
    }
  });
}

type PathSegment = {
  name: string;
  id: string;
}

export type ResourcePath = Array<PathSegment>;

/**
 * Get the path (root resource, route segments and leaf resource) of a specified resource.
 * @param resId the id of the resource
 * @returns 
 */
export async function getResourcePath(res: Resource): Promise<ResourcePath> {
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
