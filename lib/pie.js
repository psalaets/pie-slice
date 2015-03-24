var vec2d = require('vec2d')

module.exports = createPie

var pieMethods = {
  /**
   * Tells what slice some point is in relative to a reference point.
   *
   * @param referencePoint Object with x and y properties
   * @param otherPoint Object with x and y properties
   * @return zero based slice number
   */
  whatSlice: function(referencePoint, otherPoint) {
    if (this.yDown) {
      if (otherPoint.y > referencePoint.y) {
        otherPoint = {
          x: otherPoint.x,
          y: referencePoint.y - (otherPoint.y - referencePoint.y)
        }
      } else if (otherPoint.y < referencePoint.y) {
        otherPoint = {
          x: otherPoint.x,
          y: referencePoint.y + (referencePoint.y - otherPoint.y)
        }
      }
    }

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
 * Convert radians to weird angles where 0 is E, 90 is N, 180 is W. Below
 * the x axis the values are negative: -45 is SE, -90 is S and -135 is SW.
 */
function radiansToWeird(radians) {
  return radians * (180 / Math.PI)
}

/*
 * Convert weird angle to compass style angle. Compass style: 0 is N, 90 is E
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

function createPie(slices, yDown) {
  var pie = Object.create(pieMethods)
  pie.slices = slices
  pie.yDown = yDown
  return pie
}
