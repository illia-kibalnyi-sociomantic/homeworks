app =
{
    Models : {},
    Views  : {}
};


$( document ).ready( function()
{
    var appModel = new app.Models.MapData();
    var maps =  new app.Views.Maps( { model : appModel } );

    maps.render();
} );
