// store
import { ReduxHookFormActionsType } from './actionsType';
import {
  TActionsField,
  TDestroyFormAction,
  TField,
  TForm,
  TMountFormAction,
  TFieldAction,
  TFormAction,
  TInitFieldAction,
  TSubmitAction,
  TSubmitSuccessAction,
  TSubmitErrorAction,
  TActionsForm,
} from './types';

export const mountForm = (payload: {
  [key: string]: TForm;
}): TMountFormAction => ({
  payload,
  type: ReduxHookFormActionsType.mountForm,
});

export const destroyForm = (formName: string): TDestroyFormAction => ({
  formName,
  type: ReduxHookFormActionsType.destroyForm,
});

export const submit = (formName: string): TSubmitAction => ({
  formName,
  type: ReduxHookFormActionsType.submit,
});

export const submitSuccess = (formName: string): TSubmitSuccessAction => ({
  formName,
  type: ReduxHookFormActionsType.submitSuccess,
});

export const submitError = (payload: {
  error: string;
  formName: string;
}): TSubmitErrorAction => ({
  payload,
  type: ReduxHookFormActionsType.submitError,
});

export const updateForm = (
  payload: {
    form: Partial<TForm>;
    formName: string;
  },
  type: TActionsForm
): TFormAction => ({
  payload,
  type,
});

export const initField = (payload: {
  field: Partial<TField>;
  formName: string;
  name: string;
}): TInitFieldAction => ({
  payload,
  type: ReduxHookFormActionsType.initField,
});

export const updateField = (
  payload: {
    field: Partial<TField>;
    formName: string;
    name: string;
  },
  type: TActionsField
): TFieldAction => ({
  payload,
  type,
});
