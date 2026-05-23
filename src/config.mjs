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
      superEffectiveAgainst: [],
      neutralDamageAgainst: ["normal", "fire", "water", "grass", "flying", "fighting", "poison", "electric", "ground", "psychic", "ice", "bug", "dragon", "dark", "fairy"],
      notVeryEffectiveAgainst: ["rock", "steel"],
      noEffectAgainst: ["ghost"],
      color: "#9FA19F",
    },
    {
      id: "fire",
      immunities: [],
      resistances: ["fire", "grass", "ice", "bug", "steel", "fairy"],
      weaknesses: ["water", "rock", "ground"],
      superEffectiveAgainst: ["grass", "ice", "bug", "steel"],
      neutralDamageAgainst: ["normal", "flying", "fighting", "poison", "electric", "ground", "psychic", "ghost", "dark", "fairy"],
      notVeryEffectiveAgainst: ["fire", "water", "rock", "dragon"],
      noEffectAgainst: [],
      color: "#E62829",
    },
    {
      id: "water",
      immunities: [],
      resistances: ["fire", "water", "ice", "steel"],
      weaknesses: ["electric", "grass"],
      superEffectiveAgainst: ["fire", "ground", "rock"],
      neutralDamageAgainst: ["normal", "flying", "fighting", "poison", "electric", "psychic", "ice", "bug", "ghost", "steel", "dark", "fairy"],
      notVeryEffectiveAgainst: ["water", "grass", "dragon"],
      noEffectAgainst: [],
      color: "#2980EF",
    },
    {
      id: "grass",
      immunities: [],
      resistances: ["water", "electric", "grass", "ground"],
      weaknesses: ["fire", "ice", "poison", "flying", "bug"],
      superEffectiveAgainst: ["water", "ground", "rock"],
      neutralDamageAgainst: ["normal", "fighting", "electric", "psychic", "ice", "ghost", "dark", "fairy"],
      notVeryEffectiveAgainst: ["flying", "poison", "bug", "fire", "grass", "steel", "dragon"],
      noEffectAgainst: [],
      color: "#3FA129",
    },
    {
      id: "flying",
      immunities: ["ground"],
      resistances: ["grass", "fighting", "bug"],
      weaknesses: ["electric", "ice", "rock"],
      superEffectiveAgainst: ["fighting", "grass", "bug"],
      neutralDamageAgainst: ["normal", "fire", "water", "flying", "poison", "ground", "psychic", "ice", "ghost", "dragon", "dark", "fairy"],
      notVeryEffectiveAgainst: ["electric", "rock", "steel"],
      noEffectAgainst: [],
      color: "#81B9EF",
    },
    {
      id: "fighting",
      immunities: [],
      resistances: ["bug", "rock", "dark"],
      weaknesses: ["flying", "psychic", "fairy"],
      superEffectiveAgainst: ["normal", "rock", "ice", "steel", "dark"],
      neutralDamageAgainst: ["fire", "water", "grass", "fighting", "electric", "ground", "dragon"],
      notVeryEffectiveAgainst: ["flying", "poison", "bug", "psychic", "fairy"],
      noEffectAgainst: ["ghost"],
      color: "#FF8000",
    },
    {
      id: "poison",
      immunities: [],
      resistances: ["grass", "fighting", "poison", "bug", "fairy"],
      weaknesses: ["ground", "psychic"],
      superEffectiveAgainst: ["grass", "fairy"],
      neutralDamageAgainst: ["normal", "fire", "water", "flying", "fighting", "electric", "psychic", "ice", "bug", "dragon", "dark"],
      notVeryEffectiveAgainst: ["ground", "rock", "ghost", "poison"],
      noEffectAgainst: ["steel"],
      color: "#9141CB",
    },
    {
      id: "electric",
      immunities: [],
      resistances: ["electric", "flying", "steel"],
      weaknesses: ["ground"],
      superEffectiveAgainst: ["flying", "water"],
      neutralDamageAgainst: ["normal", "fire", "fighting", "poison", "rock", "psychic", "ice", "bug", "ghost", "steel", "dark", "fairy"],
      notVeryEffectiveAgainst: ["grass", "electric", "dragon"],
      noEffectAgainst: ["ground"],
      color: "#FAC000",
    },
    {
      id: "ground",
      immunities: ["electric"],
      resistances: ["poison", "rock"],
      weaknesses: ["water", "grass", "ice"],
      superEffectiveAgainst: ["poison", "electric", "fire", "rock", "steel"],
      neutralDamageAgainst: ["normal", "water", "fighting", "ground", "psychic", "ice", "ghost", "dragon", "dark", "fairy"],
      notVeryEffectiveAgainst: ["grass", "bug"],
      noEffectAgainst: ["flying"],
      color: "#915121",
    },
    {
      id: "rock",
      immunities: [],
      resistances: ["normal", "fire", "poison", "flying"],
      weaknesses: ["water", "grass", "fighting", "ground", "steel"],
      superEffectiveAgainst: ["flying", "ice", "bug", "fire"],
      neutralDamageAgainst: ["normal", "water", "grass", "poison", "electric", "rock", "psychic", "ghost", "dragon", "dark", "fairy"],
      notVeryEffectiveAgainst: ["fighting", "ground", "steel"],
      noEffectAgainst: [],
      color: "#AFA981",
    },
    {
      id: "psychic",
      immunities: [],
      resistances: ["fighting", "psychic"],
      weaknesses: ["bug", "ghost", "dark"],
      superEffectiveAgainst: ["fighting", "poison"],
      neutralDamageAgainst: ["normal", "fire", "water", "grass", "flying", "electric", "ground", "rock", "ice", "bug", "ghost", "dragon", "fairy"],
      notVeryEffectiveAgainst: ["psychic", "steel"],
      noEffectAgainst: ["dark"],
      color: "#EF4179",
    },
    {
      id: "ice",
      immunities: [],
      resistances: ["ice"],
      weaknesses: ["fire", "fighting", "rock", "steel"],
      superEffectiveAgainst: ["grass", "flying", "ground", "dragon"],
      neutralDamageAgainst: ["normal", "fighting", "poison", "electric", "rock", "psychic", "bug", "ghost", "dark", "fairy"],
      notVeryEffectiveAgainst: ["fire", "water", "ice", "steel"],
      noEffectAgainst: [],
      color: "#3DCEF3",
    },
    {
      id: "bug",
      immunities: [],
      resistances: ["grass", "fighting", "ground"],
      weaknesses: ["fire", "flying", "rock"],
      superEffectiveAgainst: ["grass", "psychic", "dark"],
      neutralDamageAgainst: ["normal", "water", "electric", "ground", "rock", "ice", "bug", "dragon"],
      notVeryEffectiveAgainst: ["flying", "fighting", "poison", "ghost", "steel", "fire", "fairy"],
      noEffectAgainst: [],
      color: "#91A119",
    },
    {
      id: "ghost",
      immunities: ["normal", "fighting"],
      resistances: ["poison", "bug"],
      weaknesses: ["ghost", "dark"],
      superEffectiveAgainst: ["psychic", "ghost"],
      neutralDamageAgainst: ["fire", "water", "grass", "flying", "fighting", "poison", "electric", "ground", "rock", "ice", "bug", "steel", "dragon", "fairy"],
      notVeryEffectiveAgainst: ["dark"],
      noEffectAgainst: ["normal"],
      color: "#704170",
    },
    {
      id: "steel",
      immunities: ["poison"],
      resistances: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"],
      weaknesses: ["fire", "fighting", "ground"],
      superEffectiveAgainst: ["rock", "ice", "fairy"],
      neutralDamageAgainst: ["normal", "grass", "flying", "fighting", "poison", "ground", "psychic", "bug", "ghost", "dragon", "dark"],
      notVeryEffectiveAgainst: ["fire", "water", "steel", "electric"],
      noEffectAgainst: [],
      color: "#60A1B8",
    },
    {
      id: "dragon",
      immunities: [],
      resistances: ["fire", "water", "electric", "grass"],
      weaknesses: ["ice", "dragon", "fairy"],
      superEffectiveAgainst: ["dragon"],
      neutralDamageAgainst: ["normal", "fire", "water", "grass", "flying", "fighting", "poison", "electric", "ground", "rock", "psychic", "ice", "bug", "ghost", "dark"],
      notVeryEffectiveAgainst: ["steel"],
      noEffectAgainst: ["fairy"],
      color: "#5060E1",
    },
    {
      id: "dark",
      immunities: ["psychic"],
      resistances: ["ghost", "dark"],
      weaknesses: ["fighting", "bug", "fairy"],
      superEffectiveAgainst: ["psychic", "ghost"],
      neutralDamageAgainst: ["normal", "fire", "water", "grass", "flying", "poison", "electric", "ground", "rock", "ice", "bug", "steel", "dragon"],
      notVeryEffectiveAgainst: ["fighting", "dark", "fairy"],
      noEffectAgainst: [],
      color: "#624D4E",
    },
    {
      id: "fairy",
      immunities: ["dragon"],
      resistances: ["fighting", "bug", "dark"],
      weaknesses: ["poison", "steel"],
      superEffectiveAgainst: ["fighting", "dragon", "dark"],
      neutralDamageAgainst: ["normal", "water", "grass", "flying", "electric", "ground", "rock", "psychic", "ice", "bug", "ghost", "fairy"],
      notVeryEffectiveAgainst: ["fire", "poison", "steel"],
      noEffectAgainst: [],
      color: "#EF70EF",
    },
    {
      id: "shadow",
      immunities: [],
      resistances: [],
      weaknesses: [],
      superEffectiveAgainst: [],
      neutralDamageAgainst: ["normal", "fire", "water", "grass", "flying", "fighting", "poison", "electric", "ground", "rock", "psychic", "ice", "bug", "ghost", "steel", "dragon", "dark", "fairy"],
      notVeryEffectiveAgainst: [],
      noEffectAgainst: [],
      color: "#4834A0",
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
            hidden: "POKEYMANZ.ItemSubtypes.Ability.Hidden",
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
  flags: {
    isShadow: {
      label: "POKEYMANZ.BASE_ACTOR.FIELDS.flags.isShadow",
      img: `${SYSTEM_CONST.ASSETS_PATH}/icons/flags/shadow_icon.png`,
    },
    isShiny: {
      label: "POKEYMANZ.BASE_ACTOR.FIELDS.flags.isShiny",
      img: `${SYSTEM_CONST.ASSETS_PATH}/icons/flags/shiny_icon.png`,
    },
    isIChooseYou: {
      label: "POKEYMANZ.BASE_ACTOR.FIELDS.flags.isIChooseYou",
      img: `${SYSTEM_CONST.ASSETS_PATH}/icons/flags/ichooseyou_icon.png`,
    },
  },
  diceSteps: [4, 6, 8, 10, 12],
};
