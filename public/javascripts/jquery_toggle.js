(function ($) {
	if (!jQuery) {
		alert("jQuery required for toggle");
		return;
	}
	$.fn.clickToggle = function (fn, fn2) {
		if (!jQuery.isFunction( fn ) || !jQuery.isFunction( fn2 ) ) {
			return oldToggle.apply(this,arguments);
		}
		var args = arguments, guid = fn.guid || jQuery.guid++, i = 0,

		toggler = function (e) {
			var lastToggle = (jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
			jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1);

			e.preventDefault();

			return args[lastToggle].apply( this, args ) || false;
		};

		toggler.guid = guid;
		while ( i < args.length ) {
			args[i++].guid = guid;
		}
		return this.click(toggler);
	}
}(jQuery));