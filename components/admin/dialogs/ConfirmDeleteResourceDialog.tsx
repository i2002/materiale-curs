import InputDialog from "@/components/ui/InputDialog";

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

  return (
    <InputDialog
      open={open}
      title="Confirmare ștergere selecție"
      submitButtonLabel="Ștergere selecție"
      submitButtonColor="red"
      onClose={() => setOpen(false)}
      submitHandler={submitHandler}
    >
      <div className="text-sm mt-4 text-slate-900">
        <p>Vor fi șterse recursiv toate directoarele și fișierele din selecția curentă.</p>
        <p>Această acțiune este ireversibilă.</p>
      </div>
    </InputDialog>
  );
}
