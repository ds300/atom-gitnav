{CompositeDisposable} = require 'atom'
gitnav = require './gitnav'

module.exports = AtomGitnav =
  subscriptions: null

  activate: () ->

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-gitnav:next': => @next()
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-gitnav:prev': => @prev()
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-gitnav:start': => @start()
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-gitnav:end': => @end()
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-gitnav:build': => @build()

  deactivate: ->
    @subscriptions.dispose()


  next: -> gitnav('next')
  prev: -> gitnav('prev')
  start: -> gitnav('start')
  end: -> gitnav('end')
  build: -> gitnav('build')
