import { createSelector } from 'reselect';
import { DEFAULT_METRIC } from '../constants';

const selectedNodeSelector = state => state.tree.get('selectedNodeId');
const nodeMapSelector = state => state.tree.get('nodeMap');
const rootSelector = state => state.tree.get('rootNodeId');
const currentViewSelector = state => state.router.location.query.metric || DEFAULT_METRIC;
const selectedNodeDataSelector = createSelector(
  selectedNodeSelector,
  nodeMapSelector,
  (selectedNodeId, nodeMap) => {
    let t = nodeMap.getIn([selectedNodeId, 'result']);
    return t || [];
  }
  );

export default createSelector(
  selectedNodeSelector,
  selectedNodeDataSelector,
  nodeMapSelector,
  rootSelector,
  currentViewSelector,
  (selectedNodeId, selectedNodeData, nodeMap, rootNodeId, currentView) => ({
    selectedNodeId,
    selectedNodeData,
    nodeMap,
    rootNodeId,
    currentView
  })
  );
