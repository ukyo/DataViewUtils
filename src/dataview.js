/**
 * ffDataView
 */

(function(){

/**
 * DataView http://www.khronos.org/registry/typedarray/specs/latest/#8
 * 
 * @constructor
 * @param {ArrayBuffer} buffer
 * @param {number} byteOffset
 * @param {number} byteLength
 */
function ffDataView(buffer, byteOffset, byteLength){
    if(buffer == null ? true : buffer.constructor !== ArrayBuffer) throw new TypeError('Type error');
    this.buffer = buffer;
    
    byteOffset = byteOffset || 0;
    byteLength = byteLength || (buffer.byteLength - byteOffset);
    
    if(typeof byteOffset === 'number') {
        byteOffset = ~~byteOffset;
        if(byteOffset < 0 || byteOffset >= buffer.byteLength) throw new Error('INDEX_SIZE_ERR');
        this.byteOffset = byteOffset;
    } else {
        throw new TypeError('Type error');
    }
    
    if(typeof byteLength === 'number') {
        byteLength = ~~byteLength;
        if(buffer.byteLength - (byteOffset + byteLength) < 0) throw new Error('INDEX_SIZE_ERR');
        this.byteLength = byteLength;
    } else {
        throw new TypeError('Type error');
    }
    
    this._bytes = new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
    this._sbytes = new Int8Array(this.buffer, this.byteOffset, this.byteLength);
}

var p = ffDataView.prototype,
    isBigEndian = !new Uint8Array(new Uint16Array([1]).buffer)[0]; //CPU's native endian.

/**
 * @param {TypedArray} F
 * @param {number} byteOffset
 * @param {number} n
 * @param {boolean} littleEndian
 * @return {number}
 */
p._getNumber = function(F, byteOffset, n, littleEndian){
    var a = this._getBytes(byteOffset, n);
    if (isBigEndian) a = a.reverse();
    return new F(new Uint8Array(littleEndian ? a : a.reverse()).buffer)[0];
};

/**
 * @param {TypedArray} F
 * @param {number} byteOffset
 * @param {number} value
 * @param {boolean} littleEndian
 */
p._setNumber = function(F, byteOffset, value, littleEndian){
    var ui8 = new Uint8Array(new F([value]).buffer),
        a = [], i = ui8.length;
    while(i) a[--i] = ui8[i];
    this._bytes.set(new Uint8Array(littleEndian ? a : a.reverse()), byteOffset);
};

/**
 * @param {number} byteOffset
 * @param {number} n
 * @return {Array}
 */
p._getBytes = function(byteOffset, n){
    var ui8 = this._bytes.subarray(byteOffset, byteOffset + n),
        i = ui8.length, a = [];
    while(i) a[--i] = ui8[i];
    return a;
};

/**
 * @param {number} byteOffset
 * @return {number}
 */
p.getInt8 = function(byteOffset){
    return this._sbytes[byteOffset];
};

/**
 * @param {number} byteOffset
 * @return {number}
 */
p.getUint8 = function(byteOffset){
    return this._bytes[byteOffset];
};

/**
 * @param {number} byteOffset
 * @param {boolean} littleEndian
 * @return {number}
 */
p.getInt16 = function(byteOffset, littleEndian){
    return this._getNumber(Int16Array, byteOffset, 2, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {boolean} littleEndian
 * @return {number}
 */
p.getUint16 = function(byteOffset, littleEndian){
    return this._getNumber(Uint16Array, byteOffset, 2, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {boolean} littleEndian
 * @return {number}
 */
p.getInt32 = function(byteOffset, littleEndian){
    return this._getNumber(Int32Array, byteOffset, 4, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {boolean} littleEndian
 * @return {number}
 */
p.getUint32 = function(byteOffset, littleEndian){
    return this._getNumber(Uint32Array, byteOffset, 4, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {boolean} littleEndian
 * @return {number}
 */
p.getFloat32 = function(byteOffset, littleEndian){
    return this._getNumber(Float32Array, byteOffset, 4, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {boolean} littleEndian
 * @return {number}
 */
p.getFloat64 = function(byteOffset, littleEndian){
    return this._getNumber(Float64Array, byteOffset, 8, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {number} value
 */
p.setInt8 = function(byteOffset, value){
    this._sbytes[byteOffset] = value;
};

/**
 * @param {number} byteOffset
 * @param {number} value
 */
p.setUint8 = function(byteOffset, value){
    this._bytes[byteOffset] = value;
};

/**
 * @param {number} byteOffset
 * @param {number} value
 * @param {boolean} littleEndian
 */
p.setInt16 = function(byteOffset, value, littleEndian){
    this._setNumber(Int16Array, byteOffset, value, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {number} value
 * @param {boolean} littleEndian
 */
p.setUint16 = function(byteOffset, value, littleEndian){
    this._setNumber(Uint16Array, byteOffset, value, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {number} value
 * @param {boolean} littleEndian
 */
p.setInt32 = function(byteOffset, value, littleEndian){
    this._setNumber(Int32Array, byteOffset, value, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {number} value
 * @param {boolean} littleEndian
 */
p.setUint32 = function(byteOffset, value, littleEndian){
    this._setNumber(Uint32Array, byteOffset, value, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {number} value
 * @param {boolean} littleEndian
 */
p.setFloat32 = function(byteOffset, value, littleEndian){
    this._setNumber(Float32Array, byteOffset, value, littleEndian);
};

/**
 * @param {number} byteOffset
 * @param {number} value
 * @param {boolean} littleEndian
 */
p.setFloat64 = function(byteOffset, value, littleEndian){
    this._setNumber(Float64Array, byteOffset, value, littleEndian);
};

this.ffDataView = ffDataView;

}).call(this);
