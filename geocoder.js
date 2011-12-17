// 'Module' that will call the google geocode api.

var http = require( 'http' );
var util = require( 'util' );

function getCoordinates( address, callback) {
    
    console.log( 'Geocoder has been requested for some coordinates.' );

    // ex: http://maps.googleapis.com/maps/api/geocode/json?address=Winterslagstraat+201+3600+Genk+Beglium&sensor=false
    $path = '/maps/api/geocode/json';
    $params = 'address=Winterslagstraat+201+3600+Genk+Beglium&sensor=false'
    
    $options = {
        host: 'maps.googleapis.com',
        part: 80,
        path: $path + '?' + $params,
        method: 'GET'
    }
    
    http.get( $options, function( response ){
        
        var data = '';
        var responseObject;
        var coordinates;
        
        response.setEncoding( 'utf8' );
        console.log( 'Geocoder requested coordinates' );
        
        if( response.statusCode != 200 ) {
            var errorText = 'Geocoder: we had a problem with Google\'s server. Received status code: ' + response.statusCode;
            console.log( errorText );
            callback( new Error( errorText ) );
            return;
        }
        
        response.on( 'error', function( error){
            var errorText = 'Geocoder received an error when getting the response.';
            console.log( errorText );
            callback( new Error( errorText ) );
            return;
        });
        
        response.on( 'data', function( chunk ){
            console.log( 'DATA RECEIVED: ' + data );
            data += chunk;
        });
        
        response.on( 'end', function(){
            
            console.log( 'END EVENT EMITTED: ' + util.inspect( data ) );
            responseObject = JSON.parse( data );
            
            console.log( util.inspect( responseObject ) );
            
            coordinates = responseObject.results[0].geometry.location;
            
            
            
            //console.log ( 'DATA VAR: ' + util.inspect( data ) );
            //console.log( 'RESPONSE OBJECT: ' + util.inspect( responseObject ) );
            //console.log( 'ADDRESS COMPONENTS: ' + util.inspect( responseObject.results ) );
            //console.log( 'ADDRESS COMPONENTS STEP IN: ' + util.inspect( responseObject.results[0].geometry.location ) );
            //console.log ( 'THE COORDINATES ARE ' + coordinates.lat + ', ' + coordinates.lng );

            callback( null, coordinates );
        });
    }).on( 'error', function( error ){
        var errorText = 'We have an error in our get request';
        console.log( errorText );
        callback( new Error( errorText ) );
        return;
    });
    
}

exports.getCoordinates = getCoordinates;


// Error handling
// var divide = function(x,y,callback) {
//    if ( y === 0 ) {
//        return callback(new Error("Can't divide by zero"));
//    }
//    return callback(null,x/y)
// }
// http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling
