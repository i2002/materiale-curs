import { useFileManagerContext } from "./FileManagerContext";

export default function FileManagerError() {
  const { error, dismissError } = useFileManagerContext();
  return error ? (
    <div className="rounded-md bg-red-50 p-4 text-sm text-red-500 my-4 flex justify-between">
      <span><b>Eroare: </b>{error}</span>
      <span className="text-sm cursor-pointer" onClick={() => dismissError()}>Ascundere</span>
    </div>
  ) : null;
}
