import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';

const userReducer = (state = initialState.userReducer, action) => {
  switch (action.type) {
    case ActionType.POPULATE_USER: {
      if (action.user) {
        localStorage.setItem('user', JSON.stringify(action.user));
      }
      return {
        ...state,
        currentUser: action.user ? _.assign(action.user) : null
      };
    }
    case ActionType.GET_USERS: {
      return {
        ...state,
        users: _.assign([]),
        loading: true,
        error: false
      };
    }
    case ActionType.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: _.assign(action.users),
        loading: false,
        error: false
      };
    }
    case ActionType.GET_USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        users: _.assign([])
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
