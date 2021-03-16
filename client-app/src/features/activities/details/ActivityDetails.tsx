import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

export default observer(function ActivityDetails() {
  const { id } = useParams<{ id: string }>();
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponents />;
  return (
    <>
      <Card fluid color='olive' id='detail'>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Content textAlign='center'>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span>{activity.date}</span>
          </Card.Meta>
          <Card.Description>{activity.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths='2'>
            <Button
              as={Link}
              to={`/manage/${activity.id}`}
              basic
              color='blue'
              content='Edit'
            />
            <Button
              as={Link}
              to='/activities'
              basic
              color='grey'
              content='Cancel'
            />
          </Button.Group>
        </Card.Content>
      </Card>
    </>
  );
});
