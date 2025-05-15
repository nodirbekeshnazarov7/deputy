$(document).ready(function () {

  // hamburger
  $(".hamburger_menu").on('click', function (e) {
    e.preventDefault();
    $(".header_menus").addClass("active")
  })

  $(".close").on('click', function (e) {
    e.preventDefault();
    $(".header_menus").removeClass("active")
  })


  // accordion
  $('.accordion_header').click(function () {
    const is_open = $(this).hasClass('active');

    $('.accordion_header').removeClass('active');
    $('.accordion_content').slideUp();

    if (!is_open) {
      $(this).addClass('active');
      $(this).next('.accordion_content').slideDown();
    }
  });

  //footer form:
  $('form .btn').on('click', function () {
    $('form input, form textarea').each(function () {
      if (!$(this).val().trim()) {
        $(this).addClass('error');
        $(this).attr('placeholder', 'заполните это поле!');
      } else {
        $(this).removeClass('error');
      }
    });
  });

  // awards show more
  $('.awards_wrapper').each(function () {
    const $wrapper = $(this);
    const $items = $wrapper.find('.awards_item');
    const $btn = $wrapper.find('.show_more');
    const visibleCount = 4;

    // Dastlab 4 tadan keyingilarni yashirish
    if ($items.length <= visibleCount) {
      $btn.closest('.awards_show_more').hide(); // Tugmani yashirish
    } else {
      $items.slice(visibleCount).hide();
    }

    // Tugma bosilganda toggle qilish
    $btn.on('click', function () {
      const isExpanded = $wrapper.hasClass('expanded');

      if (!isExpanded) {
        $items.show();
        $btn.find('span').text('Скрыть');
        $wrapper.addClass('expanded');
      } else {
        $items.slice(visibleCount).hide();
        $btn.find('span').text('Загрузить ещё');
        $wrapper.removeClass('expanded');
      }
    });
  });
});