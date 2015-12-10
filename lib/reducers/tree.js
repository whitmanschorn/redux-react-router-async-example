import * as constants from '../constants';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
const defaultRootId = 'node:1';
const defaultRootChildId = 'node:2';

const defaultRoot = {
  filters: [],
  id: defaultRootId,
  children: [defaultRootChildId],
  parentId: null,
};

const defaultRootChild = {
  filters: [],
  id: defaultRootChildId,
  children: [],
  parentId: defaultRootId,
};

const initialState = Immutable.fromJS({
  selectedNodeId: defaultRootId,
  rootNodeId: defaultRootId,
  nodeMap: {
    [defaultRootId]: defaultRoot,
    [defaultRootChildId]: defaultRootChild,
  },
});

const actionHandlers = {
  [constants.ADD_NODE]: (state, action) => {
    // add new node
    const stateWithNode = state.setIn(['nodeMap', action.newNode.id], Immutable.fromJS(action.newNode));
    console.log('action.newNode.id: ' + action.newNode.id);
    console.log('nodeMap result');
    console.log(stateWithNode.getIn(['nodeMap', action.selectedNodeId]));
    return stateWithNode.updateIn(['nodeMap', action.selectedNodeId, 'children'], list => list.push(action.newNode.id));
  },
  [constants.DELETE_NODE]: (state, action) => {
    // add new node
    const node = state.getIn(['nodeMap', action.selectedNodeId]);
    const stateWithoutNode = state.deleteIn(['nodeMap', action.selectedNodeId], action.selectedNodeId);
    return stateWithoutNode.setIn(['nodeMap', node.get('parentId'), 'children'],
      stateWithoutNode.getIn(['nodeMap', node.get('parentId'), 'children'])
        .filter((value) => value !== action.selectedNodeId));
  },
  [constants.SELECT_NODE]: (state, action) => state.set('selectedNodeId', action.selectedNodeId)
};

export default createReducer(initialState, actionHandlers);
