"use server"

import { createResource, deleteResources, getResource, getResourceChildren, getResourcePath } from "@/lib/controllers/resourceController"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";


/**
 * Get resource children action.
 * 
 * @param courseId the id of the course
 * @param resourceId the id of the resource (undefined for the root resource of course)
 * @returns the children and the path of the specified resource
 */
export async function getResourceAction(courseId: number, resourceId: string | undefined) {
  let res = await getResource(courseId, resourceId);
  const [children, path] = await Promise.all([getResourceChildren(res), getResourcePath(res)]);

  return {
    children: children ?? [],
    path: path ?? []
  };
}


/**
 * Create resource action.
 * 
 * @param name the name of the resource
 * @param type the type of the resource
 * @param parentId the parent id of the resource (undefined for the root resource of course)
 * @param courseId the course id of the parent course
 * @returns the new list of children of the parent resource or error message
 */
export async function createResourceAction(name: string, type: string, parentId: string | undefined, courseId: number) {
  if (parentId === undefined) {
    let res = await getResource(courseId, undefined);
    parentId = res?.id ?? "";
  }

  try {
    await createResource(name, type, parentId, courseId);
    revalidatePath("/");
  } catch (err) {
    console.log(err);
    let message = "Eroare la adăugare director."

    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      message = "Numele directorului nu este unic în directorul părinte.";
    }

    return {
      error: message
    }
  }

  return {
    data: await getResourceAction(courseId, parentId)
  }
}


/**
 * Delete resources action.
 * Delete the specified resources including their children.
 *
 * @param resIds the ids of the resources to be deleted
 * @returns the new list of children of the current resource or error message
 */
export async function deleteResourcesAction(resIds: string[], courseId: number, parentId: string | undefined) {
  try {
    await deleteResources(resIds);
    revalidatePath("/");
  } catch (err) {
    return {
      error: "Eroare la ștergere selecție."
    }
  }

  return {
    data: await getResourceAction(courseId, parentId)
  }
}