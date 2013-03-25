define(["require"], function(require) {

    var __dirname = "mannequin/lib/transformers",
    __filename    = "mannequin/lib/transformers/transformer.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports,
    global        = window;

    

    // Generated by CoffeeScript 1.4.0
(function() {
  var __getClass;

  __getClass = function(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
  };

  module.exports = (function() {
    /*
    */

    function _Class(_transformers, key, _transform) {
      this._transformers = _transformers;
      this.key = key;
      this._transform = _transform;
    }

    /*
    */


    _Class.prototype["default"] = function(value) {
      if (!arguments.length) {
        return this._defaultValue;
      }
      this._defaultValue = value;
      return this;
    };

    /*
    */


    _Class.prototype.cast = function(clazz) {
      var _this = this;
      this._transform = function(value) {
        if (!value) {
          return _this._defaultValue;
        }
        if (value.constructor === clazz) {
          return value;
        }
        return new clazz(value);
      };
      return this;
    };

    /*
    */


    _Class.prototype.reset = function() {
      var m;
      m = this._transformers.model;
      return m.set(this.key, this.set(m.get(this.key)));
    };

    /*
    */


    _Class.prototype.set = function(value) {
      return this._transform(value || this._defaultValue);
    };

    return _Class;

  })();

}).call(this);


    return module.exports;
});