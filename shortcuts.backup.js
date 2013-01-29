document.addEventListener("keydown", keydown, false);

function passMessage(text) {
	//var value = document.getElementById('speechInput').value;
	chrome.extension.sendMessage("kdcfmjjkjcgaklpmpnhcmieepkiddfen", {
		command: text
	}, function(response) {
		$.modal.close();
	});
}

function keydown(e) {
	e = window.event || e;
	if (e.keyCode == '90' && e.ctrlKey && e.altKey) {
		$.modal('<iframe src="options.min.html" height="120" width="375" style="border:0" /><center><a href="#" value="Close" name="Close" class="CloseBtn">Close</a></center>', {
			close: true,
			closeHTML: "",
			containerCss: {
				backgroundColor: "#000",
				borderColor: "#000",
				padding: 0,
				width: 375,
				height: 150
			},
			overlayClose: true,
			opacity: 50,
			overlayCss: {
				backgroundColor: "#000"
			},
			closeClass: ('CloseBtn')
		});
		if (('webkitSpeechRecognition' in window)) {
			var recognition = new webkitSpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.onstart = function() {
				recognizing = true;
				//showInfo('info_speak_now');
			};
			recognition.start();
			ignore_onend = false;
			recognition.onend = function() {
				recognizing = false;
				if (ignore_onend) {
					return;
				}
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						alert(event.results[i][0].transcript);
					} else {
						alert(event.results[i][0].transcript);
					}
				}
			};
			recognition.onresult = function(event) {
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						passMessage(event.results[i][0].transcript);
					} else {
						console.log(event.results[i][0].transcript);
					}
				}
				recognition.stop();
			};
		}
	}
}