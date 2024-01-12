import type { ResourcePath, AugumentedResource } from "@/lib/controllers/resourceController";
import type { Dispatch, SetStateAction } from "react";

export type FileManagerState = {
  path: ResourcePath;
  children: AugumentedResource[];
}

export type FileManagerContextType = {
  courseId: number;
  resource: string | undefined;
  state: FileManagerState;
  loading: boolean;
  error: string | undefined;
  selected: string[];
  setResource: (resource: string | undefined) => void;
  setState: (state: Promise<FileManagerState>) => void;
  setSelected: Dispatch<SetStateAction<string[]>>;
  dismissError: () => void;
  addFolder: (name: string) => void;
  uploadFile: (files: FileList) => void;
  deleteSelection: () => void;
}
