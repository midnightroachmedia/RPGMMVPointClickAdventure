/*:
 * @plugindesc v1.1 Point-and-Click Menu - Adds a point-and-click dialogue menu for specific objects on the map, similar to traditional adventure games.
 * @author Midnight Roach Media
 * @help This plugin allows you to click on an object with a special note tag and bring up a dialogue menu with options: Inspect, Talk, Use, Pick-up.
 */

(function() {
    var parameters = PluginManager.parameters('PointClickMenu');

    // Create a new Window for the point-and-click menu
    function Window_PointClickMenu() {
        this.initialize.apply(this, arguments);
    }

    Window_PointClickMenu.prototype = Object.create(Window_Command.prototype);
    Window_PointClickMenu.prototype.constructor = Window_PointClickMenu;

    Window_PointClickMenu.prototype.initialize = function() {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.openness = 0;
        this.deactivate();
    };

    Window_PointClickMenu.prototype.windowWidth = function() {
        return 200;
    };

    Window_PointClickMenu.prototype.windowHeight = function() {
        return this.fittingHeight(4);
    };

    Window_PointClickMenu.prototype.makeCommandList = function() {
        this.addCommand('Inspect', 'inspect');
        this.addCommand('Talk', 'talk');
        this.addCommand('Use', 'use');
        this.addCommand('Pick-up', 'pickup');
    };

    // Extend Scene_Map to handle point-and-click menu
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this.createPointClickMenuWindow();
    };

    Scene_Map.prototype.createPointClickMenuWindow = function() {
        this._pointClickMenuWindow = new Window_PointClickMenu();
        this._pointClickMenuWindow.setHandler('inspect', this.onInspect.bind(this));
        this._pointClickMenuWindow.setHandler('talk', this.onTalk.bind(this));
        this._pointClickMenuWindow.setHandler('use', this.onUse.bind(this));
        this._pointClickMenuWindow.setHandler('pickup', this.onPickup.bind(this));
        this._pointClickMenuWindow.setHandler('cancel', this.onMenuCancel.bind(this));
        this.addWindow(this._pointClickMenuWindow);
    };

    Scene_Map.prototype.onInspect = function() {
        console.log("Inspect action selected");
        this.closePointClickMenu();
    };

    Scene_Map.prototype.onTalk = function() {
        console.log("Talk action selected");
        this.closePointClickMenu();
    };

    Scene_Map.prototype.onUse = function() {
        console.log("Use action selected");
        this.closePointClickMenu();
    };

    Scene_Map.prototype.onPickup = function() {
        console.log("Pick-up action selected");
        this.closePointClickMenu();
    };

    Scene_Map.prototype.onMenuCancel = function() {
        this.closePointClickMenu();
    };

    Scene_Map.prototype.closePointClickMenu = function() {
        this._pointClickMenuWindow.close();
        this._pointClickMenuWindow.deactivate();
    };

    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if (TouchInput.isTriggered()) {
            var x = $gameMap.canvasToMapX(TouchInput.x);
            var y = $gameMap.canvasToMapY(TouchInput.y);
            var event = $gameMap.eventAt(x, y);
            if (this._pointClickMenuWindow.isOpen()) {
                if (!this._pointClickMenuWindow.isTouchedInsideFrame()) {
                    this.onMenuCancel();
                }
            } else if (event && event.event().meta.PointClickMenu) {
                this.openPointClickMenu(TouchInput.x, TouchInput.y);
            }
        }
    };

    Scene_Map.prototype.openPointClickMenu = function(x, y) {
        this._pointClickMenuWindow.x = x;
        this._pointClickMenuWindow.y = y;
        this._pointClickMenuWindow.open();
        this._pointClickMenuWindow.activate();
    };

    Window_Base.prototype.isTouchedInsideFrame = function() {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    Game_Map.prototype.eventAt = function(x, y) {
        return this.events().find(function(event) {
            return event.posNt(x, y);
        });
    };
})();

