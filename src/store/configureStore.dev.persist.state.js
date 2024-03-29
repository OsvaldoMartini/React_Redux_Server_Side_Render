/**
|--------------------------------------------------
| Dev - With Persist State
| Configure Store for Development with "store enhancer"
|--------------------------------------------------
*/
import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';

//Takecare about the Asynchronous call for the action creators
import thunk from 'redux-thunk';

//Reducers Entry Point
import rootReducer from '../client/reducers';

import DevToolsAsDock from '../../DevTools/DevToolsAsDock';

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunk), //(d1, d2, d3)
  // Required! Enable Redux DevTools with the monitors you chose
  DevToolsAsDock.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
);

function getDebugSessionKey() {
  console.log('DevTool Going through Development persist State');

  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return matches && matches.length > 0 ? matches[1] : null;
}

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../client/reducers', () =>
      store.replaceReducer(
        require('../client/reducers') /*.default if you use Babel 6+ */
      )
    );
  }

  return store;
}
