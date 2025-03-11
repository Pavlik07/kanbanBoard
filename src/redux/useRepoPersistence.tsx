import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { RepoIssues } from '../utils/types';
import { setRepoState } from './repoSlice';

// function to load state from localStorage
const loadRepoState = (repoUrl: string): RepoIssues | null => {
  const savedState = localStorage.getItem(`repoState-${repoUrl}`);
  return savedState ? JSON.parse(savedState) : null;
};

// function to save state to localStorage
const saveRepoState = (repoUrl: string, state: RepoIssues) => {
  localStorage.setItem(`repoState-${repoUrl}`, JSON.stringify(state));
};

// hook to handle persistence
export const useRepoPersistence = () => {
  const dispatch = useDispatch();
  const repoUrl = useSelector((state: RootState) => state.repoUrl.repoUrl);
  const repoState = useSelector((state: RootState) => state.repo);

  // Load saved state when repoUrl changes
  useEffect(() => {
    if (repoUrl) {
      const savedState = loadRepoState(repoUrl);
      if (savedState) {
        dispatch(setRepoState({ repoUrl, state: savedState }));
      }
    }
  }, [repoUrl, dispatch]);

  // Save state to localStorage when repoState changes
  useEffect(() => {
    if (repoUrl && repoState[repoUrl]) {
      saveRepoState(repoUrl, repoState[repoUrl]);
    }
  }, [repoState, repoUrl]);
};