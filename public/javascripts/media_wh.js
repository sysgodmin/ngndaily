!function(window,document) {
	if(window.innerWidth <= 320) {
		console.log('dd')
		$("body").prepend("<span style='width=100%; display:inline-block;' class='label pull-left label-danger widthalert'> You may experience difficulties due to your device resolution </span>")
	}
}(window, document);