var sliceMethods = {
  contains: function(angle) {
    return this.min <= angle && angle < this.max
  }
}

function createSlice(number, min, max) {
  return Object.create(sliceMethods, {
    min: {
      value: min
    },
    max: {
      value: max
    },
    number: {
      value: number
    }
  })
}

module.exports = createSlice
