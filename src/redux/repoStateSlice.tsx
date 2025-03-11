import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RepoState {
  [repoUrl: string]: {
    [column: string]: string[];
  };
}

const initialRepoState: RepoState = {};

const repoStateSlice = createSlice({
  name: 'repoState',
  initialState: initialRepoState,
  reducers: {
    setRepoData: (state, action: PayloadAction<{ repoUrl: string; column: string; issues: any[] }>) => {
      const { repoUrl, column, issues } = action.payload;
      if (!state[repoUrl]) {
        state[repoUrl] = {};
      }
      state[repoUrl][column] = issues;
    },
    clearRepoData: (state, action: PayloadAction<string>) => {
        delete state[action.payload];
    }
  },
});

export const { setRepoData, clearRepoData } = repoStateSlice.actions;
export default repoStateSlice.reducer;