angular.module('classy.compat', ['classy.core']).classy.plugin.controller
  options:
    enabled: true
    ignore: ['constructor', 'init', 'data']
    methodsKeyName: 'methods'

  preInitBefore: (classConstructor, classObj, module) ->
    if @options.enabled

      if !angular.isObject(classConstructor::[@options.methodsKeyName])
        classConstructor::[@options.methodsKeyName] = {}

      for own key, fn of classObj
        if angular.isFunction(fn) and !(key in @options.ignore)
          classConstructor::[key] = undefined
          classConstructor::[@options.methodsKeyName][key] = fn

  