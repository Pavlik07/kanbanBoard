import { configureStore } from "@reduxjs/toolkit";
import repoUrlReducer from './repoUrlSlice';
import repoSliceReducer from  './repoSlice'

export const store = configureStore({
    reducer: {
      repo: repoSliceReducer,
      repoUrl: repoUrlReducer,
    },
  });
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//deleted repoStateReducer, because repoStateSlice.tsx was completely deleted
//since we are handling the state save differently now