var decade = $('#decade');
var clock = $('#clock');
var track = new Audio();
var nc = null;
var year;

var makeClock = function()
{
    var roll = Math.floor(Math.random() * 100);
    switch (roll) {
    	case 1:
    		return 'FU:CK';
    	case 2:
    		return 'SH:IT';
    	case 3:
    		return 'GA:ME';
    	case 4:
    		return 'HA:CK';
    	case 5:
    		return 'PO:LY';
    	default:
    		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	    	text = possible.charAt(Math.floor(Math.random() * possible.length));
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		    text += ':';
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		    return text;
    }
}

var fuckClock = function() {
	if (nc === null) {
		clock.removeClass('blink');
		nc = window.setInterval(function() {
			clock.text(makeClock());
		}, 100);
	}
}

var unfuckClock = function() {
	clearInterval(nc);
	nc = null;
	clock.text('12:00');
	clock.addClass('blink');
}

var updateDecade = function(d) {
	decade.removeClass();
	decade.addClass('d'+d+'s');
	decade.text(d+'s');
}

var nextTrack = function() {
	$.ajax({
		url: 'http://localhost:3000/next_track',
		dataType: 'jsonp',
		success: updateTrack
	});
}

var checkYear = function() {
	$.ajax({
		url: 'http://localhost:3000/current_year',
		dataType: 'jsonp',
		success: updateYear
	});
}

var updateTrack = function(track) {
	unfuckClock();
	track = new Audio(track.preview_url);
	track.play();
}

var updateYear = function(new_year) {
	if (new_year !== year) {
		year = new_year;
		decade.text(year);
		nextTrack();
	}
}

$('#skip').on('click', function() {
	$(this).css('color', 'red');
	window.setTimeout(function() {
		$('#skip').css('color', 'black');
	}, 50);

	fuckClock();
	nextTrack();

	return;
});

window.onload = function() {
	window.setInterval(checkYear, 1000);
}