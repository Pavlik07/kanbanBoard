import { Issue } from '../../utils/types';

describe('Issue type', () => {
  it('should have the correct structure', () => {
    const issue: Issue = {
      id: 1,
      title: 'Test Issue',
      html_url: 'https://github.com/facebook/react/issues/1',
      state: 'open',
      assignee: { login: 'testuser' },
      created_at: '2023-01-01',
      reactions: { total_count: 5 },
      user: { login: 'testuser' },
    };

    expect(issue).toHaveProperty('id');
    expect(issue).toHaveProperty('title');
    expect(issue).toHaveProperty('html_url');
    expect(issue).toHaveProperty('state');
    expect(issue).toHaveProperty('assignee');
    expect(issue).toHaveProperty('created_at');
    expect(issue).toHaveProperty('reactions');
    expect(issue).toHaveProperty('user');
  });
});