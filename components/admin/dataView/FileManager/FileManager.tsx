"use client"

import FileManagerChildren from "./FileManagerChildren";
import FileManagerError from "./FileManagerError";
import FileManagerToolbar from "./FileManagerToolbar";


export default function FileManager() {
  return (
    <div className="my-3">
      <FileManagerError />
      <FileManagerToolbar />
      <FileManagerChildren />
    </div>
  );
}
