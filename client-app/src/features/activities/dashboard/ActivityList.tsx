import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Link} from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const {
    activitiesByDate: activities,
    deleteActivity,
    loading,
  } = activityStore;
  const [target, setTarget] = useState('');
  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <>
      <Segment>
        <Item.Group divided>
          {activities.map((activity) => (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    floated='right'
                    content='view'
                    color='blue'
                  />
                  <Button
                    name={activity.id}
                    loading={loading && target === activity.id}
                    onClick={(e) => handleDeleteActivity(e, activity.id)}
                    floated='right'
                    content='delete'
                    color='red'
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
});
