"use client";

import { SessionProvider as AuthSessionProvider } from 'next-auth/react'

interface Props {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Props) {
  return (
    <AuthSessionProvider>
      {children}
    </AuthSessionProvider>
  );
}
