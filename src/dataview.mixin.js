(function(){

/**
 * @param {number} byteOffset
 * @param {boolean} littleEndian
 * @return {number}
 */
this.getInt24 = function(byteOffset, littleEndian){
	var v = this.getUint24(byteOffset, littleEndian);
	return v & 0x800000 ? v - 0x1000000 : v;
};

/**
 * @param {number} byteOffset
 * @param {boolean} littleEndian
 * @return {number}
 */
this.getUint24 = function(byteOffset, littleEndian){
	var b = new Uint8Array(this.buffer, this.byteOffset + byteOffset);
	return littleEndian ? (b[0] | (b[1] << 8) | (b[2] << 16)) : (b[2] | (b[1] << 8) | (b[0] << 16));
};

/**
 * @param {number} byteOffset
 * @param {number} len
 * @param {string}
 */
this.getString = function(byteOffset, len){
	var b = new Uint8Array(this.buffer, this.byteOffset + byteOffset),
		a = [];
	while(len) a[--len] = b[len];
	return String.fromCharCode.apply(null, a);
};

/**
 * @param {number} byteOffset
 * @param {number} value
 * @param {boolean} littleEndian
 */
this.setInt24 = function(byteOffset, value, littleEndian){
	var b = new Uint8Array(this.buffer, this.byteOffset + byteOffset);
	if(littleEndian) {
		b[0] = value & 0xFF;
		b[1] = (value & 0xFF00) >> 8;
		b[2] = (value & 0xFF0000) >> 16;
	} else {
		b[2] = value & 0xFF;
		b[1] = (value & 0xFF00) >> 8;
		b[0] = (value & 0xFF0000) >> 16;
	}
};

/**
 * @param {number} byteOffset
 * @param {number} value
 * @param {boolean} littleEndian
 */
this.setUint24 = function(byteOffset, value, littleEndian){
	this.setInt24(byteOffset, value, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {string} s
 */
this.setString = function(byteOffset, s){
	var offset = this.byteOffset + byteOffset
		b = new Uint8Array(this.buffer, offset),
		i = s.length;
	while(i) b[--i + offset] = s.charCodeAt(i);
};

}).call(this.DataView.prototype);
