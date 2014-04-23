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
    var angle = weirdToCompass(weird)

    for (var i = 0; i < this.slices.length; i++) {
      if (this.slices[i].contains(angle)) {
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
    var slices = []

    var step = 360 / number;
    for (var i = 0; i < number; i++) {
      slices.push(createSlice(i, i * step, i * step + step))
    }

    var pie = createPie(slices)

    return pie
  }
}