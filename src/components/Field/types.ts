import { DebouncedFunc } from 'lodash';
import { FunctionComponent, RefObject, ReactNode } from 'react';

// others
import { TAsyncValidator, TSyncValidator } from '../../types';

export type TFieldInputProps = {
  name: string;
  onBlur: (event: Event) => void;
  onChange: (event: Event) => void;
  onFocus: (event: Event) => void;
  value: boolean | number | string;
};

export type TFieldMetaProps = {
  active: boolean;
  data: { [key: string]: any } | undefined;
  dirty: boolean;
  dirtyLastSinceLastSubmit: boolean | undefined;
  errors: Array<string>;
  initialValue: boolean | number | string;
  invalid: boolean;
  modified: boolean | undefined;
  modifiedSinceLastSubmit: boolean | undefined;
  pristine: boolean;
  submitting: boolean;
  touched: boolean;
  valid: boolean;
  validating: boolean;
  visited: boolean;
};

export type TFieldProps = {
  afterSubmit?: () => void;
  allowNull?: boolean;
  asyncValidators?: Array<TAsyncValidator>;
  beforeSubmit?: () => void;
  children?: ReactNode;
  Component?: FunctionComponent<any>;
  data?: { [key: string]: any };
  format?: (
    value: boolean | number | string,
    name: string
  ) => boolean | number | string;
  formatOnBlur?: boolean;
  formName?: string;
  name: string;
  parse?: (
    value: boolean | number | string,
    name: string
  ) => boolean | number | string;
  ref?: RefObject<HTMLInputElement>;
  render?: (
    inputProps: TFieldInputProps,
    metaProps: TFieldMetaProps,
    restProps?: any
  ) => ReactNode;
  subscriptionFields?: Array<string>;
  syncValidators?: Array<TSyncValidator>;
  touched?: boolean;
  value?: boolean | number | string;
  visited?: boolean;
};

export type TValidatorProps = {
  getAsyncErrors: (value: boolean | number | string) => Promise<Array<string>>;
  getSyncErrors: (value: boolean | number | string) => Array<string>;
  updateAsyncValidators: DebouncedFunc<
    (value: boolean | number | string) => Promise<void>
  >;
  updateSyncValidators: (value: boolean | number | string) => void;
};
