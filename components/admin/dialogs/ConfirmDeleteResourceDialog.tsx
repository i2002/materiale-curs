import { Dialog } from "@headlessui/react";
import { Button } from "@tremor/react";

interface Props {
  open: boolean;
  setOpen: (state: boolean) => any;
  onConfirm: () => any;
}


export default function ConfirmDeleteResourceDialog({ open, setOpen, onConfirm }: Props) {
  const submitHandler = () => {   
    onConfirm();
    setOpen(false);
  }

  const closeHandler = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={closeHandler} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-25">
        <Dialog.Panel className="w-full max-w-sm transform flex flex-col max-h-full overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl">
        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Confirmare ștergere selecție</Dialog.Title>
          <div className="text-sm mt-4 text-slate-900">
            <p>Vor fi șterse recursiv toate directoarele și fișierele din selecția curentă.</p>
            <p>Această acțiune este ireversibilă.</p>
          </div>
          <div className="mt-4 flex justify-around">
            <Button type="button" size="xs" color="neutral" variant="secondary" onClick={() => closeHandler()}>Renunțare</Button>
            <Button type="button" size="xs" color="red" onClick={() => submitHandler()}>Ștergere selecție</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
