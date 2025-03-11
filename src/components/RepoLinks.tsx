import React from 'react';
import '../styles/repoLinks.css'
import { RepoLinksProps } from '../utils/types';

const RepoLinks: React.FC<RepoLinksProps> = ({ owner, repoName, repoUrl }) => (
  <div className="repo-links">
    <a
      href={`https://github.com/${owner}`}
      target="_blank"
      rel="noopener noreferrer"
      className='ownerLink'
    >
      {owner}
    </a>
    &gt;
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className='repoUrlLink'
    >
      {repoName}
    </a>
  </div>
);

export default RepoLinks;