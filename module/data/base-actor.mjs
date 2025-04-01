import SubversionDataModel from "./base-model.mjs";

export default class SubversionActorBase extends SubversionDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.pronouns = new fields.StringField();
    schema.health = new fields.SchemaField({
      current: new fields.NumberField({ initial: 1 }),
      max:  new fields.NumberField({ initial: 1 })
    });
    schema.animity = new fields.SchemaField({
      current: new fields.NumberField({ initial: 1 }),
      max:  new fields.NumberField({ initial: 1 })
    });
    schema.grit = new fields.SchemaField({
      current: new fields.NumberField({ initial: 1 }),
      max:  new fields.NumberField({ initial: 1 })
    });
    schema.biography = new fields.StringField({ required: true, blank: true }); // equivalent to passing ({initial: ""}) for StringFields

    return schema;
  }

}