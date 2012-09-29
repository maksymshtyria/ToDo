localStorage.setItem("ru", JSON.stringify({header: "Чё сделать",
                                            placeholder: "Создадим новый проект?",
                                            label: "Имя проекта",
                                            task: "Задание",
                                            placeholderProj: "Введите задание",
                                            done: "Выполнено?"}));

localStorage.setItem("eng", JSON.stringify({header: "TodoList",
                                            placeholder: "Create a new project?",
                                            label: "Name project ",
                                            task: "Task",
                                            placeholderProj: "What needs to be done?",
                                            done: "Done?"}));

localStorage.setItem("ua", JSON.stringify({header: "Щоб його зробити",
                                            placeholder: "Створимо новий проект?",
                                            label: "Им`я проекту ",
                                            task: "Завдання",
                                            placeholderProj: "Що нада зробить?",
                                            done: "Чи зробив?"}));


$(function () {

    
    _.templateSettings = {interpolate : /\{\{(.+?)\}\}/g};


    var langPack;


    var oneTask = Backbone.Model.extend({
        initialize: function () {
            this.bind("error", this.mes, this)

        },

        
        validate: function(attrs) {
            if ( attrs.title == '' ) {
                return  true;       
            } else {
                return false;
            }
        },

        mes: function () {
            var mes = noty({ type: 'error', text: "И шо???Хер тее, а не пустая строка!!!"})
        }

    });

    var oneTaskView =   Backbone.View.extend({

        template: _.template($('#item-template').html()),

        initialize : function () {
            this.model.bind("change:title", this.render, this);
            this.model.bind("change:done", this.render, this);
            //this.model.save();
        },

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
            }
            else if (e.currentTarget.id == "moveDown" && (this.model.get("order") - 1) >= 0 )  {
                var a = 1
            } 
            else {
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

        },

        destroy: function () {
            this.model.off();
            this.remove();
            this.model.destroy();
            /*this.order();*/

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

    var TodoList = Backbone.Collection.extend({
         /*initialize: function(projName) {    
           //this.localStorage = new Store(projName.name.project)
           //this.fetch()
        },*/
        
        model: oneTask,

        url: 'localhost:3000',

        nextOrder: function () {
            if (!this.length) return 0;
            return this.last().get('order') + 1;
        },
    });

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

    var AppView = Backbone.View.extend({

        template: _.template($('#App').html()),
        

        initialize: function () {
            langPack = eval("("+localStorage.ru+")");
            this.render();

            /*_.each(localStorage, function (num) {
                            ar ProjectViewOBJ = new ProjectView({project : this.$el.find(" #new-todo ").val() });
                            this.$el.find("#new-todo").val('');
                            console.log (num)




                });*/
        },

        el : $("#todoapp"),

        events: {
            "keypress #new-todo":  "projectAdd",
            "click .lang": "lang"
        },

        projectAdd: function (e) {
            if (e.keyCode != 13 || this.$el.find("#new-todo").val() == '') return;
            var ProjectViewOBJ = new ProjectView({project : this.$el.find(" #new-todo ").val() });
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

    

    var AppViewOBJ = new AppView();
});