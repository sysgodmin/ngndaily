(function (window, $, document) {
	var login = $("#login");
	login.click(function (e){
		events.alert();
		e.preventDefault();
		return false;
	})
}(typeof window !== 'undefined' ? window : this, jQuery, document))