"use client"

import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@tremor/react";
import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode | undefined;
}

export default function LinkButton({ href, children }: Props) {
  return (
    <Link href={href}>
      <Button variant="light" size="xs" color="teal" className="mt-2" icon={ArrowRightIcon} iconPosition="right">{children}</Button>
    </Link>
  );
}