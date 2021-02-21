import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/Activities').then((response) => {
      setActivities(response.data);
    });
  }, []);

  return (
    <>
      <Header as='h2' icon='users' content='Activities' />
      <List bulleted divided>
        {activities.map((user: any) => (
          <List.Item key={user.id}>{user.title}</List.Item>
        ))}
      </List>
    </>
  );
}

export default App;
