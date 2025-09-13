import SubversionActorBase from "./base-actor.mjs";

export default class SubversionCharacter extends SubversionActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.lineage = new fields.StringField();
    schema.origin = new fields.StringField();
    schema.background = new fields.StringField();
    schema.caste = new fields.StringField();
    schema.ideology = new fields.StringField();
    schema.fortune = new fields.SchemaField({
      current: new fields.NumberField({ initial: 1 }),
      total: new fields.NumberField({ initial: 1 })
    });
    schema.debt = new fields.StringField();
    //schema.debts = new fields.ArrayField(new fields.StringField());
    schema.value1 = new fields.StringField();
    schema.value2 = new fields.StringField();
    schema.value3 = new fields.StringField();
    //schema.values = new fields.ArrayField(new fields.StringField());
    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    schema.guard = new fields.NumberField({ initial: 1 });
    schema.vigilance = new fields.NumberField({ initial: 1 });
    schema.aegis = new fields.NumberField({ initial: 1 });
    schema.initiative = new fields.NumberField({ initial: 1 });
    schema.armor = new fields.NumberField({ initial: 1 });
    schema.adamant = new fields.NumberField({ initial: 1 });
    
    //schema.consequences = new fields.NumberField({integer: true, initial: 0, min: 0, max: 5 });

    schema.consequences = new fields.SchemaField({
      value: new fields.NumberField({integer: true, initial: 0, min: 0, max: 5 }),
      show: new fields.SchemaField({
        show1: new fields.BooleanField(),
        show2: new fields.BooleanField(),
        show3: new fields.BooleanField(),
        show4: new fields.BooleanField(),
        show5: new fields.BooleanField()
      })
    });

    schema.impulses = new fields.SchemaField({
      names: new fields.StringField(),
      triggers: new fields.StringField(),
      downtime: new fields.StringField()
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.SUBVERSION.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, max: 7 }),
      });
      return obj;
    }, {}));

    schema.skills = new fields.SchemaField(Object.keys(CONFIG.SUBVERSION.skills).reduce((obj, skill) => {
      obj[skill] = new fields.SchemaField({
        label: new fields.StringField(),
        attrLabel: new fields.StringField(),
        rank: new fields.NumberField({ ...requiredInteger, initial: 0, max: 6}),
        attr: new fields.NumberField({ ...requiredInteger, initial: 0 }),
        misc: new fields.NumberField({ ...requiredInteger, initial: 0 }),
        roll: new fields.SchemaField({
          dice: new fields.NumberField({ ...requiredInteger, initial: 0 }),
          mod: new fields.NumberField({ ...requiredInteger, initial: 0 }),
          dulled: new fields.NumberField({ required: false, nullable: true, integer: true }),
          reliable: new fields.NumberField({ required: false, nullable: true, integer: true }),
          value: new fields.StringField()
        })
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      //this.abilities[key].mod = Math.floor((this.abilities[key].value - 10) / 2);
      // Handle ability label localization.
      this.abilities[key].label = game.i18n.localize(CONFIG.SUBVERSION.abilities[key]) ?? key;
      this.abilities[key].abbr = game.i18n.localize(CONFIG.SUBVERSION.abilityAbbreviations[key]) ?? key;
    }

    for (const key in this.skills) {
      var abiKey = CONFIG.SUBVERSION.skillDefaults[key];
      this.skills[key].attr = this.abilities[abiKey].value;
      this.skills[key].label = game.i18n.localize(CONFIG.SUBVERSION.skills[key]) ?? key;
      this.skills[key].attrLabel = game.i18n.localize(CONFIG.SUBVERSION.abilityAbbreviations[abiKey]) ?? key;

      this.skills[key].roll.dice = 3 + this.skills[key].rank;
      this.skills[key].roll.mod = this.skills[key].attr + this.skills[key].misc;

      this.skills[key].roll.value = "" + this.skills[key].roll.dice + "D6+" + this.skills[key].roll.mod;
    }

    for (var i = 1; i <= 5; i++ ) {
        this.consequences.show['show' + i] = this.consequences.value >= i;
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.abilities) {
      for (let [k,v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;

    return data
  }

    /**
   * Set the Consequence value using the checkbox UI
   * @param {number} index The number of the consequence box clicked
   */
  setConsequenceValue(index) {
    if( this.consequences.show[index] ) {
      this.consequences.value = index;
    }
    else {
      this.consequences.value = index - 1;
    }
  }
}