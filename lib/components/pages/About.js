import React from 'react';
import { mockSinCos } from '../../utils/mocks';
const marginRight = { marginRight: '20px' };
const contentStyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center'  };

import PieChart from '../charts/PieChart';
import BarChart from '../charts/BarChart';

const data = [2704659, 4499890, 2159981, 3853788, 14106543, 8819342, 612463];
const data2 = [
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
const data3 = mockSinCos();

export default class About extends React.Component {

  render () {
    let chartObj = {
      transitionDuration: 350, 
      height: 400,
      width: 400,
      margin: { left: 20 } 
    }
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
         <PieChart data={data}/>
         <br/>
         <br/>
         <BarChart data={data2} typeName={"discreteBarChart"}/>
         <br/>
         <br/>
         <BarChart data={data3} typeName={"stackedAreaChart"} chartProps={ chartObj }/>
        </div>
      </div>
    );
  }
}
