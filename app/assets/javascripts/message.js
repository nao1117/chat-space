$(document).on('turbolinks:load',(function(){
  function buildHTML(message){
    var image = message.image ? `<img class="lower-message__image" src=${message.image}>` : "";
      var html =
       `<div class="message-box" data-message-id=${message.id}>
          <span class="user-name">
            ${message.user_name}
          </span>
          <span class="date">
            ${message.date}
          </span>
          <p class="message-content">
          </p>
          <p class="lower-message__content">
            ${message.content}
          </p>
          <p>
            ${image}
          </p>
        </div>`
      return html;
  };

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message-box:last').data("message-id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var addHTML = '';
        messages.forEach(function (message) {
        addHTML = buildHTML(message);
        $('.chat__message').append(addHTML);
        })
        $('.chat__message').animate({scrollTop: $('.chat__message')[0].scrollHeight}, 'fast');
      })
      
      .fail(function() {
        
        alert('自動更新に失敗しました');
        
      });
    }
  };


  $('.new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat__message').append(html);      
      $('form')[0].reset();
      $('.chat__message').animate({scrollTop: $('.chat__message')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    });
    return false;
   });
   setInterval(reloadMessages, 5000);
}));