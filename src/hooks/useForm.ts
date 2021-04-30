import { useSelector } from 'react-redux';

// others
import { TForm } from '../store/types';

// store
import { getFormAttributesSelectorCreator } from '../store/selectors';

const attributes = ['asyncTimeDelay', 'error', 'isPending', 'isValid'];

export const useForm = (formName: string): Partial<TForm> =>
  useSelector(getFormAttributesSelectorCreator(attributes, formName));
