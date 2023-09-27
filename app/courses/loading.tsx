export default function Loading() {
  return (
    <>
      <div className="mx-auto w-1/4 animate-pulse h-28 flex flex-col items-stretch justify-center">
        <div className="bg-slate-300 rounded h-4 my-2"></div>
      </div>
      <div className="m-6 bg-slate-300 animate-pulse h-40 rounded"></div>
    </>
  );
}
