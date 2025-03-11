import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Search from '../../components/Search';
import repoUrlSlice from '../../redux/repoUrlSlice';
import repoSlice from '../../redux/repoSlice';

const store = configureStore({
  reducer: {
    repoUrl: repoUrlSlice,
    repo: repoSlice,
  },
  preloadedState: {
    repoUrl: { repoUrl: 'facebook/react' }, // initial repoUrl
    repo: {
      'facebook/react': {
        todo: [],
        inProgress: [],
        done: [],
        loading: false,
        error: null,
      },
    },
  },
});

describe('Search', () => {
  it('renders the search input and button', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter GitHub Repo URL')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Load Issues' })).toBeInTheDocument();
  });

  it('updates the repo URL on input change', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter GitHub Repo URL');
    fireEvent.change(input, { target: { value: 'vuejs/vue' } });

    expect(input).toHaveValue('vuejs/vue');
  });
});