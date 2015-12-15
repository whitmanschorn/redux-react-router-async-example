import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TreeActionCreators from '../../action_creators/tree';
import TreeSelector from '../../selectors/tree';
import TreeContainer from '../charts/TreeContainer';
import BarChart from '../charts/BarChart';

const pieChartProps = {
  transitionDuration: 350,
  height: 300,
  width: 400,
  margin: { top: 20, right: 20, bottom: 20, left: 20 } ,
  donut: true,
  donutRatio: 0.35,
  showLabels: false,
  tooltip: false,
};
const treeContainerStyle = {
  float: 'left',
  right: 0,
  padding: 10,
  overflowY: 'scroll',
  height: '100%',
  width: 'auto',
  position: 'absolute'
};
const treeNavigationStyle = {
  float: 'left',
  width: 'auto',
  position: 'absolute'
};
const treeInnerStyle = {
  height: '100%',
  maxWidth: 200,
};
const mainSectionStyle = {
  textAlign: 'center',
  float: 'left',
  height: 800,
  width: '75%',
  margin: 20,
};

const parentStyle = {
  display: 'block',
  overflow: 'hidden',
  float: 'left',
  position: 'relative',
  width: '100%',
  height: '100%',
};

@connect(TreeSelector, TreeActionCreators)
export default class PopulationPage extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    actions: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    currentMetric: PropTypes.string.isRequired,
    selectedNodeId: PropTypes.string.isRequired,
    selectedNodeData: PropTypes.array,
    addNodeAction: PropTypes.func.isRequired,
    deleteNodeAction: PropTypes.func.isRequired,
    selectNodeAction: PropTypes.func.isRequired,
    fetchDataIfNeeded: PropTypes.func.isRequired,
    nodeMap: React.PropTypes.object.isRequired,
    rootNodeId: PropTypes.string.isRequired,
  }

  randomNode () {
    let tempId = 'node:' + parseInt(Math.random() * 100, 10);

    // keep rolling if already used that ID
    while (this.props.nodeMap.get(tempId))
      tempId = 'node:' + parseInt(Math.random() * 100, 10);


    return {
      id: tempId,
      children: [],
      filters: [],
      parentId: this.props.selectedNodeId,
    };
  }

  componentDidMount () {
    this.props.fetchDataIfNeeded(this.props.selectedNodeId);
  }

  componentWillReceiveProps (nextProps) {
    this.props.fetchDataIfNeeded(nextProps.selectedNodeId);
  }

  viewMetric (metricString) {
    this.props.history.push({ ...location, search: '?metric=' + metricString });
  }

  renderTreeNavigation () {
    // todo replace button with links, erase viewMetric method
    return (
      <div style={treeNavigationStyle}>
        <button onClick={() => { this.props.addNodeAction(this.randomNode(), this.props.selectedNodeId); }} >
          Add a filter
        </button>
        <br/>
        <button onClick={() => this.viewMetric('volume')}>volume</button>
        <button onClick={() => this.viewMetric('cost')}>cost</button>
      </div>
      );
  }

  renderMainView () {
    return (
      <div style={{ margin: 20 }}>
        <h2>{this.props.currentMetric}</h2>
        <div>
          <BarChart
           data={ this.props.selectedNodeData }
           typeName={"pieChart"}
           chartProps={ pieChartProps }
           currentMetric={this.props.currentMetric}
          />
        </div>
      </div>);
  }

  renderTreeMain () {
    return (
    <div style={mainSectionStyle}>
      {this.renderTreeNavigation()}
      {this.renderMainView()}
    </div>);
  }

  renderTreeContainer () {
    return (
      <div style={treeContainerStyle}>
        <div style={treeInnerStyle}>
          <TreeContainer
          nodeMap={this.props.nodeMap}
          selectedNodeId={this.props.selectedNodeId}
          rootNodeId={this.props.rootNodeId}
          deleteNodeAction={this.props.deleteNodeAction}
          selectNodeAction={this.props.selectNodeAction}
          />
        </div>
      </div>);
  }

  render () {
    return (
      <div style={parentStyle}>
        <div className="header">
          <h1>Population</h1>
          <h2>Find insights for your patients and providers</h2>
        </div>
        <div>
          {this.renderTreeMain()}
          {this.renderTreeContainer()}
          <div className="foobar">
            {/* this will render the child routes */}
            {this.props.children &&
            React.cloneElement(this.props.children, { ...this.props })}
          </div>
        </div>
      </div>
    );
  }
}
