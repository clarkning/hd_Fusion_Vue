import _ from 'lodash'

class EnumType {
  constructor (enumObj) {
    this.enumObj = Object.assign({}, enumObj)
  }

  /**
   * 获取键列表
   * @returns {string[]}
   */
  getKeys () {
    return Object.keys(this.enumObj)
  }

  getValues () {
    return Object.values(this.enumObj)
  }

  getEntries () {
    return Object.entries(this.enumObj)
  }

  generateEnumList (invertFunc) {
    if (!!invertFunc && typeof invertFunc === 'function') {
      let newObj = _.mapValues(this.enumObj, invertFunc)
      return Object.values(newObj)
    } else {
      let newObj = _.mapValues(this.enumObj, (value, label) => { return {label, value} })
      return Object.values(newObj)
    }
  }

  getEntriesByAsc () {
    return _.sortBy(Object.entries(this.enumObj), pair => pair[1])
  }

  getEntriesByDesc () {
    return _.sortBy(Object.entries(this.enumObj), pair => -pair[1])
  }

  getValuesByAsc () {
    return Object.values(this.enumObj).sort()
  }

  getKeysByAsc () {
    return _.sortBy(Object.entries(this.enumObj), pair => pair[1]).map(pair => pair[0])
  }

  getInvertedEnum () {
    return _.invert(this.enumObj)
  }

  excludeKeys (...excludedKeys) {
    let copyEnum = Object.assign({}, this.enumObj)
    excludedKeys.forEach(key => {
      delete copyEnum[this.getKey(key)]
    })

    return copyEnum
  }

  getEnumObj () {
    return this.enumObj
  }

  getValue (key) {
    if (key in this.enumObj) {
      return this.enumObj[key]
    } else {
      return ''
    }
  }

  getKey (value) {
    let invertedEnum = this.getInvertedEnum()
    if (value in invertedEnum) {
      return invertedEnum[value]
    } else {
      return ''
    }
  }
}

export {EnumType}
