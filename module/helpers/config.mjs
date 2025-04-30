export const SUBVERSION = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
SUBVERSION.abilities = {
  agi: 'SUBVERSION.Ability.Agi.long',
  wit: 'SUBVERSION.Ability.Wit.long',
  awr: 'SUBVERSION.Ability.Awr.long',
  bwn: 'SUBVERSION.Ability.Bwn.long',
  cha: 'SUBVERSION.Ability.Cha.long',
  wil: 'SUBVERSION.Ability.Wil.long',
};

SUBVERSION.abilityAbbreviations = {
  agi: 'SUBVERSION.Ability.Agi.abbr',
  wit: 'SUBVERSION.Ability.Wit.abbr',
  awr: 'SUBVERSION.Ability.Awr.abbr',
  bwn: 'SUBVERSION.Ability.Bwn.abbr',
  cha: 'SUBVERSION.Ability.Cha.abbr',
  wil: 'SUBVERSION.Ability.Wil.abbr',
};

SUBVERSION.skills = {
  art: 'SUBVERSION.Skill.Art',
  dec: 'SUBVERSION.Skill.Dec',
  hum: 'SUBVERSION.Skill.Hum',
  inf: 'SUBVERSION.Skill.Inf',
  mag: 'SUBVERSION.Skill.Mag',
  mel: 'SUBVERSION.Skill.Mel',
  obs: 'SUBVERSION.Skill.Obs',
  phy: 'SUBVERSION.Skill.Phy',
  pil: 'SUBVERSION.Skill.Pil',
  ran: 'SUBVERSION.Skill.Ran',
  sci: 'SUBVERSION.Skill.Sci',
  tec: 'SUBVERSION.Skill.Tec'
}

SUBVERSION.skillDefaults = {
  art: 'cha',
  dec: 'cha',
  hum: 'wit',
  inf: 'cha',
  mag: 'wil',
  mel: 'agi',
  obs: 'awr',
  phy: 'agi',
  pil: 'awr',
  ran: 'agi',
  sci: 'wit',
  tec: 'wit'
}
