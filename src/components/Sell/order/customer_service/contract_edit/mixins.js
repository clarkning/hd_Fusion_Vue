import _ from 'lodash'

let contractEditMixin = {
  methods: {
    $_setSubmitCustomerInfo (newValues, oldValues) {
      let submitData = []
      _.forIn(newValues, (newValue, name) => {
        let oldValue = oldValues[name]
        if (newValue !== oldValue) {
          submitData.push({
            name,
            oldValue,
            newValue
          })
        }
      })
      return submitData
    },
    $_start () {
      let eve = window.event
      eve.currentTarget.style.background = '#f4f3f3'
    },
    $_end () {
      let eve = window.event
      eve.currentTarget.style.background = '#fff'
    }
  }
}

export { contractEditMixin }
