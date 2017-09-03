import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as spellActions from '../actions/spellActions';
import SpellsList from '../components/spellList';
import spells from '../rules/spells';

function mapStateToProps(state) {
  const knownSpells = spells.filter(s => state.spells.some(a => a.name === s.name && a.class === s.class));
  return {
      knownSpells: knownSpells
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(spellActions, dispatch);
}

const SpellsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SpellsList);

export default SpellsContainer;