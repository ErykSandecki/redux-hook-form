import { ReactNode } from 'react';

// others
import { TField } from '../../store/types';

export type TFormProps = {
  asyncTimeDelay: number;
  children: ReactNode;
  formName: string;
  isValid?: boolean;
  onSubmit: (formData: { [key: string]: boolean | number | string }) => void;
  validate?: (fields: { [key: string]: TField }) => boolean;
};
