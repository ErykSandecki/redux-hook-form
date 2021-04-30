// @ts-nocheck
export const REDUCER_KEY = 'reduxHookForm';

export enum ReduxHookFormActionsType {
  blur = `${REDUCER_KEY}/BLUR`,
  change = `${REDUCER_KEY}/CHANGE`,
  destroyForm = `${REDUCER_KEY}/DESTROY_FORM`,
  focus = `${REDUCER_KEY}/FOCUS`,
  initField = `${REDUCER_KEY}/INIT_FIELD`,
  mountForm = `${REDUCER_KEY}/MOUNT_FORM`,
  setPending = `${REDUCER_KEY}/SET_PENDING`,
  setPendingField = `${REDUCER_KEY}/SET_PENDING_FIELD`,
  submit = `${REDUCER_KEY}/SUBMIT`,
  submitSuccess = `${REDUCER_KEY}/SUBMIT_SUCCESS`,
  submitError = `${REDUCER_KEY}/SUBMIT_ERROR`,
  updateAsyncErrors = `${REDUCER_KEY}/UPDATE_ASYNC_ERRORS`,
  updateFormValidator = `${REDUCER_KEY}/UPDATE_FORM_VALIDATOR`,
  updateSyncErrors = `${REDUCER_KEY}/UPDATE_SYNC_ERRORS`,
}
