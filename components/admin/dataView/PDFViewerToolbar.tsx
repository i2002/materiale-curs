import { MagnifyingGlassMinusIcon as MinusIcon, MagnifyingGlassPlusIcon as PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface Props {
  currentPage: number;
  numPages: number;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  scrollToPage: (page: number) => any;
}

export default function PDFViewerToolbar({ currentPage, numPages, scale, setScale, scrollToPage }: Props) {
  return (
    <>
      <div className="mx-3 py-1 px-2 bg-zinc-600 rounded flex items-center">
        <input
          className="text-sm bg-gray-500 w-10 text-center p-0 arrow-hide"
          type="number"
          value={currentPage}
          onChange={e => scrollToPage(parseInt(e.target.value) - 1)}
        />
        <span className="mx-3">/</span>
        <span>{numPages}</span>
      </div>
      <div className="w-20 py-1 px-1.5 flex justify-between items-center bg-zinc-600 rounded select-none">
        <MinusIcon
          className="cursor-pointer w-4 h-4" 
          title="Micșorare imagine"
          onClick={() => setScale(val => val > 0.2 ? val -= 0.1 : val)}
        />
        <span
          className="cursor-pointer"
          title="Resetare scalare"
          onClick={() => setScale(1)}
        >
          {scale.toFixed(1)}
        </span>
        <PlusIcon
          className="cursor-pointer w-4 h-4"
          title="Mărire imagine"
          onClick={() => setScale(val => val += 0.1)}
        />
      </div>
    </>
  );
}
