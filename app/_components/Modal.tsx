"use client";

import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
}

export default function Modal({ title, children }: ModalProps) {
  const router = useRouter();

  const handleOnOpenChange = (open: boolean = false) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open={true} onClose={handleOnOpenChange} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <Dialog.Panel className="fixed inset-0 inset-y-4 flex flex-col w-3/4 mx-auto items-stretch justify-center rounded-lg bg-white overflow-hidden">
        <Dialog.Title className="bg-zinc-200 text-lg py-2 px-4 flex justify-between items-center">
          {title}
          <XMarkIcon className="w-4 h-4 cursor-pointer" onClick={() => handleOnOpenChange()}></XMarkIcon>
        </Dialog.Title>
        <div className="p-2 bg-white h-full">
          {children}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
