"use client"

import { Dispatch, createContext, useReducer } from "react";

type LoginContextState = {
  messageTitle: string;
  message: string;
  messageType: "info" | "error";
  callbackUrl: string;
}

type LoginContextAction = {
  text: string;
  type: "messageErrorCode" | "messageError" | "messageEmail"
} | {
  type: "messageReset"
}

type LoginContextInitArgs = {
  callbackUrl: string;
  error: string;
}

type LoginContextType = {
  state: LoginContextState;
  dispatch: Dispatch<LoginContextAction>;
}

const initialState: LoginContextState = {
  messageTitle: "",
  message: "",
  messageType: "info",
  callbackUrl: ""
}

const getErrorMessage = (errorCode: string) => {
  switch(errorCode) {
    case "AccessDenied":
      return "Adresa de email nu este înregistrată.";
    case "Verification":
      return "Link-ul de autentificare a expirat sau a fost folosit deja.";
    case "CredentialsSignin":
      return "Date de autentificare incorecte";
    case "OAuthAccountNotLinked":
      return "Există deja un const creat cu aceeași adresă de email";
    case "EmailSignin":
      return "Eroare la trimiterea email-ului de autentificare";
    case "OAuthSignin":
    case "OAuthCallback":
    case "OAuthCreateAccount":
    case "EmailCreateAccount":
    case "Callback":
    case "Configuration":
    case "Default":
    default:
      return "Eroare internă la autentificare.";
  }
}

function reducer(state: LoginContextState, action: LoginContextAction): LoginContextState {
  switch (action.type) {
    case "messageErrorCode":
      return {
        ...state,
        messageTitle: "Autentificare eșuată",
        message: getErrorMessage(action.text),
        messageType: "error"
      };

    case "messageError":
      return {
        ...state,
        messageTitle: "Autentificare eșuată",
        message: action.text,
        messageType: "error"
      };

    case "messageEmail":
      return {
        ...state,
        messageTitle: "Link de verificare trimis",
        message: `Linkul de autentificare a fost trimis pe adresa ${action.text}.`,
        messageType: "info"
      };

    case "messageReset":
      return {
        ...state,
        messageTitle: "",
        message: "",
        messageType: "info"
      };
  }
}

function init({ callbackUrl, error }: LoginContextInitArgs): LoginContextState {
  let state = {
    ...initialState,
    callbackUrl: callbackUrl ? callbackUrl : "/courses"
  };

  if (error && error != "") {
    state = reducer(state, { type: "messageErrorCode", text: error });
  }

  return state;
}

export const LoginContext = createContext<LoginContextType>({
  state: initialState,
  dispatch: (val: LoginContextAction) => {}
});

export const LoginContextProvider = ({ children, initialState }: { children: React.ReactNode, initialState: LoginContextInitArgs }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {children}
    </LoginContext.Provider>
  )
}
