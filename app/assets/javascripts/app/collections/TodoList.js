GetContext("toDo.Collections").TodoList = Backbone.Collection.extend({
        
    model: toDo.Models.OneTask,

    deleteCollection: function () {
    	$.ajax({
  		type: "DELETE",
  		url: this.url
		});
    },

    nextOrder: function () {
        if (!this.length) return 0;
            return this.last().get('order') + 1;
        },
});