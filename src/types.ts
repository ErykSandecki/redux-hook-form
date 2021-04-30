// store
import { REDUCER_KEY as REDUX_HOOK_FORM_REDUCER_KEY } from './store/actionsType';

// others
import { TField } from './store/types';
import { TFieldInputProps, TFieldMetaProps } from './components/Field/types';
import { TReduxHookFormState } from './store/types';

export type TMainState = {
  [REDUX_HOOK_FORM_REDUCER_KEY]: TReduxHookFormState;
};

export type TSyncValidator = (
  value: boolean | number | string,
  subscribedFields: { [key: string]: TField } | undefined
) => string;

export type TAsyncValidator = (
  value: boolean | number | string,
  subscribedFields: { [key: string]: TField } | undefined
) => Promise<string>;

export type TFieldRenderProps = TFieldInputProps & TFieldMetaProps;
