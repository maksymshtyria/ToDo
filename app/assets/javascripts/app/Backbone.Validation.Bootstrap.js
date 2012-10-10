_.extend(Backbone.Validation.callbacks, {

  valid: function(view, attr, selector){
    var control = view.$('[' + selector + '=' + attr + ']');
    var group = control.parents('.formElement');
    var label = group.find('label');
    var errorLabel = 'class="badge badge-important"';
    
    label.find('span').remove(); 
    group.removeClass('error');
    group.addClass('info');
  },

  invalid: function(view, attr, error, selector) {
    var control = view.$('[' + selector + '=' + attr + ']');
    var group = control.parents('.formElement');
    var label = group.find('label');
    var errorLabel = 'class="badge badge-important '+attr+'"'; 
    
    if(group.find('['+errorLabel+']').length == 0){
      label.append('<span '+ errorLabel+ ' title="'+error+'">!</span>');
      $('['+errorLabel+']').attr({
        'rel':"tooltip",
        'data-placement': 'right',
        'data-original-title': error}).tooltip('hide');
    }
    else if (prevError !== error){
      if(!label.find('span')){
        label.append('<span '+ errorLabel+ ' title="'+error+'">!</span>');
      };
      $('['+errorLabel+']').attr({
        'rel':"tooltip",
        'data-placement': 'right',
        'data-original-title': error}).tooltip();
    }
    var prevError = error;
    group.removeClass('info');
    group.addClass('error');
  }
});