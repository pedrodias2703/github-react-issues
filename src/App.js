import React, { Component } from 'react';
import { Dimmer, Loader, Container, Header, Message, Pagination } from 'semantic-ui-react';

import { getIssuesService } from './services/IssueService';
import IssueTable from './components/IssueTable';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      message: '',
      data: [],
      activePage: 1,
      totalPages: 1
    };
  }

  /* Lifecycle */
  componentDidMount() {
    getIssuesService()
      .then((response) => {
        this.setState({
          totalPages: this.extractPaginationInfo(response.headers.link) || 1
        });
        return response;
      })
      .then(this.handleResposeSuccess)
      .catch(this.handleResponseError);
  }

  componentDidUpdate(prevProps, prevState) {
    const { activePage } = this.state;
    if (activePage !== prevState.activePage) {
      getIssuesService({ page: activePage })
        .then(this.handleResposeSuccess)
        .catch(this.handleResponseError);
    }
  }

  /* Helpers */
  handleResposeSuccess = (response) => {
    this.setState({
      loading: false,
      error: false,
      message: '',
      data: response.data
    });
  };

  handleResponseError = (error) => {
    this.setState({
      loading: false,
      error: true,
      message: error.response.data.message,
      data: []
    });
  };

  extractPaginationInfo = (link) => {
    const totalPages = link
      .split(',')
      .reverse()[0]
      .split(';')[0]
      .match(/page=(?<page>\d+)/).groups.page;
    return totalPages;
  };

  handlePageChange = (e, p) => {
    const { activePage } = p;
    this.setState({
      activePage,
      loading: true
    });
  };

  render() {
    const { loading, error, message, data, totalPages, activePage } = this.state;

    if (loading) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    }

    if (error) {
      return (
        <Container>
          <Message>
            <Message.Header>OOPS! Something went wrong...</Message.Header>
            <p>{message}</p>
          </Message>
        </Container>
      );
    }

    return (
      <div className="App">
        <Container>
          <Header>Github React Issues</Header>
          <IssueTable issues={[]} />
          <Pagination
            totalPages={totalPages}
            activePage={activePage}
            onPageChange={this.handlePageChange}
          />
        </Container>
      </div>
    );
  }
}

export default App;
