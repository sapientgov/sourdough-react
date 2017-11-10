import React from 'react';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';

@inject('store')
@observer
export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.weatherStore = this.props.store.weatherStore;
  }

  componentWillMount() {
    this.weatherStore.fetchCurrentWeatherByGeolocation()
    console.log('weather: ', this.weatherStore.currentWeather);
  }

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
