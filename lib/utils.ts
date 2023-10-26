import { AugumentedResource } from "@/lib/prisma";

const formatSize = (bytes: number) => {
  if (bytes == 0) {
    return "0.00 B";
  }
  
  const exp = Math.floor(Math.log(bytes) / Math.log(1024));
  const base = (bytes / Math.pow(1024, exp)).toFixed(2);
  const unit = " KMGTP".charAt(exp) + "B";
  return `${base} ${unit}`
}

export default function getResSize(res: AugumentedResource) {
  return res.type == "folder" ? res._count.children : formatSize(res.fileData?.size ?? 0);
}