var Main = Backbone.View.extend({

    template: JST["templates/main"],
        
    $el : $("#todoapp"),

    events: {
        "keypress #new-todo":  "projectAdd",
        "click .lang": "lang"
    },

    initialize: function () {
        langPack = eval("("+localStorage.ru+")");
        this.render();
    },
       
    projectAdd: function (e) {
        if (e.keyCode != 13 || this.$el.find("#new-todo").val() == '') return;
        var ProjectViewOBJ = new Project({project : this.$el.find("#new-todo").val() });
        this.$el.find("#new-todo").val('');
    },

    lang: function (e){
        langPack = eval("("+localStorage.getItem(e.target.id)+")");
        this.render();
    },

    render: function (){
        this.$el.html(this.template(langPack));
        return this.$el;
    }
});