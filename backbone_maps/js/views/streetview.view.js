app.Views.StreetView = app.Views.Base.extend(
{
    template : '#streetview-template',

    initMap : function()
    {
        this._service = new google.maps.StreetViewService();
    },

    show : function( map )
    {
        this.$el.removeClass( 'hidden' );

        const position = new google.maps.LatLng(
            this.model.get( 'lat' ),
            this.model.get( 'lng' )
        );
        const panoramaOptions =
        {
            position : position,
            pov      :
            {
                heading : 0,
                pitch   : 10
            }
        };

        this._service.getPanoramaByLocation(
            position,
            200,
            function( panoData )
            {
                // display the map
                if ( panoData && panoData.location && panoData.location.latLng )
                {
                    panoramaOptions.position = panoData.location.latLng;
                    const panorama = new google.maps.StreetViewPanorama(
                        document.getElementById( 'street-view-canvas' ),
                        panoramaOptions
                    );
                    map.setStreetView( panorama );
                }
                else
                {
                    this.$( '#street-view-canvas' )
                        .html( 'Street View is not available for this location.' );
                }
            } );
    }
} );
