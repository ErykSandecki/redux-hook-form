import forOwn from 'lodash/forOwn';

// store
import { TField, TReduxHookFormState } from './types';

export const getUpdatedFieldsState = (
  field: Partial<TField>,
  formName: string,
  name: string,
  state: TReduxHookFormState
) => ({
  ...state[formName].fields,
  [name]: { ...state[formName].fields[name], ...field },
});

export const getFieldsWithModifiedAttributes = (
  formName: string,
  state: TReduxHookFormState
) => {
  const fields: { [key: string]: TField } = {};

  forOwn(state[formName].fields, (field: TField, name) => {
    const { value } = field;
    fields[name] = {
      ...field,
      modifiedSinceLastSubmit: false,
      valueSinceLastSubmit: value,
    };
  });

  return {
    ...state[formName].fields,
    ...fields,
  };
};

export const notifyFields = (
  formName: string,
  state: TReduxHookFormState,
  when: 'before' | 'after'
) => {
  const { fields } = state[formName];

  forOwn(fields, (field: TField) => {
    // @ts-ignore
    const notify = field[`${when}Submit`] as () => void;
    if (notify) {
      notify();
    }
  });
};
