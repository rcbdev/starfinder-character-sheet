import * as types from './types/spells';

export function addSpell(spell, spellClass) {
  return {
    type: types.ADD_SPELL,
    spell: {name: spell, class: spellClass}
  }
}

export function removeSpell(spell, spellClass) {
  return {
    type: types.REMOVE_SPELL,
    spell: {name: spell, class: spellClass}
  }
}