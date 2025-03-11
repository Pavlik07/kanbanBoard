import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import KanbanColumn from '../../components/KanbanColumn';
import { Issue } from '../../utils/types';

const mockIssue: Issue = {
  id: 1,
  title: 'Test Issue',
  html_url: 'https://github.com/facebook/react/issues/1',
  state: 'open',
  assignee: null,
  created_at: '2023-01-01',
  reactions: { total_count: 5 },
  user: { login: 'testuser' },
};

describe('KanbanColumn', () => {
  it('renders the column header', () => {
    render(<KanbanColumn column="todo" issues={[mockIssue]} />);

    expect(screen.getByText('TODO')).toBeInTheDocument();
  });

  it('renders issues in the column', () => {
    render(<KanbanColumn column="todo" issues={[mockIssue]} />);

    expect(screen.getByText('Test Issue')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('renders "No issues" for an empty column', () => {
    render(<KanbanColumn column="todo" issues={[null]} />);

    expect(screen.getByText('No issues')).toBeInTheDocument();
  });
});