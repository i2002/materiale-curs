import { ChangeEvent, Fragment, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Resource } from "@prisma/client";
import { getResSize, getResDate } from "@/lib/utils";
import ResourceIcon from "@/components/ui/ResourceIcon";
import { useFileManagerContext } from "./FileManagerContext";


const DataLoading = ({ rows }: { rows: number }) => [...Array(rows)].map((_el, i) => (
  <Fragment key={i}>
    <div className="px-3 py-2 hover:bg-slate-50 rounded border-b-slate-200 border-b gap-2">
      <div className="animate-pulse h-2 my-2 rounded-full bg-slate-200"></div>
    </div>
  </Fragment>
));


export default function FileManagerChildren() {
  const { state: { children }, loading, selected, setResource, setSelected } = useFileManagerContext();
  const router = useRouter();
  const checkboxRef = useRef<HTMLInputElement>(null);


  // selection handlers
  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.currentTarget.checked) {
      setSelected(prev => [...prev, id]);
    } else {
      setSelected(prev => prev.filter(res => res !== id));
    }
    e.stopPropagation();
  }

  const selectionCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected(children.map(child => child.id));
    } else {
      setSelected([]);
    }
  }

  const openResourceHandler = (res: Resource) => {
    if (res.type == "folder") {
      setResource(res.id);
    } else if (res.type == "file") {
      router.push(`files/preview/${res.id}`);
    }
  }

  // select all checkbox indeterminate state
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = selected.length > 0 && selected.length < children.length;
    }
  }, [selected, children, checkboxRef]);


  return (
    <div className="mt-2 rounded border border-slate-200 text-sm">
      <div className="py-2.5 px-3 grid grid-cols-[auto_auto_1fr_100px_100px] items-center gap-2 text-sm border-b border-slate-300 font-bold text-slate-500">                
        <input
          type="checkbox"
          ref={checkboxRef}
          checked={selected.length === children.length && selected.length !== 0}
          onChange={selectionCheckboxHandler}
          className="form-checkbox"
        />
        <span className="col-span-2">Nume</span>
        <span>Dimensiune</span>
        <span>Modificat la</span>
      </div>
      {children.map(child => (
        <div
          key={child.id}
          onClick={() => openResourceHandler(child)}
          className={`px-3 py-2 hover:bg-slate-50 rounded grid grid-cols-[auto_auto_1fr_100px_100px] items-center border-b-slate-200 border-b gap-2 cursor-pointer ${loading ? "pointer-events-none select-none opacity-50" : ""}`}
        >
          <input
            type="checkbox"
            className="form-checkbox"
            checked={selected.includes(child.id)}
            onClick={e => e.stopPropagation()}
            onChange={(e) => checkboxHandler(e, child.id)}
          />
          <ResourceIcon type={child.type} className="w-4 h-4" />
          <span className="truncate" title={child.name}>
            {child.name}
          </span>
          <span className="truncate">
            {getResSize(child)}
          </span>
          <span className="truncate" title={getResDate(child, "full")}>
            {getResDate(child)}
          </span>
        </div>
      ))}
      {children.length === 0 && (loading && (
        <DataLoading rows={3} />
      ) || (
        <div className="text-center py-4 text-slate-400">
          Acest director nu conține niciun fișier.
        </div>
      ))}
    </div>
  );
}
