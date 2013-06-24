// Generated by CoffeeScript 1.6.2
/*
 Makes it easier to create a composite objects
*/


(function() {
  define(["underscore"], function(_) {
    return function(target, compose, methods) {
      var method, _i, _len, _results;

      _results = [];
      for (_i = 0, _len = methods.length; _i < _len; _i++) {
        method = methods[_i];
        _results.push(target[method] = _.bind(compose[method], compose));
      }
      return _results;
    };
  });

}).call(this);