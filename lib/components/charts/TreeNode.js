import React, { PropTypes } from 'react';
import BarChart from './BarChart';

const nodeStyle = {
  border: '1px solid',
  borderColor: '#000',
  margin: 10,
  padding: 10,
  display: 'inline-block',
};

const pieChartProps = {
  transitionDuration: 350,
  height: 50,
  width: 50,
  margin: { top: 0, right: 0, bottom: 0, left: 0 } ,
  donut: true,
  donutRatio: 0.35,
  showLabels: false,
  showLegend: false,
};

export default class TreeNode extends React.Component {

  static propTypes = {
    node: React.PropTypes.object.isRequired,
    selectNodeAction: PropTypes.func.isRequired,
    deleteNodeAction: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }

  renderDonut () {
    console.log(this.props.node);
    if (this.props.node.result)
      return (<BarChart
        data={this.props.node.result}
        typeName={"pieChart"}
        chartProps={ pieChartProps }
      />);
    else
      return (<span>loading</span>);
  }

  render () {
    let finalNodeStyle = Object.assign({}, nodeStyle);
    finalNodeStyle.borderColor = this.props.isSelected ? '#299CD7' : '#000';
    finalNodeStyle.color = this.props.isSelected ? '#299CD7' : '#000';
    return (
      <div style={finalNodeStyle}>
        {this.props.node.id}
        <br/>
        {this.renderDonut()}
        <br/>
        <button onClick={() => this.props.selectNodeAction(this.props.node.id)}>select</button>
        &nbsp;
        <button onClick={() => this.props.deleteNodeAction(this.props.node.id)}>delete</button>
      </div>
    );
  }
}
