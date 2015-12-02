import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { Link, Navigation } from 'react-router'
import { connect } from 'react-redux'

// React.Componentについて
// constructorにpropsが引数として渡ってくるのでそれを使って必要に応じてstateの初期化をする。
// getInitialStateは使うことができません。(warnが出ます)
// Autobindingはされなくなったので明示的にthis.onClick.bind(this)のようにする必要があります。
// via http://blog.koba04.com/post/2015/01/28/published-react-v0.13.0-beta1/

class Counter extends Component {
  constructor(props) {
    super(props)
    this.routing = this.routing.bind(this)
  }

  routing() {
    this.props.pushState(null, '/routing')
  }

  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter, pathname } = this.props;
    const { loadUser } = this.props;

    return (
      <div>
        <p>pathname: {pathname}</p>
        {' '}
        <p>Clicked: {counter} times</p>
        {' '}
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button onClick={() => incrementAsync()}>Increment async</button>
        {' '}
        <p>
          <button onClick={this.routing}>routing</button>
          {' '}
          <Link to='/routing'>routing</Link>
        </p>
        <p>
          <button onClick={loadUser}>loadUser</button>
        </p>
      </div>
    )
  }
}

Counter.propTypes = {
  pushState: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired
};

export default Counter
