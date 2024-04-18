import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    agent.activities.list()
      .then(res => {
        res.forEach(activity => {
          activity.date = activity.date.split('T')[0];
        });

        setActivities(res);
        setIsLoading(false);
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
    setIsSubmitting(true);
    if (activity.id) {
      agent.activities.update(activity)
        .then(() => {
          setActivities(prevActivities => ([
            ...prevActivities.filter(x => x.id !== activity.id),
            {...activity}
          ]));

          setSelectedActivity(activity);
          setIsEditMode(false);
          setIsSubmitting(false)
        });
    } else {
      activity.id = uuid();
      agent.activities.create(activity)
        .then(() => {
          setActivities(prevActivities => ([
            ...prevActivities,
            {...activity}
          ]));

          setSelectedActivity(activity);
          setIsEditMode(false);
          setIsSubmitting(false)
        });
    }
  };

  const handleDeleteActivity = (id: string) => {
    setIsSubmitting(true);

    agent.activities.delete(id)
      .then(() => {
        setActivities(prevActivities => ([
          ...prevActivities.filter(x => x.id !== id)
        ]));

        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return <LoadingComponent />
  }

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
          isSubmitting={isSubmitting}
        />
      </Container>
    </>
  );
};

export default App;
