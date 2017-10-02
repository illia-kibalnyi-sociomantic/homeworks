app.Views.Form = app.Views.Base.extend(
{
    events : {
        'click #show-map' : 'onSubmit',
        'change input'    : 'onChangeInput'
    },


    template : '#form-template',


    onSubmit : function( e )
    {
        e.preventDefault();
        if ( this.$( 'form' ).valid() )
        {
            this.model.set(
                {
                    lat : this.$( '#latitude' ).val(),
                    lng : this.$( '#longitude' ).val()
                } );
            this.trigger( 'input:submitted' );
        }
    },

    onChangeInput : function( e )
    {
        this.trigger( 'input:change', e );
    }
}
);
