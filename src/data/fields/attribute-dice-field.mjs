import * as SYSTEM_CONST from "../../constants.mjs";

const { DataModel } = foundry.abstract;
const { fields } = foundry.data;

export default class AttributeDiceField extends fields.EmbeddedDataField {
  constructor(options) {
    super(AttributeDiceData, options);
  }
}

class AttributeDiceData extends DataModel {
  static defineSchema() {
    return {
      faces: new fields.NumberField({
        initial: 4,
        required: true,
        integer: true,
        positive: true,
        min: 1,
        choices: CONFIG.POKEYMANZ.diceSteps.reduce((acc, value) => {
          acc[value] = `d${value}`;
          return acc;
        }, {}),
      }),
      modifier: new fields.NumberField({ initial: 0, required: false, integer: true }),
      altCritThreshold: new fields.SchemaField({
        enabled: new fields.BooleanField({ initial: false, required: true, blank: false, nullable: false }),
        value: new fields.NumberField({ 
          initial: null,
          nullable: true,
          choices: [-1, -2],
        }),
      }),
    };
  }

  get formula() {
    const formula = [this._diceFormulaPart, this.modifier].join("+");
    return foundry.dice.Roll.validate(formula) ? formula : `${this._diceFormulaPart}`;
  }

  get label() {
    return game.i18n.localize(this.schema.label);
  }

  _diceFormulaPart = this.altCritThreshold.enabled ? `1d${this.faces}x>=${this.faces + this.altCritThreshold.value}` : `1d${this.faces}x`;

  get diceIcon() {
    return `${SYSTEM_CONST.ASSETS_PATH}/dice/d${this.faces}.svg`;
  }

}
