var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;


var todos = [{
	id: 1,
	description: 'meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to Market',
	completed: false
},
 {
	id: 3,
	description: 'Had shopping',
	completed: true
}];

app.get('/', function (req, res) {
	res.send('Lets Go');
});
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
// two agr for below function port and callback function to execute when everything is done
app.listen (PORT, function () {
	console.log('Express listening on port' + PORT + '!');
})
