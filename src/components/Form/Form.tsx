import forOwn from 'lodash/forOwn';
import React, { FunctionComponent, memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// others
import { TField } from '../../store/types';
import { TFormProps } from './types';

// services
import getChildrenWithPassedPropsForField from '../../services/getChildrenWithPassedPropsForField';

// store
import {
  destroyForm,
  mountForm,
  submit,
  updateForm,
} from '../../store/actions';
import { getFieldsSelectorCreator } from '../../store/selectors';
import { ReduxHookFormActionsType as ActionTypes } from '../../store/actionsType';

const Form: FunctionComponent<TFormProps> = ({
  asyncTimeDelay = 0,
  children,
  formName,
  isValid: isValidInitial = false,
  onSubmit,
  validate = () => true,
}) => {
  const dispatch = useDispatch();
  const content = useMemo(
    () => getChildrenWithPassedPropsForField(children, formName),
    [children, formName]
  );
  const fields = useSelector(getFieldsSelectorCreator(formName));

  const onSubmitHandler = (event: any): void => {
    event.preventDefault();
    dispatch(submit(formName));
    onSubmit(getFieldsValues());
  };

  const getFieldsValues = () => {
    const formData: { [key: string]: boolean | number | string } = {};

    forOwn(fields, (field: TField, name: string) => {
      const { parse, value } = field;
      formData[name] = parse ? parse(value, name) : value;
    });

    return formData;
  };

  useEffect(() => {
    dispatch(
      mountForm({
        [formName]: {
          asyncTimeDelay,
          error: '',
          fields: {},
          isPending: false,
          isValid: isValidInitial,
        },
      })
    );

    return () => {
      dispatch(destroyForm(formName));
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // @ts-ignore
    const isValid = validate(fields);
    dispatch(
      updateForm(
        { form: { isValid }, formName },
        ActionTypes.updateFormValidator
      )
    );
    // eslint-disable-next-line
  }, [fields]);

  return <form onSubmit={onSubmitHandler}>{content}</form>;
};

export const memoizedForm = memo(
  Form,
  (prevProps: TFormProps, props: TFormProps): boolean => {
    if (prevProps !== props) {
      return true;
    }
    return false;
  }
);
