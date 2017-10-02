( function()
{
    var basket =
    {
         bananas :
         {
             unitPrice : 1,
             quantity  : 3
         },
         apples  :
         {
             unitPrice : 0.75,
             quantity  : 2
         }
     };

     // We've changed base object
     var basket2 = _.extend( basket,
         {
             apples :
             {
                 unitPrice : 1.25,
                 quantity  : 2
             }
         } );

     // We've created new object based on basket2
     var basket3 = _.extend( {}, basket2, { apples : undefined } );

     // We've changed unitPrice of all baskets,
     // because we haven't imlemented deep copy
     basket3.bananas.unitPrice = 1.5;
} )();
