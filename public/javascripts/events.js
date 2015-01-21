(function (global, factory) {
	if (typeof jQuery === "undefined") {
		alert('events relies on jQuery');
		return false;
	} else if (window.events && typeof window.events === "object") {
		return false;
	}
	else {
		factory ( global )
	}
}(typeof window !== 'undefined' ? window : this , function (window) {
	var events = function () {
		this.props = {};
		this.props.alertProps = {
			id: 	"alert"
		};


	};

	events.prototype.alert = function () {

		$(".content-wrapper .alert-container").empty().remove();
		var props 			= this.props.alertProps,
			container 	  	= $("<div>", {class:"alert-container"}).stop().prependTo(".content-wrapper"),
			el 				= $("<div>", props).appendTo(container),
			row				= $('.row');
			return function() {

				if(el.length) {
					var alert = $("#alert"),
						alertDiv = $("#alertContainer");
						alertDiv.animate({
							height: '100px'
						},500);
						row.animate({
							'margin-top': 70
						},500);
						alertDiv.delay(2000).animate({
							height: "0px"
						},500);
						row.delay(2000).animate({
							'margin-top': "5px"
						},500);
						setTimeout(function () {
						
						container.empty().remove();
					},4000);
				};
			}()
	}

	window.events = new events();
	return events;
}))
