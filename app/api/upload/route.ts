import { NextRequest, NextResponse } from "next/server";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { createFileResource } from "@/lib/controllers/resourceController";
import { getResourceAction } from "@/lib/actions/resourceActions";

const uploadSchema = zfd.formData({
  courseId: zfd.numeric(),
  parentId: zfd.text(z.string().optional()),
  file: zfd.file(z.instanceof(File).optional())
});

export async function POST(req: NextRequest) {
  try {
    const { courseId, parentId, file } = uploadSchema.parse(await req.formData());
    if (file) {
      await createFileResource(parentId, courseId, file);
    }

    let children = await getResourceAction(courseId, parentId);
    return NextResponse.json({
      data: children
    });
  } catch(e) {
    console.error(e); // FIXME: error logging
    return NextResponse.json({ error: "Eroare la încărcare fișier" });
  }
}
