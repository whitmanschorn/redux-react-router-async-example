import * as constants from '../constants';

function selectNodeAction (selectedNodeId) {
  return (dispatch) => {
    dispatch({
      type: constants.SELECT_NODE,
      selectedNodeId
    });

  };
}

function deleteNodeAction (selectedNodeId) {
  return (dispatch) => {
    dispatch({
      type: constants.DELETE_NODE,
      selectedNodeId
    });

  };
}
function addNodeAction (newNode, selectedNodeId) {
  return (dispatch) => {
    dispatch({
      type: constants.ADD_NODE,
      newNode,
      selectedNodeId
    });

  };
}

function requestData (reddit) {
  return {
    type: constants.REQUEST_NODE_DATA,
    reddit
  };
}

function receiveData (nodeId, json) {
  return {
    type: constants.RECEIVE_NODE_DATA,
    nodeId,
    result: json.data,
    receivedAt: Date.now()
  };
}

function fetchData (nodeId) {
  return dispatch => {
    dispatch(requestData(nodeId));
    return fetch(`http://localhost:3000/nodes/${nodeId}`)
      .then(req => req.json())
      .then(json => dispatch(receiveData(nodeId, json)));
  };
}

function shouldFetchData (state, nodeId) {
  const result = state.tree.getIn(['nodeMap', nodeId, 'result']);
  if (!result)
    return true;
  else if (result.isFetching)
    return false;
  else
    return result.didInvalidate;
}

export function fetchDataIfNeeded (nodeId) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), nodeId))
      return dispatch(fetchData(nodeId));
  };
}

export default {
  selectNodeAction,
  deleteNodeAction,
  addNodeAction,
  fetchDataIfNeeded
};
