'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error])
 
  return (
    <div className="text-center p-6 rounded">
      <h2>A apărut o eroare la încărcarea paginii.</h2>
      <button
        className="text-teal-500 hover:bg-teal-200 py-1 px-2 rounded mt-2"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Încearcă din nou
      </button>
    </div>
  )
}