# RPG Maker MV Point-and-Click Adventure Plugins User Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Plugin Configuration](#plugin-configuration)
4. [Setting Up Interactive Objects](#setting-up-interactive-objects)
5. [Player Movement](#player-movement)
6. [Customizing the Point-and-Click Menu](#customizing-the-point-and-click-menu)
7. [Handling Menu Actions](#handling-menu-actions)
8. [Troubleshooting](#troubleshooting)
9. [Advanced Usage](#advanced-usage)

## Introduction
This guide covers the usage of two interdependent plugins for RPG Maker MV:

1. PointClickAdventure.js (v1.1): Adds a point-and-click style interaction menu to your game.
2. DoubleClickMovement.js (v1.1): Enables player movement via double-clicking on the map.

These plugins work together to create a classic point-and-click adventure game interface in your RPG Maker MV projects.

## Installation
1. Download both `PointClickAdventure.js` and `DoubleClickMovement.js` files.
2. Place both files in your project's `js/plugins` folder.
3. Open your project in RPG Maker MV and go to the Plugin Manager.
4. Find "DoubleClickMovement" in the list and activate it by checking the box next to it.
5. Find "PointClickAdventure" in the list and activate it by checking the box next to it.
6. Ensure that "DoubleClickMovement" is placed above "PointClickAdventure" in the plugin list.
7. Click "Apply" to save your changes.

## Plugin Configuration

### DoubleClickMovement.js
You can configure the double-click threshold in the plugin parameters:

- Double Click Threshold: Time in milliseconds between clicks to register as a double-click (default: 300)

To change this:
1. In the Plugin Manager, click on the "DoubleClickMovement" entry.
2. Adjust the "Double Click Threshold" parameter as needed.
3. Click "Apply" to save your changes.

### PointClickAdventure.js
This plugin does not have configurable parameters in the Plugin Manager.

## Setting Up Interactive Objects
To make an object on your map interactive with the point-and-click menu:

1. Create an event on your map that represents the object you want to be clickable.
2. Open the event's properties.
3. In the "Note" field, add the following tag:
   ```
   <PointClickMenu>
   ```
4. This tag tells the plugin that this event should respond to double-clicks with the point-and-click menu.

## Player Movement
With DoubleClickMovement.js active, players can move around the map by double-clicking:

1. Double-click on any walkable tile on the map.
2. The player character will automatically find a path to the clicked location and move there.
3. If there's no valid path, the character won't move.

## Customizing the Point-and-Click Menu
The default menu includes four options: Inspect, Talk, Use, and Pick-up. To customize these options:

1. Open the `PointClickAdventure.js` file in a text editor.
2. Locate the `makeCommandList` function:
   ```javascript
   Window_PointClickMenu.prototype.makeCommandList = function() {
       this.addCommand('Inspect', 'inspect');
       this.addCommand('Talk', 'talk');
       this.addCommand('Use', 'use');
       this.addCommand('Pick-up', 'pickup');
   };
   ```
3. Modify, add, or remove lines to change the menu options.
4. Make sure to update the corresponding handler functions in the `Scene_Map.prototype` section if you change the command names.

## Handling Menu Actions
The PointClickAdventure.js plugin provides basic console logging for each action. To implement specific behaviors:

1. Open the `PointClickAdventure.js` file.
2. Find the action handler functions:
   ```javascript
   Scene_Map.prototype.onInspect = function() {
       console.log("Inspect action selected");
       this.closePointClickMenu();
   };
   ```
3. Replace the `console.log` statement with your desired behavior, such as displaying a message, changing a switch, or running a common event.

## Troubleshooting

### PointClickAdventure.js Issues
- If the menu doesn't appear when double-clicking objects, ensure that:
  - Both plugins are properly installed and activated.
  - The plugins are in the correct order in the Plugin Manager.
  - The event has the correct `<PointClickMenu>` note tag.
  - There are no conflicting plugins that might interfere with mouse input.

- If the menu appears but doesn't do anything when options are selected, check that you've properly implemented the action handler functions.

### DoubleClickMovement.js Issues
- If double-clicking doesn't move the character, check:
  - The plugin is activated in the Plugin Manager.
  - The "Double Click Threshold" isn't set too low or too high.
  - There are no other plugins conflicting with map movement.

## Advanced Usage
- You can extend the functionality of both plugins by adding new methods to the `Scene_Map.prototype`.
- Consider adding conditional logic to the action handlers in PointClickAdventure.js to create more complex interactions based on game variables or switches.
- You might want to add a way to disable the point-and-click functionality or double-click movement in certain situations (e.g., during cutscenes or battles).
- The pathfinding algorithm in DoubleClickMovement.js can be optimized or modified for more complex map layouts if needed.

For any additional support or questions, please contact Midnight Roach Media through [Your preferred contact method or support forum].