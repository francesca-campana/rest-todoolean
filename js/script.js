$(document).ready(function(){
  getTodo()
  function getTodo(){
    $.ajax(

      {
        url: 'http://157.230.17.132:3003/todos/',
        method: 'GET',
        success: function(dataRes){
          if (dataRes.length > 0) {

            var source = $("#list-template").html();
            var template = Handlebars.compile(source);
            for (var i = 0; i < dataRes.length; i++) {
              var todoItem = dataRes[i];
              var html = template(todoItem);
              $('#todo-list').append(html);
            }
          }
        },
        error: function(){
          alert('La tua richiesta non ha portato alcun risultato');
        }

      }
    );
  };

  $('#add-todo').click(function(){

    var newTodoText = $('input').val();

    


  });

});
