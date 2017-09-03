import update from 'immutability-helper';
import initialState from './initialState';
import * as SpellActions from '../actions/types/spells';
import { LOAD_STATE } from '../actions/types/load';

export default function spells(state = initialState.spells, action) {
  switch (action.type) {
    case LOAD_STATE:
      return action.state.spells;
    case SpellActions.ADD_SPELL:
      return update(state, { $push: [action.spell] });
    case SpellActions.REMOVE_SPELL:
      return state.filter(s => !(s.name === action.spell.name && s.class === action.spell.class) );
    default:
      return state;
  }
}