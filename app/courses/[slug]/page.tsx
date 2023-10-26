import { redirect } from "next/navigation";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params }: Props) {
  redirect(`${params.slug}/folder`);
}
