(function() {
  "use strict";

  VAGABOND.namespace("VAGABOND.MAPS");

  VAGABOND.MAPS = (function(module) {

    var Matrix = VAGABOND.DATA_STRUCTURES.MATRIX.Matrix;
    var Graph = VAGABOND.DATA_STRUCTURES.GRAPH.Graph;

    var Map = Object.create(Matrix);

    Map.init = function(h, w, defaults) {
      Matrix.init.call(this, h, w, defaults);

      // TODO: probably just mix graph and map together
      this.graph = Object.create(Graph);

      return this;
    };

    Map.initGrid = function(initValueFunc) {
      Matrix.initGrid.call(this, initValueFunc);

      this.graph.init(this);
    };

    Map.renderTo = function(screen, formatValue) {
      var i, j, offset;

      if (formatValue === undefined) {
        formatValue = this.defaults.formatValue;
      }

      offset = screen.getOrigin();

      for (i = offset.y; i < screen.height + offset.y; i++) {
        for (j = offset.x; j < screen.width + offset.x; j++) {

          if (this.isValidCoordinate(j, i)) {
            screen.set(j - offset.x, i - offset.y,
                formatValue.call(this, this.get(j, i), j, i));
          }
        }
      }

    };

    Map.generate = function() {

    };

    // TODO: clean this
    Map.getPossibleMoves = function(entity) {
      var ret = [];
      var added = {};
      var movement = entity.movement;
      var coor = {
        x: entity.x,
        y: entity.y
      };

      flood(movement, coor, this);

      return ret;

      function flood(movesLeft, coor, map) {
        var VALID_MOVES = UTIL.VALID_MOVES;
        var move, i, nextCoor, nextMovesLeft;

        if (added[coor.x + ":" + coor.y] !== undefined ||
            added[coor.x + ":" + coor.y] > movesLeft) {
          return;
        } else if (movesLeft >= 0) {
          added[coor.x + ":" + coor.y] = movesLeft;
          ret.push(coor);

          if (movesLeft > 0) {
            for (i = 0; i < VALID_MOVES.length; i++) {
              move = VALID_MOVES[i];
              nextCoor = {
                x: coor.x + move[0],
                y: coor.y + move[1]
              };

              if (map.isValidCoordinate(nextCoor.x, nextCoor.y)) {
                nextMovesLeft = movesLeft - map.graph.getEdgeValue(coor, nextCoor);
                if (map.isValidCoordinate(nextCoor.x, nextCoor.y)) {
                  flood(nextMovesLeft, nextCoor);
                }
              }
            }
          }

        }
      }
    };

    module.Map = Map;

    return module;

  })(VAGABOND.MAPS);
})();
