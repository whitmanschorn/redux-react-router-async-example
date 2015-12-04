import React from 'react';
import { exampleData, horizontalMock, donutMock } from '../../utils/mocks';
const marginRight = { marginRight: '20px' };
const contentStyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center'  };

import BarChart from '../charts/BarChart';

const discreteBarChartData = [
  {
    key: 'Cumulative Return',
    values: [
      {
        'label' : 'A' ,
        'value' : -29.765957771107
      } ,
      {
        'label' : 'B' ,
        'value' : 0
      } ,
      {
        'label' : 'C' ,
        'value' : 32.807804682612
      } ,
      {
        'label' : 'D' ,
        'value' : 196.45946739256
      } ,
      {
        'label' : 'E' ,
        'value' : 0.19434030906893
      } ,
      {
        'label' : 'F' ,
        'value' : -98.079782601442
      } ,
      {
        'label' : 'G' ,
        'value' : -13.925743130903
      } ,
      {
        'label' : 'H' ,
        'value' : -5.1387322875705
      }
    ]
  }
];
const multiBarChartData = exampleData();
const multiBarHorizontalChartData = horizontalMock;
const pieChartData = donutMock;

export default class About extends React.Component {

  render () {
    let multiBarChartProps = {
      transitionDuration: 350,
      height: 400,
      width: 600,
      margin: {
        top: 20,
      },
    };

    let multiBarHorizontalChartProps = {
      transitionDuration: 350,
      height: 300,
      width: 600,
      margin: { top: 30, right: 0, bottom: 50, left: 0 } ,
    };

    let pieChartProps = {
      transitionDuration: 350,
      height: 300,
      width: 600,
      margin: { top: 30, right: 0, bottom: 50, left: 0 } ,
      donut: true,
      donutRatio: 0.35,
      showLabels: true,
      labelThreshold: 0.05,
      labelType: 'percent'
    };

    return (
      <div>
        <div className="header">
          <h1>About</h1>
          <h2>
            <icon style={marginRight} className="fa fa-2x fa-lightbulb-o"/>
            <icon style={marginRight} className="fa fa-2x fa-area-chart"/>
            <icon style={marginRight} className="fa fa-2x fa-pie-chart"/>
            <icon className="fa fa-2x fa-bar-chart"/>
          </h2>
        </div>
        <div className="content" style={contentStyles}>
         Advanced insights and reporting
         on populations with behavioral health conditions.
         <br/>
         <br/>
         <BarChart data={discreteBarChartData} typeName={"discreteBarChart"}/>
         <br/>
         <br/>
         <BarChart data={multiBarChartData} typeName={"multiBarChart"} chartProps={ multiBarChartProps }/>
         <br/>
         <br/>
         <BarChart
           data={multiBarHorizontalChartData}
           typeName={"multiBarHorizontalChart"}
           chartProps={ multiBarHorizontalChartProps }
          />
         <BarChart data={pieChartData} typeName={"pieChart"} chartProps={ pieChartProps } />
        </div>
      </div>
    );
  }
}
