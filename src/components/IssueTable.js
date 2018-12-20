import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import IssueRow from './IssueRow';

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
        {issues.length < 1 && (
          <Table.Row>
            <Table.Cell colSpan="5">No issues found.</Table.Cell>
          </Table.Row>
        )}
        {issues.length > 0 && issues.map((issue) => <IssueRow key={issue.number} issue={issue} />)}
      </Table.Body>
    </Table>
  );
};

IssueTable.propTypes = {
  issues: PropTypes.array
};

export default IssueTable;
