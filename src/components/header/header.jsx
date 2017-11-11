import React from 'react';
import PropTypes from 'prop-types';

export default class HeaderBlock extends React.Component {

	static propTypes = {
		showClose: PropTypes.bool
	}

  handleSettingsToggle = () => {
    console.log('settings');
  }

	render() {
		return (
			<header>
        <nav>
          <button className="menuToggle" onClick="this.handleSettingsToggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>
		)
	}
}
