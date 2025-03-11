import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { DragOverlayIssueProps } from '../utils/types';
import { getTimeSinceCreation } from '../utils/dateUtils';
import '../styles/dragOverlayIssue.css'

const DragOverlayIssue: React.FC<DragOverlayIssueProps> = ({ issue }) => (
  <ListGroup.Item>
    <div className="singleIssue">
      <a className="adminLink" href={issue.html_url} target="_blank" rel="noopener noreferrer">
        <p className="title">{issue.title}</p>
      </a>
      <p className="singleIssue">Issue opened: {getTimeSinceCreation(issue.created_at)}</p>
      <p className="singleIssue">
        <a
          href={`https://github.com/${issue.user.login}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {issue.user.login}
        </a>
        {' '}| comments: {issue.reactions.total_count}
      </p>
    </div>
  </ListGroup.Item>
);

export default DragOverlayIssue;