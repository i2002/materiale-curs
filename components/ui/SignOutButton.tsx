"use client";

import { signOut } from "next-auth/react";
import { ForwardedRef, forwardRef } from "react";

const SignOutButton = (props: React.ComponentPropsWithoutRef<'button'>, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      onClick={() => signOut()}
      {...props}
    >
      Dezautentificare 
    </button>
  )
}

export default forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>(SignOutButton);
