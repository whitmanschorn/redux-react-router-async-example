import React, { PropTypes } from 'react';
import BarChart from './BarChart';

const nodeStyle = {
  border: '1px solid',
  borderColor: '#000',
  margin: 10,
  padding: 10,
};
const DONUT_SIZE = 50;

const pieChartProps = {
  transitionDuration: 150,
  height: DONUT_SIZE,
  width: DONUT_SIZE,
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
      return this.renderLoadingMessage();
  }

  renderLoadingMessage () {
    return (<svg width={DONUT_SIZE} height={DONUT_SIZE}>
      <circle
        stroke='#299CD7'
        strokeWidth="2"
        strokeLocation="inside"
        fill='#D6D6D5'
        cx={DONUT_SIZE / 2}
        cy={DONUT_SIZE / 2}
        r={ (DONUT_SIZE - 2) / 2}
      />
    </svg>);
  }

  render () {
    let finalNodeStyle = Object.assign({}, nodeStyle);
    finalNodeStyle.borderColor = this.props.isSelected ? '#299CD7' : '#000';
    finalNodeStyle.color = this.props.isSelected ? '#299CD7' : '#000';
    return (
      <div style={finalNodeStyle} onClick={() => this.props.selectNodeAction(this.props.node.id)}>
        {this.props.node.id} <button onClick={() => this.props.deleteNodeAction(this.props.node.id)}>x</button>
        <br/>
        {this.renderDonut()}
      </div>
    );
  }
}
