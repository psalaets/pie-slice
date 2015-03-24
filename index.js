var createPie = require('./lib/pie')
var createSlice = require('./lib/slice')

function validateSliceCount(sliceCount) {
  if (sliceCount < 2 || sliceCount > 360) {
    throw new Error('sliceCount must be between 2 and 360, inclusive')
  }
}

module.exports = {
  /**
   * Create a pie with certain number of slices.
   *
   * @param sliceCount Number of slices. Must be between 2 and 360, inclusive.
   * @param options Hash of extra options. Options:
   *    - firstSliceFacesUp - true to make first slice point straight up so it's
   *      bissected by angle 0. Otherwise first slice *begins* at angle 0.
   *      Defaults to false.
   * @return sliced pie
   */
  slice: function(sliceCount, options) {
    validateSliceCount(sliceCount)

    options = options || {}
    var slices = []

    var step = 360 / sliceCount
    var halfStep = step / 2
    var min = 0
    var max = min + step
    var sliceNumber = 0

    if (options.firstSliceFacesUp) {
      // first slice straddles angle 0 and is actually two slice objects
      slices.push(createSlice(0, 360 - halfStep, 360))
      slices.push(createSlice(0, 0, halfStep))

      // tweak to account for first slice already existing
      sliceNumber = 1
      min = halfStep
      max = min + step
    }

    for (; sliceNumber < sliceCount; sliceNumber++, min += step, max += step) {
      slices.push(createSlice(sliceNumber, min, max))
    }

    return createPie(slices, !!options.yDown)
  }
}
