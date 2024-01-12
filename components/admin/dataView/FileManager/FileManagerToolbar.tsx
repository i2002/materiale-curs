import { Fragment, useRef, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { DocumentPlusIcon, FolderPlusIcon, HomeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useFileManagerContext } from "./FileManagerContext";
import AddFolderDialog from "@/components/admin/dialogs/AddFolderDialog";
import ConfirmDeleteResourceDialog from "@/components/admin/dialogs/ConfirmDeleteResourceDialog";


export default function FileManagerToolbar() {
  const { state: { path }, selected, setResource, addFolder, uploadFile, deleteSelection } = useFileManagerContext();
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [addFolderDialogOpen, setAddFolderDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  const fileChangedHandler = () => {
    if (fileUploadRef.current?.files) {
      uploadFile(fileUploadRef.current.files);
      fileUploadRef.current.value = "";
    }
  }

  return (
    <div className="rounded bg-slate-100 p-2 flex text-slate-600 items-center">
      <div className="w-full flex text-sm items-center">
        <HomeIcon
          onClick={() => setResource(undefined)}
          className="w-4 h-4 mx-1 cursor-pointer"
        />
        {path.map(segment => (
          <Fragment key={segment.id}>
            <ChevronRightIcon className="w-4 h-4 text-slate-500" />
            <span
              title={segment.name}
              onClick={() => setResource(segment.id)}
              className="hover:underline underline-offset-4 mx-1 cursor-pointer max-w-[150px] truncate"
            >
              {segment.name}
            </span>
          </Fragment>
        ))}
      </div>
      <div className="flex">
        <FolderPlusIcon
          title="Director nou"
          onClick={() => setAddFolderDialogOpen(true)}
          className="w-5 h-5 mx-1 hover:text-teal-600 cursor-pointer"
        />
        <div>
          <input
            ref={fileUploadRef}
            type="file"
            name="fileUpload"
            id="fileUpload"
            onChange={() => fileChangedHandler()}
            className="hidden"
            multiple
          />
          <label htmlFor="fileUpload">
            <DocumentPlusIcon
              title="Încarcă fișier"
              className="w-5 h-5 mx-1 hover:text-teal-600 cursor-pointer"
            />
          </label>
        </div>
        <TrashIcon
          title="Șterge selecție"
          onClick={() => selected.length > 0 && setConfirmDeleteDialogOpen(true)}
          className="w-5 h-5 mx-1 hover:text-teal-600 cursor-pointer"
        />
      </div>

      <AddFolderDialog
        open={addFolderDialogOpen}
        setOpen={setAddFolderDialogOpen}
        onSubmit={(name) => addFolder(name)}
      />

      <ConfirmDeleteResourceDialog
        open={confirmDeleteDialogOpen}
        setOpen={setConfirmDeleteDialogOpen}
        onConfirm={() => deleteSelection()}
      />
    </div>
  );
}
