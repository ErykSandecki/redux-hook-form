import { useDispatch, useSelector } from 'react-redux';

// others
import { TFieldInputProps } from '../types';

// services
import dispatchFieldHandler from '../../../services/dispatchFieldHandler';

// store
import { ReduxHookFormActionsType as ActionTypes } from '../../../store/actionsType';
import {
  getFieldAttributesSelectorCreator,
  getFieldSelectorCreator,
} from '../../../store/selectors';

const useInputProps = (formName: string, name: string): TFieldInputProps => {
  const dispatchField = dispatchFieldHandler(useDispatch(), formName, name);
  const value = useSelector(
    getFieldAttributesSelectorCreator('value', formName, name)
  );
  const isValueSinceLastSubmit =
    useSelector(
      getFieldAttributesSelectorCreator('valueSinceLastSubmit', formName, name)
    ) !== undefined;

  const { format, formatOnBlur } =
    useSelector(getFieldSelectorCreator(formName, name)) || {};

  const onBlurHandler = (event: Event): void => {
    const { value } = event.target as HTMLInputElement;
    dispatchField(
      {
        active: false,
        touched: true,
        ...(formatOnBlur && format ? { value: format(value, name) } : {}),
      },
      ActionTypes.blur
    );
  };

  const onChangeHandler = (event: Event): void => {
    const { value } = event.target as HTMLInputElement;
    dispatchField(
      {
        ...(isValueSinceLastSubmit ? { modifiedSinceLastSubmit: true } : {}),
        modified: true,
        value,
      },
      ActionTypes.change
    );
  };

  const onFocusHandler = (): void =>
    dispatchField({ active: true, visited: true }, ActionTypes.focus);

  return {
    name,
    onBlur: onBlurHandler,
    onChange: onChangeHandler,
    onFocus: onFocusHandler,
    value: !formatOnBlur && format ? format(value, name) : value,
  };
};

export default useInputProps;
