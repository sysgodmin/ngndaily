$(document).ready(function(){
	var author = $("meta[name=page]").attr("content");
	$('.'+author).addClass('active');
});

