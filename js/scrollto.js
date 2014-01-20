$(document).ready(function(){
  $("ul li a[href^='#'], a.navbar-brand").on('click', function(e) {
    // prevent default anchor click behavior
    e.preventDefault();
    
    // store hash
    var hash = this.hash;
    
    // animate
    $('html, body').animate({ scrollTop: $(this.hash).offset().top }, 300, 'swing', function(){
       window.location.hash = hash;
    });
  });
});

document.createElement("section");