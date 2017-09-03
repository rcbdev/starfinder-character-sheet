import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import './App.css';
import AbilityScoresContainer from './containers/abilityScoresContainer';
import CharacterStatsContainer from './containers/characterStatsContainer';
import InitiativeContainer from './containers/initiativeContainer';
import ArmorContainer from './containers/armorContainer';
import HealthContainer from './containers/healthContainer';
import SkillContainer from './containers/skillContainer';
import SavingThrowsContainer from './containers/savingThrowContainer';
import AttackBonusContainer from './containers/attackBonusContainer';
import SaveContainer from './containers/saveContainer';
import WeaponsContainer from './containers/weaponsContainer';
import AbilitiesContainer from './containers/abilitiesContainer';
import SpellsContainer from './containers/spellsContainer';

class App extends Component {
  render() {
    return (
      <Paper style={{padding: '20px', margin: '5px'}}>
        <SaveContainer />
        <Grid container>
          <Grid item>
            <CharacterStatsContainer />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <div style={{margin: '20px'}}>
              <AbilityScoresContainer />
            </div>
            <div style={{margin: '20px'}}>
              <SkillContainer />
            </div>
            <div style={{margin: '20px'}}>
              <AbilitiesContainer />
            </div>
          </Grid>
          <Grid item>
            <div style={{margin: '20px'}}>
              <InitiativeContainer />
            </div>
            <div style={{margin: '20px'}}>
              <HealthContainer />
            </div>
            <div style={{margin: '20px'}}>
              <ArmorContainer />
            </div>
            <div style={{margin: '20px'}}>
              <SavingThrowsContainer />
            </div>
            <div style={{margin: '20px'}}>
              <AttackBonusContainer />
            </div>
            <div style={{margin: '20px'}}>
              <WeaponsContainer />
            </div>
            <div style={{margin: '20px'}}>
              <SpellsContainer />
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default App;
