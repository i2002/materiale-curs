import { signIn } from "next-auth/react";
import { useContext } from "react";
import { LoginContext } from "./LoginContext";
import Image from "next/image";

interface Props {
  callbackUrl: string;
}

export default function MicrosoftSSOForm() {
  const { state: { callbackUrl } } = useContext(LoginContext);
  const onLogin = () => {
    signIn("azure-ad", {
      callbackUrl: callbackUrl
    });
  }

  return (
    <a
      className="px-7 py-2 h-12 flex text-white bg-[#2f2f2f] rounded justify-center items-center shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150"
      onClick={onLogin}
      role="button"
    >
      <Image className="pr-3 h-full" src="/images/ms-signin.svg" alt="Microsoft logo"/>
      Conectare cu Microsoft
    </a>
  );
}
