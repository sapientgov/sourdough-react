import React from 'react';
import PropTypes from 'prop-types';

import {history} from '../../core/services/history.service';

export default class HeaderBlock extends React.Component {

	static propTypes = {
		showClose: PropTypes.bool
	}

  handleSettingsToggle = () => {
    history.push('/settings');
  }

	render() {
		return (
			<header>
        <nav>
          <button className="menuToggle" onClick={this.handleSettingsToggle}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>
		)
	}
}
