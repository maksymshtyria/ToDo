GetContext("toDo.Views").Project = Backbone.View.extend({

    template: JST["templates/Project"],

    className: 'project',

    events: {
        "keypress input:text":  "_createOnEnter",
        "click [name='deleteProject']": "_deleteProject"
    },

    initialize: function(data) {
        this.collection = new toDo.Collections.TodoList();
        this.collection.on("add", this._addOne, this);
        this.collection.on("reset", this.deleteCollection);
        this.collection.url = '/getProject/' + data;
        this.collection.fetch({
            success: _.bind( function () {
                _.each(this.collection.models, function (mod){
                    this._addOne(mod)
                }, this)  
            }, this)
        });
        
        //this.collection.on('reset', this.collection.deleteModels, this)
    },

    _addOne: function (mod, coll) {
        if ( mod.isValid() ) {
            this.$el.append( new toDo.Views.OneTask({model: mod, collection: this.collection}).render() );
        };
    },

    _createOnEnter: function (e) {
        if (e.keyCode != 13 ) return;
            this.collection.add({
                title: this.$el.find('input:text').val(),
                done: this.$el.find('input:checkbox').prop("checked"),
                project: this.$el.find("pr").text(), 
                order: this.collection.nextOrder()
            });
            this.$el.find('input:text').val('');
        },

    _deleteProject: function () {
        this.collection.reset();
        this.collection.deleteCollection();
        this.$el.hide('500', _.bind( 
            function () { this.remove(); console.log(this)}, this)
            );
        
    },

    render: function (model) {
        this.$el.html(this.template(model));
            return this.$el
    }
});