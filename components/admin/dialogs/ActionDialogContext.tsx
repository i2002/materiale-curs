"use client";

import { createContext, useState, useCallback, useContext } from "react";
import type { ActionDialogContextType, ActionDialogProps, DialogResultType } from "./action-dialog-context-types";
import { ActionDialogRender, ActionDialogWrapper } from "./ActionDialogRenderer";

const ActionDialogContext = createContext<ActionDialogContextType | null>(null);


export const useActionDialogContext = () => {
  const actionDialogContext = useContext(ActionDialogContext);
  if (!actionDialogContext) {
    throw new Error("No ActionDialogProvider found when calling useActionDialogContext");
  }
  
  return actionDialogContext;
}


export const ActionDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [Component, setComponent] = useState<ActionDialogRender>();

  const confirm = useCallback(<T extends DialogResultType>(component: React.FC<ActionDialogProps<T>>) => {
    let dialogRenderer = new ActionDialogWrapper<T>(component);
    setComponent(() => dialogRenderer.render);

    return dialogRenderer.promise;
  }, [setComponent]);

  return (
    <ActionDialogContext.Provider value={{confirm: confirm}}>
      {children}
      {Component && <Component remove={() => setComponent(undefined)} />}
    </ActionDialogContext.Provider>
  );
}
