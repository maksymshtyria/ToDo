var TodoList = Backbone.Collection.extend({
        
    model: oneTask,

    url: 'localhost:3000',

    nextOrder: function () {
        if (!this.length) return 0;
            return this.last().get('order') + 1;
        },
});