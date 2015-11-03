(function() {
  "use strict";

  VAGABOND.namespace('VAGABOND.LEVEL');

  VAGABOND.LEVEL = (function(module) {

    var Level = {};

    Level.init = function(map, entityPool) {
      this.entityPool = (entityPool === undefined) ? [] : entityPool;
      this.map = map;

      return this;
    };

    Level.addEntity = function() {
      var args = arguments;
      if (args[0] instanceof Array) {
        args = args[0];
      }

      Array.prototype.push.apply(this.entityPool, args);
    };

    Level.takeTurn = function() {
      var i;
      var entity;

      for (i = 0; i < this.entityPool.length; i++) {
        entity = this.entityPool[i];
        entity.takeTurn(this);
      }
    };

    Level.renderTo = function(screen) {
      var i;

      screen.clear(function() {
        return '[___,___,___]';
      });

      this.map.renderTo(screen, function(value, x, y) {
        return '[' + UTIL.zeroPad(x, 3) + ',' + UTIL.zeroPad(y, 3) + ',' +
            UTIL.zeroPad(Math.floor(UTIL.clamp(value, 0, 15)), 3) + ']';
      });

      var func = function(entity) {
        return '[' + UTIL.zeroPad(entity.x, 3) + ',' +
            UTIL.zeroPad(entity.y, 3) + ',' +
            UTIL.zeroPad(entity.char, 3) + ']';
      };

      for (i = 0; i < this.entityPool.length; i++) {
        this.entityPool[i].renderTo(screen, func);
      }
    };

    module.Level = Level;

    return module;

  })(VAGABOND.LEVEL);
})();
