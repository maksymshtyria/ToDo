GetContext("toDo.Models").oneTask = Backbone.Model.extend({
    initialize: function () {
        this.bind("error", this.mes, this)
    },
        
    validate: function(attrs) {
        if ( attrs.title == '' ) {
            return  true;       
        } else {
            return false;
        }
    }
});