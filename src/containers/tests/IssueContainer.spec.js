import React from 'react';
import { shallow } from 'enzyme';

import IssueContainer from '../IssueContainer';

const wrapper = shallow(<IssueContainer />);

describe('<IssueContainer />', () => {
  it('should render correctly when there is data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render error message when api call fails', () => {
    wrapper.setState({ loading: false, error: true });
    expect(wrapper.html()).toContain('OOPS! Something went wrong...');
  });

  it('should render loader when api call still loading', () => {
    wrapper.setState({ loading: true });
    expect(wrapper.html()).toContain('Loading');
  });
});
