var decade = $('#decade');
var art = $('#art');
var nc = null;
var track = new Audio();
var year = -1;
var isSong = false;

var API_URL = 'http://192.168.137.243:8888';

var YEARS = ['1920', '1930', '1940', '1950', '1960',
	     '1970', '1980', '1990', '2000', '2010']

var updateDecade = function(d) {
	decade.removeClass();
	decade.addClass('d'+d+'s');
	decade.text(d+'s');
};

var updateTrack = function(new_track, news) {
	if (news == true) {
		var track_url = new_track;
		art.text('News');
	} else {
		var track_url = new_track.object.preview_url;
		art.html('<img src="' + new_track.object.image_url + '" width="128" height="128">');
	}
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

	if (isSong) {
		// Load some news
		isSong = false;
		console.log(YEARS[year]);
		retrieveArchive(YEARS[year]);
	} else {
		// Load a song
		isSong = true;
		var r = API_URL + '/next_track';
		$.ajax({
			url: r,
			dataType: 'json',
			success: updateTrack,
		});
	}
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
	nextTrack();

	return;
});

window.onload = function() {
	checkYear();
	window.setInterval(checkYear, 2000);
	nextTrack();
	window.setInterval(nextTrack, 25000);
}
