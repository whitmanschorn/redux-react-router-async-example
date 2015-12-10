import React, { PropTypes } from 'react';
const nodeStyle = {
  border: '1px solid',
  borderColor: '#000',
  margin: 10,
  padding: 10,
  width: 250,
  display: 'inline-block',
};
export default class TreeNode extends React.Component {

  static propTypes = {
    node: React.PropTypes.object.isRequired,
    selectNodeAction: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }

  render () {
    let finalNodeStyle = Object.assign({}, nodeStyle);
    finalNodeStyle.borderColor = this.props.isSelected ? '#299CD7' : '#000';
    return (
      <div style={finalNodeStyle}>
        {this.props.node.id}
        <br/>
        selected: {this.props.isSelected ? 'true' : 'false'}
        <br/>
        <button onClick={() => this.props.selectNodeAction(this.props.node.id)}>select</button>
      </div>
    );
  }
}
