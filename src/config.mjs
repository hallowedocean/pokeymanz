import * as SYSTEM_CONST from "./constants.mjs";

/**
 * A configuration object for the POKEYMANZ game module.
 *
 * @typedef {Object} PokemonType
 * @property {string} id - Unique identifier for the Pokémon type.
 * @property {string} name - Localized name key for the Pokémon type.
 * @property {string[]} resistances - List of type IDs that this type is resistant to.
 * @property {string[]} weaknesses - List of type IDs that this type is weak to.
 * @property {string} img - The file path for the type's icon image.
 *
 * @type {Object}
 * @property {PokemonType[]} pokemonTypesList - List of Pokémon types with their respective resistances, weaknesses, and icons.
 */
export const POKEYMANZ = {
  pokemonTypesList: [
    {
      id: "normal",
      immunities: ["ghost"],
      resistances: [],
      weaknesses: ["fighting"],
      color: "#9FA19F",
    },
    {
      id: "fire",
      immunities: [],
      resistances: ["fire", "grass", "ice", "bug", "steel", "fairy"],
      weaknesses: ["water", "rock", "ground"],
      color: "#E62829",
    },
    {
      id: "water",
      immunities: [],
      resistances: ["fire", "water", "ice", "steel"],
      weaknesses: ["electric", "grass"],
      color: "#2980EF",
    },
    {
      id: "grass",
      immunities: [],
      resistances: ["water", "electric", "grass", "ground"],
      weaknesses: ["fire", "ice", "poison", "flying", "bug"],
      color: "#3FA129",
    },
    {
      id: "flying",
      immunities: ["ground"],
      resistances: ["grass", "fighting", "bug"],
      weaknesses: ["electric", "ice", "rock"],
      color: "#81B9EF",
    },
    {
      id: "fighting",
      immunities: [],
      resistances: ["bug", "rock", "dark"],
      weaknesses: ["flying", "psychic", "fairy"],
      color: "#FF8000",
    },
    {
      id: "poison",
      immunities: [],
      resistances: ["grass", "fighting", "poison", "bug", "fairy"],
      weaknesses: ["ground", "psychic"],
      color: "#9141CB",
    },
    {
      id: "electric",
      immunities: [],
      resistances: ["electric", "flying", "steel"],
      weaknesses: ["ground"],
      color: "#FAC000",
    },
    {
      id: "ground",
      immunities: ["electric"],
      resistances: ["poison", "rock"],
      weaknesses: ["water", "grass", "ice"],
      color: "#915121",
    },
    {
      id: "rock",
      immunities: [],
      resistances: ["normal", "fire", "poison", "flying"],
      weaknesses: ["water", "grass", "fighting", "ground", "steel"],
      color: "#AFA981",
    },
    {
      id: "psychic",
      immunities: [],
      resistances: ["fighting", "psychic"],
      weaknesses: ["bug", "ghost", "dark"],
      color: "#EF4179",
    },
    {
      id: "ice",
      immunities: [],
      resistances: ["ice"],
      weaknesses: ["fire", "fighting", "rock", "steel"],
      color: "#3DCEF3",
    },
    {
      id: "bug",
      immunities: [],
      resistances: ["grass", "fighting", "ground"],
      weaknesses: ["fire", "flying", "rock"],
      color: "#91A119",
    },
    {
      id: "ghost",
      immunities: ["normal", "fighting"],
      resistances: ["poison", "bug"],
      weaknesses: ["ghost", "dark"],
      color: "#704170",
    },
    {
      id: "steel",
      immunities: ["poison"],
      resistances: [
        "normal",
        "grass",
        "ice",
        "flying",
        "psychic",
        "bug",
        "rock",
        "dragon",
        "steel",
        "fairy",
      ],
      weaknesses: ["fire", "fighting", "ground"],
      color: "#60A1B8",
    },
    {
      id: "dragon",
      immunities: [],
      resistances: ["fire", "water", "electric", "grass"],
      weaknesses: ["ice", "dragon", "fairy"],
      color: "#5060E1",
    },
    {
      id: "dark",
      immunities: ["psychic"],
      resistances: ["ghost", "dark"],
      weaknesses: ["fighting", "bug", "fairy"],
      color: "#624D4E",
    },
    {
      id: "fairy",
      immunities: ["dragon"],
      resistances: ["fighting", "bug", "dark"],
      weaknesses: ["poison", "steel"],
      color: "#EF70EF",
    },
  ].map((type) => ({
    ...type,
    name: `POKEYMANZ.Types.${type.id.capitalize()}`,
    img: `${SYSTEM_CONST.ASSETS_PATH}/icons/types/${type.id.capitalize()}_icon.png`,
  })),
  items: {
    feat: {
      img: `${SYSTEM_CONST.ASSETS_PATH}/icons/items/round-star.svg`,
      icon: "fa-solid fa-star",
      types: {
        edge: {
          label: "POKEYMANZ.ItemTypes.Edge",
          subtypes: {
            battle: "POKEYMANZ.ItemSubtypes.Edge.Battle",
            social: "POKEYMANZ.ItemSubtypes.Edge.Social",
            utility: "POKEYMANZ.ItemSubtypes.Edge.Utility",
          },
        },
        hindrance: {
          label: "POKEYMANZ.ItemTypes.Hindrance",
          subtypes: {
            minor: "POKEYMANZ.ItemSubtypes.Hindrance.Minor",
            major: "POKEYMANZ.ItemSubtypes.Hindrance.Major",
          },
        },
      },
    },
    gear: {
      img: `${SYSTEM_CONST.ASSETS_PATH}/icons/items/backpack.svg`,
      icon: "fa-solid fa-backpack",
      types: {
        curative: {
          label: "POKEYMANZ.ItemTypes.Curative",
          subtypes: {
            simple: "POKEYMANZ.ItemSubtypes.Curative.Simple",
            greater: "POKEYMANZ.ItemSubtypes.Curative.Greater",
          },
        },
        pokeball: {
          label: "POKEYMANZ.ItemTypes.Pokeball",
          subtypes: {
            specialty: "POKEYMANZ.ItemSubtypes.Pokeball.Specialty",
            stronger: "POKEYMANZ.ItemSubtypes.Pokeball.Stronger",
          },
        },
        heldItem: {
          label: "POKEYMANZ.ItemTypes.HeldItem",
          subtypes: {
            disposable: "POKEYMANZ.ItemSubtypes.HeldItem.Disposable",
            persistent: "POKEYMANZ.ItemSubtypes.HeldItem.Persistent",
          },
        },
        rareItems: {
          label: "POKEYMANZ.ItemTypes.RareItems",
        },
        supplies: {
          label: "POKEYMANZ.ItemTypes.Supplies",
        },
        keyItems: {
          label: "POKEYMANZ.ItemTypes.KeyItems",
        },
      },
    },
    move: {
      img: `${SYSTEM_CONST.ASSETS_PATH}/icons/items/comet-spark.svg`,
      icon: "fa-solid fa-meteor",
      categories: {
        physical: {
          label: "POKEYMANZ.Moves.Categories.Physical",
          img: `${SYSTEM_CONST.ASSETS_PATH}/icons/moves/physical-move-icon.png`,
        },
        special: {
          label: "POKEYMANZ.Moves.Categories.Special",
          img: `${SYSTEM_CONST.ASSETS_PATH}/icons/moves/special-move-icon.png`,
        },
        status: {
          label: "POKEYMANZ.Moves.Categories.Status",
          img: `${SYSTEM_CONST.ASSETS_PATH}/icons/moves/status-move-icon.png`,
        },
      },
    },
    ability: {
      img: `${SYSTEM_CONST.ASSETS_PATH}/icons/items/round-star.svg`,
      icon: "fa-solid fa-star",
      types: {
        ability: {
          label: "POKEYMANZ.ItemTypes.Ability", 
          subtypes: {
            standard: "POKEYMANZ.ItemSubtypes.Ability.Standard",
            megaEvolved: "POKEYMANZ.ItemSubtypes.Ability.MegaEvolved",
          },
        },
      }, 
    },
  },
  typeMatchups: {
    label: "POKEYMANZ.TypeMatchups.Label",
    normalDamage: "POKEYMANZ.TypeMatchups.NormalDamage", 
    weaknesses: "POKEYMANZ.TypeMatchups.Weaknesses",
    resistances: "POKEYMANZ.TypeMatchups.Resistances",
    immunities: "POKEYMANZ.TypeMatchups.Immunities", 
    extremeWeaknesses: "POKEYMANZ.TypeMatchups.ExtremeWeaknesses",
    extremeResistances: "POKEYMANZ.TypeMatchups.ExtremeResistances",
  },
  diceSteps: [4, 6, 8, 10, 12],
};
