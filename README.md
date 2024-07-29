# RPG Maker MV Point-and-Click Adventure Plugins

This repository contains two plugins that work together to create a point-and-click adventure game interface in RPG Maker MV:

1. PointClickAdventure.js
2. DoubleClickMovement.js

## Description

These plugins enhance your RPG Maker MV projects by adding a classic point-and-click adventure game interface, allowing players to interact with objects using a familiar point-and-click style and move around the map using double-clicks.

### PointClickAdventure.js (v1.1)
This plugin adds a point-and-click dialogue menu for specific objects on the map, similar to traditional adventure games.

### DoubleClickMovement.js (v1.7)
This plugin allows player movement via double-clicking on the map, with improved error handling and pathfinding.

## Features

- Adds a point-and-click menu with four options: Inspect, Talk, Use, and Pick-up (can be customized)
- Easy to implement on any map object using a simple note tag
- Customizable menu position based on click location
- Double-click movement with pathfinding around obstacles
- Configurable double-click threshold

## Installation

1. Download both `PointClickAdventure.js` and `DoubleClickMovement.js` files using either the repo link or the latest package

```
git clone https://github.com/midnightroachmedia/RPGMMVPointClickAdventure.git
```

2. Place both files in your project's `js/plugins` folder
3. Activate both plugins through the Plugin Manager in RPG Maker MV
4. Ensure that `DoubleClickMovement.js` is placed above `PointClickAdventure.js` in the plugin list

## Basic Usage

### PointClickAdventure.js
To make an event interactive with the point-and-click menu, add the following note tag to the event:

```
<PointClickMenu>
```

When a player double-clicks on an object with this note tag, the point-and-click menu will appear.

### DoubleClickMovement.js
This plugin works automatically once activated. Players can double-click on any walkable tile to move the character to that location.

## Configuration

### DoubleClickMovement.js
You can configure the double-click threshold in the plugin parameters:

- Double Click Threshold: Time in milliseconds between clicks to register as a double-click (default: 300)

## Compatibility

These plugins are designed to work together. Ensure that `DoubleClickMovement.js` is placed above `PointClickAdventure.js` in the plugin list for proper functionality.

## Author

Midnight Roach Media

## Version

- PointClickAdventure.js: v1.1
- DoubleClickMovement.js: v1.1

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please email phill@midnightroachmedia.com

For detailed instructions on how to use these plugins, please refer to the USER_GUIDE.md file in this repository.