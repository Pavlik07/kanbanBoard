import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import KanbanBoard from '../../components/KanbanBoard';
import repoSlice from '../../redux/repoSlice';
import repoUrlSlice from '../../redux/repoUrlSlice';
import { RepoState } from '../../utils/types';

const preloadedState: { repo: RepoState; repoUrl: { repoUrl: string } } = {
  repoUrl: { repoUrl: 'facebook/react' },
  repo: {
    'facebook/react': {
      todo: [
        {
          id: 1,
          title: 'Test Issue',
          html_url: 'https://github.com/facebook/react/issues/1',
          created_at: '2023-01-01',
          reactions: { total_count: 5 },
          user: { login: 'testuser' },
          state: 'open',
          assignee: null,
        },
      ],
      inProgress: [],
      done: [],
      loading: false,
      error: null,
    },
  },
};

const store = configureStore({
  reducer: {
    repo: repoSlice,
    repoUrl: repoUrlSlice,
  },
  preloadedState,
});

describe('KanbanBoard', () => {
  it('renders the Kanban board with columns', () => {
    render(
      <Provider store={store}>
        <KanbanBoard />
      </Provider>
    );

    expect(screen.getByText('TODO')).toBeInTheDocument();
    expect(screen.getByText('INPROGRESS')).toBeInTheDocument();
    expect(screen.getByText('DONE')).toBeInTheDocument();
  });

  it('displays issues in the TODO column', () => {
    render(
      <Provider store={store}>
        <KanbanBoard />
      </Provider>
    );

    expect(screen.getByText('Test Issue')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });
});