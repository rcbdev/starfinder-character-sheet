import update from 'immutability-helper';
import initialState from './initialState';
import Character from '../models/character';
import * as AbilityActions from '../actions/types/abilityScores';
import * as CharacterActions from '../actions/types/character';
import races from '../rules/races';
import themes from '../rules/themes';

export default function abilityScores(state = initialState.abilityScores, action) {
  switch (action.type) {
    case AbilityActions.UPDATE_ABILITY_SCORE:
      const abilityScore = findAbilityByName(state, action.ability);
      if(abilityScore){
        const newAbilityScore = abilityScore.updateTo(action.newScore);
        return replaceAbilityScore(state, abilityScore, newAbilityScore);
      }
      return state;
    case CharacterActions.CHANGE_RACE:
      const newRace = races.find(r => r.name == action.newRace);
      if(newRace) {
        let newState = state.map(abilityScore => {
          var newRaceModifier = newRace.abilityModifiers.find(m => m.ability == abilityScore.name);
          var newModifier = newRaceModifier ? newRaceModifier.modifier : 0;
          return update(abilityScore, {racialModifier: {$set: newModifier}})
        });
        const nullAbilities = newRace.abilityModifiers.filter(a => !a.ability);
        if(nullAbilities.length > 0) {
          const defaultRacial = findDefaultRacial(state);
          const newAbility = update(defaultRacial, {racialModifier: {$set: nullAbilities[0].modifier}});
          newState = replaceAbilityScore(newState, defaultRacial, newAbility);
        }
        return newState;
      }
      return state;
    case CharacterActions.CHANGE_THEME:
      const newTheme = themes.find(r => r.name == action.newTheme);
      if(newTheme) {
        let newState = state.map(abilityScore => {
          var newThemeModifier = newTheme.abilityModifiers.find(m => m.ability == abilityScore.name);
          var newModifier = newThemeModifier ? newThemeModifier.modifier : 0;
          return update(abilityScore, {themeModifier: {$set: newModifier}})
        });
        const nullAbilities = newTheme.abilityModifiers.filter(a => !a.ability);
        if(nullAbilities.length > 0) {
          const defaultTheme = findDefaultTheme(state);
          const newAbility = update(defaultTheme, {themeModifier: {$set: nullAbilities[0].modifier}});
          newState = replaceAbilityScore(newState, defaultTheme, newAbility);
        }
        return newState;
      }
      return state;
    case AbilityActions.SET_DEFAULT_RACIAL:
      const racialAbilityScore = findAbilityByName(state, action.ability);
      const currentDefaultRacial = findDefaultRacial(state);
      if(racialAbilityScore && abilityScore != currentDefaultRacial) {
        const currentRacialModifier = currentDefaultRacial.racialModifier;
        const newDefaultRacial = update(racialAbilityScore, {isDefaultRacialModifier: {$set: true}, racialModifier: {$set: currentRacialModifier}});
        let newState = replaceAbilityScore(state, racialAbilityScore, newDefaultRacial);
        if(currentDefaultRacial) {
          const oldDefaultRacial = update(currentDefaultRacial, {isDefaultRacialModifier: {$set: false}, racialModifier: {$set: 0}});
          newState = replaceAbilityScore(newState, currentDefaultRacial, oldDefaultRacial);
        }
        
        return newState;
      }
      return state;
    case AbilityActions.SET_DEFAULT_THEME:
      const themeAbilityScore = findAbilityByName(state, action.ability);
      const currentDefaultTheme = findDefaultTheme(state);   
      if(themeAbilityScore && themeAbilityScore != currentDefaultTheme) {
        const currentThemeModifier = currentDefaultTheme.themeModifier;
        const newDefaultTheme = update(themeAbilityScore, {isDefaultThemeModifier: {$set: true}, themeModifier: {$set: currentThemeModifier}});
        let newState = replaceAbilityScore(state, themeAbilityScore, newDefaultTheme);
        if(currentDefaultTheme) {
          const oldDefaultTheme = update(currentDefaultTheme, {isDefaultThemeModifier: {$set: false}, themeModifier: {$set: 0}});
          newState = replaceAbilityScore(newState, currentDefaultTheme, oldDefaultTheme);
        }
        
        return newState;
      }
      return state;
    default:
      return state;
  }
}

function replaceAbilityScore(state, old, replacement) {
  return update(state, {$splice: [[state.indexOf(old), 1, replacement]]})
}

function findAbilityByName(state, name) {
  return state.find(a => a.name == name)
}

function findDefaultRacial(state) {
  return state.find(a => a.isDefaultRacialModifier);
}

function findDefaultTheme(state) {
  return state.find(a => a.isDefaultRacialModifier);
}