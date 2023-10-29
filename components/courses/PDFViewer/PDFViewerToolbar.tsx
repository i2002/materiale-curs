import { MagnifyingGlassMinusIcon as MinusIcon, MagnifyingGlassPlusIcon as PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { PDFViewerContext } from "./PDFViewerContext";

interface Props {
  currentPage: number;
  numPages: number;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  scrollToPage: (page: number) => any;
}

export default function PDFViewerToolbar() {
  const { state: { currentPage, numPages, scale }, dispatch } = useContext(PDFViewerContext);

  return (
    <>
      <div className="mx-3 py-1 px-2 bg-zinc-600 rounded flex items-center">
        <input
          className="text-sm bg-gray-500 w-10 text-center p-0 arrow-hide"
          type="number"
          value={currentPage}
          onChange={e => dispatch({
            type: "currentPage",
            payload: parseInt(e.target.value)
          })}
        />
        <span className="mx-3">/</span>
        <span>{numPages}</span>
      </div>
      <div className="w-20 py-1 px-1.5 flex justify-between items-center bg-zinc-600 rounded select-none">
        <MinusIcon
          className="cursor-pointer w-4 h-4" 
          title="Micșorare imagine"
          onClick={() => dispatch({
            type: "scaleDecrease"
          })}
        />
        <span
          className="cursor-pointer"
          title="Resetare scalare"
          onClick={() => dispatch({
            type: "scaleReset"
          })}
        >
          {scale.toFixed(1)}
        </span>
        <PlusIcon
          className="cursor-pointer w-4 h-4"
          title="Mărire imagine"
          onClick={() => dispatch({
            type: "scaleIncrease"
          })}
        />
      </div>
    </>
  );
}
