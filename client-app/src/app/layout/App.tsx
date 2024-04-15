import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(res => {
        setActivities(res.data);
      })
  }, []);

  return (
    <>
      <Navbar />
      <Container className='content-container'> 
        <List>
          {activities.map((activity) => {
            return (
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default App;
