import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import axios from 'axios';

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelActivitySelection();
    setIsEditMode(true);
  };

  const handleFormClose = () => {
    setIsEditMode(false);
  };

  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container className='content-container'> 
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          isEditMode={isEditMode}
          selectActivity={handleSelectActivity}
          cancelActivitySelection={handleCancelActivitySelection}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
        />
      </Container>
    </>
  );
};

export default App;
