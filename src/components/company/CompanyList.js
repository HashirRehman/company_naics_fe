import React from "react";
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ReactTooltip from 'react-tooltip';

const DEFAULT_ROW_STYLE = {
  backgroundColor: ""
};

const getCaret = direction => {
  if (direction === "asc") {
    return (
      <span>
        {" "}
        <i className="fa fa-sort-asc" aria-hidden="true" />
      </span>
    );
  }

  if (direction === "desc") {
    return (
      <span>
        {" "}
        <i className="fa fa-sort-desc" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span>
      {" "}
      <i className="fa fa-sort" aria-hidden="true" />
    </span>
  );
};

const buttonFormatter = (cell, row, props) => {
  return (
    <div>
      <button
        className="btn btn-warning mr-2"
        onClick={() => props.handleEditButton(row.id)}
      >
        <i className="fa fa-pencil" aria-hidden="true" />
      </button>

      <button
        className="btn btn-danger"
        onClick={() => props.handleDeleteButton(row.id)}
      >
        <i className="fa fa-trash" aria-hidden="true" />
      </button>
    </div>
  );
};

const fetchNaicsDescription = (cell, row, props) => {
  if (cell && cell.title)
   return <span data-tip={'Title: ' + cell.title + '\n'}>{cell.code}</span>
  else if (cell && cell.code)
    return <span>{cell.code}</span>
  else
    return '-'
}

class CompanyList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      noDataText: "No data"
    };

    this.selectRowProp = {
      mode: "radio",
      onSelect: props.handleRowSelect,
      clickToSelect: true,
      hideSelectColumn: true
    };
  }

  rowStyleFormat = (row, rowIdx) => {
      return DEFAULT_ROW_STYLE;
  };

  render() {
    return (
      <BootstrapTable
        data={this.props.companies}
        selectRow={this.selectRowProp}
        options={this.options}
        bordered={false}
        trStyle={DEFAULT_ROW_STYLE}
        className="custom-table"
        striped
        hover
        condensed
      >
        <TableHeaderColumn
          dataField="id"
          dataSort={true}
          caretRender={getCaret}
          isKey>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="name"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Company Name
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="complete_address"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Primary Address
        </TableHeaderColumn>

        <ReactTooltip effect="solid" place='right'>
        </ReactTooltip>

        <TableHeaderColumn
          dataField="avatar_url"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Avatar Url
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="naics_code"
          dataSort={true}
          caretRender={getCaret}
          dataFormat={fetchNaicsDescription}
          columnTitle
        >
          Naics Code
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="business_structure"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Business Structure
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="created_at"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Created At
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

CompanyList.propTypes = {
  companies: PropTypes.array.isRequired,
};

export default CompanyList;
