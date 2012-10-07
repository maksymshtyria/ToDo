GetContext("toDo.Models").oneTask = Backbone.Model.extend({
      
    validate: function(attrs) {
        if ( attrs.title == '' ) {
            return  true;       
        } else {
            return false;
        }
    }
});