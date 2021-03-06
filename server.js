var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var PORT = process.env.PORT || 3000;

var todoNextId = 1;
// for post method to send req with along to server
app.use(bodyParser.json());


var todos = [];

app.get('/', function(req, res) {
	res.send('Lets Go');
});
//to call get method (/todos)
app.get('/todos', function(req, res) {
	// mind - the below todos is an array here 

	//getting the onlt that  task  by query , like completed=true
	var queryParams = req.query;
	var filteredTodos = todos;
	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		filteredTodos = _.where(filteredTodos, {
			completed: true
		});
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		filteredTodos = _.where(filteredTodos, {
			completed: false
		});
	}
	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function(todo) {
			return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
		});
	}
	res.json(filteredTodos);
});

app.get('/todos/:id', function(req, res) {

	var todoId = parseInt(req.params.id, 10);

	////////////////// to refactor using  underscore's function like  findWhere to return item in an array that matches the condition 
	var matchedTodos = _.findWhere(todos, {
		id: todoId
	});

	///////////////
	// todos.forEach(function (todo) {
	// 	if(todoId === todo.id) {
	// 		matchedTodos = todo;
	// 	}
	// });
	if (matchedTodos) {
		res.json(matchedTodos);
	} else {
		res.status(404).send();
	}

});
//server getting request(via post method) with json data its doing something with it and sending back to us 
app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		//.send will return empty body
		return res.status(400).send();
	}
	body.description = body.description.trim();

	body.id = todoNextId++;
	todos.push(body);
	console.log('description ' + body.description);

	res.json(body);
});

app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {
		id: todoId
	});
	if (!matchedTodo) {
		res.status(404).json({
			"error": "no todo"
		});

	} else {
		todos = _.without(todos, matchedTodo)
		res.json(matchedTodo);
	}
});
// two agr for below function port and callback function to execute when everything is done

app.put('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {
		id: todoId
	});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttribute = {};


	if (!matchedTodo) {
		return res.status(404).send();
	}
	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttribute.completed = body.completed;

	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();

	}


	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttribute.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();

	}
	_.extend(matchedTodo, validAttribute);
	res.json(matchedTodo);

});

app.listen(PORT, function() {
	console.log('Express listening on port' + PORT + '!');
})