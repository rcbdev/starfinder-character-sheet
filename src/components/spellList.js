import React, { Component } from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import SpellLevel from './spellLevel';
import spells from '../rules/spells';

export default class SpellList extends Component {
  render() {
    const levels = [...Array(7).keys()];
    const content = [];
    for (let levelIndex in levels) {
      const level = levels[levelIndex];
      const knownSpells = this.props.knownSpells.filter(s => s.level === level);
      const spellsAtLevel = spells.filter(s => s.level === level);
      content.push(<SpellLevel key={level} level={level} knownSpells={knownSpells} spellsAtLevel={spellsAtLevel} removeSpell={this.props.removeSpell} addSpell={this.props.addSpell}/>);
    }

    return (
      <Card raised={true}>
        <CardHeader title="Spells" />
        <CardContent>
          {content}
        </CardContent>
      </Card>
    );
  }
}