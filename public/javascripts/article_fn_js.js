!function (window, document) {

  var socket    = io(),
      vote    = $(".vote"),
      id      = $("meta[name=page]").attr("content"),
      imgs    = $(".article-text img"),
      comment = $(".content-body"),
      form = $(".comment-form"),
      comment_holder = $(".comment-holder");

  if(typeof id === 'undefined'      ||
    cookies.hasItem('upvoted_'+id) || 
    cookies.hasItem('downvoted_'+ id)) {
    vote.css({color:'gray'}).attr('disabled', true);
  }

  var makeVote = function(el) {
    var attr = el.attr('attr');
    if (!cookies.hasItem(attr+'_'+id)) {
      cookies.setItem(attr+'_'+id, id, Infinity);
    }
    vote.css({color:'gray'}).attr('disabled', true);
    updateVotes(attr);
  },
  updateVotes = function(attr) {
    var num  = $('.vote[attr="'+attr+'"]').find('.votes');
    socket.emit(attr, id);
    socket.on('success',function () {
      vote.css({color:'gray'}).attr('disabled', true);
      var val = num.text().replace(/[^0-9]/g,'');
          votes = parseInt(val)+1;
      num.html(" ("+votes+")");
    });
  },
  commentTemplate = function(o) {
    return [
      "<div true_id='"+o.id+"' class='commentpost comment-container well'>",
      "<div class='media pull-left'>",
      "<img src='/imgs/64user.svg' href='#' class='media-object user-avatar pull-left'>",
      "<a href='"+(o.name !== 'Anonymous' ? "/author/"+o.name : '#')+"' class='pull-left'> ", o.name, "</a></div><hr>",
      "<div class='comment-well'><p>",
      o.post, "</p>"
    ].join('');
  },
  makeComment = function (comment) {
      return $.ajax({
        type: "POST",
        url: "/comment",
        data: {
          post: comment,
          id: id
        }
      });
  },
  submitComment = function(e) {  
    var comm_val = comment.val();
    if (comm_val.length < 1) {
      return function() {
        comment.val("you need to enter something");
      }
    } 
    makeComment(comm_val).success(function(data) {
      if (data.status === '200') {
        $(commentTemplate(data.info)).prependTo(comment_holder)
      }
    });
    e.preventDefault();
    return false;
  },
  getComments = function() {
    return $.ajax({
      url:'/comments',
      type:'post',
      data: {
        id: id
      },
      error: function() {
        $("<p>Error fetching comments(</p>").appendTo(comment_holder);
      }
    });
  };
  //update comments
  (function loop() {
    getComments().success(function(data) {
        for(j = data.length; j >= 0; j--) {
          if( typeof data[j] !== 'undefined' ) {
          var true_id = $('div[true_id="'+data[j].id+'"]');
            if (!true_id.length) {
              $(commentTemplate({name: data[j].COMMENT_AUTH, post: data[j].COMMENT_CONTENT, id:data[j].id })).appendTo(comment_holder)
            }
          }
        }
    });
    setTimeout(function() {
        loop();
    }, 150000);
  }())
  //submit comment
  form.unbind('submit').bind('submit', submitComment);
  vote.click(function(e){
    makeVote($(this));
    e.preventDefault();
    return false;
  });

}(typeof window !== 'undefined' ? window : this, document);