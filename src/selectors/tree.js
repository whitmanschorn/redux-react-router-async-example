import { createSelector } from 'reselect';
import { DEFAULT_METRIC } from '../constants';

const selectedNodeSelector = state => state.tree.get('selectedNodeId');
const nodeMapSelector = state => state.tree.get('nodeMap');
const rootSelector = state => state.tree.get('rootNodeId');
const currentMetricSelector = state => state.router.location.query.metric || DEFAULT_METRIC;
const selectedNodeDataSelector = createSelector(
  selectedNodeSelector,
  nodeMapSelector,
  currentMetricSelector,
  (selectedNodeId, nodeMap, currentMetric) => {
    let dataObject = nodeMap.getIn([selectedNodeId, 'result']);
    if (dataObject && dataObject[currentMetric])
      return dataObject[currentMetric];
    else
      return [];
  }
  );

export default createSelector(
  selectedNodeSelector,
  selectedNodeDataSelector,
  nodeMapSelector,
  rootSelector,
  currentMetricSelector,
  (selectedNodeId, selectedNodeData, nodeMap, rootNodeId, currentMetric) => ({
    selectedNodeId,
    selectedNodeData,
    nodeMap,
    rootNodeId,
    currentMetric
  })
  );
