import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class TextInput extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  handleOnChange = (e) => {
    const newValue = e.target.value;
    this.props.handleOnChange(newValue, this.props.id);
  }

  render() {
    return (
      <div className={`form-group ${this.props.className}`}>
        <input className="form-control" id={this.props.id} type="text" value={this.props.value} onChange={this.handleOnChange}/>
      </div>
    )
  }

}
