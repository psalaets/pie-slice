var assert = require('assert')
var pie = require('..')

// all tests use orgin as reference point for simplicity
var ref = {
  x: 0,
  y: 0
}

var whatSliceTests = module.exports['#whatSlice()'] = {}

var sliced = pie.slice(4)
whatSliceTests['4 slices with first slice at angle 0'] = makeTestCases([
  ['point at N',   sliced, ref, {x: 0, y: 1}, 0],
  ['point at NE',  sliced, ref, {x: 1, y: 1}, 0],
  ['point at E',   sliced, ref, {x: 1, y: 0}, 1],
  ['point at SE',  sliced, ref, {x: 1, y: -1}, 1],
  ['point at S',   sliced, ref, {x: 0, y: -1}, 2],
  ['point at SW',  sliced, ref, {x: -1, y: -1}, 2],
  ['point at W',   sliced, ref, {x: -1, y: 0}, 3],
  ['point at NW',  sliced, ref, {x: -1, y: 1}, 3],
  ['point at ref', sliced, ref, ref, 1]
])

var upSliced = pie.slice(4, {firstSliceFacesUp: true})
whatSliceTests['4 slices with first slice facing up'] = makeTestCases([
  ['point at N',   upSliced, ref, {x: 0, y: 1}, 0],
  ['point at NE',  upSliced, ref, {x: 1, y: 1}, 1],
  ['point at E',   upSliced, ref, {x: 1, y: 0}, 1],
  ['point at SE',  upSliced, ref, {x: 1, y: -1}, 2],
  ['point at S',   upSliced, ref, {x: 0, y: -1}, 2],
  ['point at SW',  upSliced, ref, {x: -1, y: -1}, 3],
  ['point at W',   upSliced, ref, {x: -1, y: 0}, 3],
  ['point at NW',  upSliced, ref, {x: -1, y: 1}, 0],
  ['point at ref', upSliced, ref, ref, 1]
])

function makeTestCases(testCases) {
  var target = {}
  testCases.forEach(function(testCase) {
    var name     = testCase[0],
        sliced   = testCase[1],
        ref      = testCase[2],
        point    = testCase[3],
        expected = testCase[4]

    target[name] = function() {
      var actual = sliced.whatSlice(ref, point)
      assert.equal(actual, expected)
    }
  })

  return target
}