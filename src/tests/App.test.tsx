import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../../src/App';
import repoSlice from '../../src/redux/repoSlice';
import repoUrlSlice from '../../src/redux/repoUrlSlice';

const store = configureStore({
  reducer: {
    repo: repoSlice,
    repoUrl: repoUrlSlice,
  },
});

describe('App', () => {
  it('renders the Search component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter GitHub Repo URL')).toBeInTheDocument();
  });
});