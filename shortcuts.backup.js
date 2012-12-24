		document.addEventListener("keydown",keydown,false);
		
		
		
		function passMessage() {
			var value = document.getElementById('speechInput').value;
			chrome.extension.sendRequest({command:value}, function(response) {});
		}
		
		function keydown(e) {
			var e = window.event || e;
			if(e.keyCode == '90' && e.ctrlKey && e.altKey) {
			
				
				$.modal('<iframe src="chrome-extension://ifoeoheegkijijcbbagemhpbgkgkjbgm/options.min.html" height="120" width="375" style="border:0" /><center><a href="#" value="Close" name="Close" class="CloseBtn">Close</a></center>', {
					close: true,
					closeHTML:"",
					containerCss:{
						backgroundColor:"#000",
						borderColor:"#000",
						padding:0,
						width:375,
						height:150
					},
					overlayClose:true,
					opacity:50,
					overlayCss: {backgroundColor:"#000"},
					closeClass: ('CloseBtn')
				});
				
				
					
			
			}
			
		}
		
	