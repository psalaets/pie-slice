# pie-slice

Divide circle into slices and tell what slice a point is in.

## Install

    npm install pie-slice --save

## Usage

```js
var pie = require('pie-slice')

var sliced = pie.slice(4)
var ref = {x: 0, y: 0}

sliced.whatSlice(ref, {x: 1, y: 1})   // => 1
sliced.whatSlice(ref, {x: -1, y: -1}) // => 2
```

## .slice(sliceCount, [options])

### sliceCount

Must be Number between 2 and 360, inclusive.

### options

Object that may contain:

**firstSliceFacesUp**

When false (which is the default), first slice starts at angle 0.

```js
pie.slice(4, {
  firstSliceFacesUp: false
})

// or just

pie.slice(4)
```

When true first slice is bissected by angle 0.

```js
pie.slice(4, {
  firstSliceFacesUp: true
});
```

### Returns

A sliced pie.

## #whatSlice(referencePoint, otherPoint)

### referencePoint

Object with x and y Number properties. Treated as center of the sliced pie.

### otherPoint

Object with x and y Number properties.

### Returns

The answer to: if referencePoint is center of pie, what slice is otherPoint in?

## License

MIT