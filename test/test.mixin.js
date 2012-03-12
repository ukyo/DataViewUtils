test('test DataView mixin', function(){
	var view = DataView.create(new ArrayBuffer(4));
	
	ok(view, "create instance");
	
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