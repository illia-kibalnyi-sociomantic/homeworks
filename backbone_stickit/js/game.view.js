var GameView = Backbone.View.extend(
{
    bindings :
    {
        '.js-display' :
        {
            observe      : [ 'word', 'guesses', 'revealed' ],
            updateMethod : 'html',

            onGet : function()
            {
                let characters = this.model.getCharacterStates();
                const template = _.template( $( '#template__characters' )
                                             .html() );

                characters = _.map( characters, ( ch ) =>
                ( {
                    classList : ch.state,
                    char      : ch.state ? ch.char : '?'
                } ) );
                return template( { characters } )
            }
        },
        '.js-guess'   :
        {
            attributes : [
                {
                    name    : 'disabled',
                    observe : 'revealed',
                }
            ],
            observe    : 'guesses',
            events     : [ 'change' ],
            updateView : false,

            updateModel : function( value )
            {
                value = value.toLowerCase();
                return value >= 'a' && value <= 'z';
            },

            onSet : function( value )
            {
                this.$( '.js-guess' ).val( '' );
                return this.model.get( 'guesses' ) + value.toLowerCase();
            }
        },
        '.js-guess-history' :
        {
            observe      : 'guesses',
            updateMethod : 'html',

            onGet : function() {
                const guesses = this.model.getGuessStates();
                const template = _.template( $( '#template__characters' )
                                             .html() );
                const characters = _.map( guesses, ( ch ) =>
                ( {
                    classList : ch.state,
                    char      : ch.char
                } ) );

                return template( { characters } );
            }
        },
        '.js-reveal' :
        {
            attributes : [
                {
                    name    : 'disabled',
                    observe : 'revealed'
                }
            ]
        },
        '.js-container' :
        {
            observe : 'word',
            visible : true
        }
    },

    events :
    {
        'click .js-new-word'  : function()
        {
            this.model.set( 'word', '' );
            this.model.fetch();
        },

        'click .js-reveal'    : function()
        {
            this.model.set( 'revealed', true );
        }
    },


    render : function()
    {
        var template = _.template( $( '#template__game-view' ).html() );
        this.$el.html( template() );
        this.stickit();
    }
} );
