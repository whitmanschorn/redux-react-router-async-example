import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import Explore from '../github/Explore';
// import * as githubActions from '../../actions/github';
import TreeActionCreators from '../../action_creators/tree';
import TreeSelector from '../../selectors/tree';

@connect(TreeSelector, TreeActionCreators)
export default class PopulationPage extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    actions: PropTypes.object
  }

  render () {
    console.log(this.props);
    return (
      <div>
        <div className="header">
          <h1>Population</h1>
          <h2>Find insights for your patients and providers</h2>
        </div>
        <div style={{ margin: 20 }}>
          <div>
          <p>Selected node: {this.props.selectedNode}</p>
          </div>
          <button onClick={() => {this.props.selectNode('node:1')}} >Select Node 1</button>
          <br/>
          <br/>
          <button onClick={() => {this.props.selectNode('node:2')}} >Select Node 2</button>
        </div>
        {/* this will render the child routes */}
        {this.props.children &&
          React.cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}
