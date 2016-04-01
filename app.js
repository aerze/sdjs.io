var Router = require('./router')
var table = require('./routes.json')
var express = require('express')

var router = new Router(table)
var app = express()

app.get(/.*/, function (req, res) {
	var target = router.transform(req.path)
	if (target) {
		console.log("Request received: Redirecting %s to %s", req.path, target)
		res.redirect(302, target)
	} else {
		console.error("Request received: Path not found! %s", req.path)
		res.status(404).send('Sorry, I couldn\'t find that. :(');
	}
})

//start server
var server = app.listen(3000, function () {
    var port = server.address().port
    console.log('Server listening on port ' + port)
})
