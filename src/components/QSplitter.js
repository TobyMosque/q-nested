import { QSplitter } from 'quasar'

const component = {}
component.name = 'QSplitter'
component.props = {
  details: Boolean,
  ...QSplitter.options.props
}
console.log(QSplitter.options.props.limits)
component.methods = Object.keys(QSplitter.options.methods).reduce((methods, name) => {
  methods[name] = function () {
    this.$refs.component[name].apply(this.$refs.component, arguments)
  }
  return methods
}, {})
component.computed = {
  panel () {
    switch (true) {
      case !this.details: return 'before'
      case this.$q.screen.lt.md: return 'after'
      default: return 'both'
    }
  },
  __separatorClass () {
    return { hidden: this.panel !== 'both' }
  },
  __value: {
    get () {
      switch (this.panel) {
        case 'before': return 100
        case 'after': return 0
        default: return this.value
      }
    },
    set (value) {
      if (this.panel === 'both') {
        this.$emit('input', value)
      }
    }
  },
  __limits: {
    get () {
      switch (this.panel) {
        case 'before': return [0.01, 99.99]
        case 'after': return [99.99, 0.01]
        default: return this.limits
      }
    },
    set (value) {
      if (this.panel === 'both') {
        this.$emit('update:limits', value)
      }
    }
  }
}
component.watch = {
  __limits () {
    console.log(this.__limits)
  }
}
component.render = function (h) {
  var self = this
  var { ...attrs } = self.$attrs
  var { value, limits, separatorClass, ...props } = self.$props
  var { input, ...listeners } = self.$listeners
  var { ...scopedSlots } = self.$scopedSlots

  props.value = self.__value
  props.limits = self.__limits
  props.separatorClass = self.__separatorClass
  listeners.input = function (value) {
    self.__value = value
  }
  switch (self.panel) {
    case 'before': delete scopedSlots.after; break
    case 'after': delete scopedSlots.before; break
  }
  return h(QSplitter, {
    ref: 'component',
    attrs: attrs,
    props: props,
    on: listeners,
    scopedSlots: scopedSlots
  }, [])
}

export default component
