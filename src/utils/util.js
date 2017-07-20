function formatTime( date ) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()

	return [ year, month, day ].map( formatNumber ).join( '-' ) + ' ' + [ hour, minute, second ].map( formatNumber ).join( ':' )
}

function formatNumber( n ) {
	n = n.toString()
	return n[ 1 ] ? n : '0' + n
}

function isFunction( obj ) {
	return typeof obj === 'function';
}

function parseInteger(val) {
	if (isNaN(val))
		return 0;
	return parseInt(val);
}

function alert(text,cb){
	wx.showModal({
		confirmText:'我知道了',
		title: '提示',
		content: text,
		showCancel:false,
		success: function(res) {
			if (res.confirm) {
				cb && cb();
			}
		}
	})
}

function deepCopy(p, c) {
// 　　　　var c = c || {};
// 　　　　for (var i in p) {
// 　　　　　　if (typeof p[i] === 'object') {
// 　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
// 　　　　　　　　deepCopy(p[i], c[i]);
// 　　　　　　} else {
// 　　　　　　　　　c[i] = p[i];
// 　　　　　　}
// 　　　　}
　　　　return JSON.parse(JSON.stringify(p));
　　}

module.exports = {
	formatTime: formatTime,
	isFunction: isFunction,
	parseInteger: parseInt,
	alert:alert,
	deepCopy: deepCopy
}

