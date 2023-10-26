import { redirect } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  redirect(`${params.slug}/folder`);
}
