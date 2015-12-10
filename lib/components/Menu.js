import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as applicationActions from '../actions/application';
import MenuListItem from './MenuListItem';
import MiniMap from './MiniMap';

const menuItems = [
  { text: 'Graphs', link: '/stargazers/', icon: 'fa fa-star' },
  { text: 'Account', link: '/account', icon: 'fa fa-user' },
  { text: 'About', link: '/about', icon: 'fa fa-dot-circle-o' },
];

@connect(({ application }) => ({ application }), applicationActions)
export default class Menu extends React.Component {

  static propTypes = {
    activeClass: PropTypes.string.isRequired,
    application: PropTypes.object.isRequired,
  }

  render () {
    return (
      <div id="menu" ref="menu" className={this.props.activeClass}>
        <div className="pure-menu">
          <Link to="/" className="pure-menu-heading">Quartet DE</Link>

          <ul className="pure-menu-list">
            {menuItems.map((item, i) => <MenuListItem {...item} key={i} />)}
          </ul>
          <MiniMap application={this.props.application} />
        </div>
      </div>
    );
  }
}
