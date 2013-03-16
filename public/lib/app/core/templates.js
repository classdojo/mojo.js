// Generated by CoffeeScript 1.4.0
(function() {

  define(["../../core/templates/factory"], function(TemplatesFactory) {
    var templates;
    templates = new TemplatesFactory({
      "/": "/",
      engine: "none"
    });
    return {
      addClassModal: templates.get("add-class-modal", {
        directory: "/templatesfdsfsd/"
      }),
      addClass: templates.get("add-class"),
      addStudents: templates.get("add-students"),
      addBehaviors: templates.get("add-behaviors")
    };
  });

}).call(this);
