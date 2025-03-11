import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import repoSlice from '../../redux/repoSlice';
import repoUrlSlice from '../../redux/repoUrlSlice';

describe('store', () => {
  it('should initialize with the correct reducers', () => {
    const store = configureStore({
      reducer: {
        repo: repoSlice,
        repoUrl: repoUrlSlice,
      },
    });

    expect(store.getState()).toEqual({
      repo: {},
      repoUrl: { repoUrl: '' },
    });
  });
});