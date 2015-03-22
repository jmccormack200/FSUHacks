
var track_object = function(track_name, preview_url, image_url, artist){
    
    return {
        track_name: track_name,
        preview_url: preview_url,
        image_url: image_url,
        artist: artist
    };
    
}
/*
{
    "track":{
        "album":{
            "images":[
                {"height":640,"url":"https://i.scdn.co/image/639dc4a26a61136aacfc0233a8b64f20428bde96","width":640},
                {"height":300,"url":"https://i.scdn.co/image/60527d8a03a7cfc7b4db1d3cf8b2092824084676","width":300},
                {"height":64,"url":"https://i.scdn.co/image/43c1c939a5b2b70617ed40aebb1c5ffeb98008df","width":64}
            ]
        },
        "href":"https://api.spotify.com/v1/tracks/0rw76TCLrazYZNEf097pyo","id":"0rw76TCLrazYZNEf097pyo",
        "name":"Don't Forget to Mess Around",
        "preview_url":"https://p.scdn.co/mp3-preview/182eadaea50bb21a09152b8e809844b674e0ef5b",
        "uri":"spotify:track:0rw76TCLrazYZNEf097pyo"
    }
}
*/
module.exports = {
    
    createTrackObjects: function(tracks){
        
        var tracks_objects = [];
        
        for (index = 0; index < tracks.length; index++) {
            var track = tracks[index].track;
            //console.log('Track name: ' + track['name']);
            //console.log('Track preview: ' + track.preview_url);
            //console.log('Track album = ' + JSON.stringify(track.album));
            tracks_objects.push(track_object(track.name, track.preview_url, track.album.images[2].url, track.artists[0].name));
        }
        
        return tracks_objects;
    }
    
}