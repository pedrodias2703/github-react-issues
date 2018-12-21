import React, { Component, Fragment } from 'react';
import { Dimmer, Loader, Segment, Header, Message, Pagination } from 'semantic-ui-react';

import { getIssuesService } from '../services/IssueService';
import IssueTable from '../components/IssueTable/';

class IssueContainer extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      loading: false,
      error: false,
      message: '',
      data: [],
      activePage: 1,
      totalPages: 1
    };
  }

  /* Lifecycle */
  // once the component is mounted, set loading state and after that call the api service to set total pages and process results
  componentDidMount() {
    this.setState(
      {
        loading: true
      },
      () => {
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
    );
  }

  // the component should update only when page chages. then, we will call the api with the new page information
  componentDidUpdate(prevProps, prevState) {
    const { activePage } = this.state;
    if (activePage !== prevState.activePage) {
      const options = {
        params: { page: activePage }
      };
      getIssuesService({ options })
        .then(this.handleResposeSuccess)
        .catch(this.handleResponseError);
    }
  }

  /* Helpers */
  // promise resolve
  handleResposeSuccess = (response) => {
    this.setState({
      loading: false,
      error: false,
      message: '',
      data: response.data
    });
  };

  // promise catch
  handleResponseError = (error) => {
    this.setState({
      loading: false,
      error: true,
      message: error.response.data.message,
      data: []
    });
  };

  // get the total pages based on api response
  extractPaginationInfo = (link) => {
    const totalPages = link
      .split(',')
      .reverse()[0]
      .split(';')[0]
      .match(/page=(?<page>\d+)/).groups.page;
    return totalPages;
  };

  // fired by pagination component when page changes
  handlePageChange = (e, p) => {
    const { activePage } = p;
    this.setState({
      activePage,
      loading: true
    });
  };

  render() {
    const { loading, error, message, data, totalPages, activePage } = this.state;

    // If api call still in progress, render the spinner
    if (loading) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    }

    // Show an error message if something went wrong
    if (error) {
      return (
        <Segment>
          <Message>
            <Message.Header>OOPS! Something went wrong...</Message.Header>
            <p>{message}</p>
          </Message>
        </Segment>
      );
    }

    return (
      <Fragment>
        <Header>Github React Issues</Header>
        <Pagination
          totalPages={totalPages}
          activePage={activePage}
          onPageChange={this.handlePageChange}
        />
        <IssueTable issues={data} />
        <Pagination
          totalPages={totalPages}
          activePage={activePage}
          onPageChange={this.handlePageChange}
        />
      </Fragment>
    );
  }
}

export default IssueContainer;
