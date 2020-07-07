$(document).ready(function(){
   getTodoTodo();

  // Clicca e inserisci, il valore inserito nella input 'newTodoText',
  // nella lista 'todo-list'

  $('#add-todo').click(function(){

    var newTodoText = $('input').val();

    if(newTodoText.length > 0){
      $.ajax(

        {
          url: 'http://157.230.17.132:3003/todos/',
          method: 'POST',
          data: {
            text: newTodoText
          },
          success: function(dataRes){
            getTodoTodo();

          },
          error: function(){
            alert('La tua richiesta non ha portato alcun risultato')
          }
        }
      );
    }else {
      alert('Non lasciare il campo vuoto')
    }

  });

  $(document).on('click', '.delete'
    function (){
      $.ajax(
        {
          url: 'http://157.230.17.132:3003/todos/',
          method: 'DELETE',

        }
      );


  });
  // Funzione di lettura e stampa dei dati in seguito alla chiamata api
  function getTodoTodo(){
    $('#todo-list').html('');
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
          alert('Ops, Errore');
        }

      }
    );
  };

});
