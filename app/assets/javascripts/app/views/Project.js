GetContext("toDo.Views").Project = Backbone.View.extend({

    template: JST["templates/Project"],

    className: 'project',

    collection: new toDo.Collections.TodoList(),

    events: {
        "keypress input:text":  "createOnEnter",
    },

    initialize: function(options) {
        this.collection.bind("add", this.addOne, this);
        //this.langPack = options.langPack;
        //this.collection.fetch();
        //this.langPack.set({project: options.project});
        //$("#todoapp").append( this.render(this.langPack.toJSON()) );
    },

    addOne: function (oneTask) {
        if ( oneTask.isValid() ) {
            this.$el.append( new toDo.Views.OneTask({model: oneTask, collection: this.collection}).render() );
        }
    },

    createOnEnter: function (e) {
        if (e.keyCode != 13 ) return;
            this.collection.add({
                title: this.$el.find('input:text').val(),
                done: this.$el.find('input:checkbox').prop("checked"),
                project: this.$el.find("pr").text(), 
                order: this.collection.nextOrder()
            });
            this.$el.find('input:text').val('');
        },

    render: function (model) {
        this.$el.html(this.template(model));
            return this.$el
    }
});