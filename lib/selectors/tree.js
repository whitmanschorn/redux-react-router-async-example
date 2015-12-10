import { createSelector } from 'reselect';

const selectedNodeSelector = state => state.tree.get('selectedNodeId');
const nodeMapSelector = state => state.tree.get('nodeMap');
const rootSelector = state => state.tree.get('rootNodeId');

export default createSelector(
  selectedNodeSelector,
  nodeMapSelector,
  rootSelector,
  (selectedNodeId, nodeMap, rootNodeId) => ({
    selectedNodeId,
    nodeMap,
    rootNodeId
  })
);
