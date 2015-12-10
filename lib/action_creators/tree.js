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

export default {
  selectNodeAction,
  deleteNodeAction,
  addNodeAction
};
