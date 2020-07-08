$(document).ready(function(){
   getTodoTodo();


  // Inserisci e invia, il valore inserito nella input 'newTodoText',
  // nella lista 'todo-list'
  $('.add-input').keypress(function(){
   var newTodoText = $('input').val();
   if ( event.which === 13 || event.keyCode === 13 ){
     addTodo(newTodoText);
     $('input').val('');
   }
  });

  // Inserisci e clicca, il valore inserito nella input 'newTodoText',
  // nella lista 'todo-list'
  $('#add-todo').click(function(){
    var newTodoText = $('input').val();
    addTodo(newTodoText);
    $('input').val('');

  });

//Clicca sul button 'delete' per cancellare elemento nella lista e bottone
//attraverso la chiamata ajax con metodo delete
  $(document).on('click', '.delete',
    function (){
      var id = $(this).parent().attr('data-todo');
      console.log(id)
      $.ajax(
        {
          url: 'http://157.230.17.132:3003/todos/' + id,
          method: 'DELETE',
          success: function(dataRes){
            getTodoTodo();

          },
          error: function(){
            alert('errore di sistema');
          }

        }
      );


  });
  //Funzione di aggiunto elemento alla lista todo
  //argomento: Valore della input
  //return: non ritorna nulla
  function addTodo(text){
    if(text.length > 0){
      $.ajax(

        {
          url: 'http://157.230.17.132:3003/todos/',
          method: 'POST',
          data: {
            text: text
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
  };

  // Funzione di lettura e stampa dei dati in seguito alla chiamata api
  //argomento: Valore della input
  //return: non ritorna nulla
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
