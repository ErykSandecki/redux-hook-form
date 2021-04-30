// @ts-nocheck
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import { cloneElement, isValidElement, ReactNode } from 'react';

// components
import { Field } from '../components/Field/Field';

const isField = (child: ReactNode): boolean =>
  isValidElement(child) && child.type === Field;

const getRandomKey = (keys: Array<string>) => {
  const result: Array<string> = [];
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  do {
    result.splice(0, result.length);
    for (let i = 0; i < 9; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * characters.length))
      );
    }
  } while (keys.find((key) => key === result.join('')));

  return result.join('');
};

const getChildren = (
  children: ReactNode,
  formName: string,
  keys: Array<string>
): ReactNode | string => {
  switch (true) {
    case isArray(children):
      return getChildrenByArray(children, formName, keys);
    case isObject(children):
      return getChildrenByObject(children, formName, keys);
    default:
      return children;
  }
};

const getChildrenByObject = (
  children: ReactNode,
  formName: string,
  keys: Array<string>
): {} => {
  if (!isField(children)) {
    const childrenFromProps = get(children, 'props.children');

    if (childrenFromProps) {
      return cloneElement(children, {
        ...children.props,
        children: getChildren(childrenFromProps, formName, keys),
        key: getRandomKey(keys),
      });
    }

    return cloneElement(children, {
      ...children.props,
      key: getRandomKey(keys),
    });
  }

  return cloneElement(children, {
    ...children.props,
    formName,
    key: getRandomKey(keys),
  });
};

const getChildrenByArray = (
  children: ReactNode,
  formName: string,
  keys: Array<string>
): {}[] | null | undefined =>
  children.map((children: ReactNode) => getChildren(children, formName, keys));

const getChildrenWithPassedPropsForField = (
  children: ReactNode,
  formName: string
): {}[] | null | undefined => {
  return getChildren(children, formName, []);
};

export default getChildrenWithPassedPropsForField;
