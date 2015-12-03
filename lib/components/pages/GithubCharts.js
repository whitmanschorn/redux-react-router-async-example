import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Explore from '../github/Explore';
import * as githubActions from '../../actions/github';

@connect(state => ({
  github: state.github
}), dispatch => ({
  actions: bindActionCreators(githubActions, dispatch)
}))
export default class GithubCharts extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    actions: PropTypes.object
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Graphs</h1>
          <h2>Find insights for your patients and providers</h2>
        </div>

        <Explore {...this.props} />

        {/* this will render the child routes */}
        {this.props.children &&
          React.cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}
