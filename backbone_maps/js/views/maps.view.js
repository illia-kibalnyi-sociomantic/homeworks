app.Views.Maps = app.Views.Base.extend(
{
    el       : '#contents',
    template : '#app-template',

    initialize : function()
    {
        const { Form, Map, StreetView } = app.Views;
        this.subViews = {};

        console.log(app);

        this.subViews.form = new Form(
            {
                model : this.model
            } );

        this.subViews.map = new Map(
            {
                model : this.model
            } );

        this.on( 'render', this.onRender );

        this.subViews.streetView = new StreetView(
            {
                model : this.model
            } );

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
