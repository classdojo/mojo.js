dref = require "dref"

class Section extends require("bindable").Object
  
  ###
  ###

  constructor: (@sections, @name, @viewClass, options) ->
    super options

    @on "change", @_onDataChange
    
  
  ###
  ###

  createFragment: () ->


    unless @view
      @view = new @viewClass @
      @view._parent = @sections.view
      @sections._initialized @

    @view.section.toFragment()

  ###
  ###

  _onDataChange: (key, value) =>
    console.log key, value





module.exports = Section