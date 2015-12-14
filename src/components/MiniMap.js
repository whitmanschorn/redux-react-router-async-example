import React, { PropTypes, Component } from 'react';

export default class MenuListItem extends Component {

  // TODO: write a selector for the relevant miniMap data,
  //pass down optionally through Menu
  static propTypes = {
    application: PropTypes.object.isRequired,
  }

  render () {
    return (<div style={{ padding: 16 }}>Minimap Here</div>);
  }
}
