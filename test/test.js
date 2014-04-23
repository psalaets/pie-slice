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
  ['point at top',          sliced, ref, {x: 0, y: 1}, 0],
  ['point at top-right',    sliced, ref, {x: 1, y: 1}, 0],
  ['point at right',        sliced, ref, {x: 1, y: 0}, 1],
  ['point at bottom-right', sliced, ref, {x: 1, y: -1}, 1],
  ['point at bottom',       sliced, ref, {x: 0, y: -1}, 2],
  ['point at bottom-left',  sliced, ref, {x: -1, y: -1}, 2],
  ['point at left',         sliced, ref, {x: -1, y: 0}, 3],
  ['point at top-left',     sliced, ref, {x: -1, y: 1}, 3],
  ['point at same as ref',  sliced, ref, ref, 1]
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