function GetContext(contextPath, create){
    var contextPathItems, count, currentContextPath, context;

    if(create === undefined){
        create = true;
    }

    if(contextPath){
        context = this; // will be the window
        contextPathItems = contextPath.split('.');

        for(count = 0; count < contextPathItems.length; count++){
            currentContextPath = contextPathItems[count];

            if(typeof(context[currentContextPath]) === 'undefined'){
                if(create){
                    context[currentContextPath] = {};
                }
                else{
                    return undefined;
                }
            }

            context = context[currentContextPath];
        }

        return context;
    }
}
