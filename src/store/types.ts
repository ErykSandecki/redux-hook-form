// store
import { ReduxHookFormActionsType } from './actionsType';

export type TField = {
  active: boolean;
  afterSubmit?: () => void;
  asyncErrors: Array<string>;
  beforeSubmit?: () => void;
  data: { [key: string]: any };
  format?: (
    value: boolean | number | string,
    name: string
  ) => boolean | number | string;
  formatOnBlur: boolean;
  initialValue: boolean | number | string;
  isPending: boolean;
  modified?: boolean;
  modifiedSinceLastSubmit?: boolean;
  parse?: (
    value: boolean | number | string,
    name: string
  ) => boolean | number | string;
  syncErrors: Array<string>;
  touched: boolean;
  value: boolean | number | string;
  valueSinceLastSubmit?: boolean | number | string;
  visited: boolean;
};

export type TForm = {
  asyncTimeDelay: number;
  error: string;
  fields: { [key: string]: TField };
  isPending: boolean;
  isValid: boolean;
};

export type TReduxHookFormState = {
  [key: string]: TForm;
};

export type TMountFormAction = {
  payload: { [key: string]: TForm };
  type: typeof ReduxHookFormActionsType.mountForm;
};

export type TDestroyFormAction = {
  formName: string;
  type: typeof ReduxHookFormActionsType.destroyForm;
};

export type TSubmitAction = {
  formName: string;
  type: typeof ReduxHookFormActionsType.submit;
};

export type TSubmitSuccessAction = {
  formName: string;
  type: typeof ReduxHookFormActionsType.submitSuccess;
};

export type TSubmitErrorAction = {
  payload: {
    error: string;
    formName: string;
  };
  type: typeof ReduxHookFormActionsType.submitError;
};

export type TActionsForm =
  | typeof ReduxHookFormActionsType.setPending
  | typeof ReduxHookFormActionsType.updateFormValidator;

export type TFormAction = {
  payload: { form: Partial<TForm>; formName: string };
  type: TActionsForm;
};

export type TActionsField =
  | typeof ReduxHookFormActionsType.blur
  | typeof ReduxHookFormActionsType.change
  | typeof ReduxHookFormActionsType.focus
  | typeof ReduxHookFormActionsType.mountForm
  | typeof ReduxHookFormActionsType.setPendingField
  | typeof ReduxHookFormActionsType.updateAsyncErrors
  | typeof ReduxHookFormActionsType.updateSyncErrors;

export type TFieldAction = {
  payload: {
    field: Partial<TField>;
    name: string;
    formName: string;
  };
  type: TActionsField;
};

export type TInitFieldAction = {
  payload: {
    field: Partial<TField>;
    name: string;
    formName: string;
  };
  type: typeof ReduxHookFormActionsType.initField;
};
