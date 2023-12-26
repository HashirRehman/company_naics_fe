import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as companyAction from '../../action/CompanyActions';
import CompanyList from './CompanyList';
import 'react-datepicker/dist/react-datepicker.css';
import toastr from 'toastr';
import { renderError } from '../../lib/errorMessageRenderer';
import Loader from 'react-loader-spinner';
import ReactPaginate from "react-paginate";

export class CompanyListContainer extends React.Component {
  componentDidMount() {
    let startPage = 1
    this.props.action.getCompaniesAction(startPage, this.props.currentUser).catch(error => {
      renderError(error.errors.message);
    });
  }

  setPrimaryAddress = companies => {
    let updatedCompanies = companies.data.map(company => {
      let updatedCompany = company;
      if (updatedCompany.primary_address) {
        updatedCompany.complete_address = updatedCompany.primary_address.complete_address;
      }

      return updatedCompany;
    });

    return updatedCompanies;
  };

  companyFilterOnChange = e => {
    let searchTerm = document.getElementById("name").value;
    this.props.action.searchCompaniesByNameAction(searchTerm, this.props.currentUser);
  }

  handlePageClick = (data) => {
    console.log('clicked', data)
    let currentPage = data.selected + 1
    this.props.action.getCompaniesAction(currentPage, this.props.currentUser).catch(error => {
      renderError(error.errors.message);
    });
  }

  render() {
    let {
      filteredCompanies,
      loading,
      error,
      filterErrorMessage,
    } = this.props;

    if (loading) {
      return (
        <div className="loading-spinner">
          <Loader type="Oval" color="#00BFFF" height="50" width="50" />
        </div>
      );
    }

    if (error) {
      return <div>Failed to Load Companies, Please Try Again</div>;
    }

    if (filteredCompanies && filteredCompanies.data) {
      filteredCompanies = this.setPrimaryAddress(filteredCompanies);
    }

    if (filterErrorMessage) {
      toastr.warning(filterErrorMessage);
    }

    const pageCount = this.props.filteredCompanies.pagy.pages;
    const totalCount = this.props.filteredCompanies.pagy.count;

    return (
      <div className="company-container">
        <input type="text" id="name" className="search-box-width mt-4 mb-4" placeholder={"Search by Id, Name, Naics Code, City or Business Structure"} aria-label="Search Input" onChange={this.companyFilterOnChange} />
        <div className="row">
          <div className="col">
            <div className="mt-4 mb-4">
              <h1>Companies</h1>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h4><b>Total Companies: </b>
            {totalCount}</h4>
          </div>
        </div>


        <div className="row">
          <div className="col">
            <CompanyList
              companies={filteredCompanies}
            />
          </div>
        </div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pageCount}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companie: state.companyReducer.companies,
  loading: state.companyReducer.loading,
  error: state.companyReducer.error,
  selectedCompanyId: state.companyReducer.selectedCompanyId,
  currentUser: state.userReducer.currentUser,
  filteredCompanies: state.companyReducer.filteredCompanies,
  filterErrorMessage: state.companyReducer.filterErrorMessage,
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(companyAction, dispatch)
});

CompanyListContainer.propTypes = {
  companies: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyListContainer);
