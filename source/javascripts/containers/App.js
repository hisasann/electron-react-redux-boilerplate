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
    const { pushState, increment, incrementIfOdd, incrementAsync, decrement, counter, pathname } = this.props;
    const { errorMessage, resetErrorMessage, showErrorMessage, showErrorMessageDelayed } = this.props;
    const { loadUser } = this.props;

    return (
      <div>
        <Counter
          pushState={pushState}
          increment={increment}
          incrementIfOdd={incrementIfOdd}
          incrementAsync={incrementAsync}
          decrement={decrement}
          counter={counter}
          pathname={pathname}
          loadUser={loadUser}
          />
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
  pushState: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  loadUser: PropTypes.func.isRequired
}

// ここはstateが変わったタイミングで動く
// なので画面ロード時は動かない
function mapStateToProps(state) {
  return {
    counter: state.counter,
    pathname: state.router.location.pathname,
    errorMessage: state.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  // bindActionCreatorsを呼ぶと、dispatchが勝手にbindされなくなる
  // つまり this.props.dispatch で取得できなくなる
  // bindActionCreatorsを使わない場合は、dispatchを受け取り、Appコンポーネント側でdispatch()でActionを呼び出す必要がある
  // http://rackt.org/redux/docs/basics/UsageWithReact.html

  // {pushState} https://github.com/rackt/redux-router/issues/79
  return bindActionCreators(_.assign(CounterActions, ErrorActions, {pushState}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
