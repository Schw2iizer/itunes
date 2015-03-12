var app = angular.module('itunes');

app.service('itunesService', function($http, $q) {
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also now that we're using a 'service' and not a 'factory' so all your method you want to call in your controller needs to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    this.getArtist = function(artist){
    	var deferred = $q.defer();
    	$http({
    		method: "JSONP",
    		url: "https://itunes.apple.com/search?term=" + artist + "&callback=JSON_CALLBACK"
    	}).then(function(results){
    		console.log(results);
    		var response = results.data.data;
    		for(var i = 0; i < response.length; i++){
    			response[i].Artist = response[i].artistName;
    			response[i].AlbumArt = response[i].artworkUrl100;
    			response[i].Play = response[i].previewUrl;
    			response[i].Song = response[i].kind;
    			response[i].Collection = response[i].collectionCensoredName;
    			response[i].Type = response[i].primaryGenreName;
    			response[i].CollectionPrice = response[i].collectionPrice;
    			response[i].ReleaseDate = response[i].releaseDate;
    			response[i].ShortDescription = response[i].shortDescription;
    			response[i].TrackName = response[i].trackName;
    		}
    		deferred.resolve(response);
    	})


    	return deferred.promise;
    };
});