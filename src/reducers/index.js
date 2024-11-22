import {combineReducers} from 'redux';

import pedidoReducer from './pedido-reducer';
import userReducer from './user-reducer';
import {UserAction} from './../actions';

const appReducer = combineReducers({
  pedido: pedidoReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === UserAction.LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

