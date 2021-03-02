import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActibity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    agent.Activities.list().then((response: Activity[]) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(response);
      setLoading(false);
    });
  }, []);

  function handleSelectedActivity(id: string) {
    setEditMode(false);
    setSelectedActibity(activities.find((a) => a.id === id));
  }
  function cancelSelectedActivity() {
    setSelectedActibity(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : cancelSelectedActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActibity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActibity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }
  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
    setSelectedActibity(undefined);
  }
  if (loading) return <LoadingComponents content='Loading component' />;
  return (
    <>
      <NavBar handleFormOpen={handleFormOpen} />
      <Container style={{ marginTop: '7rem' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          handleSelectedActivity={handleSelectedActivity}
          cancelSelectedActivity={cancelSelectedActivity}
          editMode={editMode}
          handleFormOpen={handleFormOpen}
          handleFormClose={handleFormClose}
          handleCreateOrEditActivity={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
