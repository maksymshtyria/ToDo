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