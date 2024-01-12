export type DialogResultType = string | number | boolean;

export type ActionDialogResult = <T extends Result>(component: React.FC<ActionDialogProps<T>>) => Promise<T | null>;

export type ActionDialogContextType = {
  confirm: ActionDialogResult;
}

export type ActionDialogProps<T> = {
  open: boolean;
  onSubmit: (choice: T) => void;
  onCancel: () => void;
}

