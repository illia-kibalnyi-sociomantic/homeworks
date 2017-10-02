$( function()
{
    const flights = [
    	{
      	from     : 'Berlin',
        to       : 'Budapest',
        airline  : 'Fly Niki',
        operator : 'Air Berlin',
        capacity : 156,
        distance : 800
      },
      {
      	from     : 'Catania',
        to       : 'Alicantre',
        airline  : 'MyAir',
        distance : 1400
      },
      {
      	from     : 'Luga',
        to       : 'Frankfurt',
        airline  : 'Air Malta',
        operator : 'Lufthansa',
        capacity : 156,
        distance : 1700
      },
      {
      	from     : 'Billund',
        to       : 'Treviso',
        airline  : 'Ryanair',
        capacity : 156,
        distance : 6400
      },
      {
      	from     : 'Sofia',
        to       : 'Varna',
        airline  : 'Air Bulgaria',
        capacity : 50,
        distance : 700
      }
    ];

    const keys = _.reduce(
        flights,
        ( result, flight ) => _.union( result, _.keys( flight ) ),
        [] );
    const createTr = ( attrs ) => $( '<tr />', attrs );
    const createTd = ( attrs ) => $( '<td />', attrs );
    const createTh = ( attrs ) => $( '<th />', attrs );
	const createOption = ( attrs ) => $( '<option />', attrs );
    const $table = $( '#flights' );
    const $tbody = $table.find( 'tbody' );
	const $thead = $table.find( 'thead' );
    const $keysSelect = $( '#keys' );
    const appendRow = ( cols, $dest ) => (
            $dest.append( createTr().html( cols )
        ) );
    const clearTable = () => $table.find( 'tbody, thead' ).html( '' );
    const drawTable = ( flights, keys ) =>
    {
    	clearTable();
    	appendRow(
            _.map(
                keys,
                ( v ) => createTh().html( _.capitalize( v ) )
            ),
            $thead );
        _.each( flights, ( flight ) =>
        {
            appendRow(
                _.map(
                    keys,
                    ( col ) => createTd().html( _.get( flight, col, '-' ) ) ),
                $tbody );
        } );
    };
    const drawOptions = ( keys ) =>
    {
    	_.each( keys, ( v ) =>
        {
            const capitalKey = _.capitalize( v );
            $keysSelect.append(
                createOption( {value : v} ).html( capitalKey ) );
        } );
    };

    let currentFlights = flights;
    let currentKeys = keys;

    drawOptions( keys );
    drawTable( currentFlights, currentKeys );

    const handleSort = function( e )
    {
        e.preventDefault();
        const sortBy = this.value;

        currentFlights = _.sortBy( flights, [ sortBy ] );
        drawTable( currentFlights, currentKeys );
    };

    const handleHideDistance = function()
    {
        currentKeys = this.checked ? _.without( keys, 'distance' ) : keys;
        drawTable( currentFlights, currentKeys );
    };

    $keysSelect.on( 'change', handleSort );
    $( '#js-hide-distable' ).on( 'change', handleHideDistance );

} );
