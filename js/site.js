// DOM Ready
$(function() {
  // homepage
  $.home();

  // portfolio
  $.portfolio();

  // why nd
  $.about();

  // team
  $.team();

  // contact
  $.contact();

  // news
  $('.date-item .expand a').on('click', function() {
    var that = $(this);

    if (that.hasClass('collapse')) {
      that.parent().prev().stop(true, false).slideUp();
      that.html('More Details<span></span>');
    } else {
      that.parent().prev().stop(true, false).slideDown();
      that.html('Less Details<span></span>');
    }

    that.toggleClass('collapse');
    return false;
  });
});

// homepage
$.home = function() {
  var $window = $(window),
      img = $('img', '#home'),
      imgHeight = parseInt(img.attr('height'), 10),
      imgWidth = parseInt(img.attr('width'), 10);

  if (!img[0]) {
    return;
  }

  $window.on('resize', function() {
    var windowHeight = $window.height(),
        windowWidth = $window.width();

    if (imgHeight / imgWidth < windowHeight / windowWidth) {
      img.css({
        height: '100%',
        width: (imgWidth / imgHeight * windowHeight) + 'px'
      });
    } else {
      img.css({
        height: (imgHeight / imgWidth * windowWidth) + 'px',
        width: '100%'
      });
    }
  }).trigger('resize');
};

// portfolio
$.portfolio = function() {
  var $window = $(window),
      grid = $('#portfolio-grid'),
      container = $('#portfolio-items').hide().css('visibility', 'visible'),
      items = $('.portfolio-item', container).fadeOut(0),
      duration = 600;

  if (!grid[0]) {
    return;
  }

  grid.add(items).each(function() {
    var item = $(this),
        imgHeight = item.data('height'),
        imgWidth = item.data('width'),
        img = $('<img src="' + item.data('bg') + '" alt="" height="' + imgHeight + '" width="' + imgWidth + '" class="bg">').appendTo(item);

    $window.on('resize', function() {
      var windowHeight = $window.height(),
          windowWidth = $window.width();

      if (imgHeight / imgWidth < windowHeight / windowWidth) {
        img.css({
          height: '100%',
          width: (imgWidth / imgHeight * windowHeight) + 'px'
        });
      } else {
        img.css({
          height: (imgHeight / imgWidth * windowWidth) + 'px',
          width: '100%'
        });
      }
    }).trigger('resize');
  });

  $(window).on('resize', function() {
    container.height('auto').height($(document.body).height() + 'px');
  }).trigger('resize');

  grid.each(function() {
    var item = $(this);

    $window.on('resize', function() {
      item.height('auto').height($(document.body).height() + 'px');
    }).trigger('resize');
  }).find('a').on('click', function() {
    var link = $(this);

    container.show();
    grid.fadeOut(duration);
    var item = items.filter('[data-name="' + link.attr('href').replace('#', '') + '"]').fadeIn(duration).addClass('active');
    container.find('.prev, .next').delay(duration - duration / 4).fadeIn(duration / 2);

    container.find('.current').text(zeroPad(items.index(item) + 1, 2));

    return false;
  });

  items.each(function() {
    var $item = $(this);
    $(this).find('.photo').on('click', function() {
      if ($item.find('.photos').size() == 1) {
          var postid = $item.data('postid');
          $('.photos'+postid).fancybox({autoScale:true,centerOnScroll:true,cyclic:true});
          $('.photos'+postid).first().trigger('click');
      }
      return false;
    }).end().find('.video').on('click', function() {
      return false;
    });
  });

  $('<a href="#" class="prev">Previous</a>').on('click', function() {
    var item = items.filter('.active').removeClass('active'),
        prev = $(item.prev('.portfolio-item')[0] || items.filter(':last')[0]).addClass('active');

    item.fadeOut(duration);
    prev.fadeIn(duration);

    container.find('.current').text(zeroPad(items.index(prev) + 1, 2));

    return false;
  }).appendTo(container).fadeOut(0);

  $('<a href="#" class="next">Next</a>').on('click', function() {
    var item = items.filter('.active').removeClass('active'),
        next = $(item.next('.portfolio-item')[0] || items.get(0)).addClass('active');

    item.fadeOut(duration);
    next.fadeIn(duration);

    container.find('.current').text(zeroPad(items.index(next) + 1, 2));

    return false;
  }).appendTo(container).fadeOut(0);

  $('<div class="controls"><a href="#" class="grid">Grid</a> <div class="counter"><div class="current">01</div> <div class="total">/ ' + zeroPad(items.length, 2) + '</div></div></div>').appendTo(container);

  container.find('.grid').on('click', function() {
    items.filter('.active').fadeOut(duration).removeClass('active');
    grid.fadeIn(duration, function() {
      container.hide();
    });
    container.find('.prev, .next').fadeOut(duration / 2);

    return false;
  });
};

// contact
$.contact = function() {
  var vcards = $('.vcard'),
      maps = $('.map'),
      duration = 500;

  $('.vcard header a').on('click', function() {
    var vcard = $(this).parents('.vcard'),
        index = vcards.index(vcard);

    if (vcard.hasClass('active')) {
      return false;
    }

    vcards.removeClass('active');
    vcard.addClass('active');

    maps.filter('.active').stop(true, false).fadeOut(duration, function() {
      $(this).removeClass('active');
      maps.eq(index).stop(true, false).fadeIn(duration).addClass('active');
    });

    return false;
  });
};

$.team = function() {
  // set min height to prevent jumping footer and weird scrollbar effects
  var maxHeight = 0;
  $('article.team').each(function() {
    var item = $(this),
        isVisible = item.is(':visible');
    maxHeight = item.show().height() > maxHeight ? item.height() : maxHeight;

    if (!isVisible) {
      item.hide();
    }
  });
  $('#main').css('min-height', maxHeight + 'px');

  // click events
  $('ul.team-menu > li > a').on('click', function(evt) {
    evt.preventDefault();
    var member = $(this).attr('href'), li = $(this).parent();

    if (li.hasClass('active')) {
      return false;
    }

    $('ul.team-menu > li.active').removeClass('active');
    $('article.team:visible').fadeOut(400, function() {
        li.addClass('active');
        $(member).fadeIn();
    });
  });

  // see if there's hash and use it
  function parseURL() {
    var parts = window.location.hash.replace('#', '').split('/');

    return parts[1] ? parts[1] : false;
  }

  var chosenTeam = parseURL();
  if (chosenTeam) {
    $('ul.team-menu li[data-slug="' + chosenTeam + '"] a').trigger('click');
  }
};

$.about = function() {
  // set min height to prevent jumping footer and weird scrollbar effects
  var maxHeight = 0;
  $('.tabbed>div').each(function() {
    var item = $(this),
        isVisible = item.is(':visible');

    maxHeight = item.show().height() > maxHeight ? item.height() : maxHeight;

    if (!isVisible) {
      item.hide();
    }
  });
  $('.tabbed-content').css('min-height', maxHeight + 'px');

  // click events
  $('.tabbed > ul > li > a').on('click', function(evt) {
    evt.preventDefault();
    var tab = $(this).attr('href'), li = $(this).parent();

    $('.tabbed > ul > li.active').removeClass('active');
    li.addClass('active');
    $('.tabbed .tabbed-content div.active').fadeOut(400, function() {
        $(tab).fadeIn(400, function() {
          $(tab).addClass('active');
        });
        $('.tabbed .tabbed-content div.active').removeClass('active');
    });
  });
};

// helper

function zeroPad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}