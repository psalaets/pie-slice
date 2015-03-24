# pie-slice

Divide circle into slices and tell what slice a point is in.

## Install

    npm install pie-slice --save

## Usage

```js
var pieSlice = require('pie-slice')

var slices = pieSlice.slice(4)
var ref = {x: 0, y: 0}

slices.whatSlice(ref, {x: 1, y: 1})   // => 1
slices.whatSlice(ref, {x: -1, y: -1}) // => 2
```

## pieSlice.slice(sliceCount, [options])

### sliceCount

Must be Number between 2 and 360, inclusive.

### options

Object that may contain:

**firstSliceFacesUp**

(default: false)

When false the first slice starts at angle 0.

```js
pieSlice.slice(4, {
  firstSliceFacesUp: false
})

// or just

pieSlice.slice(4)
```

When true first slice is bissected by angle 0.

```js
pieSlice.slice(4, {
  firstSliceFacesUp: true
});
```

**yDown**

(default: false)

When true, points are interpretted based on y-down coordinates. In y-down coordinates the y values increase going downward.

When false, uses y-up coordinates. In y-up coordinates the y values increase going upward.

### Returns

Slices of a pie.

## slices.whatSlice(referencePoint, otherPoint)

### referencePoint

Object with x and y Number properties. Treated as center of the sliced pie.

### otherPoint

Object with x and y Number properties.

### Returns

Number between 0 and `sliceCount - 1` that is the answer to: if referencePoint is center of pie, what slice is otherPoint in?

Slice numbers increase going clockwise.

## License

MIT