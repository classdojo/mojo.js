// Generated by CoffeeScript 1.4.0

/*

Notes:

1. cstep is used so that teardown & other functions wait until the previous method is calld. For instance - 
if setup is called, then teardown immediately, then teardown MUST wait until setup is complete
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["underscore", "cstep", "async", "outcome", "./base", "./template", "./transition", "./html"], function(_, cstep, async, outcome, BaseViewDecorator, TemplateDecorator, TransitionDecorator, HtmlDecorator) {
    var ViewDecorator, availableDecorators;
    availableDecorators = {
      "template": TemplateDecorator,
      "html": HtmlDecorator,
      "transition": TransitionDecorator
    };
    return ViewDecorator = (function(_super) {

      __extends(ViewDecorator, _super);

      /*
      */


      function ViewDecorator(view) {
        this.view = view;
        this._setupDecorators = __bind(this._setupDecorators, this);

        this.init = __bind(this.init, this);

        this.dispose();
        view.bind("initialized", this.init);
      }

      /*
      */


      ViewDecorator.prototype.init = function() {
        this.view.options.on("update", this._setupDecorators);
        return this._setupDecorators();
      };

      /*
      */


      ViewDecorator.prototype.setup = function(callback) {
        return this._callDecorFn("setup", callback);
      };

      /*
      */


      ViewDecorator.prototype.resetup = function(callback) {
        return this._callDecorFn("resetup", callback);
      };

      /*
      */


      ViewDecorator.prototype.teardown = function(callback) {
        return this._callDecorFn("teardown", callback);
      };

      /*
      */


      ViewDecorator.prototype.dispose = function() {
        var decor, _i, _len, _ref;
        if (this._decorArray) {
          _ref = this._decorArray;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            decor = _ref[_i];
            decor.dispose();
          }
        }
        this._decorArray = [];
        return this._decorators = {};
      };

      /*
      */


      ViewDecorator.prototype._callDecorFn = cstep(function(name, callback) {
        return async.eachSeries(this._decorArray, (function(decor, next) {
          return decor[name].call(decor, next);
        }), callback);
      });

      /*
      */


      ViewDecorator.prototype._setupDecorators = function() {
        this._removeDecorators();
        this._addDecorators();
        if (this._changed) {
          this._changed = false;
          return this._decorArray = _.values(this._decorators).sort(function(a, b) {
            if (a.priority > b.priority) {
              return 1;
            } else {
              return -1;
            }
          });
        }
      };

      /*
      */


      ViewDecorator.prototype._removeDecorators = function() {
        var clazz, name, _results;
        _results = [];
        for (name in availableDecorators) {
          clazz = availableDecorators[name];
          if (!clazz.test(this.view) && this._decorators[name]) {
            this._changed = true;
            this._decorators[name].dispose();
            _results.push(delete this._decorators[name]);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      /*
      */


      ViewDecorator.prototype._addDecorators = function() {
        var clazz, name, priority, _results;
        priority = 0;
        _results = [];
        for (name in availableDecorators) {
          priority++;
          clazz = availableDecorators[name];
          if (clazz.test(this.view) && !this._decorators[name]) {
            this._decorators[name] = new clazz(this.view);
            this._decorators[name].priority = priority;
            _results.push(this._changed = true);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return ViewDecorator;

    })(BaseViewDecorator);
  });

}).call(this);
