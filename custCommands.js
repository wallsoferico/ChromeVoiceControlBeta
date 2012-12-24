var aComp;
var wComp;

if(window.localStorage) {
	var db = window.localStorage;
}

function checkCustomCommands(value) {
	for(var i = 0, l = db.length; i < l; i++) {
		aComp = db.key(i).substring(0, db.key(i).indexOf(' '));
		wComp = db.key(i).substring(db.key(i).indexOf(' ') + 1);
		if(aComp == value) {
			chrome.tabs.create({"url":wComp});
			return 0;
		}
	}
	decide_command(value);
}
								
function submitCustCommand() {
	var website = document.getElementById('commandBox').value;
	var alias = document.getElementById('aliasBox').value;
	
	if(website.indexOf('http://') < 0)
		website = "http://" + website;
						
	if(website == '' || alias == '') {
		alert("fill in all boxes");
		return 0;
	}
							
	for(var k = 0, l = db.length; k < l; k++) {
		aComp = db.key(k).substring(0, db.key(k).indexOf(' '));
		wComp = db.key(k).substring(db.key(k).indexOf(' ') + 1);
		if(aComp == alias) {
			alert(alias + " already exists for website " + wComp);
			return -1;
		}
		if(wComp == website) {
			alert(website + " already has alias " + aComp);
			return -1;
		}
	}
							
	try {
		db.setItem(alias + " " + website, "string");
	}
	catch(err) {
		alert("error");
		if(err.QUOTA_EXCEEDED_ERR) {
		alert("storage space exceeded"); //error check
		}
	}
}

function printCommands() {
	document.write("<h1>Custom Shortcuts</h1>");
	for(var j = 0; j < db.length; j++) {
		aComp = db.key(j).substring(0, db.key(j).indexOf(' '));
		wComp = db.key(j).substring(db.key(j).indexOf(' ')+1);
		document.write("<b>alias " + aComp + " website " + wComp + "</b><br>");
	}
}

function deleteCustCommand() {
	var website = document.getElementById('commandBox').value;

	if(website != '') {
		for(var i = 0; i < db.length; i++) {
			wComp = db.key(i).substring(db.key(i).indexOf(' ')+1);
			if(wComp == website) {
				db.removeItem(db.key(i));
			}
		}
	}
	
	var alias = document.getElementById('aliasBox').value;
	
	if(alias != '') {
		for(var i = 0; i < db.length; i++) {
			aComp = db.key(i).substring(0, db.key(i).indexOf(' '));
			if(aComp == alias) {
				db.removeItem(db.key(i));
			}
		}
	}
	
	if(alias == '' && website == '') {
		document.write("Please fill out at least one field");
	}
}

function clearCommands() {
	db.clear();
}
