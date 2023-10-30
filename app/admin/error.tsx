"use client"
 
import { useEffect } from "react"

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error])
 
  return (
    <div className="text-center p-6 rounded">
      <h2>A apărut o eroare la încărcarea paginii.</h2>
      <button
        className="text-teal-500 hover:bg-teal-200 py-1 px-2 rounded mt-2"
        onClick={() => reset()}
      >
        Încearcă din nou
      </button>
    </div>
  );
}
