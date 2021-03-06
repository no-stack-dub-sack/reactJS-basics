import React from 'react';
import thunk from 'redux-thunk';
import routes from './routes';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import manageTokenStorage from './utils/manageTokenStorage';

const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

manageTokenStorage(store);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));