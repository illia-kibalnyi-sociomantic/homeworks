/**
 * Backbone Base Presenter
 *
 * File contains backbone base view
 *
 */
app.Views.Base = Backbone.View.extend(
{
    /**
     * Get Template
     *
     * Checks if template id has been defined. If so, checks if a template has
     * already been compiled. If yes, the compiled template function is
     * returned, otherwise the template function is compiled and returned.
     *
     * @return Mixed (undefined, function) - template function or undefined.
     *
     */
    getTemplate : function()
    {

        if ( ! this.template )
        {
            return;
        }

        if ( ! this._template )
        {
            this._template = _.template( $( this.template ).html() );
        }

        return this._template;
    },


    /**
     *  Render
     *
     *  Overrides Backbone.View::render. Renders the view based on its template.
     *
     *  @return Object  this Backbone View (for chaining)
     */
    render : function()
    {
        var html = this.createHtml();

        this.$el.html( html );

        if ( typeof this.onRender === 'function' )
        {
            this.onRender();
        }

        return this;
    },


    /**
     *  Create Html
     *
     *  Returns a HTML string belonging to this Backbone View.
     *
     *  @return String
     */
    createHtml : function()
    {
        var data = {};

        if ( typeof this.serializeData === 'function' )
        {
            data = this.serializeData();
        }

        var html = this.getTemplate().call( this, data );

        return html;
    },

    show : function()
    {
        this.$el.removeClass( 'hidden' );
    },

    hide : function()
    {
        this.$el.addClass( 'hidden' );
    },

    isVisible : function()
    {
        return !this.$el.hasClass( 'hidden' );
    }
} );
