import { render, screen } from '@testing-library/react';
import RepoLinks from '../../components/RepoLinks';

describe('RepoLinks', () => {
  it('renders the owner and repo links', () => {
    render(<RepoLinks owner="facebook" repoName="react" repoUrl="https://github.com/facebook/react" />);

    expect(screen.getByText('facebook')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it('links to the correct URLs', () => {
    render(<RepoLinks owner="facebook" repoName="react" repoUrl="https://github.com/facebook/react" />);

    const ownerLink = screen.getByText('facebook');
    const repoLink = screen.getByText('react');

    expect(ownerLink).toHaveAttribute('href', 'https://github.com/facebook');
    expect(repoLink).toHaveAttribute('href', 'https://github.com/facebook/react');
  });
});