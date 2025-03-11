import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import IssueCard from './IssueCard';
import { KanbanColumnProps } from '../utils/types';
import '../styles/kanbanColumn.css'

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, issues }) => {
  const items = issues.length > 0 ? issues : [null];

  return (
    <Card className="columns">
      <Card.Header className="header">{column.toUpperCase()}</Card.Header>
      <Card.Body className="cardBody">
        <SortableContext items={items.map((_, index) => `${column}-${index}`)} strategy={verticalListSortingStrategy}>
          <ListGroup>
            {items.map((issue, index) => (
              <IssueCard
                key={`${column}-${index}`}
                id={`${column}-${index}`}
                issue={issue}
              />
            ))}
          </ListGroup>
        </SortableContext>
      </Card.Body>
    </Card>
  );
};

export default KanbanColumn;