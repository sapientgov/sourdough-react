import React from 'react';
import {Link} from 'react-router-dom';
export default class HomePage extends React.Component {

  render() {
    return(
      <div className="container">
        <h1>Temp</h1>
        <h2>Location</h2>
        <div><Link to="/settings">Settings</Link></div>
        <div><Link to="/alarm">Alarm</Link></div>
      </div>
    )
  }
}
