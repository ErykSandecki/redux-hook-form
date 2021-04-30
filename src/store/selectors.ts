import composeFp from 'lodash/fp/compose';
import isArrayFp from 'lodash/fp/isArray';
import getFp from 'lodash/fp/get';
import pickFp from 'lodash/fp/pick';
import { createSelector, Selector } from 'reselect';

// others
import { TMainState } from '../types';
import { TField, TForm, TReduxHookFormState } from './types';

// store
import { REDUCER_KEY } from './actionsType';

export const reduxHookFormSelector: Selector<
  TMainState,
  TReduxHookFormState
> = getFp(REDUCER_KEY);

export const getFormSelectorCreator = (
  formName: string
): Selector<TMainState, TForm | undefined> =>
  createSelector(reduxHookFormSelector, getFp(`${formName}`));

export const getFormAttributesSelectorCreator = (
  attributes: string | Array<string>,
  formName: string
): Selector<TMainState, any> =>
  createSelector(
    getFormSelectorCreator(formName),
    isArrayFp(attributes) ? pickFp(attributes) : getFp(attributes)
  );

export const getFieldsSelectorCreator = (
  formName: string,
  fieldsNames?: Array<string>
): Selector<TMainState, { [key: string]: TField } | undefined> =>
  createSelector(
    getFormSelectorCreator(formName),
    fieldsNames
      ? composeFp(pickFp(fieldsNames), getFp('fields'))
      : getFp(`fields`)
  );

export const getFieldSelectorCreator = (
  formName: string,
  name: string
): Selector<TMainState, TField | undefined> =>
  createSelector(getFieldsSelectorCreator(formName), getFp(name));

export const getFieldAttributesSelectorCreator = (
  attributes: string | Array<string>,
  formName: string,
  name: string
): Selector<TMainState, any> =>
  createSelector(
    getFieldSelectorCreator(formName, name),
    isArrayFp(attributes) ? pickFp(attributes) : getFp(attributes)
  );
