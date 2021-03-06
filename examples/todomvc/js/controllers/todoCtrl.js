/*global todomvc, angular */
'use strict';

todomvc.classy.controller({
	name: 'TodoCtrl',
	inject: ['$scope', '$location', 'todoStorage', 'filterFilter'],

	init: function() {
		this.todos = this.$.todos = this.todoStorage.get();
		this.$.editedTodo = null;
		this.$.newTodo = '';
		if (this.$location.path() === '') {
		  this.$location.path('/');
		}
		this.$.location = this.$location;
	},

	watch: {
		'location.path()': function(path) {
			this.$.statusFilter = (path === '/active') ?
				{ completed: false } : (path === '/completed') ?
				{ completed: true } : null;
		},
		'{object}todos': '_onTodoChange'
	},

	_onTodoChange: function (newValue, oldValue) {
		this.$.remainingCount = this.filterFilter(this.$.todos, { completed: false }).length;
		this.$.completedCount = this.$.todos.length - this.$scope.remainingCount;
		this.$.allChecked = !this.$.remainingCount;
		if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
			this.todoStorage.put(this.$.todos);
		}
	},

	addTodo: function () {
		var newTodo = this.$.newTodo.trim();
		if (!newTodo.length) {
			return;
		}

		this.$.todos.push({
			title: newTodo,
			completed: false
		});

		this.$.newTodo = '';
	},

	editTodo: function (todo) {
		this.$.editedTodo = todo;
		// Clone the original todo to restore it on demand.
		this.$.originalTodo = angular.extend({}, todo);
	},

	doneEditing: function (todo) {
		this.$.editedTodo = null;
		todo.title = todo.title.trim();

		if (!todo.title) {
			this.$.removeTodo(todo);
		}
	},

	revertEditing: function (todo) {
		this.$.todos[this.$.todos.indexOf(todo)] = this.$scope.originalTodo;
		this.$scope.doneEditing(this.$scope.originalTodo);
	},

	methods: {
		// Putting a few methods in the `methods` object to demonstrate both
		// backwards *and* forwards compatibility.
		removeTodo: function (todo) {
			this.$.todos.splice(this.$.todos.indexOf(todo), 1);
		},

		clearCompletedTodos: function () {
			this.$.todos = this.$.todos.filter(function (val) {
				return !val.completed;
			});
		},

		markAll: function (completed) {
			this.$.todos.forEach(function (todo) {
				todo.completed = completed;
			});
		}
	}

});
