import { configureStore } from "@reduxjs/toolkit";
import repoUrlReducer from './repoUrlSlice';
import repoStateReducer from './repoStateSlice';
import repoSliceReducer from  './repoSlice'

export const store = configureStore({
    reducer: {
      repo: repoSliceReducer,
      repoUrl: repoUrlReducer,
      repoState: repoStateReducer,
    },
  });
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;