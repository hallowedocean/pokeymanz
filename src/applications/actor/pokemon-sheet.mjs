import BaseActorSheet from "./base-actor-sheet.mjs";
import InteractiveUIFeaturesMixin from "../mixins/InteractiveUIFeaturesMixin.mjs";
import * as SYSTEM_CONST from "../../constants.mjs";

/**
 * The Pokeymanz Actor application.
 * @extends BaseActorSheet
 * @mixes InteractiveApplication
 * @mixes HandlebarsApplication
 * @alias PokemonSheet
 */
export default class PokemonSheet extends InteractiveUIFeaturesMixin(
  BaseActorSheet,
) {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: {
      width: 800,
      height: 550,
    },
    actions: {
      toggleTrainerTeam: PokemonSheet._toggleTrainerTeam,
      adjustStat: PokemonSheet._adjustStat,
    },
    contextMenus: [
      {
        selector: ".move-menu",
        handler: PokemonSheet._getMoveMenuItems,
        options: {
          eventName: "click",
        },
      },
    ],
    accordions: [
      {
        headingSelector: ".move-header",
        contentSelector: ".move-content",
        startCollapsed: true,
      },
    ],
  };

  /** @override */
  static _PARTS = {
    summary: {
      template: `${SYSTEM_CONST.TEMPLATES_PATH}/actors/parts/summary.hbs`,
    },
    features: {
      template: `${SYSTEM_CONST.TEMPLATES_PATH}/actors/parts/features.hbs`,
    },
  };

  /* -------------------------------------------- */
  /*  TABS                                        */
  /* -------------------------------------------- */

  /**
   * Available tabs for the sheet.
   * @type {Array<{id: string, group: string, icon: string}>}
   */
  static TABS = [
    {
      id: "summary",
      group: "primary",
      icon: "fa-solid fa-address-card",
      label: "POKEYMANZ.Sheets.TABS.Summary",
    },
    {
      id: "features",
      group: "primary",
      icon: "fa-solid fa-list",
      label: "POKEYMANZ.Sheets.TABS.Features",
    },
    {
      id: "effects",
      group: "primary",
      icon: "fa-solid fa-bolt",
      label: "POKEYMANZ.Sheets.TABS.Effects",
    },
    {
      id: "notes",
      group: "primary",
      icon: "fa-solid fa-notebook",
      label: "POKEYMANZ.Sheets.TABS.Notes",
    },
  ];

  /** @override */
  tabGroups = {
    primary: "summary",
  };

  /* -------------------------------------------- */
  /*  Drop-Down Menus                             */
  /* -------------------------------------------- */

  /**
   * @returns {ContextMenuEntry[]} An array of context menu item objects.
   */
  static _getMoveMenuItems() {
    return [
      {
        name: "POKEYMANZ.Item.EditItem",
        icon: "<i class=\"fas fa-edit\"></i>",
        callback: (html) => {
          const element = html instanceof HTMLElement ? html : html[0];
          const uuid = element.dataset.itemUuid;
          fromUuidSync(uuid)?.sheet?.render({ force: true });
        },
      },
      {
        name: "Delete",
        icon: "<i class=\"fas fa-trash\"></i>",
        callback: (html) => {
          const element = html instanceof HTMLElement ? html : html[0];
          const uuid = element.dataset.itemUuid;
          fromUuidSync(uuid)?.delete();
        },
      },
    ];
  }
  
  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const baseContext = await super._prepareContext(options);
    const { trainer, stats, schema } = this.document.system;

    if (!this.document.system.flags.isIChooseYou.value) {
      delete baseContext.tabs.features;
    }

    return {
      ...baseContext,
      pokemonType: {
        primary: {
          ...stats.pokemonTypes.primary,
          field: schema.getField("stats.pokemonTypes.primary.value"),
        },
        secondary: {
          ...stats.pokemonTypes.secondary,
          field: schema.getField("stats.pokemonTypes.secondary.value"),
        },
      },
      trainer: {
        value: trainer.value?.id ?? "",
        field: schema.getField("trainer.value"),
        inTeam: trainer.inTeam,
      },
      moves: await this._prepareMoves(),
    };
  }

  async _preparePartContext(partId, context, options) {
    const basePartContext = await super._preparePartContext(partId, context, options);
    switch (partId) {
      case "summary":
        basePartContext.abilityFields = this._prepareAbility();
        break;
      case "notes":
        basePartContext.typeMatchupLists = this._preparetypeMatchupLists();
      default:
        break;
    }
    return basePartContext;
  }

  async _prepareMoves() {
    const moves = [];

    for (const move of this.document.itemTypes.move) {
      moves.push({
        ...move.toObject(),
        uuid: move.uuid,
        moveType: this._prepareMoveTypeMatchups(move.system.pokemonTypes.primary),
        enrichDescription:
          await foundry.applications.ux.TextEditor.implementation.enrichHTML(
            move.system.notes.description,
            {
              secrets: move.isOwner,
              rollData: move.getRollData(),
              relativeTo: move,
            },
          ),
      });
    }
    moves.sort((a, b) => a.sort - b.sort);

    while (moves.length < this.actor.system.propierties.maxMoves) {
      moves.push(null);
    }

    return moves;
  }

  _prepareAbility() {
    const {
      ability: { types },
    } = CONFIG.POKEYMANZ.items;

    const abilities = Object.fromEntries(
      Object.entries(types).map(([key, { label }]) => [
        key,
        {
          label: game.i18n.localize(label),
          items: this.document.itemTypes.ability
            .filter((i) => i.system.type.value === key)
            .sort((a, b) => (b.system.subtype.value.localeCompare(a.system.subtype.value))),
        },
      ]),
    );
    return abilities;
  }

  _prepareMoveTypeMatchups(moveType) {
    const typeLists = ["superEffectiveAgainst", "neutralDamageAgainst", "notVeryEffectiveAgainst", "noEffectAgainst"];

    typeLists.forEach(list => {
      moveType[list] = moveType[list].map(word => game.i18n.localize(word.capitalize())).sort();
    });

    return moveType;
  }

  _preparetypeMatchupLists() {

    //enrich with localized name, color, and icon for each type
    const currentTypeMatchups = Object.fromEntries(
      Object.entries(this.document.system.typeMatchups).map(([key, { bonus }]) => {
        let typeListing = CONFIG.POKEYMANZ.pokemonTypesList.filter(x => x.id === key)[0];
        return [
          key,
          {
            bonus: bonus,
            name: typeListing.name,
            img: typeListing.img,
            color: typeListing.color,
          },
        ];
      }).sort(),      
    );

    //return a list for each with the label and bonus applied to incoming attacks
    let typeMatchupList = {};
    const typeBonuses = { normalDamage: 0, extremeWeaknesses: 4, weaknesses: 2, immunities: null, resistances: -2, extremeResistances: -4 };

    Object.keys(typeBonuses).forEach(list => {
      typeMatchupList[list] = Object.keys(currentTypeMatchups).reduce((acc, key) => {
        acc.types = acc.types || {}; 
        if (currentTypeMatchups[key].bonus === typeBonuses[list]) {
          acc.types[key] = currentTypeMatchups[key];
        }
        return acc;
      }, {});
      typeMatchupList[list].bonus = typeBonuses[list];
      typeMatchupList[list].label = `POKEYMANZ.TypeMatchups.${list.capitalize()}`;
    });

    return typeMatchupList;
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handler for make rolls
   *
   * @this PokemonSheet
   * @param {PointerEvent} event - The originating click event
   * @param {HTMLElement} target - The capturing HTML element which defined a [data-action]
   * @private
   */
  static async _toggleTrainerTeam(event, target) {
    event.preventDefault();
    await this.document.update({
      "system.trainer.inTeam": !this.document.system.trainer.inTeam,
    });
  }

  static async _adjustStat(_event, target) {
    const action = target.dataset.subAction;
    switch (action) {
      case "wounds-plus":
        await this.actor.update({
          "system.stats.wounds.value": Math.min(this.actor.system.stats.wounds.value + 1, this.actor.system.stats.wounds.max),
        });
        break;
      case "wounds-minus":
        await this.actor.update({
          "system.stats.wounds.value": Math.max(0, this.actor.system.stats.wounds.value - 1),
        });
        break;
      case "mastery-plus":
        await this.actor.update({
          "system.stats.mastery.value": Math.min(this.actor.system.stats.mastery.value + 1, this.actor.system.stats.mastery.max),
        });
        break;
      case "mastery-minus":
        await this.actor.update({
          "system.stats.mastery.value": Math.max(0, this.actor.system.stats.mastery.value - 1),
        });
        break;
      default:
        throw new Error("Unknown action!");
    }
  }
}
