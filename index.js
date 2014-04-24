var createPie = require('./lib/pie')
var createSlice = require('./lib/slice')

module.exports = {
  /**
   * Create a pie with certain number of slices.
   *
   * @param number Number of slices
   * @param options Hash of extra options. Options:
   *    - firstSliceFacesUp - true to make first slice point straight up so it's
   *      bissected by angle 0. Otherwise first slice *begins* at angle 0.
   *      Defaults to false.
   * @return sliced pie
   */
  slice: function(number, options) {
    options = options || {}
    var slices = []

    var step = 360 / number
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

    for (; sliceNumber < number; sliceNumber++, min += step, max += step) {
      slices.push(createSlice(sliceNumber, min, max))
    }

    return createPie(slices)
  }
}
