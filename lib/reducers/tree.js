import * as constants from '../constants';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
const defaultRootId = 'node:1';
const defaultRootChildId = 'node:2';

const defaultRoot = {
  filters: [],
  id: defaultRootId,
  children: [defaultRootChildId],
};

const defaultRootChild = {
  filters: [],
  id: defaultRootChildId,
  children: [],
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
    const stateWithNode = state.setIn(['nodeMap', action.newNode.id], action.newNode);
    return stateWithNode.updateIn(['nodeMap', action.selectedNodeId, 'children'], list => list.push(action.newNode.id));
  },
  [constants.SELECT_NODE]: (state, action) => state.set('selectedNodeId', action.selectedNodeId)
};

export default createReducer(initialState, actionHandlers);
