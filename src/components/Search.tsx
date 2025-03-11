import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchIssues } from '../fetchingIssues';
import { setRepoUrl } from '../redux/repoUrlSlice';
import '../styles/search.css'

function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const repoUrl = useSelector((state: RootState) => state.repoUrl.repoUrl);
  const repoState = useSelector((state: RootState) => state.repo);

  const handleLoadIssues = () => {
    if (repoUrl) {
      dispatch(fetchIssues(repoUrl));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRepoUrl(e.target.value));
  };

  return (
    <Row className="gx-0">
      <Col xs={12} md={9} className='col'>
        <Form.Control
          type="text"
          placeholder="Enter GitHub Repo URL"
          className='search'
          value={repoUrl}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={12} md={3} className='col2'>
        <Button variant="primary" onClick={handleLoadIssues} disabled={repoState[repoUrl]?.loading} className='btn'>
          {repoState[repoUrl]?.loading ? 'Loading...' : 'Load Issues'}
        </Button>
      </Col>
      <Col xs={12}>
        {repoState[repoUrl]?.error && <p className="text-danger mt-2">{repoState[repoUrl]?.error}</p>}
      </Col>
    </Row>
  );
}

export default Search;