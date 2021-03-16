import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;
  useEffect(() => {
    if (activityRegistry.size <= 1) {
      activityStore.loadActivities();
    }
  }, [activityRegistry.size, loadActivities]);

  if (activityStore.loadingInitial)
    return <LoadingComponents content='Loading component' />;

  const { activitiesByDate: activities } = activityStore;

  return (
    <Grid>
      <Grid.Column width='10'>
        {activities.length <= 0 && <p>No Activites remain</p>}
        {activities && <ActivityList />}
      </Grid.Column>
      <Grid.Column width='6'>
        <h2>activity filters</h2>
      </Grid.Column>
    </Grid>
  );
});
