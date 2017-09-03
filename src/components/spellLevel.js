import React, { Component } from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog';
import KnownSpellDisplay from './knownSpellDisplay';
import Select from './utilities/select';
import * as classes from '../rules/classes';

export default class SpellLevel extends Component {
  constructor(props) {
    super();
    this.state = {
      addSpellDialogOpen: false,
      selectedSpell: null,
      availableSpells: this.getSpellsForClass(classes.MYSTIC, props.spellsAtLevel, props.knownSpells),
      selectedClass: classes.MYSTIC
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.knownSpells !== nextProps.knownSpells) {
      const currentClass = this.state.selectedClass;
      this.setState(() => { return {availableSpells: this.getSpellsForClass(currentClass, nextProps.spellsAtLevel, nextProps.knownSpells)}});
    }
  }

  showAddSpellDialog = () => {
    this.setState(() => { return { addSpellDialogOpen: true }});
  }

  cancelAddingSpell = () => {
    this.setState(() => { return { addSpellDialogOpen: false, selectedSpell: null }});
  }

  changeClass = (value) => {
    const selectedClass = value;
    const spellsAtLevel = this.getSpellsForClass(selectedClass, this.props.spellsAtLevel, this.props.knownSpell);
    this.setState(() => { return  { selectedClass: selectedClass, availableSpells:  spellsAtLevel, selectedSpell: null }});
  }

  getSpellsForClass = (selectedClass, spellsAtLevel, knownSpells) => {
    if(!spellsAtLevel) {
      return [];
    }
    return spellsAtLevel.filter(s => s.class === selectedClass && !knownSpells.some(a => a.name === s.name));
  }

  setSelectedSpell = (value) => {
    const selectedSpell = this.props.spellsAtLevel.find(s => s.name === value);
    this.setState(() => { return { selectedSpell: selectedSpell }})
  }

  addSpell = () => {
    if(this.state.selectedSpell) {
      this.props.addSpell(this.state.selectedSpell.name, this.state.selectedSpell.class);
    }
    this.cancelAddingSpell();
  }

  render() {
    const content = [];
    for (let knownSpell in this.props.knownSpells) {
      const spell = this.props.knownSpells[knownSpell];
      content.push(<KnownSpellDisplay key={knownSpell} spell={spell} removeSpell={() => { this.props.removeSpell(spell.name, spell.class); }}/>);
    }

    const classOptions = [classes.MYSTIC, classes.TECHNOMANCER].map(c => { return {label: c, value: c }});
    return (
      <Card style={{margin: 10}}>
        <CardHeader title={`Level ${this.props.level}`} />
        <CardContent>
          {content}
          <Button onClick={this.showAddSpellDialog}>Add Spell</Button>
          <Dialog open={this.state.addSpellDialogOpen} onRequestClose={this.cancelAddingSpell} >
            <DialogTitle>Add Spell</DialogTitle>
            <DialogContent style={{width:400}}>
              <Select options={classOptions} onChange={this.changeClass} value={this.state.selectedClass}/>
              <Select options={this.state.availableSpells.map(s => { return {label: s.name, value: s.name }})} onChange={this.setSelectedSpell} value={this.state.selectedSpell ? this.state.selectedSpell.name : ''}/>
              <DialogContentText style={{minHeight: 80}}>{this.state.selectedSpell !== null ? this.state.selectedSpell.description : ''}</DialogContentText>
              <Button onClick={this.addSpell}>Add Spell</Button>
              <Button onClick={this.cancelAddingSpell}>Cancel</Button>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  }
}