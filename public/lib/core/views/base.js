// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "events", "../models/base", "outcome", "underscore", "../utils/compose", "./decor/facade"], function($, events, Model, outcome, _, compose, ViewDecorator) {
    var BaseView;
    return BaseView = (function(_super) {

      __extends(BaseView, _super);

      /*
      */


      function BaseView(options) {
        if (options == null) {
          options = {};
        }
        this.rerender = __bind(this.rerender, this);

        this.options = new Model(_.extend({}, options, this));
        compose(this, this.options, ["get", "has", "set", "bind", "glue"]);
        this.decorator = new ViewDecorator(this);
        this._o = outcome.e(this);
        this.init(this.options);
        this.options.set("initialized", true);
      }

      /*
      */


      BaseView.prototype.init = function(options) {
        options.set("data.view", this);
        if (this._initialized) {
          throw new Error("already initialized");
        }
        return this._initialized = true;
      };

      /*
           returns a search for a particular element
      */


      BaseView.prototype.$ = function(search) {
        var _ref;
        return (_ref = this.element) != null ? _ref.find(search) : void 0;
      };

      /*
           attaches to an element
      */


      BaseView.prototype.attach = function(selectorOrElement, callback) {
        var _this = this;
        if (callback == null) {
          callback = (function() {});
        }
        this.remove();
        this.element = typeof selectorOrElement === "string" ? $(selectorOrElement) : selectorOrElement;
        this.selector = selectorOrElement;
        return this.decorator.setup(this._o.e(callback).s(function() {
          callback();
          return _this._attached();
        }));
      };

      /*
           re-renders an element
      */


      BaseView.prototype.rerender = function(callback) {
        if (callback == null) {
          callback = function() {};
        }
        if (typeof callback !== "function") {
          callback = (function() {});
        }
        if (!this.selector) {
          return callback();
        }
        return this.attach(this.selector, callback);
      };

      /*
      */


      BaseView.prototype._attached = function() {};

      /*
      */


      BaseView.prototype.remove = function(callback) {
        var _this = this;
        if (callback == null) {
          callback = (function() {});
        }
        if (!this.element) {
          return callback();
        }
        return this.decorator.teardown(this._o.e(callback).s(function() {
          _this.element.unbind("*");
          _this.element.html("");
          return callback();
        }));
      };

      return BaseView;

    })(events.EventEmitter);
  });

}).call(this);
