import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import IssueCard from '../../components/IssueCard';
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

describe('IssueCard', () => {
  it('renders the issue title and user login', () => {
    render(<IssueCard id="todo-0" issue={mockIssue} />);

    expect(screen.getByText('Test Issue')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('renders the issue creation time', () => {
    render(<IssueCard id="todo-0" issue={mockIssue} />);

    expect(screen.getByText(/days ago/)).toBeInTheDocument();
  });

  it('renders "No issues" for a null issue', () => {
    render(<IssueCard id="todo-0" issue={null} />);

    expect(screen.getByText('No issues')).toBeInTheDocument();
  });
});