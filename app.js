var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//mongoose.connect("mongodb://localhost:27017/todolist");
mongoose.connect("mongodb://testuser:1234567890@ds013898.mlab.com:13898/todoapp")
var db = mongoose.connection;
Todo = require('./models/todo');
var port = process.env.PORT || 3000;
app.get('/api/todos', function(req, res){
	Todo.getTodos(function(err, todos){
		if (err){
			throw err;
		}
		res.json(todos);
	});
});
app.get('/api/todos/:_id', function(req, res){
	Todo.getTodo(req.params._id, function(err, todo){
		if (err){
			throw err;
		}
		res.json(todo);
	});
});
app.post('/api/todos', function(req, res){
	Todo.addTodo(req.body.title, function(err, todo){
		console.log(req.body.title);
		if (err){
			throw err;
		}
		res.json(todo);
	});
});
app.put('/api/todos/:_id', function(req, res){
	Todo.updateTodo(req.params._id, req.body, {}, function(err, todo){
		if (err){
			throw err;
		}
		res.json(todo);
	});
});
app.delete('/api/todos/:_id', function(req, res){
	Todo.deleteTodo(req.params._id, function(err, todo){
		if (err){
			throw err;
		}
		res.json(todo);
	});

});
app.listen(port);
console.log("Server is now running at port "+port);