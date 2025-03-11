import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import './/styles/App.css';
import Search from './components/Search';
import KanbanBoard from './components/KanbanBoard';

const App: React.FC = () => {
  const repoState = useSelector((state: RootState) => state.repo);
  const repoUrl = useSelector((state: RootState) => state.repoUrl.repoUrl);

  return (
    <div className='appContainer'>
      <Container className="mt-4">
        <Search />
        {repoState[repoUrl] && <KanbanBoard />}
      </Container>
    </div>
  );
};

export default App;





