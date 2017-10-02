$( function()
{
    var price = 50;
    var templateString = 'The price of the item is <%= price %>';

    var callback = function( e )
    {
        e.preventDefault();
        $( '#message' ).html( 'The price of the item is ' + price );
        $( '#_message' ).html( _.template( templateString )( { price : price } ) );
    };
    $( '#get-product-price' ).click( callback );
} );
