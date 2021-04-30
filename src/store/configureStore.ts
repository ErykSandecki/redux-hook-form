// @ts-nocheck
import { Action, CombinedState, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

// store
import reducers from './reducers';

export const history = createBrowserHistory();

const configureStore = (): Store<CombinedState<any>, Action> =>
  createStore(reducers(history), {}, composeWithDevTools());

export default configureStore;
