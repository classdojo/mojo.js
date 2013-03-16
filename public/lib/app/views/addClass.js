// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["../../core/views/state", "../core/templates", "./addClass", "./addStudents", "./addBehaviors"], function(StateView, templates) {
    var AddClassWizardView;
    return AddClassWizardView = (function(_super) {

      __extends(AddClassWizardView, _super);

      /*
      */


      function AddClassWizardView() {
        AddClassWizardView.__super__.constructor.call(this, {
          template: templates.addClassModal,
          states: [new AddClassView(), new AddStudentsView(), new AddBehaviorsView()]
        });
      }

      return AddClassWizardView;

    })(StateView);
  });

}).call(this);
