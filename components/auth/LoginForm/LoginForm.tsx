"use client"

import { LoginContextProvider } from "./LoginContext";
import EmailForm from "./EmailForm";
import MicrosoftSSOForm from "./MicrosoftSSOForm";
import CredentialsForm from "./CredentialsForm";
import FormMessage from "./FormMessage";
import { Button } from "@tremor/react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";


interface Props {
  callbackUrl: string;
  error: string;
}

export default function LoginForm({ callbackUrl, error }: Props) {
  const adminLogin = callbackUrl && new URL(callbackUrl).pathname.startsWith("/admin");
  return (
    <LoginContextProvider initialState={{ callbackUrl, error }}>
      <div className="max-w-lg mx-auto h-full w-full flex flex-col mt-10">
        <h1 className="text-center text-2xl font-medium my-10">Autentificare {adminLogin ? "administrator" : "platformă"}</h1>

        {/* SSO options */}
        {!adminLogin && (
          <>
            <MicrosoftSSOForm/>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">sau</p>
            </div>
          </>
        )}

        {/* Form options */}
        <FormMessage/>
        {adminLogin ? <CredentialsForm/> : <EmailForm/>}
         
        {/* Go to user auth */}
        {adminLogin && (
          <Link href="/" className="mx-auto mt-10">
            <Button variant="secondary" color="teal" icon={ArrowLeftIcon}>Spre portal autentificare utilizatori</Button>
          </Link>
        )}  
      </div>
    </LoginContextProvider>
  );
}
