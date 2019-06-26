import Vue from 'vue'

export const mapState = function (module, properties) {
  var props = {}
  if (Array.isArray(properties)) {
    properties.forEach(property => {
      props[property] = {
        get () { return this.$store.state[module][property] },
        set (value) { this.$store.commit(`${module}/${property}`, value) }
      }
    })
  } else {
    Object.keys(properties).forEach(key => {
      var property = properties[key]
      props[key] = {
        get () { return this.$store.state[module][property] },
        set (value) { this.$store.commit(`${module}/${property}`, value) }
      }
    })
  }
  return props
}

export const createMutationsFromModel = function (Model) {
  return Object.keys(new Model()).reduce((mutations, prop) => {
    mutations[prop] = function (state, value) {
      Vue.set(state, prop, value)
    }
    return mutations
  }, {})
}

export const mapModelToStates = function (module, Model) {
  return mapState(module, Object.keys(new Model()))
}
