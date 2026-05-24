Trying to make this system a bit more functional. Please be nice to me, I am a hobbyist and have no idea what I'm doing.

# Pokeymanz TTRPG for FoundryVTT
A unofficial implementation of the PokeymanzTTPRG rules for FoundryVTT. Pokeymanz is a non-profit fan-made pokemon role-playing game.

The support and development of this implementation is independent of the Pokaymanz game developed by [ChronicDelusionist](https://chronicdelusionist.neocities.org/Pokeymanz/).

## Development

This system is under active development. Contributions and issue reports are welcome via the [GitHub Issues page](https://github.com/hallowedocean/pokeymanz/issues).

## License

This project is licensed under the [MIT License](LICENSE).

## Features
- Custom Trainer sheets with attributes, stats, feats/hindrances, and inventory management.
- Custom Pokemon sheets with stats and the ability to have Move and Special Ability Items.
- Dice rolling logic built to match the game's mechanics. (in progress)
- Visual design consistent with the game's tone.

My initial goal was to ensure the system has the minimum fields needed to run the game. I plan to use this system to run my own games and may add more features later.

## Credits
Developed by: 
-[JoaquinP](https://github.com/joaquinpereyra98)
📧 joaquinpereyra98@gmail.com  
💬 Discord: joaquinp98
-and myself!

## Changes from base Pokeymanz system
I have made changes to the data structure and implemented new features:
- Added functionality: 
    -Trainers: 
        -Implemented EXP field.
        -Basic auto-calculation for Toughness (Fitness / 2).
    -Pokemon: 
        -Implemented Abilities, Mastery, EXP tracking (via a text box), Evolution status, and Fury (for Shadow Pokemon).
        -Support for "Hidden Ability" edge and an additional ability upon Mega Evolution.
        -Auto-calculation of type matchups. Defensive type matchups can be viewed on the Notes tab of the Pokemon's sheet and offensive type matchups can be viewed on the Summary tab of the Pokemon's sheet (click on the move name and look below the move description).
        -Support for flags that designate Shadow Pokemon, Shiny Pokemon, and the "I Choose You" Edge and "Zero" Minor Hindrance. Flags can be toggled on or off by a GM via the sidebar on the Summary tab of the Pokemon's sheet (while in edit mode).
        -Support for "That One Move" Hindrance, which can be toggled on or off by a GM via the sidebar on the move's sheet (while in edit mode). The dice formula for success can also be customized (on the move sheet, just below the flag checkbox) and is 1d2 by default. When the flag is toggled on, a triangular warning icon appears next to the move's name and the roll for success/failure automatically occurs.
    -Optional support for Shadow Pokemon, which can be toggled on/off in Game Settings > Configure Settings > Pokeymanz TTRPG. When toggled on, a flag becomes available for Pokemon (which displays an icon and switches Mastery to Fury) and "Shadow" is added to the type list (for move type selection and type matchup calculation).
-Trainer and Pokemon sheets should now have all fields needed to play the game!
- Misc. bug fixes and changes to better align with the game system's rules and improve QOL.

Pokeymanz TTRPG was created by [ChronicDelusionist](https://chronicdelusionist.neocities.org/Pokeymanz). [CC BY 4.0 Deed](https://creativecommons.org/licenses/by/4.0/).

Pokemon Type Icons - Vector design by [Lugia-Sea](https://www.deviantart.com/lugia-sea) © 2021 - 2024 Lugia-sea.

Shadow Type Icon by [Lorc](https://game-icons.net/1x1/lorc/spiky-eclipse.html), used under a [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/) license.

Vector-dice vector design by [Amaruuk](https://ko-fi.com/amaruuk/)

Foundry Virtual Tabletop © Copyright 2023, [Foundry Gaming](https://foundryvtt.com/), LLC. All rights reserved

Pokémon © 2002-2024 Pokémon. © 1995-2024 Nintendo/Creatures Inc./GAME FREAK inc. TM, ® and Pokémon character names are trademarks of Nintendo.
