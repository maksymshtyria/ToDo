GetContext("toDo.Models").oneTask = Backbone.Model.extend({

    url: '/test',
        
    validate: function(attrs) {
        if ( attrs.title == '' ) {
            return  true;       
        } else {
            return false;
        }
    }
});