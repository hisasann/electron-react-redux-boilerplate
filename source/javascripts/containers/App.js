import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import * as CounterActions from '../actions/counter'
import * as ErrorActions from '../actions/error'
import Counter from '../components/Counter'
import Error from '../components/Error'

class App extends Component {
  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter, pathname } = this.props;
    const { errorMessage, resetErrorMessage, showErrorMessage, showErrorMessageDelayed } = this.props;

    return (
      <div>
        <Counter
          increment={increment}
          incrementIfOdd={incrementIfOdd}
          incrementAsync={incrementAsync}
          decrement={decrement}
          counter={counter}
          pathname={pathname}/>
        <Error
          errorMessage={errorMessage}
          resetErrorMessage={resetErrorMessage}
          showErrorMessage={showErrorMessage}
          showErrorMessageDelayed={showErrorMessageDelayed}
          />
      </div>
    )
  }
}

App.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
}


function mapStateToProps(state) {
  return {
    counter: state.counter,
    pathname: state.router.location.pathname,
    errorMessage: state.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign(CounterActions, ErrorActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
