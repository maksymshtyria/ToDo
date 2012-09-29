    var ProjectView = Backbone.View.extend({

        template: _.template($('#project-template').html()),

        initialize: function(projName) {
            this.collection = new  TodoList();
            this.collection.bind("add", this.addOne, this);
            //this.collection.fetch();
            langPack.project = projName.project;
            console.log(langPack); 
            $("#todoapp").append( this.render(langPack) );
        },

        events: {

            "keypress input:text":  "createOnEnter",

        },

        tagName: "div",

        addOne: function (oneTask) {
            if ( oneTask.isValid() ) {
                var view = new oneTaskView({model: oneTask, collection: this.collection});
                this.$el.append(view.render());
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

        render: function (c) {
            this.$el.html(this.template(c));
            return this.$el
        }

    });