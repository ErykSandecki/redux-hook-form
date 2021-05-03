# <img  alt="large-logo" src="src/assets/images/redux-hook-form-logo.png" width="418">

Redux Hook Form is a form state management library dedicated to the React library using Redux.

It can be helpful for managing form state in components that don't have direct data about the state of a form.

The library was created with hooks in mind.

## Table of Contents

- [Installation](#Installation)
- [Configuration](#Configuration)
- [Documentation](#Documentation)

## Installation

<b>Redux Hook Form</b> is an unofficial library mainly customized for React using hooks and Redux. Please note that the library does not exist on any server, which requires local installation in the project.

You must install the package from the local repository:
```
npm install ./redux-hook-form // relative path on disk
```

Optional package.json configuration when installing packages:

```json
{
  "scripts": {
    "install": "npm install & npm link ./redux-hook-form" 
  }
}
```

## Configuration

You need provide reducer to `reducers.ts`:

```typescript
import { combineReducers } from 'redux';
import { reduxHookForm } from 'redux-hook-form';

const createRootReducer = combineReducers({ reduxHookForm });

export default createRootReducer;
```

Optional you can add to types:

```typescript
import { 
  REDUCER_KEY as REDUX_HOOK_FORM_REDUCER_KEY, 
  TReduxHookFormState 
} from './redux-hook-form';

export type TMainState = {
  [REDUX_HOOK_FORM_REDUCER_KEY]: TReduxHookFormState;
};
```

## Documentation

- [Overview](#Overview)
- [Form](#Form)
- [Field](#Field)
- [useForm](#UseForm)
- [useField](#UseField)
### Overview

To start using the library, you must have a version of React 16.8 or higher due to the hooks used. React Redux is also required to manage the state of a given form.

### Form

It is the main component that manages the entire form state. The component already provides the HTML `form` tag. Additionally, all `Field` components inside the hierarchy of this component get the `formName` props.

When changing the page dynamically, the component removes its instance from redux.

```typescript
import { Form } from './redux-hook-form'

const SomeForm = () => ({
  <Form formName="someForm">
    // you can pass Fields as children which will get props formName
  </Form>
})
``` 

##### FormProps

```typescript
export type TFormProps = {
  asyncTimeDelay: number;
  children: ReactNode;
  formName: string;
  isValid?: boolean;
  onSubmit: (formData: { [key: string]: boolean | number | string }) => void;
  validate?: (fields: { [key: string]: TField }) => boolean;
};
```

<b>asyncTimeDelay:</b> [optional]

```typescript
asyncTimeDelay: number;
```

The time that defines when an asynchronous validation should be called, if any exists. The default delay time is: 0.

<b>children:</b>

```typescript
children: ReactNode;
```

Renderings of given children. It is not allowed to nest another `Field` component for a `Field` component. No `formName` props will be added for this nested `Field` component.

<b>formName:</b>

```typescript
formName: string;
```

The form name that will be added in redux as an object with this key name.

<b>isValid:</b> [optional]

```typescript
isValid: boolean;
```

A variable that determines if the form has passed validation. The default value is: `false`.

<b>onSubmit:</b>

```typescript
onSubmit: (formData: { [key: string]: boolean | number | string }) => void;
```

The function that is called when the form is submitted. `formData` Returns all values from the fields.

<b>validate:</b> [optional]

```typescript
validate: (fields: { [key: string]: TField }) => boolean;
```

A function that returns true or false depending on the content of the condition. If the function is not passed as props, it returns true by default.

### Field 

A component that manages the state of a given field. The component initializes its object in redux based on the passed props `formName` via the `Form` component. 

If props `formName` is passed, it will be overwritten via the `Form` component. 

##### FieldProps

```typescript
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
```

<b>afterSubmit:</b> [optional]

```typescript
afterSubmit?: () => void;
```
Function is call during the actions: `SUBMIT_SUCCESS` & `SUBMIT_ERROR`.

<b>allowNull:</b> [optional]

```typescript
allowNull?: () => void;
```

If props is true then value like null property will be pass in props `value`.

<b>asyncValidators:</b> [optional]

```typescript
asyncValidators?: Array<TAsyncValidator>;
```

Asynchronous validators that will be called when the state of a given field changes. The call time after a given action is defined by props `asyncTimeDelay` by `Form`.

<b>beforeSubmit:</b> [optional]

```typescript
beforeSubmit?: () => void;
```

Function is call during the action `SUBMIT`.

<b>children:</b> [optional]

```typescript
children: ReactNode;
```

Renderings of given children. As props is called in `Field` first if it exists.

<b>Component:</b> [optional]

```typescript
Component?: FunctionComponent<any>;
```

Renderings of given Component. As props is called in `Field` second if it exists.

<b>data:</b> [optional]

```typescript
data?: { [key: string]: any };
```

Additional object which can be pass and it will be available in redux.

<b>format:</b> [optional]

```typescript
format?: (
    value: boolean | number | string,
    name: string
  ) => boolean | number | string;
```

A function that takes the value from the form values and the name of the field and formats the value to give to the input. Common use cases include converting javascript `Date` values into a localized date `string`.

<b>formatOnBlur:</b> [optional]

```typescript
formatOnBlur?: boolean;
```

If true, the format function will only be called when the field is blurred. If `false`, format will be called on every render.

<b>formName:</b> [optional]

```typescript
formName?: string;
```

This props is pass automatically by `Form`. It is identifier of Form.

<b>name:</b>

```typescript
name: string;
```

The name of the field that will be the key of the object containing data about the current state.

<b>parse:</b> [optional]

```typescript
parse?: (
    value: boolean | number | string,
    name: string
  ) => boolean | number | string;
```

Function which parse value before submit. Parse value will be available in `formData` in function onSubmit.

<b>ref:</b> [optional]

```typescript
ref?: RefObject<HTMLInputElement>;
```

Support passing props `ref`. Ref from React.

<b>render:</b> [optional]

```typescript
render?: (
    inputProps: TFieldInputProps,
    metaProps: TFieldMetaProps,
    restProps?: any
  ) => ReactNode;
```

Render Function. As props is called in `Field` thirty if it exists.

<b>subscriptionFields:</b> [optional]

```typescript
subscriptionFields?: Array<string>;
```

List of subscribed fields. When changes are made to a field, the component will be re-rendered. The current state of the subscribed fields will be available as the last argument when validating the field asynchronously and synchronously.

By default, the list is empty, which means that the field will not listen for state changes in other fields.

<b>syncValidators:</b> [optional]

```typescript
syncValidators?: Array<TSyncValidator>;
```

Synchronous validators that will be called when the state of a given field changes.

<b>touched:</b> [optional]

```typescript
touched?: boolean;
```

A value that will only be set after initialization. The value will be set to true after event `onBlur`.

<b>value:</b> [optional]

```typescript
value?: boolean | number | string;
```

A value that will only be set after initialization.

<b>visited:</b> [optional]

```typescript
visited?: boolean;
```

A value that will only be set after initialization. The value will be set to true after event `onFocus`.

##### FieldInputProps [render]

```typescript
export type TFieldInputProps = {
  name: string;
  onBlur: (event: Event) => void;
  onChange: (event: Event) => void;
  onFocus: (event: Event) => void;
  value: boolean | number | string;
};
```

<b>name:</b>

```typescript
name: string;
```

The name of the field that will be the key of the object containing data about the current state.

<b>onBlur:</b>

```typescript
onBlur: (event: Event) => void;
```

Standard HTML event, when user click outside element.

<b>onChange:</b>

```typescript
onChange: (event: Event) => void;
```

Standard HTML event, when user change value.

<b>onFocus:</b>

```typescript
onFocus: (event: Event) => void;
```

Standard HTML event, when user click on element.

<b>value:</b>

```typescript
value: boolean | number | string;
```

The current value of the `Field`.

##### FieldMetaProps [optional]

```typescript
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
```

<b>active:</b>

```typescript
active: boolean;
```

When field is focused the value is true.

<b>data:</b>

```typescript
data?: { [key: string]: any };
```

Additional object which can be pass and it will be available in redux.

<b>dirty:</b>

```typescript
dirty: boolean;
```

When the current value is different than current.

<b>dirtyLastSinceLastSubmit:</b>

```typescript
dirtyLastSinceLastSubmit: boolean | undefined;
```

When the current value is different than value after submit.

<b>errors:</b>

```typescript
errors: Array<string>;
```

List of errors from async & sync validators.

<b>initialValue:</b>

```typescript
initialValue: boolean | number | string;
```

Value, which was as started.

<b>invalid:</b>

```typescript
invalid: boolean;
```

True If `field` contains errors.

<b>modified:</b>

```typescript
modified: boolean | undefined;
```

If `field` was ever changed.

<b>modifiedSinceLastSubmit:</b>

```typescript
modifiedSinceLastSubmit: boolean | undefined;
```

If `field` was changed after last submit.

<b>pristine:</b>

```typescript
pristine: boolean;
```

If field value is different than initial.

<b>submitting:</b>

```typescript
submitting: boolean;
```

When the form is pending.

<b>touched:</b>

```typescript
touched: boolean;
```

A value that will only be set after initialization. The value will be set to true after event `onBlur`.

<b>valid:</b>

```typescript
valid: boolean;
```

True if field doesn't contain errors.

<b>validating:</b>

```typescript
validating: boolean;
```

True if field is pending.

<b>visited:</b> [optional]

```typescript
visited?: boolean;
```

A value that will only be set after initialization. The value will be set to true after event `onFocus`.

### UseForm

```typescript
useForm = (formName: string): Partial<TForm>;

export type TForm = {
  asyncTimeDelay: number;
  error: string;
  isPending: boolean;
  isValid: boolean;
};
```

Hook which allows access to the data of a given `form` any place in the component.

<b>asyncTimeDelay:</b> [optional]

```typescript
asyncTimeDelay: number;
```

The time that defines when an asynchronous validation should be called, if any exists. The default delay time is: 0.

<b>error:</b>

```typescript
error: string;
```

If form contains error after submit.

<b>isPending:</b>

```typescript
isPending: boolean;
```

If the form is in the process of submitting data.

<b>isValid:</b>

```typescript
isValid: boolean;
```

If the form is valid correctly.

### UseField

```typescript
useField = (formName: string, name: string): TFieldRenderProps;

type TFieldRenderProps = TFieldInputProps & TFieldMetaProps;
```

Hook which allows access to the data of a given `field` from any place in the component.