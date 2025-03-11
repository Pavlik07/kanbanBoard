import { fetchIssues } from '../fetchingIssues';
import { configureStore } from '@reduxjs/toolkit';
import repoSlice from '../redux/repoSlice';

describe('fetchIssues', () => {
  it('should fetch issues for a repo', async () => {
    const store = configureStore({
      reducer: {
        repo: repoSlice,
      },
    });

    const repoUrl = 'facebook/react';
    const action = fetchIssues(repoUrl);
    const result = await store.dispatch(action);

    expect(result.type).toBe('repo/fetchIssues/fulfilled');
    expect(result.payload).toHaveProperty('repoUrl', repoUrl);
    expect(result.payload).toHaveProperty('issues');
  });
});