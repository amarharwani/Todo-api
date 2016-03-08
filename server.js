var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;


app.get('/', function (req, res) {
	res.send('Todo API Root');
});
// two agr for below function port and callback function to execute when everything is done
app.listen (PORT, function () {
	console.log('Express listening on port' + PORT + '!');
})
