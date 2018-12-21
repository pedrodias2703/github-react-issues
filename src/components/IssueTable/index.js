import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import IssueRow from './Row';

// component that will show the table static content for the requested fiels
const IssueTable = ({ issues = [] }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Issue #</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Created At</Table.HeaderCell>
          <Table.HeaderCell>Updated At</Table.HeaderCell>
          <Table.HeaderCell>Labels</Table.HeaderCell>
          <Table.HeaderCell>State</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.length < 1 && ( // show message if no records were received
          <Table.Row>
            <Table.Cell colSpan="5">No issues found.</Table.Cell>
          </Table.Row>
        )}
        {// if records were received, iterate over them and show the row component
        issues.length > 0 && issues.map((issue) => <IssueRow key={issue.number} issue={issue} />)}
      </Table.Body>
    </Table>
  );
};

// the issues prop should be an array
IssueTable.propTypes = {
  issues: PropTypes.array
};

export default IssueTable;
