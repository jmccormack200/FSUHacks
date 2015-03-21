/* retrieveArchive
 *
 * Accepts a URL to an Internet Archive newscast archive. Returns a list
 * of archived newscasts, ordered by date.
 */
var retrieveArchive = function (url) {
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
	return sounds;
}