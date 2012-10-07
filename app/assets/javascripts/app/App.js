$( function () {
	var projects, main;

	main = new toDo.Views.Main();
	$("[name='todoapp']").append( main.render())
	
	projects = new toDo.Collections.Main();
	projects.fetch({
		success: function () {	
			_.each(projects.models, function (mod) {
            	main._projectAdd(mod);
        	})
		}
	});
	
})