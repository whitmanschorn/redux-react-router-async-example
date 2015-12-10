import React, { PropTypes } from 'react';
import TreeNode from './TreeNode';
import Immutable from 'immutable';

export default class TreeContainer extends React.Component {

  static propTypes = {
    rootNodeId: PropTypes.string.isRequired,
    nodeMap: React.PropTypes.instanceOf(Immutable.Map),
    selectedNodeId: PropTypes.string.isRequired,
    selectNodeAction: PropTypes.func.isRequired,
    deleteNodeAction: PropTypes.func.isRequired,
  }

  // takes in immutable tree, spits out mutable 2D array
  sortTreeByLevels (rootNodeId, nodeMap) {
    let plainNodeMap = nodeMap.toJS();
    let remainingNodes = [plainNodeMap[rootNodeId]];
    let answer = [];
    let distIndex = 0;
    while (remainingNodes.length) {
      let nextRemainingNodes = [];
      for (let singleNode in remainingNodes) {
        let newNodes = remainingNodes[singleNode].children.map(childNodeId => {
          return plainNodeMap[childNodeId];
        });
        nextRemainingNodes = nextRemainingNodes.concat(newNodes);
        if (!answer[distIndex])
          answer[distIndex] = [remainingNodes[singleNode]];
        else
          answer[distIndex].push(remainingNodes[singleNode]);

      }
      remainingNodes = nextRemainingNodes;
      distIndex++;
    }

    return answer;
  }

  render () {
    const treeArray = this.sortTreeByLevels(this.props.rootNodeId, this.props.nodeMap);
    let domTree = [];
    for ( let row in treeArray ) {
      let rowArray = treeArray[row];
      for (let item in rowArray) {
        let selectedItem = rowArray[item];
        domTree.push(<TreeNode
          node={selectedItem}
          key={selectedItem.id}
          deleteNodeAction={this.props.deleteNodeAction}
          selectNodeAction={this.props.selectNodeAction}
          isSelected={!!(this.props.selectedNodeId === selectedItem.id)}
        />);
      };
      domTree.push(<hr key={'hr-' + row} />);
    }

    return (
      <div>
        <h1>Root</h1>
        {domTree}
      </div>
    );
  }
}
