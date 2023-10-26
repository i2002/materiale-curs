import ResourceIcon from "@/components/ui/ResourceIcon";
import { AugumentedResource } from "@/lib/prisma";
import getResSize from "@/lib/utils";
import { Resource } from "@prisma/client";
import { ChangeEvent, Fragment, useEffect, useRef } from "react";


const DataLoading = ({ rows }: { rows: number }) => [...Array(rows)].map((el, i) => (
  <Fragment key={i}>
    <div className="px-3 py-2 hover:bg-slate-50 rounded border-b-slate-200 border-b gap-2">
      <div className="animate-pulse h-2 my-2 rounded-full bg-slate-200"></div>
    </div>
  </Fragment>
));


interface Props {
  resources: Array<AugumentedResource>;
  isLoading: boolean;
  selected: Array<string>;
  openResourceHandler: (res: Resource) => void;
  updateSelectionHandler: (id: string | undefined, action?: boolean) => void;
}

export default function FolderViewChildren(props: Props) {
  const {
    resources,
    isLoading,
    selected,
    openResourceHandler,
    updateSelectionHandler
  } = props;
  const checkboxRef = useRef<HTMLInputElement>(null);


  // handlers
  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    updateSelectionHandler(id, e.currentTarget.checked);
    e.stopPropagation();
  }

  const selectionCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateSelectionHandler(undefined, e.target.checked);
  }


  // update all checkbox indeterminate state
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = selected.length > 0 && selected.length < resources.length;
    }
  }, [selected, resources, checkboxRef]);


  return (
    <div className="mt-2 rounded border border-slate-200 text-sm">
      <div className="py-2.5 px-3 grid grid-cols-[auto_auto_1fr_100px_100px] items-center gap-2 text-sm border-b border-slate-300 font-bold text-slate-500">                
        <input
          type="checkbox"
          ref={checkboxRef}
          checked={selected.length === resources.length && selected.length !== 0}
          onChange={selectionCheckboxHandler}
          className="form-checkbox"
        />
        <span className="col-span-2">Nume</span>
        <span>Dimensiune</span>
        <span>Modificare</span>
      </div>
      {resources.map(child => (
        <div
          key={child.id}
          onClick={() => openResourceHandler(child)}
          className={`px-3 py-2 hover:bg-slate-50 rounded grid grid-cols-[auto_auto_1fr_100px_100px] items-center border-b-slate-200 border-b gap-2 cursor-pointer ${isLoading ? "pointer-events-none select-none opacity-50" : ""}`}
        >
          <input
            type="checkbox"
            className="form-checkbox"
            checked={selected.includes(child.id)}
            onClick={e => e.stopPropagation()}
            onChange={(e) => checkboxHandler(e, child.id)}
          />
          <ResourceIcon type={child.type} className="w-4 h-4"></ResourceIcon>
          <span className="truncate" title={child.name}>{child.name}</span>
          <span className="truncate">{getResSize(child)}</span>
          <span className="truncate">10 noi 2024</span> {/* FIXME: last updated data */}
        </div>
      ))}
      {resources.length === 0 && (isLoading && (
        <DataLoading rows={3}></DataLoading>
      ) || (
        <div className="text-center py-4 text-slate-400">
          Acest director nu conține niciun fișier.
        </div>
      ))}
    </div>
  );
}
