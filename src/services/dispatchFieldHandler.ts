// store
import { updateField } from '../store/actions';
import { ReduxHookFormActionsType as ActionTypes } from '../store/actionsType';

const dispatchFieldHandler = (
  dispatch: Function,
  formName: string,
  name: string
) => (objectField: { [key: string]: any }, actionType: ActionTypes) =>
  dispatch(
    updateField(
      {
        field: {
          ...objectField,
        },
        formName,
        name,
      },
      actionType
    )
  );

export default dispatchFieldHandler;
