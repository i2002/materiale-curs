"use client"

import { useCallback, useEffect, useState } from "react";
import { getResourceAction, createResourceAction, deleteResourcesAction } from "@/lib/actions/resourceActions";
import { AugumentedResource, ResourcePath } from "@/lib/controllers/resourceController";
import { Resource } from "@prisma/client";
import FolderViewToolbar from "./FolderViewToolbar";
import FolderViewChildren from "./FolderViewChildren";
import AddFolderDialog from "@/components/admin/dialogs/AddFolderDialog";
import ConfirmDeleteResourceDialog from "@/components/admin/dialogs/ConfirmDeleteResourceDialog";

interface Props {
  courseId: number;
}

export default function FolderView({ courseId }: Props) {
  // State
  const initialState: {path: ResourcePath, children: AugumentedResource[]} = {
    path: [],
    children: []
  }

  // - data states 
  const [state, setState] = useState(initialState);
  const [resource, setResource] = useState<string | undefined>(undefined);
  
  // - status states
  const [selected, setSelected] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // - dialog states
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);


  // Keep data in sync
  useEffect(() => {
    setIsLoading(true);
    getResourceAction(courseId, resource).then(res => {
      setState(res);
      setIsLoading(false);
    });
  }, [resource]);

  useEffect(() => {
    setSelected([]);
  }, [state]);


  // State change handlers
  const changeDirectory = (resId: string) => {
    setResource(resId);
  }

  const openResourceHandler = (res: Resource) => {
    if (res.type == "folder") {
      changeDirectory(res.id);
    }
  }

  const updateSelectionHandler = (id: string | undefined, action: boolean = true) => {
    if (id === undefined) {
      if (action === true) {
        setSelected(state.children.map(child => child.id));
      } else {
        setSelected([]);
      }
    } else {
      if (action === true) {
        setSelected(prev => [...prev, id]);
      } else {
        setSelected(prev => prev.filter(res => res !== id));
      }
    }
  };

  const alerError = (message: string) => {
    setError(message);
    console.error(message);
  }


  // Action handlers
  const addFolder = async (name: string) => {
    setIsLoading(true);
    let resp = await createResourceAction(name, "folder", resource, courseId);
    if (resp.error === undefined) {
      setState(resp.data);
    } else {
      alerError(resp.error);
    }
    setIsLoading(false);
  }

  const deleteSelection = async () => {
    setIsLoading(true);
    let resp = await deleteResourcesAction(selected, courseId, resource);
    if (resp.error === undefined) {
      setState(resp.data);
    } else {
      alerError(resp.error);
    }
    setIsLoading(false);
  }


  return (
    <div className="my-3">
      {error !== "" && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-500 my-4 flex justify-between">
          <span><b>Eroare: </b>{error}</span>
          <span className="text-sm cursor-pointer" onClick={() => setError("")}>Ascundere</span>
        </div>
      )}
      <FolderViewToolbar
        path={state.path}
        setResource={setResource}
        addFolderAction={() => setShowAddDialog(true)}
        deleteSelectionAction={() => setShowConfirmDelete(true)}
      />
      <FolderViewChildren
        resources={state.children}
        isLoading={isLoading}
        selected={selected}
        openResourceHandler={openResourceHandler}
        updateSelectionHandler={updateSelectionHandler}
      />
      <AddFolderDialog open={showAddDialog} setOpen={setShowAddDialog} onSubmit={addFolder} />
      <ConfirmDeleteResourceDialog open={showConfirmDelete} setOpen={setShowConfirmDelete} onConfirm={deleteSelection} />
    </div>
  );
}
