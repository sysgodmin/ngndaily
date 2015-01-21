(function ($, window, document) {
    var socket = io(),
        form = $("#arForm"),
        input = $("#article"),
        title = $("#title");
    function submit() {
        form.unbind('submit').bind('submit', function (e) {

            if (input.val().length > 0) {
                socket.emit("article", {
                    title: title.val(),
                    body: input.val()
                })
            }
            console.log(input.val());
            e.preventDefault();
            return false;
        })
    }
    if( title.val().length > 1 || input.val().length > 100 ) {
        form.submit = submit();
    }

}(jQuery, this, document));