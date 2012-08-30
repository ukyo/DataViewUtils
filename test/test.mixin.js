test('create instance', function(){
	ok(DataView.create(new ArrayBuffer(8)), 'ArrayBuffer');
	ok(DataView.create(new Uint8Array(8)), 'Uint8Array');
	ok(DataView.create(new Int8Array(8)), 'Int8Array');
	ok(DataView.create(new Uint16Array(8)), 'Uint16Array');
	ok(DataView.create(new Int16Array(8)), 'Int16Array');
	ok(DataView.create(new Uint32Array(8)), 'Uint32Array');
	ok(DataView.create(new Int32Array(8)), 'Int32Array');
	ok(DataView.create(new Float32Array(8)), 'Float32Array');
	ok(DataView.create(new Float64Array(8)), 'Float64Array');
	ok(DataView.create(8), 'Number');
});

test('test DataView mixin', function(){
	var view = DataView.create(4);
	
	view.setInt24(0, 0xFF0000, true);
	same(view.getInt24(0, true), 0xFF0000 - 0x1000000, "int24 le");
	same(view.getInt24(0, false), 0xFF, "int be");
	same(view.getUint24(0, true), 0xFF0000, "uint le");
	same(view.getUint24(0, false), 0xFF, "uint be");
	
	view.setInt24(0, 0x876543, false);
	same(view.getInt24(0, true), 0x436587, "int24 le");
	same(view.getInt24(0, false), 0x876543 - 0x1000000, "int24 be");
	same(view.getUint24(0, true), 0x436587, "uint le");
	same(view.getUint24(0, false), 0x876543, "uint be");
	
	view.setString(1, "abc");
	same(view.getString(1, 3), "abc", "string");
});