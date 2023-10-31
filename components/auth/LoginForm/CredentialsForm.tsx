import { FormEvent, useContext, useRef, useState } from "react";
import { LoginContext } from "./LoginContext";
import { signIn } from "next-auth/react";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";

export default function CredentialsForm() {
  const [loading, setLoading] = useState(false);
  const { state: { callbackUrl }, dispatch } = useContext(LoginContext);
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    try {
      setLoading(true);
      dispatch({ type: "messageReset" });

      await new Promise(resolve => setInterval(resolve, 2000));
      const res = await signIn("credentials", {
        username: username,
        password: password,
        callbackUrl,
        redirect: false
      });

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        dispatch({
          type: "messageErrorCode",
          text: res.error
        });
      }
    } catch (error: any) {
      dispatch({ type: "messageError", text: error });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="mb-3">
        <input
          required
          type="text"
          name="username"
          placeholder="Nume utilizator"
          className="form-input"
          ref={usernameRef}
          disabled={loading}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          placeholder="Parolă utilizator"
          className="form-input"
          ref={passwordRef}
          disabled={loading}
        />
      </div>
      <Button color="teal" className="w-full [&>span]:text-base" size="lg" disabled={loading} type="submit">Autentificare</Button>
    </form>
  );
}
