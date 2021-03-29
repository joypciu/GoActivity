import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Header, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const history = useHistory();
  const {
    createActivity,
    updateActivity,
    loadActivity,
    loading,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    date: null,
    description: '',
    category: '',
    city: '',
    venue: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('this activity title is required'),
    description: Yup.string().required('this activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  const handleDFormSubmit = (activity: Activity) => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='grey' />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleDFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='title' placeholder='Title' />
            <MyTextArea
              rows={3}
              placeholder='Description'
              label='Description'
              name='description'
            />
            <MySelectInput
              options={categoryOptions}
              placeholder='Category'
              label='Category'
              name='category'
            />
            <MyDateInput
              placeholderText='date'
              name='date'
              showTimeSelect
              timeCaption='time'
              dateFormat='d MMMM, yyyy h:mm aa'
            />
            <Header content='Location Details' sub color='violet' />
            <MyTextInput placeholder='City' label='City' name='city' />
            <MyTextInput placeholder='Vanue' label='Vanue' name='venue' />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated='right'
              type='submit'
              content='submit'
              color='yellow'
            />
            <Button
              as={Link}
              to='/activities'
              type='button'
              content='cancel'
              color='grey'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
