import React from 'react'

export default class Forbidden extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Forbidden</h1>
        </div>
        <div className="content">
          <p>
           You are not authorized to see the this page. Sorry!
          </p>
        </div>
      </div>
    )
  }
}
