module.exports = createSlice

var sliceMethods = {
  contains: function(angle) {
    return this.min <= angle && angle < this.max
  }
}

function createSlice(number, min, max) {
  var slice = Object.create(sliceMethods)
  slice.min = min
  slice.max = max
  slice.number = number
  return slice
}