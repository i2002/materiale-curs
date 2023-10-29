import { ResourcePath } from "@/lib/controllers/resourceController";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { DocumentPlusIcon, FolderPlusIcon, HomeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef } from "react";

interface Props {
  path: ResourcePath;
  setResource: (resId: string | undefined) => any;
  addFolderAction: () => any;
  uploadFileAction: (files: FileList) => any;
  deleteSelectionAction: () => any;
}

export default function FolderViewToolbar({ path, setResource, addFolderAction, uploadFileAction, deleteSelectionAction }: Props) {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const fileChangedHandler = () => {
    if (fileUploadRef.current?.files) {
      uploadFileAction(fileUploadRef.current.files);
      fileUploadRef.current.value = "";
    }
  }

  return (
    <div className="rounded bg-slate-100 p-2 flex text-slate-600 items-center">
      <div className="w-full flex text-sm items-center">
        <HomeIcon className="w-4 h-4 mx-1 cursor-pointer" onClick={() => setResource(undefined)}></HomeIcon>
        {path.map(segment => (
          <Fragment key={segment.id}>
            <ChevronRightIcon className="w-4 h-4 text-slate-500"></ChevronRightIcon>
            <span className="hover:underline underline-offset-4 mx-1 cursor-pointer max-w-[150px] truncate" title={segment.name} onClick={() => setResource(segment.id)}>{segment.name}</span>
          </Fragment>
        ))}
      </div>
      <div className="flex">
        <FolderPlusIcon
          onClick={addFolderAction}
          title="Director nou"
          className="w-5 h-5 mx-1 hover:text-teal-600 cursor-pointer"
        />
        <div>
          <input ref={fileUploadRef} type="file" name="fileUpload" id="fileUpload" onChange={() => fileChangedHandler()} className="hidden" multiple/>
          <label htmlFor="fileUpload">
            <DocumentPlusIcon
              title="Încarcă fișier"
              className="w-5 h-5 mx-1 hover:text-teal-600 cursor-pointer"
            />
          </label>
        </div>
        <TrashIcon
          onClick={deleteSelectionAction}
          title="Șterge selecție"
          className="w-5 h-5 mx-1 hover:text-teal-600 cursor-pointer"
        />
      </div>
    </div>
  );
}
