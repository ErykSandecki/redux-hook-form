// @ts-nocheck
import omit from 'lodash/omit';

// services
import {
  getUpdatedFieldsState,
  getFieldsWithModifiedAttributes,
  notifyFields,
} from './services';

// store
import { ReduxHookFormActionsType } from './actionsType';
import {
  TDestroyFormAction,
  TFieldAction,
  TFormAction,
  TInitFieldAction,
  TMountFormAction,
  TReduxHookFormState,
  TSubmitAction,
  TSubmitErrorAction,
  TSubmitSuccessAction,
} from './types';

type TAnyAction = {
  type: string;
  payload?: any;
};

const initialState: TReduxHookFormState = {};

const mountForm = (
  state: TReduxHookFormState,
  { payload }: TMountFormAction
): TReduxHookFormState => ({ ...state, ...payload });

const destroyForm = (
  state: TReduxHookFormState,
  { formName }: TDestroyFormAction
): TReduxHookFormState => omit(state, [formName]);

const submit = (
  state: TReduxHookFormState,
  { formName }: TSubmitAction
): TReduxHookFormState => {
  notifyFields(formName, state, 'before');
  return {
    ...state,
    [formName]: {
      ...state[formName],
      error: '',
      fields: getFieldsWithModifiedAttributes(formName, state),
      isPending: true,
    },
  };
};

const submitSuccess = (
  state: TReduxHookFormState,
  { formName }: TSubmitSuccessAction
): TReduxHookFormState => {
  notifyFields(formName, state, 'after');
  return {
    ...state,
    [formName]: {
      ...state[formName],
      isPending: false,
    },
  };
};

const submitError = (
  state: TReduxHookFormState,
  { payload: { error, formName } }: TSubmitErrorAction
): TReduxHookFormState => {
  notifyFields(formName, state, 'after');
  return {
    ...state,
    [formName]: {
      ...state[formName],
      error,
      isPending: false,
    },
  };
};

const updateForm = (
  state: TReduxHookFormState,
  { payload: { form, formName } }: TFormAction
): TReduxHookFormState => ({
  ...state,
  [formName]: {
    ...state[formName],
    ...form,
  },
});

const initField = (
  state: TReduxHookFormState,
  { payload: { formName, field, name } }: TInitFieldAction
): TReduxHookFormState => ({
  ...state,
  [formName]: {
    ...state[formName],
    fields: getUpdatedFieldsState(field, formName, name, state),
  },
});

const updateField = (
  state: TReduxHookFormState,
  { payload: { formName, field, name } }: TFieldAction
): TReduxHookFormState => ({
  ...state,
  [formName]: {
    ...state[formName],
    fields: getUpdatedFieldsState(field, formName, name, state),
  },
});

export const reduxHookForm = (
  state: TReduxHookFormState = initialState,
  action: TAnyAction
): TReduxHookFormState => {
  switch (action.type) {
    case ReduxHookFormActionsType.mountForm:
      return mountForm(state, action);
    case ReduxHookFormActionsType.destroyForm:
      return destroyForm(state, action);
    case ReduxHookFormActionsType.submit:
      return submit(state, action);
    case ReduxHookFormActionsType.submitSuccess:
      return submitSuccess(state, action);
    case ReduxHookFormActionsType.submitError:
      return submitError(state, action);
    case ReduxHookFormActionsType.setPending:
    case ReduxHookFormActionsType.updateFormValidator:
      return updateForm(state, action);
    case ReduxHookFormActionsType.initField:
      return initField(state, action);
    case ReduxHookFormActionsType.blur:
    case ReduxHookFormActionsType.change:
    case ReduxHookFormActionsType.focus:
    case ReduxHookFormActionsType.setPendingField:
    case ReduxHookFormActionsType.updateAsyncErrors:
    case ReduxHookFormActionsType.updateSyncErrors:
      return updateField(state, action);
    default:
      return state;
  }
};
