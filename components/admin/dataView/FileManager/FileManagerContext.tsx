"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { FileManagerContextType, FileManagerState } from "./file-manager-types";
import { getResourceAction } from "@/lib/actions/resourceActions";
import { addFolder, deleteSelection, uploadFile } from "./file-manager-utils";

const FileManagerContext = createContext<FileManagerContextType | null>(null);

export const useFileManagerContext = () => {
  const fileManagerContext = useContext(FileManagerContext);
  if (!fileManagerContext) {
    throw new Error("No FileManagerContextProvider found when calling useFileManagerContext");
  }

  return fileManagerContext;
}

type ProviderProps = {
  children: React.ReactNode;
  courseId: number;
};


export const FileManagerProvider = ({ children, courseId }: ProviderProps) => {
  // data states
  const [resource, setResource] = useState<string | undefined>(undefined);
  const [state, setState] = useState<FileManagerState>({
    path: [],
    children: []
  });

  // status states
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  // state change handlers
  const setStateAsync = (state: Promise<FileManagerState>) => {
    setLoading(true);
    state
      .then(data => setState(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }

  // state actions
  const dismissError = () => {
    setError(undefined);
  }

  // update state when resource change
  useEffect(() => {
    setStateAsync(getResourceAction(courseId, resource));
  }, [resource, courseId]);

  // reset selection when state changes
  useEffect(() => {
    setSelected([]);
  }, [state]);


  return (
    <FileManagerContext.Provider value={{
      courseId,
      resource,
      state,
      loading,
      error,
      selected,
      setResource,
      setState: setStateAsync,
      setSelected,
      dismissError,
      addFolder: (name: string) => setStateAsync(addFolder(name, resource, courseId)),
      uploadFile: (files: FileList) => setStateAsync(uploadFile(files, resource, courseId, state)),
      deleteSelection: () => setStateAsync(deleteSelection(resource, courseId, selected))
    }}>
      {children}
    </FileManagerContext.Provider>
  );
}
