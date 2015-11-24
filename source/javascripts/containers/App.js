import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import Counter from '../components/Counter'

class App extends Component {
  render() {
    return (
      <div>
        <Counter />
      </div>
    )
  }
}

App.propTypes = {
}

export default App