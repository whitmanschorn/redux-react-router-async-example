import React from 'react';
import NVD3Chart from 'react-nvd3';

export default class BarChart extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    typeName: React.PropTypes.string.isRequired,
    chartProps: React.PropTypes.object,
  };

  render () {
    return (
      <div onClick={this.changeDatum}>
        <NVD3Chart
          type={this.props.typeName}
          datum={this.props.data}
          x="label" y="value"
          {...this.props.chartProps}
        />
      </div>
    );
  }
}
