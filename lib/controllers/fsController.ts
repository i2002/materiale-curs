import { mkdir, rm, writeFile } from "fs/promises";
import path from "path";

const baseDir = "uploads";

export async function createFile(name: string, courseId: number, file: Buffer) {
  try {
    await mkdir(path.join(baseDir, String(courseId)), { recursive: true });
    await writeFile(path.join(baseDir, String(courseId), name), file);
  } catch(err) {
    console.log("fsController", err); // FIXME: Error logging
  }
}

export async function deleteFile(name: string, courseId: number) {
  try {
    await rm(path.join(baseDir, String(courseId), name));
  } catch(err) {
    console.log("fsController", err); // FIXME: Error logging
  }
}
