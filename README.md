# DataViewUtils

DataViewUtils extends DataView.prototype.

## mixins

### DataView.create

`DataView.create` prevent your careless misses.

```javascript
var ab = new ArrayBuffer(1024);
var ui8 = new Uint8Array(ab, 256, 256);

//same
var dv1 = new DataView(ui8.buffer, ui8.byteOffset, ui8.byteLength);
var dv2 = DataView.create(ui8);
```

It also can create a DataView object like Typed Array views.

```javascript
var dv = DataView.create(1024);
```

### Other APIs

- getInt24
- getUint24
- getString
- setInt24
- setUint24
- setString
