// Generated by CoffeeScript 1.6.3
var BaseViewDecorator, TransitionDecorator, async, comerr, _,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

comerr = require("comerr");

BaseViewDecorator = require("./base");

_ = require("underscore");

async = require("../../utils/async");

TransitionDecorator = (function(_super) {
  __extends(TransitionDecorator, _super);

  /*
  */


  function TransitionDecorator(view, transition) {
    this.view = view;
    this.transition = transition;
    this._onRemove = __bind(this._onRemove, this);
    this._onRender = __bind(this._onRender, this);
    this.view.once("render", this._onRender);
    this.view.once("remove", this._onRemove);
  }

  /*
  */


  TransitionDecorator.prototype._onRender = function() {
    return this._transitionAll("enter", function() {});
  };

  /*
  */


  TransitionDecorator.prototype._onRemove = function() {
    var _this = this;
    this.view.$().css({
      opacity: 1
    });
    return this.view.callstack.push(function(next) {
      return _this._transitionAll("exit", next);
    });
  };

  /*
  */


  TransitionDecorator.prototype._transitionAll = function(type, next) {
    var _this = this;
    return async.forEach(this._filterTransitions(type), (function(transition, next) {
      return _this._transition(_this._element(transition), transition[type], next);
    }), next);
  };

  /*
  */


  TransitionDecorator.prototype._transition = function(element, transition, next) {
    var _this = this;
    if (!element.length) {
      return next(new comerr.NotFound("element does not exist"));
    }
    if (transition.from) {
      element.css(transition.from);
    }
    return setTimeout((function() {
      return element.transit(transition.to || transition, next);
    }), 0);
  };

  /*
  */


  TransitionDecorator.prototype._transitions = function() {
    var selector, trans, transition, transitions;
    transition = this.transition;
    if (transition.enter || transition.exit) {
      return [transition];
    }
    transitions = [];
    for (selector in transition) {
      trans = transition[selector];
      trans.selector = selector;
      transitions.push(trans);
    }
    console.log(transitions);
    return transitions;
  };

  /*
  */


  TransitionDecorator.prototype._filterTransitions = function(type) {
    return this._transitions().filter(function(trans) {
      return !!trans[type];
    });
  };

  /*
  */


  TransitionDecorator.prototype._element = function(transition) {
    var element, selector;
    selector = transition.selector || transition.el;
    element = selector ? this.view.$(selector) : this.view.$();
    return element.filter(function(index, element) {
      return element.nodeType === 1;
    });
  };

  /*
  */


  TransitionDecorator.priority = "display";

  TransitionDecorator.getOptions = function(view) {
    return view.transition;
  };

  TransitionDecorator.decorate = function(view, options) {
    return new TransitionDecorator(view, options);
  };

  return TransitionDecorator;

})(BaseViewDecorator);

module.exports = TransitionDecorator;