import { ActionDialogProps, DialogResultType } from "./action-dialog-context-types";

export type ActionDialogRender = React.FC<{
  remove: () => void;
}>;

type ActionDialogResolver<T extends DialogResultType> = (choice: T | null) => void;

export class ActionDialogWrapper<T extends DialogResultType> {
  renderFunc: React.FC<ActionDialogProps<T>>;
  promise: Promise<T | null>;
  resolver: ActionDialogResolver<T> | undefined;
  
  constructor(component: (props: ActionDialogProps<T>) => React.ReactNode) {
    this.renderFunc = component;
    this.promise = new Promise(resolve => {
      this.resolver = resolve;
    });
  }

  render: ActionDialogRender = ({ remove }) => {
    const onCancel = () => {
      if (this.resolver) {
        this.resolver(null);
        remove();
      }
    };

    const onSubmit = (choice: T) => {
      if (this.resolver) {
        this.resolver(choice);
        remove();
      }
    }

    return this.renderFunc({ open: true, onCancel, onSubmit });
  }
}
