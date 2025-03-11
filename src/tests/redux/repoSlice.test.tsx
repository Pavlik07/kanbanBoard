import repoSlice from '../../redux/repoSlice';

describe('repoSlice', () => {
  const initialState = {};

  it('should handle initial state', () => {
    expect(repoSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle moveIssue', () => {
    const state = {
      'facebook/react': {
        todo: [
          {
            id: 1,
            title: 'Test Issue',
            html_url: 'https://github.com/facebook/react/issues/1',
            created_at: '2023-01-01',
            reactions: { total_count: 5 },
            user: { login: 'testuser' },
            state: 'open',
            assignee: null,
          },
        ],
        inProgress: [],
        done: [],
        loading: false,
        error: null,
      },
    };

    const action = {
      type: 'repo/moveIssue',
      payload: { repoUrl: 'facebook/react', sourceColumn: 'todo', sourceIndex: 0, destIndex: 0 },
    };

    const newState = repoSlice(state, action);
    expect(newState['facebook/react'].todo.length).toBe(1);
  });
});