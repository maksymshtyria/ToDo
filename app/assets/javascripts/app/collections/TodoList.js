GetContext("toDo.Collections").TodoList = Backbone.Collection.extend({
        
    model: toDo.Models.oneTask,

    url: 'localhost:3000',

    nextOrder: function () {
        if (!this.length) return 0;
            return this.last().get('order') + 1;
        },
});