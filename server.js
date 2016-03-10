var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

var todoNextId = 1;
// for post method to send req with along to server
app.use(bodyParser.json());


var todos = [];

app.get('/', function (req, res) {
	res.send('Lets Go');
});
//to call get method (/todos)
app.get('/todos', function (req, res) {
	res.json(todos);
});

app.get('/todos/:id', function (req, res) {

	var todoId = parseInt(req.params.id,10);
	var matchedTodos;
	todos.forEach(function (todo) {
		if(todoId === todo.id) {
			matchedTodos = todo;
		}
	});
	if (matchedTodos) {
		res.json(matchedTodos);
	} else {
		res.status(404).send();
	}
	
});
//server getting request(via post method) with json data its doing something with it and sending back to us 
app.post('/todos', function (req, res) {
	var body = req.body;
	body.id = todoNextId++;
	todos.push(body);
	console.log('description ' + body.description);

	res.json(body);
});
// two agr for below function port and callback function to execute when everything is done
app.listen (PORT, function () {
	console.log('Express listening on port' + PORT + '!');
})
