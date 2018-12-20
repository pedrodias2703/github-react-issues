import React from 'react';
import { Table } from 'semantic-ui-react';

import { IssueModel } from '../models/index';

const IssueRow = ({ issue = {} }) => {
  const printLabels = (labels) => {
    if (!labels.length) {
      return 'No labels';
    }
    return <li>{labels.map((label) => label.name)}</li>;
  };

  const recordIssue = new IssueModel({ ...issue });
  return (
    <Table.Row key={recordIssue.number}>
      <Table.Cell>
        <a href={recordIssue.html_url} target="_blank" rel="noopener noreferrer">
          {recordIssue.number}
        </a>
      </Table.Cell>
      <Table.Cell>{recordIssue.title}</Table.Cell>
      <Table.Cell>{new Date(recordIssue.created_at).toLocaleString()}</Table.Cell>
      <Table.Cell>{new Date(recordIssue.updated_at).toLocaleString()}</Table.Cell>
      <Table.Cell>{printLabels(recordIssue.labels)}</Table.Cell>
      <Table.Cell>{recordIssue.state.toUpperCase()}</Table.Cell>
    </Table.Row>
  );
};

export default IssueRow;
