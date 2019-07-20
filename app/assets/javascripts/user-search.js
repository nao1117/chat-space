$(document).on('turbolinks:load',(function(){

  var search_user = $("#user-search-result")

  function appendUsers(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
    search_user.append(html);
  }
   
  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  ${ msg }
                </div>`
    search_user.append(html);
  }

  $("#user-search-field").on("keyup",function(){

    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json',
    })

    .done(function(users){ 
      $("#user-search-result").empty();

      if (users.length !== 0){
          users.forEach(function(user){
          appendUsers(user);
        })
      }
      else{
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })

    .fail(function(){
      alert('検索に失敗しました。')
    })
  })

  // 追加ボタンを押した時の処理
  $("#user-search-result").on("click",".user-search-add", function(){
    var userId = $(this).data("user-id");
    var userName =$(this).data("user-name");
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value=${ userId }>
                <p class='chat-group-user__name'>${ userName }</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
  $('.chat-group-users').append(html);
  })

  $("#user-search-result").on("click",'.user-search-add',function(){
    $(".user-search-add").parent(this).remove();
  })

  // 削除ボタンを押した時の処理
  
  $(".chat-group-users").on("click",'.user-search-remove',function(){
    $(".user-search-remove").parent(this).remove();
  })
}))

