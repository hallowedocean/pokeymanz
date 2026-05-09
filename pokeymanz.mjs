import * as data from "./src/data/_module.mjs";
import * as document from "./src/documents/_module.mjs";
import * as apps from "./src/applications/_module.mjs";

import { POKEYMANZ } from "./src/config.mjs";
import utils from "./src/utils/_module.mjs";
import * as SYSTEM_CONST from "./src/constants.mjs";

function registerSystemSettings() {
  game.settings.register("pokeymanz", "shadowPokemonEnabled", {
    name: "Shadow Pokemon enabled?",
    hint: "Turn on to enable Shadow Pokemon-related settings",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true,
  });
}

Hooks.once("init", () => {
  /* Exposing classes and variables */
  CONFIG.POKEYMANZ = POKEYMANZ;

  game[SYSTEM_CONST.SYSTEM_ID] = {
    apps,
    document,
    data,
  };

  registerSystemSettings();

  //if shadow pokemon setting is toggled off, remove shadow from type listing and "isShadow" flag
  if (!game.settings.get("pokeymanz", "shadowPokemonEnabled")) {
    //remove shadow from type listing if shadow pokemon setting is toggled off
    const index = CONFIG.POKEYMANZ.pokemonTypesList.findIndex(u => u.id === "shadow");
    if (index !== -1) {
      CONFIG.POKEYMANZ.pokemonTypesList.splice(index, 1);
    }

    delete POKEYMANZ.flags.isShadow;
  }

  /*Registering data models*/
  Object.assign(CONFIG.Actor.dataModels, {
    trainer: data.actor.TrainerData,
    pokemon: data.actor.PokemonData,
  });
  Object.assign(CONFIG.Item.dataModels, {
    feat: data.item.FeatData,
    gear: data.item.GearData,
    move: data.item.MoveData,
    ability: data.item.AbilityData,
  });

  /*Registering document class*/
  CONFIG.Actor.documentClass = document.Actor;
  CONFIG.Item.documentClass = document.Item;

  /*Registering Sheets*/
  foundry.documents.collections.Actors.registerSheet("Trainer Sheet", apps.actor.TrainerSheet, {
    types: ["trainer"],
    label: "POKEYMANZ.TrainerSheet",
  });
  foundry.documents.collections.Actors.registerSheet("Pokemon Sheet", apps.actor.PokemonSheet, {
    types: ["pokemon"],
    label: "POKEYMANZ.PokemonSheet",
  });
  foundry.documents.collections.Items.registerSheet("Feat Sheet", apps.item.FeatSheet, {
    types: ["feat"],
    makeDefault: true,
    label: "POKEYMANZ.FeatSheet",
  });
  foundry.documents.collections.Items.registerSheet("Gear Sheet", apps.item.GearSheet, {
    types: ["gear"],
    makeDefault: true,
    label: "POKEYMANZ.GearSheet",
  });
  foundry.documents.collections.Items.registerSheet("Move Sheet", apps.item.MoveSheet, {
    types: ["move"],
    makeDefault: true,
    label: "POKEYMANZ.MoveSheet",
  });
  foundry.documents.collections.Items.registerSheet("Ability Sheet", apps.item.AbilitySheet, {
    types: ["ability"],
    makeDefault: true,
    label: "POKEYMANZ.AbilitySheet",
  });

  /*Registering Handlebars helpers*/
  Handlebars.registerHelper("compareObjectToValue", function (obj, operator, value) {
    if (eval(Object.keys(obj).length + operator + value)) {
      return true;
    } else {
      return false;
    }
  });

  utils.renderTemplates();
});
