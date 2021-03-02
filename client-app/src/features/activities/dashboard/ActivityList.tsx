import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  handleSelectedActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
  submitting: boolean;
}
export default function ActivityList({
  activities,
  handleSelectedActivity,
  handleDeleteActivity,
  submitting,
}: Props) {
  const [target, setTarget] = useState('');
  const deleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    handleDeleteActivity(id);
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
                    href='#detail'
                    onClick={() => handleSelectedActivity(activity.id)}
                    floated='right'
                    content='view'
                    color='blue'
                  />
                  <Button
                    name={activity.id}
                    href='#detail'
                    loading={submitting && target === activity.id}
                    onClick={(e) => deleteActivity(e, activity.id)}
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
}
