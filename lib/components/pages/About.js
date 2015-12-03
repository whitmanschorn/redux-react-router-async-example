import React from 'react';
const marginRight = { marginRight: '20px' };
const contentStyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center'  };

import PieChart from '../charts/PieChart';

const data = [2704659, 4499890, 2159981, 3853788, 14106543, 8819342, 612463];
export default class About extends React.Component {

  render () {
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
        </div>
      </div>
    );
  }
}
