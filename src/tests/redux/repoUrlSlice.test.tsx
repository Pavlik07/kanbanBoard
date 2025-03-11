import repoUrlSlice from '../../redux/repoUrlSlice';

describe('repoUrlSlice', () => {
  const initialState = { repoUrl: '' };

  it('should handle initial state', () => {
    expect(repoUrlSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setRepoUrl', () => {
    const action = { type: 'repoUrl/setRepoUrl', payload: 'facebook/react' };
    const newState = repoUrlSlice(initialState, action);
    expect(newState.repoUrl).toBe('facebook/react');
  });
});