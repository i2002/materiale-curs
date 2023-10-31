import { FormEvent, useContext, useRef, useState } from "react";
import { LoginContext } from "./LoginContext";
import { signIn } from "next-auth/react";
import { Button } from "@tremor/react";


export default function EmailForm() {
  const [loading, setLoading] = useState(false);
  const { state: { callbackUrl }, dispatch } = useContext(LoginContext);
  const emailRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";

    try {
      setLoading(true);
      dispatch({ type: "messageReset" });

      await new Promise(resolve => setInterval(resolve, 2000));
      const res = await signIn("email", {
        email,
        callbackUrl,
        redirect: false
      });
      console.log(res);

      if (!res?.error) {
        dispatch({
          type: "messageEmail",
          text: email
        });
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
      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          placeholder="Adresă @s.unibuc.ro"
          className="form-input"
          ref={emailRef}
          disabled={loading}
        />
      </div>
      <Button color="teal" className="w-full [&>span]:text-base" size="lg" disabled={loading} type="submit">Conectare cu adresă email</Button>
    </form>
  );
}
