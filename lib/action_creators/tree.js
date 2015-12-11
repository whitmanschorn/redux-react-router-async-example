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
    type: constants.REQUEST_POSTS,
    reddit
  };
}

function receiveData (nodeId, json) {
  return {
    type: constants.RECEIVE_POSTS,
    nodeId,
    result: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

function fetchData (nodeId) {
  return dispatch => {
    dispatch(requestData(nodeId));
    return fetch(`http://www.reddit.com/r/${nodeId}.json`)
      .then(req => req.json())
      .then(json => dispatch(receiveData(nodeId, json)));
  };
}

function shouldFetchData (state, nodeId) {
  console.log(state);
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
