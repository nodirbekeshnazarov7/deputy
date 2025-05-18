$(document).ready(function () {

  // hamburger
  $(".hamburger_menu").on('click', function (e) {
    e.preventDefault();
    $(".header_menus").addClass("active");
    $(".menus_overlay").addClass("active");
    $('body').addClass('no-scroll');
  })

  $(".close, .menus_overlay").on('click', function (e) {
    e.preventDefault();
    $(".header_menus").removeClass("active");
    $(".menus_overlay").removeClass("active");
    $('body').removeClass('no-scroll');
  })

  $(".header_menus a").on("click", function () {
    const target = $(this).attr("href");

    $("html, body").animate({
      scrollTop: $(target).offset().top
    }, 300);

    $(".header_menus").removeClass("active");
    $(".menus_overlay").removeClass("active");
    $("body").removeClass("no-scroll");
  });


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

    if ($items.length <= visibleCount) {
      $btn.closest('.awards_show_more').hide();
    } else {
      $items.slice(visibleCount).hide();
    }

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

  // custom modal
  $(function () {
    let swiperInstance;

    $('[data-modal]').on('click', function () {
      const modalDataId = $(this).data('modal');
      const $slides = $('#' + modalDataId + ' .modal_slide');
      const $wrapper = $('#modalContentWrapper');
      $wrapper.empty();

      $slides.each(function () {
        const type = $(this).data('type');
        const src = $(this).data('src');
        let slideContent = '';

        if (type === 'video') {
          slideContent = `
            <div class="swiper-slide">
              <div class="modal_slide">
                <video src="${src}" controls></video>

              </div>
            </div>`;
        } else if (type === 'image') {
          slideContent = `
            <div class="swiper-slide">
              <div class="modal_slide">
                <img src="${src}" alt="image">
              </div>
            </div>`;
        }
        //   <div class="video_controls">
        //   <button class="video_play_pause">Play</button>
        // </div>

        $wrapper.append(slideContent);
      });

      $('#universalModal').fadeIn(300);

      if (swiperInstance) swiperInstance.destroy(true, true);
      swiperInstance = new Swiper('.modal_items_wrapper', {
        loop: false,
        spaceBetween: 20,
        navigation: {
          nextEl: '.modal_next',
          prevEl: '.modal_prev',
        },
        on: {
          init: function () {
            updateNavButtons(this);
          },
          slideChange: function () {
            updateNavButtons(this);
          }
        }
      });

      if ($slides.length <= 1) {
        $('.modal_prev, .modal_next').hide();
      } else {
        $('.modal_prev, .modal_next').show();
      }
    });

    $('.modal_overlay').on('click', function (e) {
      if ($(e.target).is('.modal_overlay')) {
        const $this = $(this);
        $this.fadeOut(300, function () {
          $('#modalContentWrapper .swiper-wrapper').empty(); // fadeOut tugagach tozalash
          $this.find('video').each(function () {
            this.pause();
          });
        });
      }
    });

    $('.modal_close').on('click', function () {
      const $overlay = $(this).closest('.modal_overlay');
      $overlay.fadeOut(300, function () {
        $('#modalContentWrapper .swiper-wrapper').empty(); // fadeOut tugagach tozalash
        $overlay.find('video').each(function () {
          this.pause();
        });
      });
    });
    // $(document).on('click', '.video_play_pause', function () {
    //   const video = $(this).closest('.modal_slide').find('video').get(0);
    //   if (video.paused) {
    //     video.play();
    //     $(this).text('Pause');
    //   } else {
    //     video.pause();
    //     $(this).text('Play');
    //   }
    // });

    function updateNavButtons(swiper) {
      const $nextBtn = $('.modal_next');
      const $prevBtn = $('.modal_prev');

      if (swiper.isEnd) {
        $nextBtn.addClass('disabled');
      } else {
        $nextBtn.removeClass('disabled');
      }

      if (swiper.isBeginning) {
        $prevBtn.addClass('disabled');
      } else {
        $prevBtn.removeClass('disabled');
      }
    }
  });

});