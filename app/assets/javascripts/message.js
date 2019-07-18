$(function(){
  function buildHTML(message){
    if(message.image){
      var html =
        `<div class="message-box" data-message-id=${message.id}>
            <span class="user-name">
              ${message.user_name}
            </span>
            <span class="date">
              ${message.date}
            </span>
            <p class="message-content">
            </p><p class="lower-message__content">
              ${message.content}
            </p>
            <img class="lower-message__image" src=${message.image}>
            <p></p>
          </div>`
        return html;
      } else{
        var html = 
          `<div class="message-box" data-message-id=${message.id}>
            <span class="user-name">
              ${message.user_name}
            </span>
            <span class="date">
              ${message.date}
            </span>
            <p class="message-content">
            </p><p class="lower-message__content">
              ${message.content}
            </p>
          </div>`
      return html;
     };
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
      $('.chat__message').animate({scrollTop: $('.message-box')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    });
    return false;
   });
});