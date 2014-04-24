# pie-slice

Divide a circle into slices and tell what slice a point is in relative to circle's center.

## Usage

```
var pie = require('pie-slice');

var sliced = pie.slice(4);
var ref = {x: 0, y: 0};

sliced.whatSlice(ref, {x: 1, y: 1});   // => 1
sliced.whatSlice(ref, {x: -1, y: -1}); // => 2
```

## .slice() Options

.slice() accepts an options object

### firstSliceFacesUp

When false (default) first slice starts at angle 0.

```
pie.slice(4, {
  firstSliceFacesUp: false
});

// or just

pie.slice(4);
```

When true first slice is bissected by angle 0.

```
pie.slice(4, {
  firstSliceFacesUp: true
});
```

## License

MIT