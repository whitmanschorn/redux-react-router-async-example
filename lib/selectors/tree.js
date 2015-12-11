import { createSelector } from 'reselect';

const selectedNodeSelector = state => state.tree.get('selectedNodeId');
const nodeMapSelector = state => state.tree.get('nodeMap');
const rootSelector = state => state.tree.get('rootNodeId');
const selectedNodeDataSelector = state => state.tree.get('selectedNodeData');

export default createSelector(
  selectedNodeSelector,
  selectedNodeDataSelector,
  nodeMapSelector,
  rootSelector,
  (selectedNodeId, selectedNodeData, nodeMap, rootNodeId) => ({
    selectedNodeId,
    selectedNodeData,
    nodeMap,
    rootNodeId
  })
  );
