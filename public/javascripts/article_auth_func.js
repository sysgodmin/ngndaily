(function (window, document) {

  var deleteArticle = function() {
    var id = $("meta[name='page']").attr("content");
    return $.ajax({
      url: '/deleteArticle',
      method:"post",
      data: { id: id },
      error: function (e) {
        return alert("Could not delete article");
      }
    });
  }
  $(".delete").click(function (e) {
    deleteArticle().success(function(data) {
      if(!data) {
        return alert("Could not delete article");
      } else {
        if(data.status === 200 && data.deleted === true) {
          window.location.href = "/";
        }
      }

    })
    e.preventDefault();
    return false;
  });	
}(window, document));