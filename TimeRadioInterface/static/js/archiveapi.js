URLs = {
	'1930': ['https://archive.org/details/1930-1937RadioNews', 'https://archive.org/details/1938RadioNews', 'https://archive.org/details/1939RadioNews'],
	'1940': ['https://archive.org/details/1940RadioNews', 'https://archive.org/details/1941RadioNews', 'https://archive.org/details/1942RadioNews',
			 'https://archive.org/details/1943RadioNews', 'https://archive.org/details/1944RadioNews', 'https://archive.org/details/1945RadioNews',
			 'https://archive.org/details/1946RadioNews', 'https://archive.org/details/1947RadioNews', 'https://archive.org/details/1948RadioNews',
			 'https://archive.org/details/1949RadioNews'],
	'1950': 'https://archive.org/details/1950-1959RadioNews',
	'1960': 'https://archive.org/details/1960-1969RadioNews',
	'1970': 'https://archive.org/details/1970-1979RadioNews',
	'1980': '',
	'1990': '',
	'2000': '',
	'2010': ''
}

/* retrieveArchive
 *
 * Accepts a URL to an Internet Archive newscast archive. Returns a list
 * of archived newscasts, ordered by date.
 */
var retrieveArchive = function (decade) {
	if (typeof(URLs[decade]) == 'object') {
		var url = URLs[decade][Math.floor(Math.random() * URLs[decade].length)];
	} else if (URLs[decade].length == 0) {
		return;
	} else {
		var url = URLs[decade];
	}

	var req = $.ajax({
		dataType: 'jsonp',
		url: url + '&output=json',
		success: parseResults
	});
}

var parseResults = function (data) {
	var link_base = 'http://' + data.server + data.dir;
	var f = data.files;
	var sounds = [];
	for (var k in f) {
		if (f[k].format === 'VBR MP3') {
			var sound = link_base + k;
			sounds.push(sound);
			if (sounds.length == 5)
				break;
		}
	}
	updateTrack(sounds[Math.floor(Math.random() * sounds.length)], true);
}