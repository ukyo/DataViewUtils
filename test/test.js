test('test DataView', function(){
	var ui8 = new Uint8Array([0xFF, 0xEE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00]),
		ui8_ = new Uint8Array([0xFF, 0xEE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00]),
		isValid, view ,ffview;
	
	//create instance.
	try {
		new ffDataView(ui8, 0, 0);
	} catch (e) {
		isValid = true;
	}
	ok(isValid, "set Uint8Array to first argument.");
	
	ifValid = false;
	try {
		new ffDataView(ui8.buffer, -1, 0);
	} catch (e) {
		ifValid = true;
	}
	ok(isValid, "set minus value to second argument.");
	
	ifValid = false;
	try {
		new ffDataView(ui8.buffer, ui8.length, 0);
	} catch (e) {
		ifValid = true;
	}
	ok(isValid, "set too large value to second argument.");
	
	ifValid = false;
	try {
		new ffDataView(ui8.buffer, 0, -1);
	} catch (e) {
		ifValid = true;
	}
	ok(isValid, "set minus value to third argument.");
	
	ifValid = false;
	try {
		new ffDataView(ui8.buffer, 0, ui8.length + 1);
	} catch (e) {
		ifValid = true;
	}
	ok(isValid, "set too large to third argument.");
	
	view = new DataView(ui8.buffer, 0, ui8.length);
	ffview = new ffDataView(ui8_.buffer, 0, ui8_.length);
	
	
	same(ffview.getInt8(0), view.getInt8(0), 'get int8');
	same(ffview.getUint8(0), view.getUint8(0), 'get uint8');
	
	same(ffview.getInt16(0, true), view.getInt16(0, true), 'get int16 le');
	same(ffview.getInt16(0), view.getInt16(0), "big endian is default.")
	same(ffview.getInt16(0, false), view.getInt16(0, false), 'get int16 be');
        same(ffview.getUint16(4, true), view.getUint16(4, true), 'get int16 le offset 4');
	
	same(ffview.getUint16(0, true), view.getUint16(0, true), 'get uint16 le');
	same(ffview.getUint16(0, false), view.getUint16(0, false), 'get uint16 be');
	
	same(ffview.getInt32(0, true), view.getInt32(0, true), 'get int32 le');
	same(ffview.getInt32(0, false), view.getInt32(0, false), 'get int32 be');
	
	same(ffview.getUint32(0, true), view.getUint32(0, true), 'get uint32 le');
	same(ffview.getUint32(0, false), view.getUint32(0, false), 'get uint32 be');
	
	same(ffview.getFloat32(0, true), view.getFloat32(0, true), 'get float32 le');
	same(ffview.getFloat32(0, false), view.getFloat32(0, false), 'get float32 be');
	
	same(ffview.getFloat64(0, true), view.getFloat64(0, true), 'get float64 le');
	same(ffview.getFloat64(0, false), view.getFloat64(0, false), 'get float64 be');
	
	ffview.setInt8(0, 255); view.setInt8(0, 255);
	same(ffview.getInt8(0), view.getInt8(0), 'set int8');
	same(ffview.getUint8(0), view.getUint8(0), 'set int8');
	
	ffview.setUint8(0, 255); view.setUint8(0, 255);
	same(ffview.getInt8(0), view.getInt8(0), 'set uint8');
	same(ffview.getUint8(0), view.getUint8(0), 'set uint8');
	
	ffview.setInt16(0, 0xFF00, true); view.setInt16(0, 0xFF00, true);
	same(ffview.getInt16(0, true), view.getInt16(0, true), 'set int16 le');
	same(ffview.getInt16(0, false), view.getInt16(0, false), 'set int16 le');
	
	ffview.setInt16(0, 0xFF00); view.setInt16(0, 0xFF00);
	same(ffview.getInt16(0, true), view.getInt16(0, true), 'set int16 be');
	same(ffview.getInt16(0, false), view.getInt16(0, false), 'set int16 be');
	
	ffview.setInt16(0, 0x9080, false); view.setInt16(0, 0x9080, false);
	same(ffview.getInt16(0, true), view.getInt16(0, true), 'set int16 be');
	same(ffview.getInt16(0, false), view.getInt16(0, false), 'set int16 be');
	
	ffview.setUint16(0, 0xC0D0, true); view.setUint16(0, 0xC0D0, true);
	same(ffview.getUint16(0, true), view.getUint16(0, true), 'set uint16 le');
	same(ffview.getUint16(0, false), view.getUint16(0, false), 'set uint16 le');
	
	ffview.setUint16(0, 0xA0B0, false); view.setUint16(0, 0xA0B0, false);
	same(ffview.getUint16(0, true), view.getUint16(0, true), 'set uint16 be');
	same(ffview.getUint16(0, false), view.getUint16(0, false), 'set uint16 be');
	
	ffview.setInt32(0, 0xFFEEDDCC, true); view.setInt32(0, 0xFFEEDDCC, true);
	same(ffview.getInt32(0, true), view.getInt32(0, true), 'set int32 le');
	same(ffview.getInt32(0, false), view.getInt32(0, false), 'set int32 le');
	
	ffview.setInt32(0, 0xFFEEDDCC, false); view.setInt32(0, 0xFFEEDDCC, false);
	same(ffview.getInt32(0, true), view.getInt32(0, true), 'set int32 be');
	same(ffview.getInt32(0, false), view.getInt32(0, false), 'set int32 be');
	
	ffview.setUint32(0, 0xFFEEDDCC, true); view.setUint32(0, 0xFFEEDDCC, true);
	same(ffview.getUint32(0, true), view.getUint32(0, true), 'set uint32 le');
	same(ffview.getUint32(0, false), view.getUint32(0, false), 'set uint32 le');
	
	ffview.setUint32(0, 0xFFEEDDCC, false); view.setUint32(0, 0xFFEEDDCC, false);
	same(ffview.getUint32(0, true), view.getUint32(0, true), 'set uint32 be');
	same(ffview.getUint32(0, false), view.getUint32(0, false), 'set uint32 be');
	
	ffview.setFloat32(0, 7540754025742, true); view.setFloat32(0, 7540754025742, true);
	same(ffview.getFloat32(0, true), view.getFloat32(0, true), 'set float32 le');
	same(ffview.getFloat32(0, false), view.getFloat32(0, false), 'set float32 le');
	
	ffview.setFloat32(0, 7540754025742, false); view.setFloat32(0, 7540754025742, false);
	same(ffview.getFloat32(0, true), view.getFloat32(0, true), 'set float32 be');
	same(ffview.getFloat32(0, false), view.getFloat32(0, false), 'set float32 be');
	
	ffview.setFloat64(0, 584182645425245445954825.5458, true); view.setFloat64(0, 584182645425245445954825.5458, true);
	same(ffview.getFloat64(0, true), view.getFloat64(0, true), 'set float64 le');
	same(ffview.getFloat64(0, false), view.getFloat64(0, false), 'set float64 le');
	
	ffview.setFloat64(0, 584182645425245445954825.5458, false); view.setFloat64(0, 584182645425245445954825.5458, false);
	same(ffview.getFloat64(0, true), view.getFloat64(0, true), 'set float64 be');
	same(ffview.getFloat64(0, false), view.getFloat64(0, false), 'set float64 be');


	view = new DataView(ui8.buffer, 2, ui8.length - 2);
	ffview = new ffDataView(ui8_.buffer, 2, ui8_.length - 2);
	
	
	same(ffview.getInt8(0), view.getInt8(0), 'get int8');
	same(ffview.getUint8(0), view.getUint8(0), 'get uint8');
	
	same(ffview.getInt16(0, true), view.getInt16(0, true), 'get int16 le');
	same(ffview.getInt16(0), view.getInt16(0), "big endian is default.")
	same(ffview.getInt16(0, false), view.getInt16(0, false), 'get int16 be');
        same(ffview.getUint16(4, true), view.getUint16(4, true), 'get int16 le offset 4');
	
	same(ffview.getUint16(0, true), view.getUint16(0, true), 'get uint16 le');
	same(ffview.getUint16(0, false), view.getUint16(0, false), 'get uint16 be');
	
	same(ffview.getInt32(0, true), view.getInt32(0, true), 'get int32 le');
	same(ffview.getInt32(0, false), view.getInt32(0, false), 'get int32 be');
	
	same(ffview.getUint32(0, true), view.getUint32(0, true), 'get uint32 le');
	same(ffview.getUint32(0, false), view.getUint32(0, false), 'get uint32 be');
	
	same(ffview.getFloat32(0, true), view.getFloat32(0, true), 'get float32 le');
	same(ffview.getFloat32(0, false), view.getFloat32(0, false), 'get float32 be');
	
	same(ffview.getFloat64(0, true), view.getFloat64(0, true), 'get float64 le');
	same(ffview.getFloat64(0, false), view.getFloat64(0, false), 'get float64 be');
	
	ffview.setInt8(0, 255); view.setInt8(0, 255);
	same(ffview.getInt8(0), view.getInt8(0), 'set int8');
	same(ffview.getUint8(0), view.getUint8(0), 'set int8');
	
	ffview.setUint8(0, 255); view.setUint8(0, 255);
	same(ffview.getInt8(0), view.getInt8(0), 'set uint8');
	same(ffview.getUint8(0), view.getUint8(0), 'set uint8');
	
	ffview.setInt16(0, 0xFF00, true); view.setInt16(0, 0xFF00, true);
	same(ffview.getInt16(0, true), view.getInt16(0, true), 'set int16 le');
	same(ffview.getInt16(0, false), view.getInt16(0, false), 'set int16 le');
	
	ffview.setInt16(0, 0xFF00); view.setInt16(0, 0xFF00);
	same(ffview.getInt16(0, true), view.getInt16(0, true), 'set int16 be');
	same(ffview.getInt16(0, false), view.getInt16(0, false), 'set int16 be');
	
	ffview.setInt16(0, 0x9080, false); view.setInt16(0, 0x9080, false);
	same(ffview.getInt16(0, true), view.getInt16(0, true), 'set int16 be');
	same(ffview.getInt16(0, false), view.getInt16(0, false), 'set int16 be');
	
	ffview.setUint16(0, 0xC0D0, true); view.setUint16(0, 0xC0D0, true);
	same(ffview.getUint16(0, true), view.getUint16(0, true), 'set uint16 le');
	same(ffview.getUint16(0, false), view.getUint16(0, false), 'set uint16 le');
	
	ffview.setUint16(0, 0xA0B0, false); view.setUint16(0, 0xA0B0, false);
	same(ffview.getUint16(0, true), view.getUint16(0, true), 'set uint16 be');
	same(ffview.getUint16(0, false), view.getUint16(0, false), 'set uint16 be');
	
	ffview.setInt32(0, 0xFFEEDDCC, true); view.setInt32(0, 0xFFEEDDCC, true);
	same(ffview.getInt32(0, true), view.getInt32(0, true), 'set int32 le');
	same(ffview.getInt32(0, false), view.getInt32(0, false), 'set int32 le');
	
	ffview.setInt32(0, 0xFFEEDDCC, false); view.setInt32(0, 0xFFEEDDCC, false);
	same(ffview.getInt32(0, true), view.getInt32(0, true), 'set int32 be');
	same(ffview.getInt32(0, false), view.getInt32(0, false), 'set int32 be');
	
	ffview.setUint32(0, 0xFFEEDDCC, true); view.setUint32(0, 0xFFEEDDCC, true);
	same(ffview.getUint32(0, true), view.getUint32(0, true), 'set uint32 le');
	same(ffview.getUint32(0, false), view.getUint32(0, false), 'set uint32 le');
	
	ffview.setUint32(0, 0xFFEEDDCC, false); view.setUint32(0, 0xFFEEDDCC, false);
	same(ffview.getUint32(0, true), view.getUint32(0, true), 'set uint32 be');
	same(ffview.getUint32(0, false), view.getUint32(0, false), 'set uint32 be');
	
	ffview.setFloat32(0, 7540754025742, true); view.setFloat32(0, 7540754025742, true);
	same(ffview.getFloat32(0, true), view.getFloat32(0, true), 'set float32 le');
	same(ffview.getFloat32(0, false), view.getFloat32(0, false), 'set float32 le');
	
	ffview.setFloat32(0, 7540754025742, false); view.setFloat32(0, 7540754025742, false);
	same(ffview.getFloat32(0, true), view.getFloat32(0, true), 'set float32 be');
	same(ffview.getFloat32(0, false), view.getFloat32(0, false), 'set float32 be');
	
	ffview.setFloat64(0, 584182645425245445954825.5458, true); view.setFloat64(0, 584182645425245445954825.5458, true);
	same(ffview.getFloat64(0, true), view.getFloat64(0, true), 'set float64 le');
	same(ffview.getFloat64(0, false), view.getFloat64(0, false), 'set float64 le');
	
	ffview.setFloat64(0, 584182645425245445954825.5458, false); view.setFloat64(0, 584182645425245445954825.5458, false);
	same(ffview.getFloat64(0, true), view.getFloat64(0, true), 'set float64 be');
	same(ffview.getFloat64(0, false), view.getFloat64(0, false), 'set float64 be');
});
