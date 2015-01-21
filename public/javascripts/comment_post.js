(function (window, document) {
	if (typeof jQuery === 'undefined') {
		return false;
	}
	var form = $(".comment-form")
		, comment = $(".comment-body");

	form.unbind('submit').bind('submit', function (e) {
		$.ajax({
			type: "POST",
			url: "comment",
			data: {
				comment: comment.val()
			},
			success(e) {
				alert("Comment posted")
			}
		})
		e.preventDefault();
		return false;
	})
}(window, document))