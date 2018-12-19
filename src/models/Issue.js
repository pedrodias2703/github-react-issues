import { Record } from 'immutable';

export const Issue = new Record({
  number: 0,
  title: 'Standard Issue',
  created_at: new Date(),
  updated_at: new Date(),
  labels: ['None'],
  state: 'open'
});
