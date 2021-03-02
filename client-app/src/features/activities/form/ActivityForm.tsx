import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  handleFormClose: () => void;
  activity: Activity | undefined;
  handleCreateOrEditActivity: (activity: Activity) => void;
  submitting: boolean;
}

export default function ActivityForm({
  handleFormClose,
  activity: SelectedActivity,
  handleCreateOrEditActivity,
  submitting,
}: Props) {
  const initialState = SelectedActivity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: '',
  };
  const [activity, setActivity] = useState(initialState);
  const handleForm = (event: any) => {
    event.preventDefault();
    handleCreateOrEditActivity(activity);
  };
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Segment>
      <Form onSubmit={handleForm} autoComplete='off'>
        <Form.Input
          placeholder='Title'
          label='Title'
          value={activity.title}
          name='title'
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          label='Description'
          value={activity.description}
          name='description'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          label='Category'
          value={activity.category}
          name='category'
          onChange={handleInputChange}
        />
        <Form.Input
          type='date'
          placeholder='Date'
          label='Date'
          value={activity.date}
          name='date'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          label='City'
          value={activity.city}
          name='city'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Vanue'
          label='Vanue'
          value={activity.venue}
          name='venue'
          onChange={handleInputChange}
        />
        <Button
          loading={submitting}
          floated='right'
          type='submit'
          content='submit'
          color='yellow'
        />
        <Button
          onClick={handleFormClose}
          type='button'
          content='cancel'
          color='grey'
        />
      </Form>
    </Segment>
  );
}
