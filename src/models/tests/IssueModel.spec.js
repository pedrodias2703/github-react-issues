import IssueModel from '../IssueModel';

const defaultData = {
  number: 100,
  title: 'Testing Issue',
  created_at: new Date('March 27, 2018 11:13:00'),
  updated_at: new Date('March 27, 2018 11:13:00'),
  labels: [{ name: 'Test Label' }],
  state: 'testing',
  html_url: 'https://reactjs.org/hooks'
};

describe('IssueModel', () => {
  it('should have default value when nothing passed to it', () => {
    const issue = new IssueModel();
    expect(issue).toEqual(new IssueModel());
  });

  it('should have values passed to it', () => {
    const issue = new IssueModel({ ...defaultData });
    expect(issue).not.toEqual(new IssueModel());
    expect(issue.number).toEqual(defaultData.number);
    expect(issue.title).toEqual(defaultData.title);
    expect(issue.created_at).toEqual(defaultData.created_at);
    expect(issue.updated_at).toEqual(defaultData.updated_at);
    expect(issue.labels).toEqual(defaultData.labels);
    expect(issue.state).toEqual(defaultData.state);
    expect(issue.html_url).toEqual(defaultData.html_url);
  });

  it('should have default values when values passed do not contain them', () => {
    const { number, title, state, ...newData } = defaultData;
    const issue = new IssueModel(newData);
    const defaultIssue = new IssueModel();
    expect(issue.number).toEqual(defaultIssue.number);
    expect(issue.title).toEqual(defaultIssue.title);
    expect(issue.state).toEqual(defaultIssue.state);
  });
});
