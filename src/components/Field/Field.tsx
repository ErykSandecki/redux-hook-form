// @ts-nocheck
import defer from 'lodash/defer';
import React, { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// hooks
import useInputProps from './hooks/useInputProps';
import useMetaProps from './hooks/useMetaProps';
import useValidators from './hooks/useValidators';

// others
import { TFieldProps } from './types';

// store
import { getFieldSelectorCreator } from '../../store/selectors';
import { initField } from '../../store/actions';

export const Field = forwardRef<HTMLInputElement, TFieldProps>(
  (
    {
      afterSubmit,
      allowNull = false,
      asyncValidators = [],
      beforeSubmit,
      children,
      Component,
      data,
      format,
      formatOnBlur = false,
      formName,
      name,
      parse,
      render,
      subscriptionFields,
      syncValidators = [],
      touched: initialTouched = false,
      value: initialValue = undefined,
      visited: initialVisited = false,
      ...restProps
    },
    ref
  ) => {
    const field = useSelector(getFieldSelectorCreator(formName, name));
    const { touched, value, visited } = field || {};
    const dispatch = useDispatch();
    const inputProps = useInputProps(formName, name);
    const metaProps = useMetaProps(formName, name);
    const wrapperRestProps = {
      ...restProps,
      ...(ref ? { ref: ref } : {}),
    };
    const {
      getSyncErrors,
      updateAsyncValidators,
      updateSyncValidators,
    } = useValidators(
      asyncValidators,
      formName,
      name,
      subscriptionFields,
      syncValidators
    );

    useEffect(() => {
      const value = initialValue !== undefined || allowNull ? initialValue : '';

      defer(() => {
        dispatch(
          initField({
            field: {
              afterSubmit,
              active: false,
              asyncErrors: [],
              beforeSubmit,
              data,
              format,
              formatOnBlur,
              initialValue: value,
              isPending: false,
              parse,
              syncErrors: getSyncErrors(value),
              touched: initialTouched,
              value,
              visited: initialVisited,
            },
            formName,
            name,
          })
        );
      });
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      if (field) {
        updateAsyncValidators(value);
        updateSyncValidators(value);
      }
      // eslint-disable-next-line
    }, [touched, value, visited]);

    if (!field) {
      return null;
    }

    if (children) {
      return <>{children(inputProps, metaProps, wrapperRestProps)}</>;
    }

    if (render) {
      return render(inputProps, metaProps, wrapperRestProps);
    }

    if (Component) {
      return (
        <Component input={inputProps} meta={metaProps} {...wrapperRestProps} />
      );
    }

    return null;
  }
);
