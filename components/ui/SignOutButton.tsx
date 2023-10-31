"use client";

import { signOut } from "next-auth/react";
import { forwardRef } from "react";

const SignOutButton = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>((props, ref) => {
  return (
    <button
      ref={ref}
      onClick={() => signOut()}
      {...props}
    >
      Dezautentificare 
    </button>
  )
});

export default SignOutButton;
