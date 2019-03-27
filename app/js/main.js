;
jQuery(document).ready(function ($) {
  var windowWidth = $(window).width();

  $.fancybox.defaults.hideScrollbar = false;
  $.fancybox.defaults.touch = false;

  $.fancybox.defaults.btnTpl.smallBtn = '<span data-fancybox-close class="modal-close">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="M24,25a1,1,0,0,1-.71-.29l-23-23A1,1,0,0,1,1.71.29l23,23a1,1,0,0,1,0,1.42A1,1,0,0,1,24,25Z"/><path d="M1,24.77a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L23.3.29a1,1,0,0,1,1.41,0,1,1,0,0,1,0,1.41L1.7,24.48A1,1,0,0,1,1,24.77Z"/></svg>' +
    '</span>';

  $(window).resize(function () {
    windowWidth = $(window).width();
  });

  $(window).on('load', function () {

  });

  $(document).on('click touchstart', function (event) {
    if ((!$(event.target.closest('.header__search')).is('.header__search')) && $('.header__search').hasClass('active')) {
      $('.header__search').removeClass('active');
    }

  });

  if ('ontouchstart' in document.documentElement) {
    $('body').addClass('touch-device');
  } else {
    $('body').removeClass('touch-device');
  }

  $('.only-text-input').bind('keyup blur', function () {
      var node = $(this);
      node.val(node.val().replace(/[^a-zA-Zа-яА-Я ]/g, ''));
    }
  );

  $('.only-numbers-input').bind('keyup blur', function () {
      var node = $(this);
      node.val(node.val().replace(/[^0-9 ()-+]/g, ''));
    }
  );

  (function initSearch() {
    var $search = $('#header-search');
    var $icon = $search.find('.header__search-icon');
    var $inner = $search.find('.header__search-inner');

    function setSearchOffset() {
      var right = windowWidth - $icon.offset().left;
      var top = $icon.offset().top;
      $inner.css({
        'padding-right': right + 'px',
        'padding-top': top + 'px',
        'padding-bottom': top + 'px',
      });
    }

    setSearchOffset();
    $(window).resize(function() {
      setSearchOffset();
    });

    $icon.click(function() {
      $search.toggleClass('active');
    });
  })();

  (function initBannerSlider() {
    var $slider = $('#banner-slider');
    var $wrap = $('#banner');
    var allowChange = true;
    var $pagination = $slider.find('.swiper-pagination');

    function alignPagination() {
      $pagination.css({
        'right': ((windowWidth - $('.container').width()) / 2) + 'px'
      });
    }

    $(window).resize(function() {
      alignPagination();
    });

    var mySwiper = new Swiper($slider, {
      speed: 650,
      virtualTranslate: true,
      pagination: {
        el: $pagination,
        renderBullet: function(index, className) {
          return '<span class="' + className + '">0' + (index + 1) + '</span>';
        },
        clickable: true
      },
      on: {
        init: function() {
          alignPagination();
          var $active = $('.swiper-slide.swiper-slide-active');
          var tl = new TimelineLite();

          tl.fromTo($active, 0, {autoAlpha: 0}, {autoAlpha: 1})
            .fromTo($active.find('.banner__bg'), 1.3, {webkitClipPath:'circle(0% at 0 50%)'}, {webkitClipPath:'circle(150% at 0 50%)', ease: Power1.easeIn}, 0)
            .fromTo($active.find('.banner__title'), .8, {x: -30, autoAlpha: 0}, {x: 0, autoAlpha: 1}, '-=0.3')
            .fromTo($active.find('.banner__descr'), .8, {x: -30, autoAlpha: 0}, {x: 0, autoAlpha: 1, onComplete: function() {
                $wrap.removeClass('active');
              }}, '-=0.3');
        }
      }
    });

    mySwiper.on('slideChangeTransitionStart', function() {
      var $active = $('.swiper-slide.swiper-slide-active');
      var $prev = $(mySwiper.slides[mySwiper.previousIndex]);
      var tl = new TimelineLite();

      tl.fromTo($prev.find('.banner__title'), .8, {x: 0, autoAlpha: 1}, {x: -30, autoAlpha: 0, onStart: function() {
          $wrap.addClass('active');
        }})
        .fromTo($prev.find('.banner__descr'), .8, {x: 0, autoAlpha: 1}, {x: -30, autoAlpha: 0}, '-=.3')
        .fromTo($prev.find('.banner__bg'), 1.3, {webkitClipPath:'circle(150% at 0 50%)'}, {webkitClipPath:'circle(0% at 0 50%)', ease: Power1.easeIn}, '-=1')
        .add('start')
        .fromTo($prev, 2, {autoAlpha: 1}, {autoAlpha: 0})
        .fromTo($active, 0, {autoAlpha: 0}, {autoAlpha: 1}, 'start')
        .fromTo($active.find('.banner__bg'), 1.3, {webkitClipPath:'circle(0% at 0 50%)'}, {webkitClipPath:'circle(150% at 0 50%)', ease: Power1.easeIn}, 'start')
        .fromTo($active.find('.banner__title'), .8, {x: -30, autoAlpha: 0}, {x: 0, autoAlpha: 1}, '-=1')
        .fromTo($active.find('.banner__descr'), .8, {x: -30, autoAlpha: 0}, {x: 0, autoAlpha: 1, onComplete: function() {
            $wrap.removeClass('active');
          }}, '-=0.3');

    });
  })();

  (function initMenu() {
    var $menu = $('#sidebar-menu');
    var $nav = $menu.find('.menu__nav');
    var $bottom = $menu.find('.menu__bottom');
    var $toggler = $('#menu-toggler');
    var $bg = $menu.find('.menu__bg');

    $toggler.click(function() {
      var tl = new TimelineLite();

      $toggler.toggleClass('active');

      if ($toggler.hasClass('active')) {
        tl.to($menu, 0, {autoAlpha: 1})
          .fromTo($bg, 1, {autoAlpha: 0, webkitClipPath: 'circle(0.5% at 0 0)'}, {autoAlpha: 1, webkitClipPath: 'circle(150% at 0 0)', onStart: function() {
              $toggler.addClass('disabled');
            }}, 0)
          .staggerFromTo($nav.find('li'), .7, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0}, 0.15)
          .fromTo($bottom, .8, {autoAlpha: 0, y: 50}, {autoAlpha: 1, y: 0, onComplete: function() {
              $toggler.removeClass('disabled');
            }}, '-=.5');
      } else {
        tl.fromTo($bottom, .8, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: 50, onStart: function() {
            $toggler.addClass('disabled');
          }})
          .staggerFromTo($nav.find('li'), .8, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: 20}, -0.15, '-=.5')
          .fromTo($bg, 1, {autoAlpha: 1, webkitClipPath: 'circle(150% at 0 0)'}, {autoAlpha: 0, webkitClipPath: 'circle(0.5% at 0 0)', onComplete: function() {
              $toggler.removeClass('disabled');
            }}, '-=.35')
          .to($menu, 0, {autoAlpha: 0});
      }

    });

    function alignNav() {
      var res = ($menu.height() - $nav.outerHeight() - $bottom.outerHeight(true)) / 2;

      $nav.css({
        'margin-bottom': res + 'px'
      });
    }

    alignNav();
    $(window).resize(function() {
      alignNav();
    });
  })();

  function initInputs() {
    var $inputs = $('.form__group');

    $inputs.each(function() {
      var $self = $(this);
      var $field = $self.find('input');

      $field.focusin(function() {
        $self.addClass('focused');
      });

      $field.focusout(function() {
        $self.removeClass('focused');
      });
    });
  }

  initInputs();
});