import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as CounterActions from '../actions/counter'

class Counter extends Component {
  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;

    return (
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button onClick={() => incrementAsync()}>Increment async</button>
        {' '}
        <Link to='/routing'>routing</Link>
      </p>
    )
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  console.log(state.router.location);

  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
