import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SkillsList from '../components/skillsList';
import skills from '../rules/skills';
import classes from '../rules/classes';
import * as Abilities from '../rules/abilities';
import AbilityManager from '../models/abilityManager';
import * as skillActions from '../actions/skillActions';

function mapStateToProps(state) {
  const skillsToMap = {};
  const abilityManager = new AbilityManager();
  const currentClass = classes[state.character.class];
  for(let skill in skills) {
    const skillDetails = skills[skill];    
    skillsToMap[skill] = {
      ability: skillDetails.ability,
      isTrainedOnly: skillDetails.trainedOnly,
      ranks: state.skills.skillBonuses[skill].ranks,
      abilityModifier: abilityManager.getAbilityScoreFromState(state, skillDetails.ability).modifier,
      miscModifier: state.skills.skillBonuses[skill].misc,
      isClassSkill: currentClass.classSkills.includes(skill),
      armorCheckPenaltyApplies: skillDetails.armorCheckPenaltyApplies,
      armorCheckPenalty: skillDetails.armorCheckPenaltyApplies ? state.armor.penalty : 0
    }
  } 
    return {
      skills: skillsToMap,
      skillRanksPerLevel: currentClass.skillRanksPerLevel + abilityManager.getAbilityScoreFromState(state, Abilities.INTELLIGENCE).modifier
    };
}

function mapDispatchToProps(dispatch) {
  return {
      skillActions: bindActionCreators(skillActions, dispatch)
  };
}


const SkillContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillsList);

export default SkillContainer;