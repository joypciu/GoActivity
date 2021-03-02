import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  handleSelectedActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  editMode: boolean;
  handleFormOpen: (id: string) => void;
  handleFormClose: () => void;
  handleCreateOrEditActivity: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
  submitting: boolean;
}
export default function ActivityDashboard({
  activities,
  selectedActivity,
  handleSelectedActivity,
  cancelSelectedActivity,
  editMode,
  handleFormOpen,
  handleFormClose,
  handleCreateOrEditActivity,
  handleDeleteActivity,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width='10'>
        {activities.length <= 0 && <p>No Activites remain</p>}
        {activities && (
          <ActivityList
            activities={activities}
            selectedActivity={selectedActivity}
            handleSelectedActivity={handleSelectedActivity}
            handleDeleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectedActivity={cancelSelectedActivity}
            handleFormOpen={handleFormOpen}
          />
        )}
        {editMode && (
          <ActivityForm
            handleFormClose={handleFormClose}
            activity={selectedActivity}
            handleCreateOrEditActivity={handleCreateOrEditActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
