import Character from '../models/character';
import * as Abilities from '../rules/abilities';
import * as Races from '../rules/races';
import * as ThemeTypes from '../rules/themes';
import * as Classes from '../rules/classes';
import skillsArray, * as Skills from '../rules/skills';
import * as SavingThrows from '../rules/savingThrows';
import * as AttackBonuses from '../rules/attackBonuses';

const abilityPoints = {
    [Abilities.STRENGTH]: 0,
    [Abilities.DEXTERITY]: 0,
    [Abilities.CONSTITUTION]: 0,
    [Abilities.INTELLIGENCE]: 0,
    [Abilities.WISDOM]: 0,
    [Abilities.CHARISMA]: 0
};

const skillBonuses = {};

for(let skill in skillsArray) {
    skillBonuses[skill] = {
        ranks: 0,
        misc: 0,
        isExtraClassSkill: false
    };
}


export default {
    character: new Character({
        race: Races.HUMAN,
        theme: ThemeTypes.THEMELESS,
        class: Classes.ENVOY,
        gender: '',
        homeWorld: '',
        alignment: '',
        deity: '',
        description: ''
    }),
    initiative: 0,
    abilityScores: {
        defaultThemeBonus: Abilities.STRENGTH,
        defaultRaceBonus: Abilities.STRENGTH,
        abilityPoints
    },
    armor: { 
        name: '',
        penalty: 0,
        maxDexterity: 10,
        speedAdjustment: 0,
        bonuses: {misc: 0, damageReduction: '', resistances: '', energy: 0, kinetic: 0 }
    },
    currentHealth: { hitPoints: 10 , staminaPoints: 6, resolvePoints: 1 },
    skills: {
        professions: {
            [Skills.PROFESSION1]: { name: '', ability: Abilities.CHARISMA },
            [Skills.PROFESSION2]: { name: '', ability: Abilities.CHARISMA },
        },
        skillBonuses        
    },
    savingThrows: {
        [SavingThrows.FORTITUDE]: { misc: 0 },
        [SavingThrows.REFLEX]: { misc: 0 },
        [SavingThrows.WILL]: { misc: 0 }
    },
    attackBonuses: {
        [AttackBonuses.MELEE]: { misc: 0 },
        [AttackBonuses.RANGED]: { misc: 0 },
        [AttackBonuses.THROWN]: { misc: 0 }
    },
    weapons: [],
    abilities: '',
    spells: []
}