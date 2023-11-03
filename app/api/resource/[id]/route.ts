import { getResource } from "@/lib/controllers/resourceController";
import { readFile } from "fs/promises";
import { NextRequest } from "next/server";
import path from "path";

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  // request resource
  const res = await getResource(params.id);
  
  // resource not found
  if (res == null || res.type != "file") {
    return new Response(null, { status: 404 });
  }

  // file buffer
  let fileBuf = await readFile(path.join("uploads", String(res.courseId), params.id));
  
  // response
  return new Response(fileBuf, {
    headers: {
      "Content-Type": res.fileData?.mimeType ?? "text/plain",
      "Content-disposition": "attachment; filename=" + res.name
    }
  });
}
