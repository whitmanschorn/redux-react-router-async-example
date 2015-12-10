import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import Explore from '../github/Explore';
// import * as githubActions from '../../actions/github';
import TreeActionCreators from '../../action_creators/tree';
import TreeSelector from '../../selectors/tree';
import TreeContainer from '../charts/TreeContainer';

@connect(TreeSelector, TreeActionCreators)
export default class PopulationPage extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    actions: PropTypes.object,
    selectedNodeId: PropTypes.string.isRequired,
    addNodeAction: PropTypes.func.isRequired,
    selectNodeAction: PropTypes.func.isRequired,
    nodeMap: React.PropTypes.object.isRequired,
    rootNode: PropTypes.object.isRequired,
  }

  randomNode () {
    console.log('hey rando');
    return {
      id: 'node:' + Math.random(),
      children: [],
      filters: [],
    };
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
          <p>Selected node: {this.props.selectedNodeId}</p>
          </div>
          <TreeContainer
            nodeMap={this.props.nodeMap}
            selectedNodeId={this.props.selectedNodeId}
            rootNode={this.props.rootNode}
            selectNodeAction={this.props.selectNodeAction}
          />
          <br/>
          <br/>
          <button onClick={() => { this.props.addNodeAction(this.randomNode(), this.props.selectedNodeId); }} >Create child of selected</button>
        </div>
        {/* this will render the child routes */}
        {this.props.children &&
          React.cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}
