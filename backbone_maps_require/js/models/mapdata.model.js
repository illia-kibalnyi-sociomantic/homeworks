define( [
    'lodash',
    'backbone'
], function( _, Backbone )
{
    return Backbone.Model.extend(
    {
        defaults : function()
        {
            return {
                lat : 52.5,
                lng :  13.4,
                map : null
            };
        }
    } );
} );
