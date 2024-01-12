import { Dialog } from "@headlessui/react";
import { Button } from "@tremor/react";
import { FormEvent } from "react";

interface Props {
  open: boolean;
  title: string;
  submitButtonLabel: string;
  submitButtonColor: "neutral" | "slate" | "gray" | "zinc" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | undefined;
  children: React.ReactNode;
  onClose: () => any;
  submitHandler: (e: FormEvent<HTMLFormElement>) => any;
}

export default function InputDialog({ open, title, submitButtonLabel, submitButtonColor, children, onClose: onClose, submitHandler }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-25">
        <Dialog.Panel className="w-full max-w-sm transform flex flex-col max-h-full overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl">
        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">{title}</Dialog.Title>
          <form onSubmit={submitHandler}>
            {children}
            <div className="mt-4 flex justify-around">
              <Button type="button" size="xs" color="neutral" variant="secondary" onClick={() => onClose()}>Renunțare</Button>
              <Button type="submit" size="xs" color={submitButtonColor}>{submitButtonLabel}</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
