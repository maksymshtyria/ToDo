GetContext("toDo.Views").Main = Backbone.View.extend({

    template: JST["templates/Main"],

    langPack: new toDo.Models.LangPack(),  

    className: 'header',

    events: {
        "keypress #new-todo":  "_onEnterClick",
        "click .lang": "lang"
    },

    initialize: function (data) {
        this.langPack.on('change', this.render, this);
    },
       
    _onEnterClick: function (e) {    
        if (e.keyCode != 13 || this.$el.find("#new-todo").val() == '') return;
        this._projectAdd();    
    },

    _projectAdd: function (data) {
        var lang, projectView;
      
        lang = this.langPack;

        lang.set({project : (this.$el.find("#new-todo").val() || data.get('project'))});

        projectView = new toDo.Views.Project(lang.get('project')).render(lang.toJSON());
         
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