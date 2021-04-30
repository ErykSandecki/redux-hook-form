import omit from 'lodash/omit';

// others
import { TField } from '../store/types';

const getRestFields = (
  excluded: string,
  fields: { [key: string]: TField } = {}
): { [key: string]: TField } => omit(fields, excluded);

export default getRestFields;
