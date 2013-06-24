// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["./base", "pilot-block"], function(BaseViewDecorator, pilot) {
    var TemplateViewDecorator, _ref;

    TemplateViewDecorator = (function(_super) {
      __extends(TemplateViewDecorator, _super);

      function TemplateViewDecorator() {
        _ref = TemplateViewDecorator.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      /*
      */


      TemplateViewDecorator.prototype.init = function() {
        TemplateViewDecorator.__super__.init.call(this);
        return this.template = this.options;
      };

      /*
      */


      TemplateViewDecorator.prototype.load = function(callback) {
        var _this = this;

        return this.template.render(this.templateData(), function(err, content) {
          var p;

          if (err) {
            return callback(err);
          }
          p = _this.view.section.start;
          _this.view.section.html(content);
          _this.view.set("html", _this.view.section.html());
          return callback();
        });
      };

      /*
      */


      TemplateViewDecorator.prototype.templateData = function() {
        var model, _ref1;

        model = (_ref1 = this.view.getFlatten("model")) != null ? _ref1 : this.view.getFlatten("item");
        return {
          item: model,
          model: model,
          sections: this.view.get("sections"),
          view: this.view
        };
      };

      return TemplateViewDecorator;

    })(BaseViewDecorator);
    TemplateViewDecorator.getOptions = function(view) {
      return view.template;
    };
    return TemplateViewDecorator;
  });

}).call(this);