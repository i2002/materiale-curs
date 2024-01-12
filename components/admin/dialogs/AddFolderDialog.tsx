import InputDialog from "@/components/ui/InputDialog";
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

  return (
    <InputDialog
      open={open}
      title="Adăugare director nou"
      submitButtonLabel="Creare director"
      submitButtonColor="teal"
      onClose={() => setOpen(false)}
      submitHandler={submitHandler}
    >
      <div className="mt-4 w-full">
        <input
          type="text"
          name="name"
          className="form-input text-sm m-1 mb-0 w-full"
          placeholder="Nume director"
          required
        />
      </div>
    </InputDialog>
  );
}
