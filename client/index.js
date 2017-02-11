import React from 'react';
import thunk from 'redux-thunk';
import routes from './routes';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
)

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));