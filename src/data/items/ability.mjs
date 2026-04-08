import NotesHTMLField from "../fields/notes-html-field.mjs";

export default class AbilityData extends foundry.abstract.TypeDataModel {
  static LOCALIZATION_PREFIXES = ["POKEYMANZ.BASE_ITEM"];

  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      type: new fields.SchemaField({
        value: new fields.StringField({
          initial: "ability",
          required: true,
          textSearch: true,
        }),
      }),
      subtype: new fields.SchemaField({
        value: new fields.StringField({
          blank: true,
          textSearch: true,
        }),
      }),
      notes: new fields.SchemaField({
        description: new NotesHTMLField(),
        gmNotes: new NotesHTMLField({ gmOnly: true }),
      }),
    };
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    super.prepareDerivedData();
    const config = CONFIG.POKEYMANZ.items.ability;

    this.type.choices = Object.fromEntries(
      Object.entries(config.types).map(([key, { label }]) => [key, label]),
    );

    if (this.type.value) {
      const typeConfig = config.types[this.type.value] || {};
      this.subtype.choices = { "": "", ...typeConfig.subtypes };
      this.type.label = typeConfig.label ?? null;
      this.subtype.label = typeConfig.subtypes?.[this.subtype.value] ?? null;
    }
  }
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preCreate(data, options, user) {
    if ((await super._preCreate(data, options, user)) === false) return false;

    const { actor } = this.parent;
    if (!actor) return;

    const hasAnAbility = actor.itemTypes.ability.length >= 2;

    if (hasAnAbility) return false;
  }
}
