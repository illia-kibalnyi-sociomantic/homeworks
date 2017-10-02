app.Models.MapData = Backbone.Model.extend(
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
