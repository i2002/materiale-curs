import { Callout } from "@tremor/react";
import { useContext } from "react";
import { LoginContext } from "./LoginContext";

export default function FormMessage() {
  const { state: { messageTitle, message, messageType } } = useContext(LoginContext);

  return message ? (
    <Callout className="mb-4" title={messageTitle} color={messageType == "error" ? "rose" : "teal"}>{message}</Callout>
  ) : null;
}
