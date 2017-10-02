app.Views.Map = app.Views.Base.extend(
{
    template : '#map-template',

    initMap : function()
    {
        const element = document.getElementById( 'map-canvas' );
        const mapOptions =
        {
            zoom      : 15,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };

        this._map = new google.maps.Map( element, mapOptions );
        this._marker = new google.maps.Marker(
            {
                map      : this._map
            } );

            // Listen to events on the map such as a click on the marker pin
        google.maps.event.addListener( this._marker, 'click', () =>
            {
                this.trigger( 'marker:clicked', this._map );
            } );
    },

    changePosition : function()
    {
        const latitude = this.model.get( 'lat' );
        const longitude = this.model.get( 'lng' );
        const position = new google.maps.LatLng( latitude, longitude );

        google.maps.event.trigger( this._map, 'resize' );
        this._map.setCenter( position );
        this._marker.setPosition( position );
    }
} );
