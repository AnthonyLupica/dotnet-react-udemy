import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(res => {
        setActivities(res.data);
      })
  }, []);

  return (
    <div>
      <Header as="h1" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity) => {
          return (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

export default App;
