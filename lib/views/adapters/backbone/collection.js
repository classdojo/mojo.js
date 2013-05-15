// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["bindable", "./model", "hoist", "asyngleton"], function(bindable, BackboneWrapperModel, hoist, asyngleton) {
    var BackboneWrapperCollection;

    return BackboneWrapperCollection = (function(_super) {
      __extends(BackboneWrapperCollection, _super);

      /*
      */


      function BackboneWrapperCollection(_backboneCollection) {
        var event, _i, _len, _ref;

        this._backboneCollection = _backboneCollection;
        BackboneWrapperCollection.__super__.constructor.call(this);
        _ref = ["replace", "reset", "add", "remove"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          _backboneCollection.bind(event, this["__" + event], this);
        }
        this._setupTransformers();
      }

      /*
      */


      BackboneWrapperCollection.prototype.bind = function() {
        this.fetch();
        return BackboneWrapperCollection.__super__.bind.apply(this, arguments);
      };

      /*
      */


      BackboneWrapperCollection.prototype.fetch = asyngleton(function(next) {
        this._backboneCollection.fetch();
        return this.once("__reset", next);
      });

      /*
      */


      BackboneWrapperCollection.prototype._setupTransformers = function() {
        return this.transform().map(hoist().cast(BackboneWrapperModel));
      };

      /*
      */


      BackboneWrapperCollection.prototype.__replace = function() {};

      /*
      */


      BackboneWrapperCollection.prototype.__reset = function(collection) {
        this.reset(collection.models);
        return this.emit("__reset");
      };

      /*
      */


      BackboneWrapperCollection.prototype.__add = function() {};

      /*
      */


      BackboneWrapperCollection.prototype.__remove = function() {};

      return BackboneWrapperCollection;

    })(bindable.Collection);
  });

}).call(this);