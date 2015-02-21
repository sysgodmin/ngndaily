!function(window,document) {
	if(window.innerWidth <= 320) {
		$("<span style='width:100%; display:inline-block;' class='label pull-left label-danger widthalert'> You may experience difficulties due to your device resolution </span>").appendTo("nav");
	}
}(window, document);