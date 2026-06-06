import {
  pokemonTypeFields,
} from "../common.mjs";
import NotesHTMLField from "../fields/notes-html-field.mjs";
import AttributeDiceField from "../fields/attribute-dice-field.mjs";

export default class TrainerData extends foundry.abstract.TypeDataModel {

  static LOCALIZATION_PREFIXES = ["POKEYMANZ.BASE_ACTOR"];

  /**
   * Key information about this Actor subtype
   */
  static metadata = Object.freeze({
    attributes: ["heart", "fitness", "research", "tactics"],
    invalidItemTypes: ["ability"],
  });

  get metadata() {
    return TrainerData.metadata;
  }

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.attributes = new fields.SchemaField(
      ["heart", "fitness", "research", "tactics"].reduce((acc, v) => {
        acc[v] = new AttributeDiceField({ label: `POKEYMANZ.Attributes.${v.capitalize()}` });
        return acc;
      }, {}),
    );

    schema.stats = new fields.SchemaField({
      toughness: new fields.SchemaField({
        value: new fields.NumberField({ initial: 2, integer: true, nullable: false, required: true }),
        bonus: new fields.NumberField({ initial: 0, integer: true, nullable: false, required: true }),
      }),
      pokemonTypes: new fields.SchemaField({
        primary: new fields.SchemaField({
          value: pokemonTypeFields(),
        }),
        secondary: new fields.SchemaField({
          value: pokemonTypeFields(),
        }),
      }),
      wounds: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0 }),
        max: new fields.NumberField({ initial: 3 }),
      }),
    });
      
    schema.details = new fields.SchemaField({
      calling: new fields.StringField({ initial: "", size: "xlarge" }),
      pronouns: new fields.StringField({ initial: "", size: "large" }),
      age: new fields.NumberField({ integer: true, size: "xsmall" }),
      exp: new fields.NumberField({ integer: true, size: "xsmall" }),
    });

    schema.currency = new fields.NumberField({
      initial: 0,
      integer: true,
      size: "xsmall",
    });

    schema.notes = new fields.SchemaField({
      biography: new NotesHTMLField(),
    });

    schema.team = new fields.SetField(new fields.DocumentUUIDField({ type: "Actor", embedded: false }));

    schema.propierties = new fields.SchemaField({
      maxMoves: new fields.NumberField({ initial: 0, integer: true, min: 0, required: true }),
    });
    
    return schema;
  }

  /* -------------------------------------------- */

  prepareBaseData() {
    for (const key in this.stats.pokemonTypes) {
      const pokemonTypesList = CONFIG.POKEYMANZ.pokemonTypesList;
      const type = this.stats.pokemonTypes[key];
      this.stats.pokemonTypes[key] = {
        ...type,
        ...pokemonTypesList.find((t) => t.id === type.value),
      };
    }

    for (const key in this.attributes) {
      const attribute = this.attributes[key];
      attribute.name = `POKEYMANZ.Attributes.${key.capitalize()}`;
    }

    this.stats.toughness.value = this.stats.toughness.value + this.stats.toughness.bonus;
  }

  /* -------------------------------------------- */

  /** @override */
  async _preCreate(data, options, user) {
    if ((await super._preCreate(data, options, user)) === false) return false;

    this.parent.updateSource({
      prototypeToken: {
        actorLink: true,
        disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY,
        sight: {
          enabled: true,
        },
      },
    });
  }

  /* -------------------------------------------- */
  get pokemons() {
    return game.actors.filter(a => (a.system?.trainer?.value?.id === this.parent.id) && (a.type === "pokemon"));
  }
}
