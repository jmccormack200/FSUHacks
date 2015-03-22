var decade = $('#decade');
var clock = $('#clock');
var nc = null;
var track = new Audio();
var year = -1;

var API_URL = 'http://192.168.137.133:8888';

var YEARS = ['1920', '1930', '1940', '1950', '1960',
			 '1970', '1980', '1990', '2010']

var makeClock = function()
{
    var roll = Math.floor(Math.random() * 100);
    switch (roll) {
    	case 1:
    		return 'CO:DE';
    	case 2:
    		return 'GA:ME';
    	case 3:
    		return 'HA:CK';
    	case 4:
    		return 'PO:LY';
    	default:
    		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	    	var text = possible.charAt(Math.floor(Math.random() * possible.length));
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		    text += ':';
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		    return text;
    }
};

var fuckClock = function() {
	if (nc === null) {
		clock.removeClass('blink');
		nc = window.setInterval(function() {
			clock.text(makeClock());
		}, 50);
	}
};

var unfuckClock = function() {
	clearInterval(nc);
	nc = null;
	clock.text('12:00');
	clock.addClass('blink');
};

var updateDecade = function(d) {
	decade.removeClass();
	decade.addClass('d'+d+'s');
	decade.text(d+'s');
};

var updateTrack = function(new_track) {
	var track_url = new_track.object.preview_url;
	unfuckClock();
	track.pause();
	track.src = track_url;
	track.play();
};

var updateYear = function(new_year) {
	new_year = parseInt(new_year.object);
	console.log(new_year + ' == ' + year);
	if (new_year !== year) {
		year = new_year;
		updateDecade(YEARS[year]);
		nextTrack();
	}
};

var nextTrack = function() {
	var track = $('#track');
	if (track !== undefined) {
		track.stop();
		track = null;
	}
	var r = API_URL + '/next_track';
	$.ajax({
		url: r,
		dataType: 'json',
		success: updateTrack,
	});
};

var checkYear = function() {
	var r = API_URL + '/current_year';
	$.ajax({
		url: r,
		dataType: 'json',
		success: updateYear,
	});
};

$('#skip').on('click', function() {
	$(this).css('color', 'red');
	window.setTimeout(function() {
		$('#skip').css('color', 'black');
	}, 50);

	$('#track').remove();
	fuckClock();
	nextTrack();

	return;
});

window.onload = function() {
	checkYear();
	window.setInterval(checkYear, 2000);
	nextTrack();
}