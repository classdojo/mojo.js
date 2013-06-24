// Generated by CoffeeScript 1.6.2
/*
  Factory that makes Factories! Here's a few use cases

  var classFactory = new ClassFactory(View);
  var clazz = View;

  factoryFactory.createItem(classFactory).createItem(item); //View instance
  factoryFactory.createItem(clazz).createItem(item); //View instance
*/


(function() {
  define(function() {
    var FactoryFactory;

    FactoryFactory = (function() {
      /*
      */
      function FactoryFactory() {
        this._classes = [];
      }

      /*
      */


      FactoryFactory.prototype.addFactoryClass = function(factoryClass) {
        return this._classes.push(factoryClass);
      };

      /*
      */


      FactoryFactory.prototype.test = function(item) {
        return !!this.getFactoryClass(item);
      };

      /*
      */


      FactoryFactory.prototype.create = function(item) {
        var factoryClass;

        if (item.create) {
          return item;
        }
        factoryClass = getFactoryClass(item);
        if (factoryClass) {
          return new factoryClass(item);
        }
      };

      /*
      */


      FactoryFactory.prototype.getFactoryClass = function(item) {
        var factoryClass, _i, _len, _ref;

        _ref = this._classes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          factoryClass = _ref[_i];
          if (factoryClass.test(item)) {
            return factoryClass;
          }
        }
      };

      return FactoryFactory;

    })();
    return new FactoryFactory();
  });

}).call(this);