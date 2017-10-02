(function() {
    console.log( ' ----------  Task 3  ---------- ' );
    
    var mageStudents = [
        {
            semester: 6,
            element: 'air',
            name: 'Herr Reporter'
        },
        {
            semester: 4,
            element: 'water',
            name: 'Guinness Beerwizard'
        },
        {
            semester: 1,
            element: 'fire',
            name: 'Noob Frostfire'
        },
        {
            semester: 4,
            element: 'water',
            name: 'Blinkbeard Frozenbeef'
        }
    ];

    let mageStudentsWithEach = [];
    _.each( mageStudents, ( student ) => {
        student.semester >= 4 && mageStudentsWithEach.push( student )
    } );
    console.log( 'with each: ' );
    console.log( mageStudentsWithEach );

    console.log( 'with filter: ' );
    console.log( _.filter(
            mageStudents,
            ( v ) => v.semester >= 4
        ) );

    console.log( 'with reject: ' );
    console.log( _.filter(
            mageStudents,
            ( v ) => v.semester >= 4
        ) );
});
