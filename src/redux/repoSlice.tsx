import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RepoState, RepoIssues } from "../utils/types";
import { fetchIssues } from "../fetchingIssues";
import { loadRepoState } from "./useRepoPersistence";

const initialState: RepoState = loadRepoState();

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    moveIssue: (state, action: PayloadAction<{ repoUrl: string; sourceColumn: string; sourceIndex: number; destIndex: number }>) => {
      const { repoUrl, sourceColumn, sourceIndex, destIndex } = action.payload;
      if (!state[repoUrl] || !state[repoUrl][sourceColumn]) return;

      const issues = [...state[repoUrl][sourceColumn]];
      const [movedIssue] = issues.splice(sourceIndex, 1);
      issues.splice(destIndex, 0, movedIssue);
      state[repoUrl][sourceColumn] = issues;
    },
    moveIssueBetweenColumns: (state, action: PayloadAction<{ repoUrl: string; sourceColumn: string; sourceIndex: number; destColumn: string; destIndex: number }>) => {
      const { repoUrl, sourceColumn, sourceIndex, destColumn, destIndex } = action.payload;
      if (!state[repoUrl] || !state[repoUrl][sourceColumn] || !state[repoUrl][destColumn]) return;

      const sourceIssues = [...state[repoUrl][sourceColumn]];
      const destIssues = [...state[repoUrl][destColumn]];
      const [movedIssue] = sourceIssues.splice(sourceIndex, 1);
      destIssues.splice(destIndex, 0, movedIssue);
      state[repoUrl][sourceColumn] = sourceIssues;
      state[repoUrl][destColumn] = destIssues;
    },
    setRepoState: (state, action: PayloadAction<{ repoUrl: string; state: RepoIssues }>) => {
      const { repoUrl, state: newState } = action.payload;
      state[repoUrl] = newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state, action) => {
        const repoUrl = action.meta.arg;
        state[repoUrl] = {
          ...state[repoUrl],
          loading: true,
          error: null
        };
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        const { repoUrl, issues } = action.payload;
        state[repoUrl] = {
          ...state[repoUrl],
          todo: issues.filter(issue => issue.state === "open" && !issue.assignee),
          inProgress: issues.filter(issue => issue.state === "open" && issue.assignee),
          done: issues.filter(issue => issue.state === "closed"),
          loading: false,
          error: null
        };
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        const repoUrl = action.meta.arg;
        state[repoUrl] = {
          ...state[repoUrl],
          loading: false,
          error: action.payload as string
        };
      });
  },
});

export const { moveIssue, moveIssueBetweenColumns, setRepoState } = repoSlice.actions;
export default repoSlice.reducer;