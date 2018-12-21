import React from 'react';
import { Container } from 'semantic-ui-react';

import IssueContainer from './containers/IssueContainer';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
  return (
    <div className="App">
      <Container>
        <IssueContainer />
      </Container>
    </div>
  );
};

export default App;
