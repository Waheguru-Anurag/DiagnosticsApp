$(".nav-tabs a").on('click', function() {
    $('.nav-tabs' ).find( 'li.active' ).removeClass( 'active' );
    $( this ).parent( 'li' ).addClass( 'active' );
    $('#content').load('tabs/'+this.id+'.html')
  });
  
  $(document).ready(function(){
    var id = $('.nav-tabs' ).find( 'li.active' ).children("a").attr("id");
    $('#content').load('tabs/'+id+'.html')
  });