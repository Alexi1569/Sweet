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
    var $input = $search.find('.header__search-input');
    var containerW = $('.container').width();
    var pageW = $('.page').width();

    function setSearchOffset() {
      var top = $icon.offset().top;

      $input.css({
        'padding-top': top + 'px',
        'padding-bottom': top + 'px',
      });
    }

    setSearchOffset();
    $(window).resize(function() {
      w = $('.container').width();
      iconPos = $('.header__search-icon').offset();
      containerRight = parseInt($('.container').css('padding-right'), 10)
      setSearchOffset();
    });

    var iconPos = $('.header__search-icon').offset();
    var containerRight = $('.container').css('padding-right')

    $icon.click(function() {
      $search.toggleClass('active');
      var res = $input.offset().left + $input.width();
      var total;

      if (res > iconPos.left) {
        total = res - iconPos.left;
      } else if (res < iconPos.left) {
        total = iconPos.left - res;
      } else {
        total = 0;
      }

      if ($search.hasClass('active')) {
        $('.header__search-icon').css({
          'transform': 'translateX(' + total + 'px)'
        })
      } else {
        $('.header__search-icon').css({
          'transform': 'translateX(0px)'
        })
      }
    });
  })();

  (function initBannerSlider() {
    var $slider = $('#banner-slider');
    var $wrap = $('#banner');
    var $pagination = $slider.find('.swiper-pagination');
    var pageWidth;

    function alignPagination() {
      pageWidth = $('.page').width();

      $pagination.css({
        'right': parseInt($('.container').css('padding-right'), 10) + 'px'
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
    var $toggler = $('.menu-toggler');
    var $bg = $menu.find('.menu__bg');
    var topOffset = 0;

    $toggler.click(function() {
      var tl = new TimelineLite();
      var beginPath = [];
      var liItems;

      var innerLi = $('li.menu__nav-mobile');

      innerLi.each(function() {
        var $self = $(this);

        $self.click(function() {
          $self.toggleClass('active');

          if ($self.hasClass('active')) {
            $self.children('ul').slideDown(500);
          } else {
            $self.children('ul').slideUp(500);
          }
        });
      });

      if (windowWidth > 767) {
        beginPath = ['0.5%', '0%', '0%'];
        liItems = $nav.children('ul').children('li:not(.menu__nav-mobile)');
      } else {
        beginPath = ['0.5%', '150%', '0%'];
        liItems = $nav.children('ul').children('li');
      }

      $toggler.toggleClass('active');

      if ($toggler.hasClass('active')) {
        tl.to($menu, 0, {autoAlpha: 1})
          .fromTo($bg, 1, {autoAlpha: 0, webkitClipPath: 'circle(' + beginPath[0] + ' at ' + beginPath[1] + ' ' + beginPath[2] + ')'}, {autoAlpha: 1, webkitClipPath: 'circle(150% at 0% 0%)', onStart: function() {
              $('.header').addClass('menu-opened');
              $toggler.addClass('disabled');
            }}, 0)
          .staggerFromTo(liItems, .7, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0}, 0.15)
          .fromTo($bottom, .8, {autoAlpha: 0, y: 50}, {autoAlpha: 1, y: 0, onComplete: function() {
              topOffset = window.scrollY;
              $toggler.removeClass('disabled');
              $menu.css('padding-right', getScrollbarWidth() + 'px');
              $('body').addClass('no-scroll');
            }}, '-=.5');
      } else {
        tl.fromTo($bottom, .8, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: 50, onStart: function() {
            $('.header').removeClass('menu-opened');
            $toggler.addClass('disabled');
            $menu.css('padding-right', '0px');
            $('body').removeClass('no-scroll');
            window.scrollTo(0, topOffset);
          }})
          .staggerFromTo(liItems, .8, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: 20}, -0.15, '-=.5')
          .fromTo($bg, 1, {autoAlpha: 1, webkitClipPath: 'circle(150% at 0 0)'}, {autoAlpha: 0, webkitClipPath: 'circle(' + beginPath[0] + ' at ' + beginPath[1] + ' ' + beginPath[2] + ')', onComplete: function() {
              $toggler.removeClass('disabled');
            }}, '-=.35')
          .to($menu, 0, {autoAlpha: 0});
      }

    });

    function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
    }

    function alignNav() {
      var res = ($menu.height() - $nav.outerHeight() - $bottom.height()) / 2;

      if (res > 40) {
        $nav.css({
          'margin-bottom': res + 'px',
          'margin-top': res + 'px'
        });
      } else {
        $nav[0].style.marginBottom = null;
      }
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
    if (windowWidth > 991) {
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
            'width': prevRight + left - TITLE_GUTTER * 2 + COL_GUTTER * 2 + 'px',
            'left': - (prevRight - TITLE_GUTTER + COL_GUTTER * 2) + 'px',
          });

          $wrap.find('.line-item:last-of-type').css({
            'width': left - TITLE_GUTTER + 'px',
            'left': 'auto',
            'right': '0',
          });
        }
        else {
          var $prevP = $(items[idx - 1]).find('.line-parent p');
          var prevRight = $prevP.position().left;

          $wrap.find('.line-item').css({
            'width': prevRight + left - TITLE_GUTTER * 2 + COL_GUTTER * 2 + 'px',
            'left': - (prevRight - TITLE_GUTTER + COL_GUTTER * 2) + 'px',
          });
        }
      });
    }
  }

  function initLines() {
    var $sections = $('.line-section');

    $sections.each(function() {
      var $self = $(this);
      var type = $self.attr('data-lines');
      var TITLE_GUTTER, COL_GUTTER, w;

      if (type === 'constructor') {
        if (windowWidth > 1350) {
          COL_GUTTER = 45;
          TITLE_GUTTER = 30;
        } else if (windowWidth <= 1350 && windowWidth > 1199) {
          COL_GUTTER = 30;
          TITLE_GUTTER = 15;
        } else if (windowWidth <= 1199 && windowWidth > 767) {
          COL_GUTTER = 15;
          TITLE_GUTTER = 10;
        }
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


  function setProgressWidth(el, step, swiper) {
    var w = $(el).width();
    var res;

    if (step !== Infinity) {
      if (step === 1) {
        res = w / 2;
      } else {
        res = w  / (swiper.slides.length - swiper.passedParams.slidesPerView + 1);
      }

      $(el).css({
        'margin-left': res + 'px',
      });

      $(el).find('.ui-slider-handle').css({
        'width': res + 'px',
        'margin-left': -res + 'px',
      });
    }
  }


  function initRangeSlider(el, max, step, swiper) {
    var range = $(el).slider({
      max: 1,
      min: 0,
      step: step,
      value: 0,
      animate: '500',
    });

    swiper.on('transitionStart', function() {
      range.slider('value', swiper.progress);
    })

    range.on('slide', function(e, ui) {
      swiper.slideTo((swiper.slides.length - swiper.passedParams.slidesPerView) * ui.value);
    });

    setProgressWidth($(el), step, swiper);

    $(window).resize(function() {
      setProgressWidth($(el), step, swiper);
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
      var slidesPerView = 0;
      var max;
      var range;
      var step;

      if (windowWidth > 1199) {
        slidesPerView = 4;
      } else if (windowWidth <= 1199 && windowWidth > 850) {
        slidesPerView = 3;
      } else if (windowWidth <= 850) {
        slidesPerView = 2;
      }

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
            step = 100 / max / 100;
            range = initRangeSlider($progress, max, step, $(this)[0]);
          }
        },
        breakpoints: {
          360: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          400: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          650: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          850: {
            slidesPerView: 2,
            spaceBetween: 55,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 45,
          },
          1350: {
            spaceBetween: 30,
            slidesPerView: 4,
          },
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
          step = 100 / max / 100;

          range = initRangeSlider($progress, max, step, $(this)[0]);
        }
      },
      breakpoints: {
        500: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        950: {
          slidesPerView: 2,
          spaceBetween: 80,
        },
        1350: {
          spaceBetween: 40,
        },
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
          if (windowWidth > 650) {
            $text[0].style.maxHeight = imgH + 'px';
          } else {
            $text[0].style.maxHeight = imgH * 2 + 'px';
          }

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
              if (windowWidth > 650) {
                $text[0].style.maxHeight = imgH + 'px';
              } else {
                $text[0].style.maxHeight = imgH * 2 + 'px';
              }

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

  function initScrollbar() {
    var $scroll = $('.scrollbar-inner');

    $scroll.each(function() {
      $(this).scrollbar();
    });
  }

  initScrollbar();

  (function initTabs() {
    var $tabs = $('.tabs');

    $tabs.each(function() {
      var $self = $(this);
      var $links = $self.find('.tabs__list a');

      $links.click(function(e) {
        e.preventDefault();

        var $link = $(this);
        var goal = $(this).attr('href');
        $('.tabs__list li.active').removeClass('active');
        $link.closest('li').addClass('active');

        $('.tabs__item.active').fadeOut(0, function() {
          $(this).removeClass('active');

          $(goal).fadeIn(0, function() {
            $(goal).addClass('active');
          });
        });
      });
    });
  })();
});