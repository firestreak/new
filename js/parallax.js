$(document).ready(function(){
   $window = $(window);
   
   function parallax($scroll) {
      var windowScroll = $window.scrollTop();
      var windowHeight = $window.height();
      var objectPos = $scroll.offset().top;
      var objectHeight = $scroll.height();
      
      var scrolled = (windowScroll - objectPos + windowHeight) / (objectHeight + windowHeight);
      scrolled = Math.max(Math.min(scrolled, 1), 0);
      
      var coords = '35% ' + (1 - scrolled) * 100 + '%';

      $scroll.css({ backgroundPosition: coords });   
    }
 
   $('section[data-type="background"]').each(function(){
     var $scroll = $(this);
                 
      //do it on scroll    
      $(window).scroll(function() { parallax($scroll); });
      
      //do it on load
      parallax($scroll);
   }); 
});

document.createElement("section");