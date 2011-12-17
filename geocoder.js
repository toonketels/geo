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
        var lat;
        var lng;
        
        response.setEncoding( 'utf8' );
        
        //console.log( util.inspect( response ) );
        console.log( 'Requested coordinates' );
        
        response.on( 'data', function( chunk ){
            //data.setEncoding( 'utf8' );
            //console.log( 'CHUNCK RECEIVED: ' + chunk );
            
            data += chunk;
        });
        
        response.on( 'end', function(){
            
            responseObject = JSON.parse( data );
            coordinates = responseObject.results[0].geometry.location;
            lng = coordinates.lng;
            lat = coordinates.lat;
            
            //console.log ( 'DATA VAR: ' + util.inspect( data ) );
            //console.log( 'RESPONSE OBJECT: ' + util.inspect( responseObject ) );
            //console.log( 'ADDRESS COMPONENTS: ' + util.inspect( responseObject.results ) );
            //console.log( 'ADDRESS COMPONENTS STEP IN: ' + util.inspect( responseObject.results[0].geometry.location ) );
            console.log ( 'THE COORDINATES ARE ' + lat + ', ' + lng );
            
            // Execute callback function
            callback( lng, lat );
        });
    });
    
    
    
    
}

exports.getCoordinates = getCoordinates;

