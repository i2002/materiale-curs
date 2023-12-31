"use client"

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { ForwardRefRenderFunction, forwardRef } from "react";

interface Props {
  name: string;
  toolbar?: React.ReactNode;
  children?: React.ReactNode;
}

const ResourceViewerHeader: ForwardRefRenderFunction<HTMLDivElement, Props> = function ({ name, toolbar, children }, ref) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex flex-col">
      <header className="bg-zinc-700 p-4 text-white grid grid-cols-3 items-center">
        <span title={name}>{name}</span>
        <div className="justify-self-center flex items-center">
          {toolbar}
        </div>
        <XMarkIcon
          className="w-5 h-5 justify-self-end cursor-pointer hover:text-gray-300"
          title="Închidere"
          onClick={() => router.back()}
        />
      </header>
      <div className="flex flex-col items-center h-full bg-zinc-500 relative overflow-auto" ref={ref}>
        {children}
      </div>
    </div>
  );
}

export default forwardRef<HTMLDivElement, Props>(ResourceViewerHeader);
