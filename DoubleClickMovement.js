/*:
 * @plugindesc v1.1 DoubleClickMovement - Allows player movement via double-clicking with improved error handling
 * @author Midnight Roach Media
 *
 * @param Double Click Threshold
 * @desc Time in milliseconds between clicks to register as a double-click
 * @default 300
 *
 * @help This plugin allows the player to move by double-clicking on the map.
 * The character will move at their normal speed to the clicked location,
 * finding a path around obstacles.
 * 
 * There are no plugin commands for this plugin.
 */

(function() {
    var parameters = PluginManager.parameters('DoubleClickMovement');
    var doubleClickThreshold = Number(parameters['Double Click Threshold'] || 300);

    var lastClickTime = 0;
    var lastClickX = -1;
    var lastClickY = -1;

    function isDoubleClicked() {
        if (TouchInput.isTriggered()) {
            var currentTime = Date.now();
            var x = TouchInput.x;
            var y = TouchInput.y;
            if (currentTime - lastClickTime < doubleClickThreshold &&
                Math.abs(x - lastClickX) < 10 && Math.abs(y - lastClickY) < 10) {
                lastClickTime = 0;
                lastClickX = -1;
                lastClickY = -1;
                return true;
            }
            lastClickTime = currentTime;
            lastClickX = x;
            lastClickY = y;
        }
        return false;
    }

    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        this.updateDoubleClickMovement();
    };

    Scene_Map.prototype.updateDoubleClickMovement = function() {
        if (isDoubleClicked()) {
            var x = $gameMap.canvasToMapX(TouchInput.x);
            var y = $gameMap.canvasToMapY(TouchInput.y);
            if ($gameMap.isValid(x, y)) {
                var events = $gameMap.eventsXy(x, y);
                if (events.length === 0) {  // Only move if there's no event at the location
                    $gamePlayer.setDestination(x, y);
                }
            }
        }
    };

    Game_Player.prototype.setDestination = function(x, y) {
        this._destinationX = x;
        this._destinationY = y;
        this._destinationActive = true;
        this._movementPath = this.findPathTo(x, y);
    };

    Game_Player.prototype.findPathTo = function(targetX, targetY) {
        var openList = [];
        var closedList = [];
        var startNode = {x: this.x, y: this.y, g: 0, h: 0, f: 0, parent: null};
        openList.push(startNode);

        while (openList.length > 0) {
            var currentNode = openList.reduce((min, node) => node.f < min.f ? node : min, openList[0]);
            
            if (currentNode.x === targetX && currentNode.y === targetY) {
                return this.reconstructPath(currentNode);
            }

            openList = openList.filter(node => node !== currentNode);
            closedList.push(currentNode);

            var neighbors = this.getNeighbors(currentNode);
            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];
                if (closedList.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    continue;
                }

                var gScore = currentNode.g + 1;
                var existingOpenNode = openList.find(node => node.x === neighbor.x && node.y === neighbor.y);

                if (!existingOpenNode) {
                    neighbor.g = gScore;
                    neighbor.h = this.manhattanDistance(neighbor, {x: targetX, y: targetY});
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = currentNode;
                    openList.push(neighbor);
                } else if (gScore < existingOpenNode.g) {
                    existingOpenNode.g = gScore;
                    existingOpenNode.f = existingOpenNode.g + existingOpenNode.h;
                    existingOpenNode.parent = currentNode;
                }
            }
        }

        return []; // No path found
    };

    Game_Player.prototype.getNeighbors = function(node) {
        var neighbors = [];
        var directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        for (var i = 0; i < directions.length; i++) {
            var dir = directions[i];
            var newX = node.x + dir[0];
            var newY = node.y + dir[1];
            if ($gameMap.isValid(newX, newY) && this.canPass(node.x, node.y, this.getDirectionFromDelta(dir[0], dir[1]))) {
                neighbors.push({x: newX, y: newY});
            }
        }
        return neighbors;
    };

    Game_Player.prototype.getDirectionFromDelta = function(dx, dy) {
        if (dx === 0 && dy === -1) return 8;
        if (dx === 0 && dy === 1) return 2;
        if (dx === -1 && dy === 0) return 4;
        if (dx === 1 && dy === 0) return 6;
        return 0;
    };

    Game_Player.prototype.manhattanDistance = function(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    };

    Game_Player.prototype.reconstructPath = function(node) {
        var path = [];
        while (node.parent) {
            var dx = node.x - node.parent.x;
            var dy = node.y - node.parent.y;
            path.unshift(this.getDirectionFromDelta(dx, dy));
            node = node.parent;
        }
        return path;
    };

    var _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        if (this._destinationActive && !this.isMoving()) {
            this.updateDestinationMove();
        }
    };

    Game_Player.prototype.updateDestinationMove = function() {
        if (this._movementPath.length > 0) {
            var direction = this._movementPath.shift();
            if (this.canPass(this.x, this.y, direction)) {
                this.moveStraight(direction);
            } else {
                this._movementPath = this.findPathTo(this._destinationX, this._destinationY);
            }
        } else {
            this._destinationActive = false;
        }
    };

    Game_Player.prototype.triggerTouchAction = function() {
        return false;
    };

    Game_Temp.prototype.setDestination = function(x, y) {
        // Do nothing to prevent default touch movement
    };

    Game_Map.prototype.isValid = function(x, y) {
        return (x >= 0 && x < this.width() && y >= 0 && y < this.height());
    };
})();