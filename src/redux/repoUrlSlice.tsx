import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RepoUrlState } from '../utils/types';

const initialState: RepoUrlState = {
  repoUrl: '',
};

const repoUrlSlice = createSlice({
  name: 'repoUrl',
  initialState,
  reducers: {
    setRepoUrl: (state, action: PayloadAction<string>) => {
      state.repoUrl = action.payload;
    },
    clearRepoUrl: (state) => {
      state.repoUrl = '';
    },
  },
});

export const { setRepoUrl, clearRepoUrl } = repoUrlSlice.actions;
export default repoUrlSlice.reducer;