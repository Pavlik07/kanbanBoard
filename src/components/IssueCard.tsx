import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ListGroup } from 'react-bootstrap';
import { IssueCardProps } from '../utils/types';
import { getTimeSinceCreation } from '../utils/dateUtils';

const IssueCard: React.FC<IssueCardProps> = ({ id, issue }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (transform || !issue) {
      e.preventDefault();
    }
  };

  return (
    <ListGroup.Item
      ref={setNodeRef}
      style={style}
      {...(issue ? { ...attributes, ...listeners } : {})}
    >
      <div className="singleIssue">
        {issue ? (
          <>
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
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
              </a>{' '}
              | comments: {issue.reactions.total_count}
            </p>
          </>
        ) : (
          <p className="title">No issues</p>
        )}
      </div>
    </ListGroup.Item>
  );
};

export default IssueCard;