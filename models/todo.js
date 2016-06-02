var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todoSchema = new Schema({
	title: {
		type: String,
	},
	finished: Boolean
},{collection: "todo"});
var Todo = module.exports = mongoose.model('todo', todoSchema);
module.exports.getTodos = function(callback, limit){
	Todo.find(callback).limit(limit);
}
module.exports.getTodo = function(id, callback){
	Todo.findById(id, callback);
}
module.exports.addTodo = function(newToDo, callback){
	var createtodo = new Todo();
	createtodo.title = newToDo;
	createtodo.finished = false;
	createtodo.save(callback);
}
module.exports.updateTodo = function(id, updateToDo, options, callback){
	Todo.update({_id: id}, {title: updateToDo.title, finished: updateToDo.finished }, options, callback);
}
module.exports.deleteTodo = function(id, callback){
	Todo.remove({_id: id}, callback);
}