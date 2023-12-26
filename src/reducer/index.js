import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import apiReducer from './apiReducer';
import companyReducer from './companyReducer';
import userReducer from './userReducer';

export default combineReducers({
  apiReducer,
  companyReducer,
  userReducer,
  form: formReducer
});
