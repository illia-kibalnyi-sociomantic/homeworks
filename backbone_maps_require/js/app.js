define( [
    'jquery',
    'lodash',
    'backbone',
    'models/mapdata.model',
    'views/maps.view'
], function( $, _, Backbone, MapdataModel, MapsView )
{
    var initialize = function()
    {
        $( document ).ready( function()
        {
            new MapsView( { model : new MapdataModel() } ).render();
        } );
    };

    return { initialize };
}
);
