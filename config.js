var fs = require('fs');
var appConf = function () {
	this.buffer = fs.readFileSync('config.json');
	if (typeof this.buffer === 'object') {
		return JSON.parse(this.buffer)
	}

}
module.exports = appConf();