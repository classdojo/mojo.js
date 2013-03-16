define ["./base", "../models/base", "../collections/concrete", "step"], (BaseView, Model, Collection, step) ->
  
  class StateView extends BaseView

    ###
    ###

    init: (options) ->

      super options

      options.defaults {
        currentIndex: 0
      }

      @states = new Collection options.get("states") or []
      @states.on "updated", @_onStatesChange

    ###
    ###

    _attached: () ->  
      @bind "currentIndex", @_onIndexChange


    ###
    ###

    _onIndexChange: (index) =>

      self = @

      return if not self.states.length() or not @element

      step(

        # wait for the element to be removed before adding the next - what if there's a 
        # transition?
        (() ->
          return @() if not self._currentView
          self._currentView.remove @
        ),

        # after removal, add the new state
        (() ->
          self._currentView = self.states.getItemAt(index)
          self._currentView.attach self._childrenElement().append("<div />").children().last()
          self.glue "modelLocator", self._currentView, "modelLocator"
        )
      )

    ###
    ###

    _childrenElement: () -> 
      childrenElement = @get "childrenElement"
      return @element if not childrenElement
      return @element.find childrenElement


    ###
     if the states change then make sure the current state is synced as well
    ###

    _onStatesChange: () =>

      # get the current view based on the state index
      currentView = @states.getItemAt @get "currentIndex"

      # if the two states don't match up, then replace with the new view
      if @_currentView isnt currentView
        @_onIndexChange @get "currentIndex"








