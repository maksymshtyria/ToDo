GetContext("toDo.Views").Main = Backbone.View.extend({

    template: JST["templates/Main"],

    langPack: new toDo.Models.langPack(),  

    className: 'header',

    events: {
        "keypress #new-todo":  "projectAdd",
        "click .lang": "lang"
    },

    initialize: function () {
        this.langPack.on('change', this.render, this);
    },
       
    projectAdd: function (e) {
        var lang, projectView;
        if (e.keyCode != 13 || this.$el.find("#new-todo").val() == '') return;
        lang = this.langPack;
        lang.set({project : this.$el.find("#new-todo").val()});

        projectView = new toDo.Views.Project().render(lang.toJSON());
         
        $("[name='todoapp']").append( projectView );
        projectView.animate({left: "0px"}, 500);
        this.$el.find("#new-todo").val('');
    },

    lang: function (e){
        this.langPack.changeLang(e.target.id);
    },

    render: function (){
        this.$el.html(this.template(this.langPack.toJSON()));
        return this.$el;
    }
});