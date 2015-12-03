import React from 'react'
import { Link } from 'react-router'
const logoutLink = (<Link to="/logout">log out</Link>)
const secretAreaLink = (
  <Link to="/account/secret-area">
    super secret area
  </Link>)

export default class AccountHome extends React.Component {
  render () {
    return (
      <div>
        <div className="header">
          <h1>Account</h1>
        </div>
        <div className="content">
          <p>
            Congratulations, you've entered an area secured by login!
            <br/>
            You can {logoutLink} or try to access a {secretAreaLink} without
             necessary permissions.
          </p>
        </div>
      </div>
    )
  }
}
