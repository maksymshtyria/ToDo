$( function () {	
	_.templateSettings = {interpolate : /\{\{(.+?)\}\}/g};

	$('#todoapp').append(new toDo.Views.Main().$el);
})