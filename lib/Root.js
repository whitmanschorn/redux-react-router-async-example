/* global __DEVTOOLS__ */
import '../assets/stylesheets/index.css'

import React, { PropTypes } from 'react'
import { Redirect, Route } from 'react-router'
import { ReduxRouter } from 'redux-router'
import { connect } from 'react-redux'
import configureStore from './utils/configure-store'
import * as storage from './persistence/storage'
import * as components from './components'
import * as constants from './constants'

const {
  About,
  Account,
  AccountHome,
  Application,
  GithubCharts,
  GithubRepo,
  GithubUser,
  Home,
  Login,
  SuperSecretArea
} = components

const initialState = {
  application: {
    token: storage.get('token'),
    locale: storage.get('locale') || 'en',
    user: { permissions: [/*'manage_account'*/] }
  }
}

export const store = configureStore(initialState)

function getRootChildren () {
  const rootChildren = []
  rootChildren.push(renderRoutes())

  if (__DEVTOOLS__) {
    const DevTools = require('./components/DevTools')
    rootChildren.push(<DevTools key="devtools" />)
  }
  return rootChildren
}

function renderRoutes () {
  return (
    <ReduxRouter key="router">
      <Route component={Application}>
        <Route path="/" component={Home} />
        <Redirect from="/account" to="/account/profile" />
        <Route
          path="stargazers"
          component={GithubCharts}
          onEnter={requireAuth}
        >
          <Route path=':username/:repo' component={GithubRepo} />
          <Route path=':username' component={GithubUser} />
        </Route>
        <Route path="about" component={About} />
        <Route path="account" component={Account} onEnter={requireAuth}>
          <Route path="profile" component={AccountHome} />
          <Route path="secret-area" component={SuperSecretArea} />
        </Route>
        <Route path="login" component={Login} />
        <Route path="logout" onEnter={logout} />
      </Route>
    </ReduxRouter>
  )
}

function requireAuth (nextState, replaceState) {
  const state = store.getState()
  const isLoggedIn = Boolean(state.application.token)
  if (!isLoggedIn)
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login')
}

function logout (nextState, replaceState) {
  store.dispatch({ type: constants.LOG_OUT })
  replaceState({}, '/login')
}

@connect(({ application }) => ({ application }))
export default class Root extends React.Component {
  static propTypes = {
    application: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>{getRootChildren(this.props)}</div>
    )
  }
}
