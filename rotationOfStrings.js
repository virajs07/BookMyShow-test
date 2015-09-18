/**
 * This method will test weather the given string is the rotaion of the 
 * of the argument.
 * @param {String} string
 * @return {Bool} true if the given string is the rotation else false
 *
 * Example : 
 *
 * "JAVASCRIPT".isRotationOf("PTJAVASCRI") --> true
 * "JAVASCRIPT".isRotationOf("JAVASCRI")   --> false
 * "JAVASCRIPT".isRotationOf("PTJAVASCRIPT") --> false
 */

String.prototype.isRotationOf = function(string) {
	if (this.length === string.length) {
		return (string.concat(string).indexOf(this) != -1);
	};
	return false;
};
