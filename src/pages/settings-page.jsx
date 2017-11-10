import React from 'react';
import {Link} from 'react-router-dom';

export default class SettingsPage extends React.Component {

  render() {
    return(
      <div className="container">
        <h1>Settings</h1>
        <h2>Location</h2>
        <h2>Avatar</h2>
        <h2>Sliders</h2>
        <div><Link to="/">Home</Link></div>
      </div>
    )
  }

}
