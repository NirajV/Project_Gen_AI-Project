import React from 'react';
import { Redirect } from 'react-router-dom';
import Schedule from '../schedule/Schedule';

class HomePage extends React.Component {

  componentDidMount() {
    this.props.fetchAllUsers();
    this.props.fetchAllEvents(this.props.user.data.hospitalId);
  }

  render() {
    const { user, events } = this.props;
    if (!user.data || ( user.data && user.data.hasError )  ) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <Schedule events={events} fetchFilteredEvents={this.props.fetchFilteredEvents} user={this.props.user} />
      </div>
    )
  }
}

export default HomePage;