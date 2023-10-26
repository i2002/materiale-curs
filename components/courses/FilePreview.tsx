"use client"

interface Props {
  resId: string;
}

export default function FilePreview({ resId }: Props) {
  return (
    <iframe src={`/api/resource/${resId}`} className="w-full h-full"></iframe>
  );
}
