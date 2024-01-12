import { createFolderResourceAction, deleteResourcesAction } from "@/lib/actions/resourceActions";
import { FileManagerState } from "./file-manager-types";


export const addFolder = async (name: string, resource: string | undefined, courseId: number) => {
  let res = await createFolderResourceAction(name, resource, courseId);
  if (res.error !== undefined) {
    throw new Error(res.error);
  }

  return res.data;
}


export const uploadFile = async (files: FileList, resource: string | undefined, courseId: number, state: FileManagerState) => {
  let formData = new FormData();
  formData.append("file", files[0]);
  formData.append("courseId", String(courseId));
  formData.append("parentId", resource ?? "");

  if (state.children.find(res => res.name === files[0].name)) {
    throw new Error("Numele fișierului selectat nu este unic.");
  }

  let res = await fetch("/api/upload", {
    method: "POST",
    body: formData
  });

  let data = await res.json();
  if (data.error !== undefined) {
    throw new Error(data.error);
  }

  return data.data;
}


export const deleteSelection = async (resource: string | undefined, courseId: number, selected: string[]) => {
  let res = await deleteResourcesAction(selected, courseId, resource);
  if (res.error !== undefined) {
    throw new Error(res.error);
  }

  return res.data;
}
