var assert = require('assert')
var pie = require('..')

describe('.slice()', function () {
  it('sliceCount can be between 2 and 360, inclusive', function() {
    // just check for no blowups
    pie.slice(2)
    pie.slice(100)
    pie.slice(360)
  })

  it('sliceCount cannot be < 2', function() {
    assert.throws(function() {
      pie.slice(1)
    })
  })

  it('sliceCount cannot be > 360', function() {
    assert.throws(function() {
      pie.slice(361)
    })
  })
})

describe('#whatSlice()', function () {
  // all whatSlice tests use origin as reference point for simplicity
  var ref = {
    x: 0,
    y: 0
  }

  describe('in y-up coordinates', function () {
    describe('4 slices with first slice at angle 0', function () {
      var slices = pie.slice(4)

      makeWhatSliceTests([
        ['point at N',   slices, ref, {x: 0, y: 1}, 0],
        ['point at NE',  slices, ref, {x: 1, y: 1}, 0],
        ['point at E',   slices, ref, {x: 1, y: 0}, 1],
        ['point at SE',  slices, ref, {x: 1, y: -1}, 1],
        ['point at S',   slices, ref, {x: 0, y: -1}, 2],
        ['point at SW',  slices, ref, {x: -1, y: -1}, 2],
        ['point at W',   slices, ref, {x: -1, y: 0}, 3],
        ['point at NW',  slices, ref, {x: -1, y: 1}, 3],
        ['point at ref', slices, ref, ref, 1]
      ])
    })

    describe('4 slices with first slice facing up', function () {
      var slices = pie.slice(4, {firstSliceFacesUp: true})

      makeWhatSliceTests([
        ['point at N',   slices, ref, {x: 0, y: 1}, 0],
        ['point at NE',  slices, ref, {x: 1, y: 1}, 1],
        ['point at E',   slices, ref, {x: 1, y: 0}, 1],
        ['point at SE',  slices, ref, {x: 1, y: -1}, 2],
        ['point at S',   slices, ref, {x: 0, y: -1}, 2],
        ['point at SW',  slices, ref, {x: -1, y: -1}, 3],
        ['point at W',   slices, ref, {x: -1, y: 0}, 3],
        ['point at NW',  slices, ref, {x: -1, y: 1}, 0],
        ['point at ref', slices, ref, ref, 1]
      ])
    })
  })

  describe('in y-down coordinates', function () {
    describe('4 slices with first slice at angle 0', function () {
      var slices = pie.slice(4, {
        yDown: true
      })

      makeWhatSliceTests([
        ['point at N',   slices, ref, {x: 0, y: -1}, 0],
        ['point at NE',  slices, ref, {x: 1, y: -1}, 0],
        ['point at E',   slices, ref, {x: 1, y: 0}, 1],
        ['point at SE',  slices, ref, {x: 1, y: 1}, 1],
        ['point at S',   slices, ref, {x: 0, y: 1}, 2],
        ['point at SW',  slices, ref, {x: -1, y: 1}, 2],
        ['point at W',   slices, ref, {x: -1, y: 0}, 3],
        ['point at NW',  slices, ref, {x: -1, y: -1}, 3],
        ['point at ref', slices, ref, ref, 1]
      ])
    })

    describe('4 slices with first slice facing up', function () {
      var slices = pie.slice(4, {
        firstSliceFacesUp: true,
        yDown: true
      })

      makeWhatSliceTests([
        ['point at N',   slices, ref, {x: 0, y: -1}, 0],
        ['point at NE',  slices, ref, {x: 1, y: -1}, 1],
        ['point at E',   slices, ref, {x: 1, y: 0}, 1],
        ['point at SE',  slices, ref, {x: 1, y: 1}, 2],
        ['point at S',   slices, ref, {x: 0, y: 1}, 2],
        ['point at SW',  slices, ref, {x: -1, y: 1}, 3],
        ['point at W',   slices, ref, {x: -1, y: 0}, 3],
        ['point at NW',  slices, ref, {x: -1, y: -1}, 0],
        ['point at ref', slices, ref, ref, 1]
      ])
    })
  })
})

function makeWhatSliceTests(testCases) {
  testCases.forEach(function(testCase) {
    var name     = testCase[0],
        sliced   = testCase[1],
        ref      = testCase[2],
        point    = testCase[3],
        expected = testCase[4]

    it(name, function() {
      var actual = sliced.whatSlice(ref, point)
      assert.equal(actual, expected)
    })
  })
}
