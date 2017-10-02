var GameModel = Backbone.Model.extend(
{
    defaults :
    {
        /** The current word that's being guessed */
        word : '',

        /** The sequence of guessed characters */
        guesses : '',

        /** If true the the game is over and the characters are revealed */
        revealed : false
    },


    /** Fetch URL */
    url : 'http://setgetgo.com/randomword/get.php?len=4',

    fetch : function( options )
    {
        options = _.extend( options || {},
            {
                dataType : 'text'
            } );
        this.constructor.__super__.fetch.call( this, options );
    },

    /**
     * Initialize
     *
     * Sets up the internal logic of the model
     * - Listen to the change in the guess attributes: this is how we
     *   advance the game logic.
     *
     */
    initialize : function()
    {
        this.listenTo( this, 'change:guesses', this.onGuess );
    },


    /**
     * Parse
     *
     * Parses the fetch response and update the model
     *
     * When we receive a new word, the guesses are reset and the game is
     * restarted.
     *
     * @param {Object} response Fetch reponse
     */
    parse : function( response )
    {
        if ( response )
        {
            var word = response || '';
            this.set( 'word', word.toLowerCase().trim() );
            this.set( 'guesses', '' );
            this.set( 'revealed', false );
        }
    },


    /**
     * onGuess
     *
     * Triggered when the guessed letter sequence changes.
     *
     * Checks if the guesses now cover all the letters existing in the current
     * word. If so, the game is over (the player won).
     *
     * Otherwise, check if we have had five incorrect guesses. If so, the game
     * is over and the player has lost.
     */
    onGuess : function()
    {
        this.set( 'guesses', this.normalizeGuesses( this.get( 'guesses' ) ) );

        if ( this.getNumIncorrect() >= 5 ||
             this.getNumCorrect() == this.get( 'word' ).length )
        {
            this.set( 'revealed', true );
        }
    },


    /**
     * Get Character states
     *
     * For each character in the word being guessed, return an object
     * describing its guess state.
     *
     * @return
     * {
     *     char   string   the character
     *
     *     state  string   ''|'correct'|'revealed'
     *                     The states also correspond to styling classes.
     * }
     */
    getCharacterStates : function()
    {
        var word = this.get( 'word' ) || '';
        var guesses = this.get( 'guesses' ) || '';
        var isRevealed = this.get( 'revealed' );

        var wordChars = word.split( '' );
        return _( wordChars ).map( function( char )
        {

            var state = '';
            if ( guesses.indexOf( char ) >= 0 )
            {
                state = 'correct';
            }
            else if ( isRevealed )
            {
                state = 'revealed';
            }

            return {
                state : state,
                char  : char
            };
        } );
    },


    /**
     * Get Guess states
     *
     * For each character that has been guessed, return its guess state.
     *
     * @return
     * {
     *     char   string   the character
     *
     *     state  string   'incorrect'|'correct'
     *                     The states also correspond to styling classes.
     * }
     */
    getGuessStates : function()
    {
        var word = this.get( 'word' ) || '';
        var guesses = this.get( 'guesses' ) || '';

        var guessChar = guesses.split( '' );
        return _( guessChar ).map( function( char )
        {
            var state = word.indexOf( char ) >= 0 ? 'correct' : 'incorrect';

            return {
                state : state,
                char  : char
            };
        } );
    },


    /**
     * Normalize Guesses
     *
     * Sanitizes the guess string so that the characters are all lowercase
     * and that the characters are unique.
     *
     * @param {String} guesses Player guesses
     *
     * @return  string
     */
    normalizeGuesses : function( guesses )
    {
        var guessChars = guesses.split( '' );
        guessChars = _.uniq( guessChars );
        return guessChars.join( '' ).toLowerCase();
    },


    /**
     * Get Num Incorrect
     *
     * Returns the number of incorrect guess attempts.
     *
     * @return  number
     */
    getNumIncorrect : function()
    {
        return _( this.getGuessStates() ).filter(
        {
            state : 'incorrect'
        } ).length;
    },


    /**
     * Get Num Correct
     *
     * Returns the number of characters in the word that have already
     * been correctly guessed. When everything is guessed correctly,
     * this value is the same as the length of the word.
     *
     * @return  number
     */
    getNumCorrect : function()
    {
        return _( this.getCharacterStates() ).filter(
        {
            state : 'correct'
        } ).length;
    }


} );
