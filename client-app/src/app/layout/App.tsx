import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

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
  
  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id 
      ? setActivities(prevActivities => ([
        ...prevActivities.filter(x => x.id !== activity.id),
        activity
      ]))
      : setActivities(prevActivities => ([
        ...prevActivities,
        {...activity, id: uuid()}
      ]))

      setIsEditMode(false);
      setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(prevActivities => ([
      ...prevActivities.filter(x => x.id !== id)
    ]))
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
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
};

export default App;
