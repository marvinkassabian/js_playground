(function() {
  'use strict';

  VAGABOND.namespace('VAGABOND.TRAITS');

  VAGABOND.TRAITS = (function(module) {

    var hasHealth = function(initialHealth) {
      var health = initialHealth;

      return {
        changeHealth: function(dHealth) {
          health += dHealth;
        },

        setHealth: function(newHealth) {
          health = newHealth;
        },

        getHealth: function() {
          return health;
        }
      };
    };

    module.hasHealth = hasHealth;

    return module;
  })(VAGABOND.TRAITS);
})();
