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

#### FormProps

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

<b>asyncTimeDelay</b> [optional]

```typescript
const asyncTimeDelay: number;
```

The time that defines when an asynchronous validation should be called, if any exists. The default delay time is: 0.

<b>children</b>

```typescript
const children: ReactNode;
```

Renderings of given children. It is not allowed to nest another `Field` component for a `Field` component. No `formName` props will be added for this nested `Field` component.

<b>formName</b>

```typescript
const formName: string;
```

The form name that will be added in redux as an object with this key name.

<b>isValid</b> [optional]

```typescript
const isValid: boolean;
```

A variable that determines if the form has passed validation. The default value is: `false`.

<b>onSubmit</b>

```typescript
const onSubmit: (formData: { [key: string]: boolean | number | string }) => void;
```

The function that is called when the form is submitted. `formData` Returns all values from the fields.

<b>validate</b> [optional]

```typescript
const validate: (fields: { [key: string]: TField }) => boolean;
```

A function that returns true or false depending on the content of the condition. If the function is not passed as props, it returns true by default.