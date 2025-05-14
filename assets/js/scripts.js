$(document).ready(function(){
    
    // hamburger
    $(".hamburger_menu").on('click',function(e){
        e.preventDefault();
        $(".header_menus").addClass("active")
    })
    
    $(".close").on('click',function(e){
        e.preventDefault();
        $(".header_menus").removeClass("active")
    })


    //footer form:
    $('form .btn').on('click', function() {
        $('form input, form textarea').each(function() {
          if (!$(this).val().trim()) {
            $(this).addClass('error');
            $(this).attr('placeholder', 'заполните это поле!');
          } else {
            $(this).removeClass('error');
          }
        });
      });
});