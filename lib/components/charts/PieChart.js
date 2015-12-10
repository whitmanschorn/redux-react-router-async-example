import React from 'react';
import d3 from 'd3';

let colors = d3.scale.category20c();
const ARC_SIZE_OUTER = 100;
const ARC_SIZE_INNER = 50;

class Chart extends React.Component {

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    children: React.PropTypes.node,
  };

  render () {
    return (
      <svg width={this.props.width} height={this.props.height}>
        {this.props.children}
      </svg>
    );
  }
}

class Sector extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    fill: React.PropTypes.string.isRequired,
  }

  render () {
    let arc = d3.svg.arc()
        .outerRadius(ARC_SIZE_OUTER)
        .innerRadius(ARC_SIZE_INNER);
    return (
      <g className="arc">
        <path d={arc(this.props.data)} fill={this.props.fill}></path>
      </g>
    );
  }
}
class DataSeries extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  }

  render () {

    let pie = d3.layout.pie();
    let bars = pie(this.props.data).map(function (point, i) {
      return (
        <Sector data={point} key={i} fill={colors(i)}/>
      );
    });

    let transformString = [
      'translate(',
      this.props.width / 2,
      ',',
      this.props.height / 2,
      ')'
    ].join('');

    return (
      <g transform={transformString}>{bars}</g>
    );
  }
};

export default class PieChart extends React.Component {

  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.array.isRequired,
  }

  static defaultProps = {
    width: ARC_SIZE_OUTER * 2,
    height: ARC_SIZE_OUTER * 2
  }

  render () {

    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries
          data={this.props.data}
          width={this.props.width}
          height={this.props.height}
        />
      </Chart>
    );
  }
}
