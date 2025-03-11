import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import repoSlice from '../../redux/repoSlice';
import repoUrlSlice from '../../redux/repoUrlSlice';
import { useRepoPersistence } from '../../redux/useRepoPersistence';
import { render } from '@testing-library/react';
import React from 'react';

const store = configureStore({
  reducer: {
    repo: repoSlice,
    repoUrl: repoUrlSlice,
  },
});

describe('useRepoPersistence', () => {
  it('should load saved state from localStorage', () => {
    localStorage.setItem(
      'repoState-facebook/react',
      JSON.stringify({ todo: [], inProgress: [], done: [], loading: false, error: null })
    );

    let result;

    const TestComponent = () => {
      result = useRepoPersistence();
      return null;
    };

    interface WrapperProps {
      children: React.ReactNode;
    }

    const wrapper = ({ children }: WrapperProps) => <Provider store={store}>{children}</Provider>;

    render(wrapper({ children: <TestComponent /> }));

    expect(localStorage.getItem('repoState-facebook/react')).not.toBeNull();
  });
});