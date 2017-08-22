import update from 'immutability-helper';
import initialState from './initialState';
import * as HealthTypes from '../actions/types/health';

export default function health(state = initialState.health, action) {
  switch (action.type) {
    case HealthTypes.UPDATE_CURRENT_HP:
      return update(state, {hitPoints: {current: {$set: action.newValue}}});
    case HealthTypes.UPDATE_CURRENT_STAMINA:
      return update(state, {staminaPoints: {current: {$set: action.newValue}}});
    case HealthTypes.UPDATE_CURRENT_RESOLVE:
      return update(state, {resolvePoints: {current: {$set: action.newValue}}});
    case HealthTypes.UPDATE_HEALTH_CLASS_CONTRIBUTIONS:
      const hitPointDifference = action.newHitPointClassContribution - state.hitPoints.classContribution;
      const newHitPointTotal = state.hitPoints.total + hitPointDifference;
      const newCurrentHitPoints = Math.max(state.hitPoints.current + hitPointDifference, 0);
      const staminaDifference = action.newStaminaPointClassContribution - state.staminaPoints.classContribution;
      const newStaminaPointTotal = state.staminaPoints.total + staminaDifference;
      const newCurrentStaminaPoints = Math.max(state.staminaPoints.current + staminaDifference, 0);
      return update(state, {
        hitPoints: {
          total: { $set: newHitPointTotal },
          classContribution: {$set: action.newHitPointClassContribution},
          current: { $set: newCurrentHitPoints }
        },
        staminaPoints: {
          total: {$set: newStaminaPointTotal},
          classContribution: {$set: action.newStaminaPointClassContribution},
          current: { $set: newCurrentStaminaPoints }
        }
      });
    case HealthTypes.UPDATE_STAMINA_CONSTITUTION_CONTRIBUTION:
      const staminaPointDifference = action.constitutionModifier - state.staminaPoints.constitutionContribution;
      const newStaminaPointTotalConstitution = state.staminaPoints.total + staminaPointDifference;
      const newCurrentStaminaPointsConstitution = Math.max(state.staminaPoints.current + staminaPointDifference, 0);
      return update(state, {
        staminaPoints: {
          total: {$set: newStaminaPointTotalConstitution},
          constitutionContribution: {$set: action.constitutionModifier},
          current: { $set: newCurrentStaminaPointsConstitution }
        }
      });
    case HealthTypes.UPDATE_KEY_ABILITY_CONTRIBUTION:
      const resolvePointsDifference = action.keyAbilityModifier - state.resolvePoints.keyAbilityContribution;
      const newResolvePoints = state.resolvePoints.total + resolvePointsDifference;
      const newCurrentResolvePoints = Math.max(state.resolvePoints.current + resolvePointsDifference, 0);
      if (newResolvePoints < 1) {
        return state;
      }

      return update(state, {
        resolvePoints: {
          total: {$set: newResolvePoints},
          keyAbilityContribution: {$set: action.keyAbilityModifier},
          current: { $set: newCurrentResolvePoints }
        }
      });
    default:
      return state;
  }
}