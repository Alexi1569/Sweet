;
jQuery(document).ready(function ($) {
  var windowWidth = $(window).width();

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  var scrollWidth = getScrollbarWidth();

  $(window).resize(function() {
    scrollWidth = getScrollbarWidth();
  });

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

      if (res !==  iconPos.left) {
        total = res - iconPos.left - $('.header__search-icon').width();
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
          var $active = $slider.find('.swiper-slide.swiper-slide-active');
          var tl = new TimelineLite();

          tl.fromTo($active, 0, {autoAlpha: 0}, {autoAlpha: 1})
            .fromTo($active.find('.banner__bg'), 1.3, {webkitClipPath:'circle(0% at 0% 50%)'}, {webkitClipPath:'circle(150% at 0% 50%)', ease: Power1.easeIn}, 0)
            .fromTo($active.find('.banner__title'), .8, {x: -30, autoAlpha: 0}, {x: 0, autoAlpha: 1}, '-=0.3')
            .fromTo($active.find('.banner__descr'), .8, {x: -30, autoAlpha: 0}, {x: 0, autoAlpha: 1, onComplete: function() {
                $wrap.removeClass('active');
              }}, '-=0.3');
        }
      }
    });

    mySwiper.on('slideChangeTransitionStart', function() {
      var $active = $slider.find('.swiper-slide.swiper-slide-active');
      var $prev = $(mySwiper.slides[mySwiper.previousIndex]);
      var tl = new TimelineLite();

      tl.fromTo($prev.find('.banner__title'), .8, {x: 0, autoAlpha: 1}, {x: -30, autoAlpha: 0, onStart: function() {
          $wrap.addClass('active');
        }})
        .fromTo($prev.find('.banner__descr'), .8, {x: 0, autoAlpha: 1}, {x: -30, autoAlpha: 0}, '-=.3')
        .fromTo($prev.find('.banner__bg'), 1.3, {webkitClipPath:'circle(150% at 0% 50%)'}, {webkitClipPath:'circle(0% at 0% 50%)', ease: Power1.easeIn}, '-=1')
        .add('start')
        .fromTo($prev, 2, {autoAlpha: 1}, {autoAlpha: 0})
        .fromTo($active, 0, {autoAlpha: 0}, {autoAlpha: 1}, 'start')
        .fromTo($active.find('.banner__bg'), 1.3, {webkitClipPath:'circle(0% at 0% 50%)'}, {webkitClipPath:'circle(150% at 0% 50%)', ease: Power1.easeIn}, 'start')
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
              $menu.css('padding-right', scrollWidth + 'px');
              $('body').addClass('no-scroll');
            }}, '-=.5');
      } else {
        tl.fromTo($bottom, .8, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: 50, onStart: function() {
            $toggler.addClass('disabled');
            $menu.css('padding-right', '0px');
            $('body').removeClass('no-scroll');
            window.scrollTo(0, topOffset);
          }})
          .staggerFromTo(liItems, .8, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: 20}, -0.15, '-=.5')
          .fromTo($bg, 1, {autoAlpha: 1, webkitClipPath: 'circle(150% at 0 0)'}, {autoAlpha: 0, webkitClipPath: 'circle(' + beginPath[0] + ' at ' + beginPath[1] + ' ' + beginPath[2] + ')', onComplete: function() {
              $toggler.removeClass('disabled');
              $('.header').removeClass('menu-opened');
            }}, '-=.35')
          .to($menu, 0, {autoAlpha: 0});
      }

    });

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

        $field.on('select2:close', function (e) {
          $self.removeClass('focused');
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
          var $prevParent = $(items[idx - 1]).find('.line-parent');
          var $prevP = $prevParent.find('p');
          var prevRight = $prevParent.outerWidth() - ($prevP.position().left + $prevP.outerWidth());

          var lines = $wrap.find('.line-item');

          if (lines.length > 1) {
            $wrap.find('.line-item:first-of-type').css({
              'width': prevRight + left - TITLE_GUTTER * 2 + COL_GUTTER * 2 + 'px',
              'left': - (prevRight - TITLE_GUTTER + COL_GUTTER * 2) + 'px',
            });

            $wrap.find('.line-item:last-of-type').css({
              'width': left - TITLE_GUTTER + 'px',
              'left': 'auto',
              'right': '0',
            });
          } else {
            $wrap.find('.line-item').css({
              'width': prevRight + left - TITLE_GUTTER * 2 + COL_GUTTER * 2 + 'px',
              'left': - (prevRight - TITLE_GUTTER + COL_GUTTER * 2) + 'px',
            });
          }

        }
        else {
          var $prevParent = $(items[idx - 1]).find('.line-parent');
          var $prevP = $prevParent.find('p');
          var prevRight = $prevParent.outerWidth() - ($prevP.position().left + $prevP.outerWidth());

          $wrap.find('.line-item').css({
            'width': prevRight + left - TITLE_GUTTER * 2 + COL_GUTTER * 2 + 'px',
            'left': - (prevRight - TITLE_GUTTER + COL_GUTTER * 2) + 'px',
          });
        }

        $wrap.find('.line-item').addClass('visible');
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
      } else if (type === 'delivery') {
        if (windowWidth > 1650) {
          COL_GUTTER = 15;
          TITLE_GUTTER = 40;
        } else if (windowWidth <= 1650 && windowWidth > 991) {
          COL_GUTTER = 15;
          TITLE_GUTTER = 20;
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
        spaceBetween: 58,
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
            spaceBetween: 4,
          },
          650: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          850: {
            slidesPerView: 2,
            spaceBetween: 54,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 44,
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

  (function initPartnersSlider() {
    var $self = $('#partners-slider');
    var $slider = $self.find('.partners__slider');
    var $prev = $slider.find('.swiper-prev');
    var $next = $slider.find('.swiper-next');
    var $progress = $self.find('.slider__progress-range');
    var slidesPerView;
    var max;
    var range;

    if (windowWidth > 1650) {
      slidesPerView = 8;
    } else if (windowWidth <= 1650 && windowWidth > 1199) {
      slidesPerView = 6;
    } else if (windowWidth <= 1199 && windowWidth > 991) {
      slidesPerView = 5;
    } else if (windowWidth <= 991 && windowWidth > 600) {
      slidesPerView = 4;
    } else if (windowWidth <= 600 && windowWidth > 380) {
      slidesPerView = 3;
    } else if (windowWidth <= 380) {
      slidesPerView = 2;
    }

    var mySwiper = new Swiper($slider, {
      speed: 900,
      spaceBetween: 55,
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
        380: {
          spaceBetween: 40,
          slidesPerView: 2
        },
        450: {
          spaceBetween: 40,
          slidesPerView: 3
        },
        600: {
          slidesPerView: 3
        },
        991: {
          slidesPerView: 4
        },
        1199: {
          slidesPerView: 5
        },
        1650: {
          slidesPerView: 6
        },
      }
    });
  })();

  (function initFaqPage() {
    var $questions = $('.pfaq__item-question');

    $questions.each(function() {
      $(this).click(function() {
        var target = $(this).attr('data-faq');
        var $self = $(this);
        var isActive = $self.closest('.pfaq__item').hasClass('active');

        if (windowWidth > 850) {
          if ($('.pfaq__answer.faq-pc.active').length) {
            if (isActive) {
              $('.pfaq__answer.faq-pc.active').fadeOut(100, function() {
                $('.pfaq__answer.faq-pc.active').removeClass('active');
                $('.pfaq__item.active').removeClass('active');
              })
            } else {
              $('.pfaq__answer.faq-pc.active').fadeOut(100, function() {
                $('.pfaq__answer.faq-pc.active').removeClass('active');
                $('.pfaq__item.active').removeClass('active');
                $self.closest('.pfaq__item').addClass('active');
                $('.' + target + '.faq-pc').fadeIn(200);
                $('.' + target + '.faq-pc').addClass('active');
              })
            }
          } else {
            $self.closest('.pfaq__item').addClass('active');
            $('.' + target + '.faq-pc').fadeIn(200);
            $('.' + target + '.faq-pc').addClass('active');
          }
        } else {
          if (isActive) {
            $self.closest('.pfaq__item').removeClass('active');
            $('.' + target + '.faq-mobile').slideUp(450);
            $('.' + target + '.faq-mobile').removeClass('active');
          } else {
            $self.closest('.pfaq__item').addClass('active');
            $('.' + target + '.faq-mobile').slideDown(600);
            $('.' + target + '.faq-mobile').addClass('active');
          }
        }
      });
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
        var pLeft = parseInt($text.find('p:last-child').css('margin-left'), 10);

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
                'left': pLeft + 'px'
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
    var $scrollDefault = $('.scrollbar-inner');

    $scrollDefault.each(function() {
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

  (function initAuthModal() {
    var $targets = $('.header__auth-target');
    var $wrap = $('.header__auth');
    var $close = $wrap.find('.header__auth-close');
    var $bg = $wrap.find('.header__auth-bg');
    var $toggler = $('.auth-toggler');
    var topOffset = 0;
    var wrapPadding = parseFloat($wrap.css('padding-right'));
    var closeRight = parseFloat($close.css('right'));

    $(window).resize(function() {
      wrapPadding = parseFloat($wrap.css('padding-right'));
      closeRight = parseFloat($close.css('right'));
    });

    function closeAuth(tl, self, parts) {
      tl.fromTo($close, .5, {autoAlpha: 1, scaleX: 1, scaleY: 1}, {autoAlpha: 0, scaleX: .5, scaleY: .5, onStart: function() {
          $('body').addClass('disable-auth-opening');
          $('.header').removeClass('auth-finished');
        }, onComplete: function() {
          $wrap.css('padding-right', wrapPadding + 'px');
          $close.css('right', closeRight + 'px');

          if ($(self).hasClass('sidebar__link') || $(self).hasClass('header__auth-close')) {
            $('body').removeClass('no-scroll');
          }
          window.scrollTo(0, topOffset);
        }})
        .staggerFromTo(parts, .7, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: 20}, 0.15, '-=.2')
        .fromTo($bg, 1, {autoAlpha: 1, webkitClipPath: 'circle(150% at 0% 0%)'}, {autoAlpha: 0, webkitClipPath: 'circle(' + beginPath[0] + ' at ' + beginPath[1] + ' ' + beginPath[2] + ')'})
        .to($wrap, 0, {autoAlpha: 0, onComplete: function() {
            $('.header').removeClass('auth-opened');
            $('body').removeClass('disable-auth-opening');
          }});
    }

    var beginPath = ['0.5%', '0%', '100%'];

    $('.auth-toggler, .header__auth-close').click(function(e) {
      e.preventDefault();
      var $self = $(this);

      var tl = new TimelineLite();
      var $parts = $wrap.find('.header__auth-item.active > div');

      if (!$('body').hasClass('disable-auth-opening')) {
        if ($('.header').hasClass('auth-opened')) {
          closeAuth(tl, $self, $parts);
        } else {
          tl.to($wrap, 0, {autoAlpha: 1})
            .fromTo($bg, 1, {autoAlpha: 0, webkitClipPath: 'circle(' + beginPath[0] + ' at ' + beginPath[1] + ' ' + beginPath[2] + ')'}, {autoAlpha: 1, webkitClipPath: 'circle(150% at 0% 0%)', onStart: function() {
                $('.header').addClass('auth-opened');
                $('body').addClass('disable-auth-opening');
              }}, 0)
            .staggerFromTo($parts, .7, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0}, 0.15, '-=.01')
            .fromTo($close, .5, {autoAlpha: 0, scaleX: .5, scaleY: .5}, {autoAlpha: 1, scaleX: 1, scaleY: 1, onComplete: function() {
              if ($(self).hasClass('sidebar__link') || $(self).hasClass('header__auth-close')) {
                topOffset = window.scrollY;
              }
              $wrap.css('padding-right', (wrapPadding + scrollWidth) + 'px');
              $close.css('right', (closeRight + scrollWidth) + 'px');
              $('body').addClass('no-scroll');
              $('body').removeClass('disable-auth-opening');
              $('.header').addClass('auth-finished');
            }}, '-=.3');
        }
      }
    });

    $targets.each(function() {
      var $self = $(this);

      $self.click(function(e) {
        e.preventDefault();

        var target = '#' + $self.attr('data-target');

        $('.header__auth-item.active').fadeOut(200, function() {
          $('.header__auth-item.active').removeClass('active');

          $(target).css('display', 'flex');
          $(target).hide();
          $(target).fadeIn(140, function() {
            $(target).addClass('active');
          });
        });

      });
    });
  })();

  function initDropDowns() {
    var $dropdowns = $('.dropdown');

    $dropdowns.each(function() {
      var $self = $(this);
      var $top = $self.find('.dropdown__top');
      var $arrow = $self.find('.dropdown__arrow');

      if ($self.hasClass('pcatalog__price')) {
        var $slider = $self.find('.dropdown__price-slider');

        $slider.slider({
          range: true,
          min: 0,
          max: 500,
          values: [50, 500],
        });
      }

      if (($self.hasClass('pcatalog__dropdown')) && (windowWidth < 767)) {
        $arrow.click(function() {
          if ($self.hasClass('hovered')) {
            $self.find('.dropdown__list').slideUp(450);
          } else {
            $self.find('.dropdown__list').slideDown(450);
          }
        });
      }

      if (!$('body').hasClass('touch-device')) {
        $self.hover(function() {
          $self.addClass('hovered');
        }, function() {
          $self.removeClass('hovered');
        });
      } else {
        $arrow.click(function() {
          $self.toggleClass('hovered');
        });
      }
    });
  };

  initDropDowns();

  function initFilter() {
    var $open = $('.pcatalog__filter-open');
    var $close = $('.pcatalog__filter-close');
    var $filter = $('.pcatalog__filter');
    var $top = $('.pcatalog__top');
    var $bg = $top.find('.pcatalog__top-bg');
    var $left = $top.find('.pcatalog__top-left');
    var $right = $top.find('.pcatalog__top-right');
    var topOffset;

    $toggler = $('.pcatalog__filter-open, .pcatalog__filter-close');

    var tl = new TimelineLite();
    var beginPath = ['0.5%', '0%', '25%'];

    $toggler.click(function() {
      if ($filter.hasClass('active')) {
        tl.fromTo($close, .3, {autoAlpha: 1, scaleX: 1, scaleY: 1}, {autoAlpha: 0, scaleX: .5, scaleY: .5, onStart: function() {
            $toggler.addClass('disabled');
            $('body').removeClass('no-scroll');
            window.scrollTo(0, topOffset);
          }})
          .fromTo($right, .6, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: -12})
          .fromTo($left, .6, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: -12}, '-=.3')
          .fromTo($bg, .8, {authAlpha: 1, webkitClipPath: 'circle(150% at 0 50%)'}, {authAlpha: 0, webkitClipPath: 'circle(' + beginPath[0] + ' at ' + beginPath[1] + ' ' + beginPath[2] + ')'}, '-=.3')
          .fromTo($top, 0, {authAlpha: 1}, {autoAlpha: 0, onComplete: function() {
              $toggler.removeClass('disabled');
              $filter.removeClass('active');
          }});
      } else {
        tl.fromTo($top, 0, {authAlpha: 0}, {autoAlpha: 1})
          .fromTo($bg, 1, {authAlpha: 0, webkitClipPath: 'circle(' + beginPath[0] + ' at ' + beginPath[1] + ' ' + beginPath[2] + ')'}, {authAlpha: 1, webkitClipPath: 'circle(150% at 0 50%)', onStart: function() {
              $toggler.addClass('disabled');
              topOffset = window.scrollY;
            }})
          .fromTo($right, .8, {autoAlpha: 0, y: 12}, {autoAlpha: 1, y: 0})
          .fromTo($left, .8, {autoAlpha: 0, y: 12}, {autoAlpha: 1, y: 0}, '-=.4')
          .fromTo($close, .5, {autoAlpha: 0, scaleX: .5, scaleY: .5}, {autoAlpha: 1, scaleX: 1, scaleY: 1, onComplete: function() {
              $filter.addClass('active');
              $('body').addClass('no-scroll');
              $toggler.removeClass('disabled');
            }}, '-=.25');
      }
    });

  };

  initFilter();

  function initProductPage() {
    var $gallery = $('#product-gallery');
    var $previews = $('#product-previews');
    var $wrap = $('.pproduct__gallery');

    function setSlidesHeight(slider, h) {
      $(slider).find('.swiper-slide').each(function() {
        $(this).css('height', h + 'px');
      });
    }

    $('[data-fancybox="product-images"]').fancybox({
      infobar: false,
      buttons: [
        "zoom",
        "close",
      ],
      protect: true,
      transitionEffect: 'slide',
      touch: {
        vertical: false,
        momentum: true
      },
    });

    var previewsSwiper = new Swiper($previews, {
      spaceBetween: 18,
      slidesPerView: 9,
      speed: 250,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      watchOverflow: true,
      initialSlide: 4,
      on: {
        init: function() {
          var h = $($(this.$el).find('.swiper-slide')[0]).width();
          setSlidesHeight(this.$el, h);

          $(window).resize(function() {
            h = $($(this.$el).find('.swiper-slide')[0]).width();
            setSlidesHeight(this.$el, h);
          })
        }
      },
      breakpoints: {
        450: {
          slidesPerView: 5,
        },
        1199: {
          slidesPerView: 7,
        },
      }
    });

    var gallerySwiper = new Swiper($gallery, {
      spaceBetween: 0,
      speed: 250,
      initialSlide: 4,
      watchOverflow: true,
      virtualTranslate: true,
      on: {
        init: function() {
          var imgH = $(this.$el).find('.pproduct__gallery-item img').outerHeight();
          $(this.$el).css('height', imgH + 'px');

          if ($(this.$el).find('.swiper-slide:not(.swiper-slide-duplicate)').length === 1) {
            $('.pproduct__gallery').addClass('no-translate');
          }

          $(this.$el).addClass('visible');

          $(window).resize(function() {
            imgH = $(this.$el).find('.pproduct__gallery-item img').outerHeight();
            $(this.$el).css('height', imgH + 'px');
          });

          var tl = new TimelineLite();

          var $active = $(this.$el).find('.swiper-slide-active');
          var $img = $active.find('img');
          var $labels = $active.find('.label');

          tl.fromTo($active, 0, {autoAlpha: 0}, {autoAlpha: 1})
            .fromTo($img, 1, {webkitClipPath:'circle(0.5% at 0% 0%)'}, {webkitClipPath:'circle(150% at 0 50%)', ease: Power1.easeIn, onStart: function() {
            $wrap.addClass('disabled');
          }}, 0)
            .staggerFromTo($labels, .9, {y: 10, autoAlpha: 0}, {y: 0, autoAlpha: 1}, .1, '-=.25', function() {
            $wrap.removeClass('disabled');
          });

        }
      },
      thumbs: {
        swiper: previewsSwiper
      },
      navigation: {
        prevEl: $gallery.find('.swiper-next'),
        nextEl: $gallery.find('.swiper-prev'),
      }
    });

    gallerySwiper.on('slideChangeTransitionStart', function() {
      var tl = new TimelineLite();

      var $active = $(this.$el).find('.swiper-slide-active');
      var $imgActive = $active.find('img');
      var $labelsActive = $active.find('.label');

      var $prev = $(gallerySwiper.slides[gallerySwiper.previousIndex]);
      var $imgPrev = $prev.find('img');
      var $labelsPrev = $prev.find('.label');

      tl.staggerFromTo($labelsPrev, .8, {y: 0, autoAlpha: 1}, {y: -10, autoAlpha: 0, onStart: function() {
        $wrap.addClass('disabled');
      }}, .1)
        .fromTo($imgPrev, 1, {webkitClipPath:'circle(150% at 0% 50%)'}, {webkitClipPath:'circle(0.5% at 0% 0%)', ease: Power1.easeIn}, '-=.6')
        .fromTo($prev, 0, {autoAlpha: 1}, {autoAlpha: 0})
        .fromTo($active, 0, {autoAlpha: 0}, {autoAlpha: 1})
        .fromTo($imgActive, 1, {webkitClipPath:'circle(0.5% at 0% 0%)'}, {webkitClipPath:'circle(150% at 0 50%)', ease: Power1.easeIn})
        .staggerFromTo($labelsActive, .5, {y: -10, autoAlpha: 0}, {y: 0, autoAlpha: 1}, .1, '-=.1',  function() {
      $wrap.removeClass('disabled');
    })
    });
  }

  initProductPage();

  function initOptionsModal() {
    var $modals = $('.options-modal');

    $modals.each(function() {
      var $self = $(this);
      var $links = $self.find('.options-modal__nav a');
      var $btn = $self.find('.options-modal__btn');

      $btn.click(function() {
        var goal = '#' + $btn.attr('data-option');
        var $active = $self.find('.options-modal__nav li.active');
        var val = $active.attr('data-val');

        $(goal).text(val);
        $.fancybox.close();
      });

      $links.click(function(e) {
        e.preventDefault();
        var $link = $(this);

        if (!$link.closest('li').hasClass('active')) {
          var goal = $(this).attr('href');
          $self.find('.options-modal__nav li.active').removeClass('active');
          $link.closest('li').addClass('active');

          $self.find('.options-modal__item.active').fadeOut(250, function() {
            $self.find('.options-modal__item.active').removeClass('active');

            $(goal).fadeIn(160, function() {
              $(goal).addClass('active');
            });
          });
        }
      });
    });
  }

  initOptionsModal();

  function initAmount() {
    $('.amount').each(function() {
      var $minus = $(this).find('.amount__minus');
      var $plus = $(this).find('.amount__plus');
      var $input = $(this).find('input[type="number"]');
      var max = parseInt($input.attr('max'), 10);
      var min = parseInt($input.attr('min'), 10);

      $plus.click(function() {
        var val = parseInt($input.val(), 10);
        $input.val(++val);

        if (val !== min) {
          $minus.removeClass('disabled');
        }

        if (val === max) {
          $plus.addClass('disabled');
        } else {
          $plus.removeClass('disabled');
        }
      });

      $minus.click(function() {
        var val = parseInt($input.val(), 10);
        $input.val(--val);

        if (val !== max) {
          $plus.removeClass('disabled');
        }

        if (val === min) {
          $minus.addClass('disabled');
        } else {
          $minus.removeClass('disabled');
        }
      });
    });
  };

  initAmount();

  function initCartPage() {
    var $promocodeToggler = $('#promocode-toggler');
    var $promocodeWrap =  $('.pcart__benefits');
    var $promocodeInput =  $promocodeWrap.find('.form__group--promocode');
    var $calendar = $('.form__group--calendar');
    var $deliveryKey = $('.form__group--delivery-key');
    var $deliveryVal = $('.pcart__checkout-delivery');

    $deliveryKey.find('select').on('change', function(e) {
      if (e.target.value === 'self') {
        $deliveryVal.removeClass('hide');
      } else {
        $deliveryVal.addClass('hide');
      }
    });

    $calendar.each(function() {
      var $self = $(this);
      var $target = $self.find('input');

      $('body').delegate('#ui-datepicker-div', 'click', function(e) {
        $target.focus();
      });

      $target.datepicker({
        dateFormat: 'dd.mm.yy',
        beforeShow: function(textbox, instance){
          $self.append($('#ui-datepicker-div'));
          $self.addClass('opened');
        },
        onSelect: function(dateText, instance) {
          if (!(instance.currentDay === 0 && instance.currentMonth === 0 && instance.currentYear === 0)) {
            $self.addClass('filled')
          }
        },
        onClose: function(dateText, instance) {
          $self.removeClass('opened');
        },
        prevText: '<svg width="8" height="8"><use xlink:href="#arrow-icon"/></svg>',
        nextText: '<svg width="8" height="8"><use xlink:href="#arrow-icon"/></svg>',
      });
    });

    $promocodeToggler.click(function(e) {
      e.preventDefault();
      $promocodeWrap.toggleClass('active');
    });
  }

  initCartPage();

  function initAccountNav(list) {
    if (windowWidth < 991) {
      $(list).addClass('scrollbar-inner');
      $(list).scrollbar();
    } else {
      $(list).removeClass('scrollbar-inner');
      $(list).scrollbar('destroy');
    }
  }

  (function initAccountPage() {
    var $nav = $('#account-nav');
    var $list = $nav.find('ul');
    var $orders = $('.paccount__order:not(.paccount__order--head)');

    $orders.each(function() {
      var $self = $(this);
      var $top = $self.find('.paccount__order-top');
      var $info = $self.find('.paccount__order-bottom');

      $top.click(function() {
        $self.toggleClass('opened');

        if ($self.hasClass('opened')) {
          $info.slideDown(500);
        } else {
          $info.slideUp(350);
        }

      });
    });

    initAccountNav($list);

    $(window).resize(function() {
      initAccountNav($list);
    });
  })();
});