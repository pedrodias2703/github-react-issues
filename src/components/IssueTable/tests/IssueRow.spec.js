import React from 'react';
import { shallow } from 'enzyme';

import IssueRow from '../Row';

const data = {
  url: 'https://api.github.com/repos/facebook/react/issues/14476',
  repository_url: 'https://api.github.com/repos/facebook/react',
  labels_url: 'https://api.github.com/repos/facebook/react/issues/14476/labels{/name}',
  comments_url: 'https://api.github.com/repos/facebook/react/issues/14476/comments',
  events_url: 'https://api.github.com/repos/facebook/react/issues/14476/events',
  html_url: 'https://github.com/facebook/react/issues/14476',
  id: 393051225,
  node_id: 'MDU6SXNzdWUzOTMwNTEyMjU=',
  number: 14476,
  title: 'useCallback/useEffect support custom comparator',
  labels: [
    {
      id: 1109410193,
      node_id: 'MDU6TGFiZWwxMTA5NDEwMTkz',
      url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Hooks',
      name: 'Component: Hooks',
      color: 'c2f27b',
      default: false
    },
    {
      id: 40929155,
      node_id: 'MDU6TGFiZWw0MDkyOTE1NQ==',
      url: 'https://api.github.com/repos/facebook/react/labels/Type:%20Question',
      name: 'Type: Question',
      color: 'cc317c',
      default: false
    }
  ],
  state: 'open',
  locked: false,
  assignee: null,
  assignees: [],
  milestone: null,
  comments: 2,
  created_at: '2018-12-20T13:40:35Z',
  updated_at: '2018-12-20T16:40:00Z',
  closed_at: null,
  author_association: 'CONTRIBUTOR',
  body:
    'Currently we can pass an array as second argument when using `useCallback` or `useEffect` like below:\r\n\r\n```js\r\nuseCallback(()=> {\r\n  doSth(a, b)\r\n}, [a, b]) // how to do deep equal if a is an object ?\r\n```\r\n\r\nThe problem is it only compare array items with `===`,  it there any way to compare complex object ? \r\n\r\nSupport custom comparator as third argument looks not bad:\r\n\r\n```js\r\nuseCallback(()=> {\r\n  doSth(a, b)\r\n  }, \r\n  [complexObject], \r\n  (item, previousItem)=> { //custom compare logic, return true || false here }\r\n)\r\n```\r\n'
};

describe('<IssueRow />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<IssueRow issue={data} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper.find('li')).toHaveLength(data.labels.length);
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('should show no issues found message if data is empty', () => {
    const wrapper = shallow(<IssueRow issue={{}} />);
    expect(wrapper.html()).toContain('Standard Issue');
  });

  it('should show no issues found message if data is null', () => {
    const wrapper = shallow(<IssueRow />);
    expect(wrapper.html()).toContain('Standard Issue');
  });

  it('should print no labels if no labels available', () => {
    const newIssue = {
      ...data,
      labels: []
    };
    const wrapper = shallow(<IssueRow issue={newIssue} />);
    expect(wrapper.html()).toContain('No labels');
  });
});
