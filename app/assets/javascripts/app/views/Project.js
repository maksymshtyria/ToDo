GetContext("toDo.Views").Project = Backbone.View.extend({

    template: JST["templates/project"],

    collection: new toDo.Collections.TodoList(),

    events: {
        "keypress input:text":  "createOnEnter",
    },

    initialize: function(projName) {
        this.collection.bind("add", this.addOne, this);
        //this.collection.fetch();
        langPack.project = projName.project;
        $("#todoapp").append( this.render(langPack) );
    },

    addOne: function (oneTask) {
        if ( true/*oneTask.isValid() */) {
            this.$el.append( new toDo.Views.OneTask({model: oneTask, collection: this.collection}).render() );
        }
    },

    createOnEnter: function (e) {
        if (e.keyCode != 13 ) return;
            this.collection.add({
                title: this.$el.find('input:text').val(),
                done: this.$el.find('input:checkbox').prop("checked"),
                project: this.$el.find("pr").text(), 
                order: /*this.collection.nextOrder()*/12
            });
            this.$el.find('input:text').val('');
        },

    render: function (c) {
        this.$el.html(this.template(c));
            return this.$el
    }
});