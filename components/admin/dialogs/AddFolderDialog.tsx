import { Dialog } from "@headlessui/react";
import { Button } from "@tremor/react";
import { FormEvent } from "react";

interface Props {
  open: boolean;
  setOpen: (state: boolean) => any;
  onSubmit: (name: string) => any;
}

export default function AddFolderDialog({ open, setOpen, onSubmit }: Props) {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {   
    const formData = new FormData(e.currentTarget);
    onSubmit(formData.get("name")?.toString() ?? "");
    setOpen(false);
    e.preventDefault();
  }

  const closeHandler = () => {
    setOpen(false);
  }
  
  return (
    <Dialog open={open} onClose={closeHandler} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-25">
        <Dialog.Panel className="w-full max-w-sm transform flex flex-col max-h-full overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl">
        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Adăugare director nou</Dialog.Title>
          <form onSubmit={submitHandler}>
            <div className="mt-4 w-full">
              <input
                type="text"
                name="name"
                className="form-input text-sm m-1 mb-0 w-full"
                placeholder="Nume director"
                required
              />
            </div>
            <div className="mt-4 flex justify-around">
              <Button type="button" size="xs" color="neutral" variant="secondary" onClick={() => closeHandler()}>Renunțare</Button>
              <Button type="submit" size="xs" color="teal">Creare director</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
