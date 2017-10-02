define( [
    'jquery',
    'lodash',
    'backbone',
    'views/base.view',
    'views/form.view',
    'views/map.view',
    'views/streetview.view'
], function( $, _, Backbone, Base, Form, Map, StreetView )
{
    return Base.extend(
    {
        el       : '#contents',
        template : '#app-template',

        initialize : function()
        {
            this.subViews = {};

            this.subViews.form = new Form(
                {
                    model : this.model
                } );

            this.subViews.map = new Map(
                {
                    model : this.model
                } );

            this.subViews.streetView = new StreetView(
                {
                    model : this.model
                } );

            this.on( 'render', this.onRender );

            this.listenTo( this.subViews.form,
                           'input:submitted',
                           this.displayMap );

            this.listenTo( this.subViews.map,
                            'marker:clicked',
                            this.showStreetView );
        },

        onRender : function()
        {
            const { form, map, streetView } = this.subViews;

            this.$( '#app' ).prepend(
               form.render().el,
               map.render().el,
               streetView.render().el
            );

            map.initMap();
            streetView.initMap();
            map.hide();
            streetView.hide();

        },

        displayMap : function()
        {
            const { map, streetView } = this.subViews;

            if ( !map.isVisible() )
            {
                map.show();
            }

            map.changePosition();

            if ( streetView.isVisible() )
            {
                streetView.hide();
            }
        },

        showStreetView : function( map )
        {
            const { streetView } = this.subViews;

            streetView.show( map );
        }
    }
    );
} );
