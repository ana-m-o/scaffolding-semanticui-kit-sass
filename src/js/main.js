$(document).ready(function(){

    //Collapse sidebar
    $(".sidebar__collapse-button").click(function(e){
        e.preventDefault(); //evita que actúe como link y recargue la página
        
        $(".sidebar").toggleClass("sidebar--collapsed");
    });

    // Initialize Bootstrap components
    $('[data-toggle="tooltip"]').tooltip();
    
});