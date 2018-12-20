import { Record } from 'immutable';

// defines what we would expect from an issue object
// useful for setting default values in case they are missing
// makes our app more predictable
export const IssueModel = new Record({
  number: 0,
  title: 'Standard Issue',
  created_at: new Date('March 27, 1983 11:13:00'),
  updated_at: new Date('March 27, 1983 11:13:00'),
  labels: [],
  state: 'open',
  html_url: 'https://github.com/facebook/react/issues'
});
