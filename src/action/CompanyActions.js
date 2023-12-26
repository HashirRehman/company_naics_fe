import * as ActionType from './ActionType';
import API from '../lib/api';
import { makeRequest } from '../lib/requestWrapper';

export const getCompanies = {
  type: ActionType.GET_COMPANIES
};

export const getCompaniesSuccess = companies => ({
  type: ActionType.GET_COMPANIES_SUCCESS,
  companies
});


export function searchCompaniesByName(searchTerm) {
  let payload = {
    searchTerm
  }
  return {
     type: ActionType.SEARCH_COMPANIES_BY_SEARCH_TERM,
     payload
  }
}

export const getCompaniesFailure = error => ({
  type: ActionType.GET_COMPANIES_FAILURE,
  error

});
export function searchCompaniesByNameAction(searchTerm, currentUser) {
  return dispatch => {
    dispatch(searchCompaniesByName(searchTerm));
    return makeRequest(API.get(`/api/v1/companies?&search=${searchTerm}`, currentUser.accessToken))
      .then(companies => {
        dispatch(getCompaniesSuccess(companies));
      })
      .catch(error => {
        dispatch(getCompaniesFailure(error));
        throw error;
      });
  };
}

export function getCompaniesAction(page, currentUser) {
  return dispatch => {
    dispatch(getCompanies);
    return makeRequest(API.get(`/api/v1/companies?&page=${page}&limit=10`, currentUser.accessToken))
      .then(companies => {
        dispatch(getCompaniesSuccess(companies));
      })
      .catch(error => {
        dispatch(getCompaniesFailure(error));
        throw error;
      });
  };
}
