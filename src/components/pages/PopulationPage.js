import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TreeActionCreators from '../../action_creators/tree';
import TreeSelector from '../../selectors/tree';
import TreeContainer from '../charts/TreeContainer';
import { donutMock } from '../../utils/mocks';
import BarChart from '../charts/BarChart';

const pieChartData = donutMock;

const pieChartProps = {
  transitionDuration: 350,
  height: 300,
  width: 400,
  margin: { top: 20, right: 20, bottom: 20, left: 20 } ,
  donut: true,
  donutRatio: 0.35,
  showLabels: true,
  labelThreshold: 0.05,
  labelType: 'percent'
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
const treeInnerStyle = {
  height: '100%',
  width: 200,
};
const mainSectionStyle = {
  textAlign: 'center',
  margin: 'auto',
  float: 'left',
  width: '100%',
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
    console.log('componentWillReceiveProps');
    console.log(nextProps.selectedNodeId);
    this.props.fetchDataIfNeeded(nextProps.selectedNodeId);
  }

  render () {
    console.log(this.props.selectedNodeData);
    return (
      <div style={parentStyle}>
        <div style={mainSectionStyle}>
            <div className="header">
              <h1>Population</h1>
              <h2>Find insights for your patients and providers</h2>
            </div>
            <div style={{ margin: 20 }}>
              <div>
              <h2>{this.props.selectedNodeId}</h2>
              <button onClick={() => { this.props.addNodeAction(this.randomNode(), this.props.selectedNodeId); }} >
                Add a filter
              </button>
             <BarChart
               data={this.props.selectedNodeData || pieChartData}
               typeName={"pieChart"}
               chartProps={ pieChartProps }
              />
              </div>
            </div>
        </div>
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
        </div>
        <div className="foobar">
          {/* this will render the child routes */}
          {this.props.children &&
          React.cloneElement(this.props.children, { ...this.props })}
        </div>
      </div>
    );
  }
}
