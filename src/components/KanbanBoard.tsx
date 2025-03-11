import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { RootState } from '../redux/store';
import RepoLinks from './RepoLinks';
import KanbanColumn from './KanbanColumn';
import DragOverlayIssue from './DragOverlayIssue';
import { moveIssue, moveIssueBetweenColumns } from '../redux/repoSlice';
import { useRepoPersistence } from '../redux/useRepoPersistence';

const KanbanBoard: React.FC = () => {
  const repoState = useSelector((state: RootState) => state.repo);
  const repoUrl = useSelector((state: RootState) => state.repoUrl.repoUrl);
  const dispatch = useDispatch();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  useRepoPersistence();

  const getIssuesForColumn = (column: string) => {
    return repoState[repoUrl]?.[column] ?? [];
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceColumn = activeId.split('-')[0];
    const sourceIndex = parseInt(activeId.split('-')[1]);
    const destColumn = overId.split('-')[0];
    const destIndex = parseInt(overId.split('-')[1]);

    if (sourceColumn === destColumn) {
      dispatch(
        moveIssue({
          repoUrl,
          sourceColumn,
          sourceIndex,
          destIndex,
        })
      );
    } else {
      dispatch(
        moveIssueBetweenColumns({
          repoUrl,
          sourceColumn,
          sourceIndex,
          destColumn,
          destIndex,
        })
      );
    }

    setActiveId(null);
  };

  const getIssueById = (id: string) => {
    const [column, index] = id.split('-');
    const issues = getIssuesForColumn(column);
    return issues[parseInt(index)];
  };

  const repoUrlParts = repoUrl.split('/');
  const owner = repoUrlParts[3];
  const repoName = repoUrlParts[4];

  return (
    <div className="kanbanBoardContainer">
      <RepoLinks owner={owner} repoName={repoName} repoUrl={repoUrl} />

      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCenter} sensors={sensors}>
        <Row className="mt-4">
          {['todo', 'inProgress', 'done'].map((column) => (
            <Col md={4} key={column}>
              <KanbanColumn
                column={column}
                issues={getIssuesForColumn(column)}
              />
            </Col>
          ))}
        </Row>

        <DragOverlay>
          {activeId && getIssueById(activeId) && (
            <DragOverlayIssue issue={getIssueById(activeId)} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;