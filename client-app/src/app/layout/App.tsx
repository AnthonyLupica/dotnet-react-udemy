import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import axios from 'axios';

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(res => {
        setActivities(res.data);
      })
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  };

  const handleCancelActivitySelection = () => {
    setSelectedActivity(undefined);
  };

  return (
    <>
      <Navbar />
      <Container className='content-container'> 
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivitySelection={handleCancelActivitySelection}
        />
      </Container>
    </>
  );
};

export default App;
