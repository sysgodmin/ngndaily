!function(window,document) {
	var $title 	= $("#title"),
		$body  	= $("#article"),
		$tags  	= $("#tags"),
		$submit = $("#article-form"),
		meta 	= $(".metas"),
		options = meta.children("option"),
		str		= "",
		flags 	= $(".dd-select");

	var hidden = false, anon = false, perm = false;


	options.dblclick(function(e) {
		e.preventDefault();
		for (var i = 0; i < str.split(',').length; i++) {
			if ($(this).val() === str.split(',')[i]) {
				return false;
			}
		}
		str += $(this).val() + ",";
		$tags.val(str.replace(/,(\s+)?$/, ''));
		return false;
	});
	flags.clickToggle(function() {
		$(this).css("background-color", "#B1C5C2");
		switch($(this).attr("meta")) {
			case "hidden":
			hidden = true;
			perm = false;
			break;
			case "perm":
			perm = true;
			hidden = false;
			break;
			case "anon":
			anon = true;
			break;
			default: 
			return;
		}
	}, function() {
		$(this).css("background-color", "#D1DCDB");
		switch($(this).attr("meta")) {
			case "hidden":
			hidden = false;
			break;
			case "perm":
			perm = false;
			hidden = false;
			break;
			case "anon":
			anon = false;
			break;
			default: 
			return;
		}
	});


	var formControl = function () {

		var obj = {};

		obj.title = $title.val();
		obj.body = $body.val();
		obj.meta  = $tags.val();
		obj.flags = {
			hidden: hidden,
			perm: perm,
			anon: anon
		};

		if ( obj.title.length + obj.body.length + obj.meta.length) > 2 )  {
			alert("Please fill in required forms");
			return false;
		}
		console.log(obj);
		return $.ajax({
			type: 'POST',
			url: '/create',
			data: obj,
			dataType: 'json'
		});
	}

	$submit.unbind('submit').bind('submit', function(e) {
		e.preventDefault();
		formControl().success(function(data) {
			if (data === true) {
				location.href="/articles"
			} else {
				alert(data.error);
			}
		})

	})
}(this,document);