GetContext("toDo.Models").LangPack = Backbone.Model.extend({
    initialize: function () {
        this.set(JSON.parse(localStorage.getItem('ru')));
    },

    changeLang: function (lang) {
        this.set(JSON.parse(localStorage.getItem(lang)));
    }
});