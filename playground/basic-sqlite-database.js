var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined , {
	'dialect' :'sqlite',
	//incase basic-sqlite-database.sqlite is not getting stored at "playground dir  use  - 'storage': _dirname + '/basic-sqlite-database.sqlite'"
	'storage': 'basic-sqlite-database.sqlite'
});



var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		//allow null : false will not allow description to be optional 
		allowNull: false,
		validate: {
			notEmpty : true,
			len : [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})
// incase of updating any error like misspelled obj argument that not been shown on cmd prompt  use the forcce cmd like this  - sequelize.sync(force: true).then(function () ........ this will re create the table with updated values
sequelize.sync().then(function () {
	console.log('Everything is synced');

Todo.findById(25).then(function (todo) {
	if (todo) {
		console.log(todo.toJSON());
	} else {
		console.log('Todo not found')
	}

});
//adding static data for now but in real scenario this data will come from API
Todo.create({
	description: 'lets go',
	
}).then(function (todo) {
	// console.log('finsihed');
	// console.log(todo);

	return Todo.create({
		description: 'party time'
	});
}).then(function() {
// return Todo.findById(1)
return Todo.findAll({
	// where: {
	// 	completed: false
	// }
	where: {
		description: {
			$like: '%Office%'
		}
	}
});
}).then(function (todos) {
	if (todos){
		todos.forEach(function (todo) {
			console.log(todo.toJSON());
		});
		
	} else {
		console.log('no todo found');
	}


}).catch(function (e) {
	console.log(e);
});

});

