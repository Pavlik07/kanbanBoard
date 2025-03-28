import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { RepoState } from '../utils/types';

export const saveRepoState = (state: RepoState) => {
  localStorage.setItem('kanbanReposState', JSON.stringify(state));
};

export const loadRepoState = (): RepoState => {
  const savedState = localStorage.getItem('kanbanReposState');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      return parsed;
    } catch (e) {
      console.error('Failed to parse saved state', e);
    }
  }
  return {};
};

export const useRepoPersistence = () => {
  const repoState = useSelector((state: RootState) => state.repo);

  useEffect(() => {
    saveRepoState(repoState);
  }, [repoState]);
};