// hooks
import useInputProps from '../components/Field/hooks/useInputProps';
import useMetaProps from '../components/Field/hooks/useMetaProps';

// others
import { TFieldRenderProps } from '../types';

export const useField = (formName: string, name: string): TFieldRenderProps => {
  const inputProps = useInputProps(formName, name);
  const metaProps = useMetaProps(formName, name);

  return {
    ...inputProps,
    ...metaProps,
  };
};
