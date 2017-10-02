requirejs.config(
{
    paths :
    {
        jquery : 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min',
        'jquery.validate' : 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min',
        lodash : 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min',
        backbone : 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
        async : 'https://cdnjs.cloudflare.com/ajax/libs/requirejs-async/0.1.1/async',
    },
    map: {
        '*': {
          'underscore': 'lodash'
        }
    },
    shim :
    {
        lodash : {
            exports: '_'
        },
        backbone : {
            exports : 'Backbone',
            deps : [ 'jquery', 'lodash' ]
        },
        'jquery.validate' : {
            deps : [ 'jquery' ]
        }
    }
} );


require(
    [ 'app',
      'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBDDtHYb5d8R6dAaotuTtHRI3ACgomOE-E' ],
    function( App )
    {
        App.initialize();
    }
)
