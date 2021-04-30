import debounce from 'lodash/debounce';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// others
import { TAsyncValidator, TSyncValidator } from '../../../types';
import { TField } from '../../../store/types';
import { TMainState } from '../../../types';
import { TValidatorProps } from '../types';

// services
import dispatchFieldHandler from '../../../services/dispatchFieldHandler';
import {
  getErrorsFromAsyncValidators,
  getErrorsFromSyncValidators,
} from '../../../services/validators';

// store
import {
  getFieldsSelectorCreator,
  getFormAttributesSelectorCreator,
} from '../../../store/selectors';
import { ReduxHookFormActionsType as ActionTypes } from '../../../store/actionsType';

const useValidators = (
  asyncValidators: Array<TAsyncValidator>,
  formName: string,
  name: string,
  subscriptionFields: Array<string>,
  syncValidators: Array<TSyncValidator>
): TValidatorProps => {
  const dispatchField = dispatchFieldHandler(useDispatch(), formName, name);
  const asyncTimeDelay =
    useSelector(getFormAttributesSelectorCreator('asyncTimeDelay', formName)) ||
    0;

  const fields: { [key: string]: TField } | undefined = useSelector(
    (state: TMainState) => {
      if (subscriptionFields) {
        return getFieldsSelectorCreator(formName, subscriptionFields)(state);
      }
      return undefined;
    }
  );

  const getAsyncErrors = async (
    value: boolean | number | string
  ): Promise<Array<string>> => {
    dispatchField({ isPending: true }, ActionTypes.setPendingField);
    return await getErrorsFromAsyncValidators(asyncValidators, value, fields);
  };

  const getSyncErrros = (value: boolean | number | string): Array<string> =>
    getErrorsFromSyncValidators(syncValidators, value, fields);

  // eslint-disable-next-line
  const updateAsyncValidators = useCallback(
    debounce(async (value: boolean | number | string) => {
      if (asyncValidators.length > 0) {
        const asyncErrors = await getAsyncErrors(value);

        dispatchField(
          { asyncErrors, isPending: false },
          ActionTypes.updateAsyncErrors
        );
      }
    }, asyncTimeDelay),
    []
  );

  const updateSyncValidators = (value: boolean | number | string): void => {
    if (syncValidators.length > 0) {
      dispatchField(
        { syncErrors: getSyncErrros(value) },
        ActionTypes.updateSyncErrors
      );
    }
  };

  return {
    getAsyncErrors,
    getSyncErrros,
    updateAsyncValidators,
    updateSyncValidators,
  };
};

export default useValidators;
