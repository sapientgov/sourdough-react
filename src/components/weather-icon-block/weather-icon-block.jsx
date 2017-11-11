import React from 'react';
import PropTypes from 'prop-types';

export default class WeatherIconBlock extends React.Component {

  static propTypes = {
    temp: PropTypes.number,
    location: PropTypes.string
  }

  render() {
    return(
      <div className="weatherIconBlock">
        <h1>{this.props.temp}<span className="degIcon">&deg;</span></h1>
        <h2>{this.props.location}</h2>
      </div>
    )
  }

}
