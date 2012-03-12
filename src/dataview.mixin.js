(function(DataView){

var p = DataView.prototype;

/**
 * @param {Uint8Array|Int8Array|ArrayBuffer} bytes
 * @param {number} byteOffset
 * @param {number} byteLength
 * @return {DataView}
 */
DataView.create = function(bytes, byteOffset, byteLength){
	var constructor = bytes.constructor;
	if(constructor === ArrayBuffer) {
		byteOffset = byteOffset || 0;
		byteLength = byteLength || bytes.byteLength;
		return new DataView(bytes, byteOffset, byteLength);
	} else if(constructor === Uint8Array || constructor === Int8Array) {
		byteOffset = byteOffset != null ? byteOffset : bytes.byteOffset;
		byteLength = byteLength != null ? byteLength : bytes.length;
		return new DataView(bytes.buffer, byteOffset, byteLength);
	} else {
		throw 'TypeError';
	}
};

/**
 * @param {number} byteOffset
 * @param {boolean} littleEndian
 * @return {number}
 */
p.getInt24 = function(byteOffset, littleEndian){
	var v = this.getUint24(byteOffset, littleEndian);
	return v & 0x800000 ? v - 0x1000000 : v;
};

/**
 * @param {number} byteOffset
 * @param {boolean} littleEndian
 * @return {number}
 */
p.getUint24 = function(byteOffset, littleEndian){
	var b = new Uint8Array(this.buffer, this.byteOffset + byteOffset);
	return littleEndian ? (b[0] | (b[1] << 8) | (b[2] << 16)) : (b[2] | (b[1] << 8) | (b[0] << 16));
};

/**
 * @param {number} byteOffset
 * @param {number} len
 * @param {string}
 */
p.getString = function(byteOffset, len){
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
p.setInt24 = function(byteOffset, value, littleEndian){
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
p.setUint24 = function(byteOffset, value, littleEndian){
	this.setInt24(byteOffset, value, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {string} s
 */
p.setString = function(byteOffset, s){
	var b = new Uint8Array(this.buffer, this.byteOffset + byteOffset),
		i = s.length;
	while(i) b[--i] = s.charCodeAt(i);
};

})(DataView);
