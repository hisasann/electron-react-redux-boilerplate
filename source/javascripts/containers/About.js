import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import * as ErrorActions from '../actions/error'
import Error from '../components/Error'

class App extends Component {
  render() {
    const { errorMessage, resetErrorMessage, showErrorMessage, showErrorMessageDelayed } = this.props;

    return (
      <div>
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
  pathname: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
}

// ここはstateが変わったタイミングで動く
// なので画面ロード時は動かない
function mapStateToProps(state) {
  console.log('state.router.location.pathname: ', state.router.location.pathname);
  return {
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
  return bindActionCreators(_.assign(ErrorActions, {pushState}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
