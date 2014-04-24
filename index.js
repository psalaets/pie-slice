var vec2d = require('vec2d')

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

var pieMethods = {
  /**
   * Tells what slice some point is in relative to a reference point.
   *
   * @param referencePoint Object with x and y properties
   * @param otherPoint Object with x and y properties
   * @return zero based slice number
   */
  whatSlice: function(referencePoint, otherPoint) {
    var delta = vec2d(otherPoint).minus(vec2d(referencePoint))
    var weird = radiansToWeird(delta.angle())
    var compass = weirdToCompass(weird)

    for (var i = 0; i < this.slices.length; i++) {
      if (this.slices[i].contains(compass)) {
        return this.slices[i].number
      }
    }
  }
}

/*
 * Convert 'weird' angle to compass style angle. Compass style: 0 is N, 90 is E
 * 180 is S and 270 is W.
 */
function weirdToCompass(weird) {
  if (weird >= 0 && weird <= 90) { // top right
    return 90 - weird
  } else if (weird > 90 && weird <= 180) { // top left
    return 360 - weird + 90
  } else { // bottom, i.e. [-1, -179]
    return -weird + 90
  }
}

/*
 * Convert radians to angle where 0 is east, 90 is north, 180 is west. Below
 * the x axis the values are negative: -45 is SE, -90 is S and -135 is SW.
 */
function radiansToWeird(radians) {
  return radians * (180 / Math.PI)
}

function createPie(slices) {
  return Object.create(pieMethods, {
    slices: {
      value: slices
    }
  })
}

module.exports = {
  slice: function(number, options) {
    options = options || {}
    var slices = []

    var step = 360 / number
    var halfStep = step / 2
    var min = 0
    var max = min + step
    var sliceNumber = 0

    if (options.firstSliceFacesUp) {
      // first slice straddles angle 0 and is actually two slices
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