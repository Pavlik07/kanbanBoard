import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Issue } from "./utils/types";

export const fetchIssues = createAsyncThunk(
    'repo/fetchIssues',
    async (repoUrl: string, { rejectWithValue }) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoUrl.replace('https://github.com/', '')}/issues?state=all`);
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData.message || response.statusText);
        }
        const issues: Issue[] = await response.json();
        return { repoUrl, issues };
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);