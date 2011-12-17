// 'Module' that will call the google geocode api.

// @toDo:
//  use query string
//  location options
//  find address based on coordinates

var http = require( 'http' );
var util = require( 'util' );

function getCoordinates( addressGiven, callback) {
    
    console.log( 'Geocoder has been requested for some coordinates.' );

    // Assemble an address
    // Replace whitespaces, etc with +
    // Only allow alfanumerica chars
    var tempAddress = addressGiven.replace(/[^a-zA-Z0-9]/g, '+');
    
    // ex: http://maps.googleapis.com/maps/api/geocode/json?address=Winterslagstraat+201+3600+Genk+Beglium&sensor=false
    var path = '/maps/api/geocode/json';
    var params = 'address='
    var tail = '&sensor=false';
    
    $options = {
        host: 'maps.googleapis.com',
        part: 80,
        path: path + '?' + params + tempAddress + tail,
        method: 'GET'
    }
    
    http.get( $options, function( response ){
        
        var data = '';
        var responseObject;
        var coordinates;
        var address;
        
        response.setEncoding( 'utf8' );
        console.log( 'Geocoder requested coordinates' );
        
        // Check if we connect correctly with the Google service
        if( response.statusCode != 200 ) {
            var errorText = 'Geocoder: we had a problem with Google\'s server. Received status code: ' + response.statusCode;
            console.log( errorText );
            callback( new Error( errorText ) );
            return;
        }
        
        // Check the response doesn't throw on an error
        response.on( 'error', function( error){
            var errorText = 'Geocoder received an error when getting the response.';
            console.log( errorText );
            callback( new Error( errorText ) );
            return;
        });
        
        // Collect all data chunks in data var
        response.on( 'data', function( chunk ){
            console.log( 'DATA RECEIVED: ' + data );
            data += chunk;
        });
        
        // Finaly, respond ourselves when we have all the data
        response.on( 'end', function(){
            
            responseObject = JSON.parse( data );
            
            // Check Google find some coordinates
            if( responseObject.status == 'ZERO_RESULTS' ) {
                var errorText = 'Geocoder didn\t receive any results from Google since they could not get the geocodes from the given address.';
                console.log( errorText );
                callback( null, false );
            }
            
            // Get the coordinates
            coordinates = responseObject.results[0].geometry.location;
            
            // Get the address object
            address = responseObject.results[0].address_components;
            
            callback( null, address, coordinates );
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
