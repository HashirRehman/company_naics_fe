import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';

const companyReducer = (state = initialState.companyReducer, action) => {
  switch (action.type) {
    case ActionType.GET_COMPANIES: {
      return {
        ...state,
        companies: _.assign([]),
        loading: true,
        error: false,
      };
    }

    case ActionType.GET_COMPANIES_SUCCESS: {
      return {
        ...state,
        companies: _.assign(action.companies),
        filteredCompanies: _.assign(action.companies),
        loading: false,
        error: false
      };
    }
    case ActionType.GET_COMPANIES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        companies: _.assign([])
      };
    }
    case ActionType.SEARCH_COMPANIES_BY_SEARCH_TERM: {
      return {
        ...state,
        companies: _.assign(action.companies),
        loading: false,
        error: false
      };
    }

    default: {
      return state;
    }
  }
};

export default companyReducer;
