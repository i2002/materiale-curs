import LinkButton from "@/components/ui/LinkButton";
import { Dialog } from "@headlessui/react";
import { Button } from "@tremor/react";
import { ChangeEvent, useState, Dispatch, SetStateAction } from "react";

interface Props {
  lists: Array<any>;
  onSelectLists: (lists: number[]) => any;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}


export default function SelectStudentListDialog({ lists, onSelectLists, open, setOpen }: Props) {
  const [data, setData] = useState(lists);
  const [selected, setSelected] = useState<Array<number>>([]);
  const filterListsHandler = (input: string) => setData(lists.filter(list => list.name.toLowerCase().startsWith(input.toLowerCase())));
  const selectListHandler = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setSelected(prev => e.target.checked ? [...prev, id] : prev.filter(el => el !== id));
  }
  const closeDialogHandler = () => {
    setOpen(false);
    setData(lists);
    setSelected([]);
  }
  const applySelectionHandler = () => {
    onSelectLists(selected);
    closeDialogHandler();
  }

  return (
    <Dialog open={open} onClose={() => closeDialogHandler()} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-25">
        <Dialog.Panel className="w-full max-w-lg transform flex flex-col max-h-full overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl">
          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Asociere liste studenți la curs</Dialog.Title>
          <div className="mt-4 flex flex-col overflow-hidden min-h-[6rem]">
            <input
              type="text"
              className="form-input text-sm m-1 mb-0 w-auto"
              placeholder="Filtrare liste studenți"
              onInput={(e) => filterListsHandler(e.currentTarget.value)}
            />
            <ul className="mt-2 mx-1 overflow-auto">
              {data.map(list => (
                <div className="flex items-center space-x-2 rounded p-2 hover:bg-slate-100" key={list.id}>
                  <input
                    type="checkbox"
                    id={`list-checkbox-${list.id}`}
                    name={`list-checkbox-${list.id}`}
                    checked={selected.includes(list.id)}
                    onChange={(e) => selectListHandler(e, list.id)}
                    className="form-checkbox" />
                  <label htmlFor={`list-checkbox-${list.id}`} className="flex w-full space-x-2 text-sm"> {list.name} </label>
                </div>
              ))}
              {data.length == 0 && (
                <div className="text-sm text-center text-slate-500 mt-2 mb-3">Nicio listă nu corespunde filtrării</div>
              )}
            </ul>
          </div>

          <div className="mx-3">
            <LinkButton href="/admin/students/create">Adăugare listă nouă</LinkButton>
          </div>

          <div className="mt-4 flex justify-around">
            <Button variant="secondary" onClick={() => closeDialogHandler()}>Renunțare</Button>
            <Button onClick={() => applySelectionHandler()}>Adăugare liste selectate</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
