// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(["./base", "../base", "../../templates/factory", "dref", "bindable"], function(InputView, View, templates, dref, bindable) {
    var SelectInputOptionView, SelectInputView, _ref, _ref1;

    SelectInputOptionView = (function(_super) {
      __extends(SelectInputOptionView, _super);

      function SelectInputOptionView() {
        _ref = SelectInputOptionView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      SelectInputOptionView.prototype.template = templates.fromSource("<option value='{{model.value}}'>{{model.label}}</option>", {
        engine: "handlebars"
      });

      return SelectInputOptionView;

    })(View);
    return SelectInputView = (function(_super) {
      __extends(SelectInputView, _super);

      function SelectInputView() {
        this._onValueChanged = __bind(this._onValueChanged, this);
        this.select = __bind(this.select, this);        _ref1 = SelectInputView.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      /*
      */


      SelectInputView.prototype.template = templates.fromSource("<select name='{{view.name}}'><option>{{view.selectLabel}}</option>{{{sections.selectList}}}</select>", {
        engine: "handlebars"
      });

      /*
      */


      SelectInputView.prototype.sections = {
        selectList: {
          type: "list",
          modelViewClass: SelectInputOptionView,
          source: "source",
          transform: function(model, list) {
            var view;

            view = list.view;
            return {
              _id: dref.get(model, "_id"),
              value: dref.get(model, view.get("modelValue")) || dref.get(model, view.get("modelLabel")),
              label: dref.get(model, view.get("modelLabel")),
              data: model
            };
          }
        }
      };

      /*
      */


      SelectInputView.prototype.selectLabel = "Select";

      /*
      */


      SelectInputView.prototype.modelLabel = "label";

      /*
      */


      SelectInputView.prototype.modelValue = "_id";

      /*
      */


      SelectInputView.prototype.events = {
        "change": function(event) {
          var selected, selectedVal;

          selected = this.$(":selected");
          selectedVal = selected.val();
          if (!selectedVal.length) {
            return this.deselect();
          }
          return this.select(selected.index() - 1);
        }
      };

      /*
       Selects an model based on the index
      */


      SelectInputView.prototype.select = function(index) {
        if (!~index) {
          return this.deselect();
        }
        return this.set("value", this.get("source").at(index).value);
      };

      /*
       deselects the model
      */


      SelectInputView.prototype.deselect = function() {
        return this.set("value", void 0);
      };

      /*
      */


      SelectInputView.prototype._onValueChanged = function(value) {
        var i, index, model, _i, _len, _ref2;

        SelectInputView.__super__._onValueChanged.call(this, value);
        index = -1;
        _ref2 = this.get("source").source();
        for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
          model = _ref2[i];
          if (model.value === value) {
            index = i + 1;
            break;
          }
        }
        if (!~index) {
          index = 0;
        }
        return this.$().children().eq(index).attr("selected", "selected");
      };

      return SelectInputView;

    })(InputView);
  });

}).call(this);