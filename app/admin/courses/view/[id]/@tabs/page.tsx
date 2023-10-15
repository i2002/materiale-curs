import { redirect } from "next/navigation";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params }: Props) {
  redirect(`${params.id}/files`);
}
