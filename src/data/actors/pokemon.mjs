import { pokemonTypeFields } from "../common.mjs";
import NotesHTMLField from "../fields/notes-html-field.mjs";

export default class PokemonData extends foundry.abstract.TypeDataModel {

  static LOCALIZATION_PREFIXES = ["POKEYMANZ.BASE_ACTOR"];

  /**
   * Key information about this Actor subtype
   */
  static metadata = Object.freeze({
    invalidItemTypes: ["gear"],
  });

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.stats = new fields.SchemaField({
      mastery: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0, integer: true }),
        max: new fields.NumberField({ initial: 0, integer: true }),
      }),
      fury: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0, integer: true }),
        max: new fields.NumberField({ initial: 3, integer: true }),
      }),
      exp: new fields.NumberField({ initial: 0 }),
      toughness: new fields.SchemaField({
        value: new fields.NumberField({ initial: 4, integer: true }),
      }),
      pokemonTypes: new fields.SchemaField({
        primary: new fields.SchemaField({
          value: (() => { 
            const typeList = pokemonTypeFields();
            delete typeList.choices.shadow;
            return typeList;
          })(),
        }),
        secondary: new fields.SchemaField({
          value: (() => { 
            const typeList = pokemonTypeFields();
            delete typeList.choices.shadow;
            return typeList;
          })(),
        }),
      }),
      wounds: new fields.SchemaField({
        value: new fields.NumberField({ initial: 0, integer: true }),
        max: new fields.NumberField({ initial: 3, integer: true }),
      }),
    });

    //create a schemaField for each Pokemon type
    schema.typeMatchups = new fields.SchemaField(CONFIG.POKEYMANZ.pokemonTypesList.reduce((acc, type) => {
      acc[type.id] = new fields.SchemaField({
        name: new fields.StringField({ initial: type.name }), 
        color: new fields.StringField({ initial: type.color }), 
        img: new fields.StringField({ initial: type.img }), 
        bonus: new fields.NumberField({ initial: 0, integer: true, nullable: true }), 
      });
      return acc;
    }, {}));
    schema.details = new fields.SchemaField({
      species: new fields.StringField({ initial: "", size: "" }),
      gender: new fields.StringField({ initial: "", size: "xsmall" }),
      variant: new fields.StringField({ initial: "", size: "medium" }),
    });
    schema.notes = new fields.SchemaField({
      pokedexEntry: new NotesHTMLField(),
    });
    schema.trainer = new fields.SchemaField({
      value: new fields.ForeignDocumentField(foundry.documents.BaseActor),
      inTeam: new fields.BooleanField({ initial: false }),
    });
    schema.advancement = new fields.SchemaField({
      evolutionPossible: new fields.StringField({ choices: CONFIG.POKEYMANZ.evolutionPossible, blank: true, required: false, initial: "" }),
      evolutionConditions: new fields.StringField({ initial: "" }),
      expSpent: new NotesHTMLField(),
    });
    schema.propierties = new fields.SchemaField({
      maxMoves: new fields.NumberField({ initial: 4, integer: true, min: 0, required: true }),
    });
    schema.flags = new fields.SchemaField(Object.keys(CONFIG.POKEYMANZ.flags).reduce((acc, flag) => {
      acc[flag] = new fields.SchemaField({
        label: new fields.StringField({ initial: CONFIG.POKEYMANZ.flags[flag].label }),
        img: new fields.StringField({ initial: CONFIG.POKEYMANZ.flags[flag].img }), 
        value: new fields.BooleanField({ initial: false }), 
      });
      return acc;
    }, {}));

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

    this.prepareTypeMatchups();
  }

  /* -------------------------------------------- */

  async prepareTypeMatchups () {
    // create a variable to hold our type compatibilities while we calculate. name keys so we can update actors easily at the end and start every value at zero.
    let workingTypeMatchups = CONFIG.POKEYMANZ.pokemonTypesList.reduce((acc, type) => {
      acc[`system.typeMatchups.${type.id}.bonus`] = 0;
      return acc;
    }, {});

    // get compatibilities for both types; list value for each compatibility
    const firstTypeMatchups = (this.stats.pokemonTypes.primary.value) ? this.stats.pokemonTypes.primary : [];
    const secondTypeMatchups = (this.stats.pokemonTypes.secondary.value) ? this.stats.pokemonTypes.secondary : [];
    const typeBonuses = { weaknesses: 2, resistances: -2, immunities: null };

    // assign weaknesses, resistances, and immunities for first type
    Object.keys(typeBonuses).forEach(key => {

      // check if the type has weaknesses / resistances / immunities. if not, do nothing.
      if (Array.isArray(firstTypeMatchups[key]) && (firstTypeMatchups[key].length > 0)) {

        // apply bonus for each weakness / resistance / immunity
        firstTypeMatchups[key].forEach(namedType => { 
          workingTypeMatchups[`system.typeMatchups.${namedType}.bonus`] = typeBonuses[key];
        });
      }
    });

    // assign weaknesses, resistances, and immunities for second type
    Object.keys(typeBonuses).forEach(key => {

      // check if the type has weaknesses / resistances / immunities. if not, do nothing.
      if (Array.isArray(secondTypeMatchups[key]) && (secondTypeMatchups[key].length > 0)) {

        // if already immune, keep immunity. if weak or resistant, add second type's bonus to first type's.
        secondTypeMatchups[key].forEach(namedType => { 
          switch (workingTypeMatchups[`system.typeMatchups.${namedType}.bonus`]) {
            case null:
              break;
            default:
              workingTypeMatchups[`system.typeMatchups.${namedType}.bonus`] = (typeBonuses[key]) ? workingTypeMatchups[`system.typeMatchups.${namedType}.bonus`] + typeBonuses[key] : typeBonuses[key];
          }
        });
      }
    });

    // update system.typeMatchups on parent actor
    await this.parent.update(workingTypeMatchups);
  }
}
