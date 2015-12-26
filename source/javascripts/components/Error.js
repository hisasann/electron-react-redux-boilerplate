import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Error extends Component {
  constructor(props) {
    super(props)
    this.handleShowError = this.handleShowError.bind(this)
    this.handleShowErrorDelayed = this.handleShowErrorDelayed.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    e.preventDefault();
    this.props.resetErrorMessage();
  }

  handleShowError(e) {
    e.preventDefault();
    this.props.showErrorMessage("sample error!!");
  }

  handleShowErrorDelayed(e) {
    e.preventDefault();
    this.props.showErrorMessageDelayed("delayed sample error!!");
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
        Dismiss
      </a>)
      </p>
    );
  }

  renderSample() {
    return (
      <ul>
        <li><a href="#" onClick={this.handleShowError}>show error</a></li>
        <li><a href="#" onClick={this.handleShowErrorDelayed}>show error (in 1 sec)</a></li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderSample()}
        <a href='./index.html'>index.html</a>
      </div>
    )
  }
}

Error.propTypes = {
  errorMessage: PropTypes.string
};

export default Error
