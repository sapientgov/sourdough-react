import React from 'react';
import {Link} from 'react-router-dom';

export default class ConfigureAlarmPage extends React.Component {

  render() {
    return(
      <div className="container">
        <h1>Alarm</h1>
        <h2>Time</h2>
        <h2>Recurring?</h2>
        <div><Link to="/">Home</Link></div>
      </div>
    )
  }

}
