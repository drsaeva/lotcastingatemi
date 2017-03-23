import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { authStateReducer } from 'redux-auth'
import * as c from '../utils/constants'

import { defaultState } from './defaultState.js'
import CharacterReducer from './characterReducer.js'

function appReducer(state = defaultState, action) {
  switch (action.type) {
  case c.REQUEST_CHAR:
  case c.REQUEST_CHRONICLE:
    return {... state, isFetching: true, isError: false }

  case c.RECEIVE_CHAR:
  case c.RECEIVE_CHRONICLE:
    return {... state, isFetching: false, isError: false }

  case c.UPDATE_CHAR:
  case c.UPDATE_WEAP:
  case c.UPDATE_MERIT:
  case c.UPDATE_QC:
    return {... state, isFetching: true }

  case c.UPDATE_CHAR_COMPLETE:
  case c.UPDATE_WEAP_COMPLETE:
  case c.UPDATE_MERIT_COMPLETE:
  case c.UPDATE_QC_COMPLETE:
    return {... state, isFetching: false }

  default:
    return state
  }

}

const lcaApp = combineReducers({
  auth: authStateReducer,
  router: routerReducer,
  app: appReducer,
  character: CharacterReducer
});

export default lcaApp