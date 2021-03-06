GetContext("toDo.Views").OneTask = Backbone.View.extend({

    template: JST["templates/OneTask"],

    tagName:  "li",

    events: {
        "dblclick .view" : "edit",
        "keypress input:text":  "saveOnEnter",
        "click input:checkbox": "done",
        "mouseover .view" : "showIm",
        "mouseout .view" : "hideIm",
        "click #moveDown, #moveUp" : "move",
        "click #destroy" : "destroy"
    },

    initialize : function () {
        this.model.bind("change", function () {
           this.render();
           this.model.save() 
        } , this);
    },
        
    edit: function() {
        this.$(".edit").val(this.model.get('title'));
        this.$(".view").hide();
        this.$(".edit").show();
    },

    saveOnEnter: function (e) {
        if (e.keyCode != 13) {
            return;
        } ;
        this.model.set({title: this.$('.edit').val()});
    },

    done: function () {
        if ( this.$el.find("input:checkbox").prop("checked") == true)
            this.model.set({done : true})
        else
            this.model.set({done : false})
        this.trigger('edit');
    },

    showIm: function () {
        this.$(".img").show();
    },

    hideIm: function () {
        this.$(".img").hide();
    },

    move: function (e) {
        if (e.currentTarget.id == "moveUp" && (this.model.get("order") + 1) <= this.collection.length) {
            var a = -1
        } else if (e.currentTarget.id == "moveDown" && (this.model.get("order") - 1) >= 0 )  {
            var a = 1
        } else {
            return;
        }

        var temp ={
            title : this.collection.at(this.model.get("order")).get("title"),
            done :   this.collection.at(this.model.get("order")).get("done")
        }

        this.collection.at(this.model.get("order")).set({
            title : this.collection.at(this.model.get("order") + a ).get("title"),
            done :  this.collection.at(this.model.get("order") + a ).get("done")
        });
        this.collection.at(this.model.get("order") + a ).set(temp);
        this.order();
        this.trigger('edit');
    },

    destroy: function () {
        this.model.off();
        this.remove();
        this.model.url = '/test/'+ this.model.get('id');
        this.model.destroy();
    },

    order: function (){
        var i=0;
        _.each(this.collection.models, function(num){
            num.set({order : i++})
        });
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('done', this.model.get('done'));
        return this.$el
    }
});