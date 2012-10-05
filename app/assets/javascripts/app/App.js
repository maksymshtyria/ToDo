$( function () {	
	_.templateSettings = {interpolate : /\{\{(.+?)\}\}/g};

	$('#todoapp').append(new Main().$el);
})