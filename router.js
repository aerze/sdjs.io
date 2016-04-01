function Router (table) {
	this.table = table
}

Router.prototype.transform = function (route) {
	return this.table[route]
}

module.exports = Router