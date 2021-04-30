// others
import { TAsyncValidator, TSyncValidator } from '../types';
import { TField } from '../store/types';

export const getErrorsFromAsyncValidators = async (
  validators: Array<TAsyncValidator>,
  value: boolean | number | string,
  subscribedFields: { [key: string]: TField } | undefined
): Promise<Array<string>> => {
  const errors = [];

  for (const validator of validators) {
    errors.push(await validator(value, subscribedFields));
  }
  return errors.filter((error) => error);
};

export const getErrorsFromSyncValidators = (
  validators: Array<TSyncValidator>,
  value: boolean | number | string,
  subscribedFields: { [key: string]: TField } | undefined
): Array<string> =>
  validators
    ? validators
        .map((validator) => validator(value, subscribedFields))
        .filter((error) => error)
    : [];
