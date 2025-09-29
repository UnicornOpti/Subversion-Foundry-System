import SubversionItemBase from "./base-item.mjs";

export default class SubversionFeature extends SubversionItemBase   {
static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.maxUses = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1 });
    schema.currentUses = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0 });

    schema.roll = new fields.SchemaField({
      diceNum: new fields.NumberField({ required: false, integer: true, initial: 1, min: 0 }),
      diceSize: new fields.StringField({ initial: "d20" }),
      diceBonus: new fields.StringField({ initial: "+@bwn.value" })
    })

    schema.formula = new fields.StringField({ blank: true });
    return schema;
  }

prepareDerivedData() {
    // Build the formula dynamically using string interpolation
    const roll = this.roll;

    this.formula = `${roll.diceNum}${roll.diceSize}${roll.diceBonus}`
  }
}