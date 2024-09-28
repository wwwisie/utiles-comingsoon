/* --- Function Index --- */
var site = {
  // 1st function to fire
  ready: ready,
  // 2nd function to fire
  load: load,
  scroll: scroll,
  resize: resize,
  responsive: function getResponsive() {
    var windowWidth = window.innerWidth;
    var size;
    if (windowWidth > 768) {
      size = "lg"
    }
    else if (windowWidth <= 768 && windowWidth > 426) {
      size = "md"
    }
    else if (windowWidth <= 426) {
      size = "sm"
    }

    return size
  }
}

function ready() {
  // REMOVE THIS WHEN CHANGED TO RUBY 
  $("header").load("./partials/_header.html");
  $("footer").load("./partials/_footer.html");
  $("#svg").load("./partials/_svg.html");
  $("body").append($("<div>").load("./modals/_modal-cart.html"));


  scroll();
}

$(document).ready(function () {
  site.ready();
});

function load() {

  $('.loader-component').delay(600).fadeOut('slow');
  $('.loader-image').fadeOut(350);
  $('main').css({
    opacity: 1
  });

  function attemptPlay() {
    console.log('Attempting to play audio...');
    var audio = document.getElementById('backgroundAudio');
    if (!audio) {
      console.error('Audio element not found!');
      return;
    }
    audio.volume = 1; // Set a low volume
    console.log('Audio volume set to:', audio.volume);
    
    // Mute the audio first
    audio.muted = true;
    
    var playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log('Muted audio playback started successfully');
        // Unmute after a short delay
        setTimeout(() => {
          audio.muted = false;
          console.log('Audio unmuted');
        }, 1000);
      }).catch(error => {
        console.warn('Auto-play was prevented:', error);
        console.log('Adding interaction event listeners to document');
        ['click', 'touchstart', 'keydown'].forEach(event => {
          document.addEventListener(event, function() {
            console.log(`Document received ${event}, attempting to play audio`);
            audio.muted = false;
            audio.play().then(() => {
              console.log('Audio playback started after user interaction');
            }).catch(e => {
              console.error('Failed to play audio after user interaction:', e);
            });
          }, { once: true });
        });
      });
    }
  }

  // Try to play immediately
  attemptPlay();

  // Also try to play when the window gains focus
  window.addEventListener('focus', function() {
    console.log('Window gained focus, attempting to play audio');
    attemptPlay();
  });

  // And when the visibility changes
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      console.log('Page became visible, attempting to play audio');
      attemptPlay();
    } else {
      console.log('Page became hidden');
    }
  });
}

$(window).on('load', function () {
  site.load();
});


function resize() {
  var r = site.responsive()
}

$(window).on('resize', function () {
  site.resize();
});

// VALIDATE FORMS
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

const Util = {
  getSelectorFromElement(element) {
    var selector = element.getAttribute('data-target')
    if (!selector || selector === '#') {
      selector = element.getAttribute('href') || ''
    }

    try {
      return document.querySelector(selector) ? selector : null
    } catch (err) {
      return null
    }
  },
  getIdFromDropdown(element) {
    var selector = element.parentElement.getAttribute("data-id")

    try {
      return document.getElementById(selector) ? document.getElementById(selector) : null
    } catch (err) {
      return null
    }
  }
}

// Toggle Classes for [data-toggle=] HTML tags.
/* PARAMS: 
  class to toggle: data-toggle="class"
  Target to toggle above class: data-target="header, main"
*/
$(function () {
  $(document).on('click', '[data-toggle="show"]', function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A' && $(this).data("prevent") != false) {
      event.preventDefault()
    }

    const $trigger = $(this)
    const selector = Util.getSelectorFromElement(this)
    const selectors = [].slice.call(document.querySelectorAll(selector))
    $(selectors).each(function () {
      const $target = $(this)
      const $data = $trigger.data("toggle")
      $target.toggleClass($data)
      const $focus = $trigger.data("focus")
      if ($focus != "") {
        console.log("focus", $focus)
        $($focus).focus()
      }
    })
  })

  $(document).on('click', '[data-link="offset"]', function (event) {
    const $offset = $(this).data("link-offset");
    const $trigger = $(this).attr("href");
    $('html, body').stop().animate({ scrollTop: $($trigger).offset().top - $offset });
  })
})


$(document).on("click", ".input-number-increment", function (e) {
  var quantity = $(this).parent().find("input").val();
  $(this).parent().find("input").val(parseInt(quantity) + 1).change();
});

$(document).on("click", ".input-number-decrement", function (e) {
  var quantity = $(this).parent().find("input").val();
  if (quantity <= 1)
      $(this).parent().find("input").val(1).change();
  else
      $(this).parent().find("input").val(parseInt(quantity) - 1).change();
});