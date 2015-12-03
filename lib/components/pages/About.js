import React from 'react'
const marginRight = { marginRight: '20px' }

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
        <div className="content">
         Advanced insights and reporting
         on populations with behavioral health conditions.
        </div>
      </div>
    )
  }
}
