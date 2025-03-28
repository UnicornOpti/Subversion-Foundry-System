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
      current: new fields.NumberField({required: false, integer: true, nullable: true, min: 0 }),
      total: new fields.NumberField({required: false, integer: true, nullable: true, min: 0})
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

    schema.guard = new fields.NumberField({required: false, integer: true, nullable: true, min: 0 });
    schema.vigilance = new fields.NumberField({required: false, integer: true, nullable: true, min: 0 });
    schema.aegis = new fields.NumberField({required: false, integer: true, nullable: true, min: 0 });
    schema.initiative = new fields.NumberField({required: false, integer: true, nullable: true });
    schema.armor = new fields.NumberField({required: false, integer: true, nullable: true, min: 0 });
    schema.adamant = new fields.NumberField({required: false, integer: true, nullable: true, min: 0 });

    schema.health = new fields.SchemaField({
      current: new fields.NumberField({required: false, integer: true, nullable: true, min: 0 }),
      max:  new fields.NumberField({required: false, integer: true, nullable: true, min: 0 })
    });
    schema.animity = new fields.SchemaField({
      current: new fields.NumberField({required: false, integer: true, nullable: true, min: 0 }),
      max:  new fields.NumberField({required: false, integer: true, nullable: true, min: 0 })
    });
    schema.grit = new fields.SchemaField({
      current: new fields.NumberField({required: false, integer: true, nullable: true, min: 0 }),
      max:  new fields.NumberField({required: false, integer: true, nullable: true, min: 0 })
    });
    
    schema.consequences = new fields.NumberField({required: false, integer: true, min: 0, max: 5 });
    
    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.SUBVERSION.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      this.abilities[key].mod = Math.floor((this.abilities[key].value - 10) / 2);
      // Handle ability label localization.
      this.abilities[key].label = game.i18n.localize(CONFIG.SUBVERSION.abilities[key]) ?? key;
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
}