import React, { Component } from 'react';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';

import { Issue } from './models/index';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      data: []
    };
  }

  componentDidMount() {
    const URL = 'https://api.github.com/repos/facebook/react/issues';
    axios
      .get(URL)
      .then((response) => {
        this.setState({
          loading: false,
          error: false,
          data: response.data
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
          data: []
        });
      });
  }

  printLabels(labels) {
    if (!labels.length) {
      return 'No labels';
    }

    return <li>{labels.map((label) => label.name)}</li>;
  }

  printIssue(issue) {
    const recordIssue = new Issue({ ...issue });
    return (
      <Table.Row key={recordIssue.number}>
        <Table.Cell>{recordIssue.number}</Table.Cell>
        <Table.Cell>{recordIssue.title}</Table.Cell>
        <Table.Cell>{recordIssue.created_at}</Table.Cell>
        <Table.Cell>{recordIssue.updated_at}</Table.Cell>
        <Table.Cell>{this.printLabels(recordIssue.labels)}</Table.Cell>
        <Table.Cell>{recordIssue.state.toUpperCase()}</Table.Cell>
      </Table.Row>
    );
  }

  render() {
    const { loading, error, data } = this.state;

    if (loading) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    }

    if (error) {
      return <h1>OOPS! Something went wrong...</h1>;
    }

    console.log(data);
    return (
      <div className="App">
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

          <Table.Body>{data.length && data.map((issue) => this.printIssue(issue))}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default App;
