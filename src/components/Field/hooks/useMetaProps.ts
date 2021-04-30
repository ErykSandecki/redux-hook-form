// @ts-nocheck
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';

// others
import { TFieldMetaProps } from '../types';

// store
import { TField } from './../../store/types';
import {
  getFieldSelectorCreator,
  getFormAttributesSelectorCreator,
} from '../../../store/selectors';

const useMetaProps = (formName: string, name: string): TFieldMetaProps => {
  const field: TField = useSelector(getFieldSelectorCreator(formName, name));
  const {
    active,
    asyncErrors,
    data,
    initialValue,
    isPending,
    modified,
    modifiedSinceLastSubmit,
    syncErrors,
    touched,
    value,
    valueSinceLastSubmit,
    visited,
  } = field || {};
  const isDirtyLastSinceLastSubmit =
    valueSinceLastSubmit !== undefined
      ? { dirtyLastSinceLastSubmit: value !== valueSinceLastSubmit }
      : {};
  const isPendingForm = useSelector(
    getFormAttributesSelectorCreator('isPending', formName)
  );

  if (isEmpty(field)) {
    return {};
  }

  return {
    active,
    ...(data ? { data: data } : {}),
    dirty: initialValue !== value,
    ...isDirtyLastSinceLastSubmit,
    errors: [...asyncErrors, ...syncErrors],
    initialValue,
    invalid: !isEmpty([...asyncErrors, ...syncErrors]),
    modified,
    ...(modifiedSinceLastSubmit !== undefined
      ? { modifiedSinceLastSubmit: modifiedSinceLastSubmit }
      : {}),
    pristine: value === initialValue,
    submitting: isPendingForm,
    touched,
    valid: isEmpty([...asyncErrors, ...syncErrors]),
    validating: isPending,
    visited,
  };
};

export default useMetaProps;
