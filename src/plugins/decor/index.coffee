BaseViewDecorator   = require "./base"
SelectorDecorator   = require "./selector"
EventsDecorator     = require "./events"
SectionsDecorator   = require "./sections/index"
DraggableDecorator  = require "./dragdrop/draggable"
DroppableDecorator  = require "./dragdrop/droppable"
TransitionDecorator = require "./transition"
PreloadDecorator    = require "./preload"
bindableDecor       = require "bindable-decor"
bindableDecorbindings = require "bindable-decor-bindings"
paperclip             = require "mojo-paperclip"


module.exports = (app) ->

  decor = bindableDecor()

  decor.use(

    # bindings = priority for explicit data-bindings
    bindableDecorbindings("render"),
    SelectorDecorator,

    # additional decorators that don't have high priority - get added on .render() & .display()
    PreloadDecorator,

    paperclip.decorator,

    TransitionDecorator,
    EventsDecorator,
    DraggableDecorator,
    DroppableDecorator,

    # section / child decorators. These have (almost) highest
    # priority since they should be added before the template is loaded
    SectionsDecorator
  )

  app.decorators = decor