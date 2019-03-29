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
    var $inputs = $('.form__group:not(.form__group--file)');
    var $files = $('.form__group--file');
    var placeholder = 'Прикрепить фото или логотип';

    $files.each(function() {
      var $self = $(this);

      $self.change(function(e) {
        if (e.target.files.length > 0) {
          $self.find('span').text('Загружено');
          $self.addClass('loaded');
        } else {
          $self.find('span').text(placeholder);
          $self.removeClass('loaded');
        }
      });
    });

    $inputs.each(function() {
      var $self = $(this);
      var $field = $self.find('input, select, textarea');

      if ($field.prop('tagName') === 'INPUT' || $field.prop('tagName') === 'TEXTAREA') {
        $field.focusin(function(e) {
          $self.addClass('focused');
        });

        $field.focusout(function(e) {
          $self.removeClass('focused');

          if (e.target.value !== '') {
            $self.addClass('filled');
          } else {
            $self.removeClass('filled');
          }
        });
      } else if ($field.prop('tagName') === 'SELECT') {
        var $content = $self.closest('.constructor__col-content');
        var $img = $content.find('.constructor__col-img');
        $self.addClass('filled');

        $field.on('select2:open', function (e) {
          $self.addClass('focused');
        });

        $field.on('select2:select', function (e) {
          $self.removeClass('focused');

          $img.fadeOut(200, function() {
            $img.find('img').attr('src', $field.select2('data')[0].element.dataset.img);
            $img.fadeIn(100);
          });

        });
      }
    });
  }

  initInputs();

  function initSelect() {
    var $select = $('.form__group--select');

    $select.each(function() {
      var $self = $(this);

      $self.find('select').select2({
        containerCssClass: 'select-wrap',
        dropdownCssClass: 'select-dropdown',
        dropdownParent: $self,
        minimumResultsForSearch: -1,
      });
    });
  }

  initSelect();

  function calculateLines(container, items, item, TITLE_GUTTER, COL_GUTTER) {
    w = $(container).find(item).width();

    $(items).each(function(idx) {
      var $self = $(this);
      var $wrap = $self.find('.line-parent');
      var $title = $wrap.find('p');
      var left = $title.position().left;

      if (idx === 0) {
        $wrap.find('.line-item').css({
          'width': left - TITLE_GUTTER + 'px'
        });
      } else if (idx === items.length - 1) {
        var $prevP = $(items[idx - 1]).find('.line-parent p');
        var prevRight = $prevP.position().left;

        $wrap.find('.line-item:first-of-type').css({
          'width': prevRight + left - TITLE_GUTTER + COL_GUTTER + 'px',
          'left': - (prevRight + COL_GUTTER) + 'px',
        });

        $wrap.find('.line-item:last-of-type').css({
          'width': left - TITLE_GUTTER + 'px',
          'left': 'auto',
          'right': '0',
        });
      }
      else {
        var $prevP = $(items[idx - 1]).find('.line-parent p');
        var prevRight = $prevP.position().left

        $wrap.find('.line-item').css({
          'width': prevRight + left - TITLE_GUTTER + COL_GUTTER + 'px',
          'left': - (prevRight + COL_GUTTER) + 'px',
        });
      }
    });
  }

  function initLines() {
    var $sections = $('.line-section');

    $sections.each(function() {
      var $self = $(this);
      var type = $self.attr('data-lines');
      var TITLE_GUTTER, COL_GUTTER, w;

      if (type === 'constructor') {
        TITLE_GUTTER = 30;
        COL_GUTTER = 45;
      }

      var $items = $self.find('.line-wrap');
      w = $self.find('.line-wrap').width();

      calculateLines($self, $items, '.line-wrap', TITLE_GUTTER, COL_GUTTER);

      $(window).resize(function() {
        calculateLines($self, $items, '.line-wrap', TITLE_GUTTER, COL_GUTTER);
      });
    });
  }

  initLines();


  function setProgressWidth(el, max) {
    var w = $(el).width();
    var res;

    if (max === 1) {
      res = w / 2;
    } else {
      res = w / max;
    }

    $(el).css({
      'margin-left': res + 'px',
    });

    $(el).find('.ui-slider-handle').css({
      'width': res + 'px',
      'margin-left': -res + 'px',
    });
  }

  function initRangeSlider(el, max, swiper) {
    var range = $(el).slider({
      max: max,
      min: 0,
      step: 1,
      value: 0,
      animate: '500',
      change: function(e, ui) {
        swiper.slideTo(ui.value)
      }
    });

    swiper.on('transitionStart', function() {
      range.slider('value', Math.floor(max * swiper.progress));
    })

    setProgressWidth($(el), max);

    $(window).resize(function() {
      setProgressWidth($(el), max);
    });

    return range;
  }

  (function initProductsSlider() {
    var $products = $('.products');

    $products.each(function() {
      var $self = $(this);
      var $slider = $self.find('.products__slider');
      var $prev = $slider.find('.swiper-prev');
      var $next = $slider.find('.swiper-next');
      var $progress = $self.find('.slider__progress-range');
      var slidesPerView = 4;
      var max;
      var range;

      var mySwiper = new Swiper($slider, {
        speed: 900,
        spaceBetween: 56,
        roundLengths: true,
        watchOverflow: true,
        slidesPerView: slidesPerView,
        navigation: {
          prevEl: $prev,
          nextEl: $next,
        },
        on: {
          init: function() {
            max = $(this)[0].slides.length - slidesPerView;
            range = initRangeSlider($progress, max, $(this)[0]);
          }
        }
      });
    });
  })();

  (function initReviewsSlider() {
    var $self = $('#reviews-slider');
    var $slider = $self.find('.reviews__slider');
    var $prev = $slider.find('.swiper-prev');
    var $next = $slider.find('.swiper-next');
    var $progress = $self.find('.slider__progress-range');
    var slidesPerView = 3;
    var max;
    var range;

    var mySwiper = new Swiper($slider, {
      speed: 900,
      spaceBetween: 80,
      roundLengths: true,
      watchOverflow: true,
      slidesPerView: slidesPerView,
      navigation: {
        prevEl: $prev,
        nextEl: $next,
      },
      on: {
        init: function() {
          max = $(this)[0].slides.length - slidesPerView;
          range = initRangeSlider($progress, max, $(this)[0]);
        }
      }
    });
  })();

  (function initTextBlocks() {
    var $blocks = $('.text-content');

    $blocks.each(function() {
      var $self = $(this);
      var $text = $self.find('.text-wrap');
      var link;

      if ($self.hasClass('text-content--img')) {
        var $img = $self.find('img');
        var imgH = $img.height();
        var imgW = $img.outerWidth(true);
        var textH = $text.outerHeight(true);

        if (textH > imgH) {
          $text[0].style.maxHeight = imgH + 'px';

          link = document.createElement('a');
          link.textContent += 'Читать больше';
          link.classList.add('text-link');
          link.setAttribute('href', '#');

          $(link).css({
            'left': imgW + 'px'
          });
          $text.append(link);

          $(link).click(function(e) {
            e.preventDefault();

            $self.toggleClass('active');
            if ($self.hasClass('active')) {
              $text[0].style.maxHeight = null;
              $(link).text('Скрыть');
              $(link).css({
                'left': '0px'
              });
            } else {
              $text[0].style.maxHeight = imgH + 'px';
              $(link).text('Читать больше');
              $(link).css({
                'left': imgW + 'px'
              });
            }
          });
        }

      }
    });
  })();
});