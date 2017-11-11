import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
export default class SelectInput extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    optionsList: PropTypes.array,
    className: PropTypes.string
  }

  static defaultProps = {
    optionsList: []
  }

  handleOnChange = (e) => {
    console.log('e.target.value');
    const newValue = e.target.value;
    this.props.handleOnChange(newValue, this.props.id);
  }

  render() {
    return (
      <div className={`form-group ${this.props.className}`}>
        <select
          className="form-control form-control-lg"
          id={this.props.id}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          value={this.props.value}>
          {this.props.placeholder && <option value="">{this.props.placeholder}</option>}
          {this.props.optionsList.map(option => <option value={option.value || option.title} key={option.value || option.title}>{option.title}</option> )}
        </select>
      </div>
    )
  }

}
