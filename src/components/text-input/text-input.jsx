import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer

export default class TextInput extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    placeholder: ''
  }

  handleOnChange = (e) => {
    const newValue = e.target.value;
    this.props.handleOnChange(newValue, this.props.id);
  }

  render() {
    return (
      <input id={this.props.id} type="text" value={this.props.value} placeholder={this.props.placeholder} onChange={this.handleOnChange}/>
    )
  }

}
