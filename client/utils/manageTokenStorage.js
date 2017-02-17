import jwt from 'jsonwebtoken';
import setAuthorizationToken from './setAuthorizationToken';
import { setCurrentUser } from '../actions/authActions';

export default function manageTokenStorage(store) {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  }
}
