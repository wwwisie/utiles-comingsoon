/*
 * Anagrama 2020
 * https://www.anagrama.com/
 * Version (2.0.0)
 */

/*
 * requires: 
 * Waypoints    - 4.0.1   - http://imakewebthings.com/waypoints/
 * Velocity     - 1.5.0   - http://velocityjs.org/
 * Velocity UI  - 5.0.4   - http://velocityjs.org/
 */

/*
 * <div class="fade-on-scroll">__<div>
 * ---
 * <div class="animate-on-scroll">__<div>
 * ---
 * <div class="stagger-on-scroll">
 *  <div class="stagger-child"></div>
 *  <div class="stagger-child"></div>
 * <div>
 */

NodeList.prototype.forEach = Array.prototype.forEach;

$(document).ready(function () {
  setTimeout(function () {
    setAnimationWaypoints()
  }, 1000);
});

function setAnimationWaypoints() {
  if (document.querySelector('.animate-on-scroll') || document.querySelector('.fade-on-scroll')) {
    var animateOnScroll = document.querySelectorAll('.animate-on-scroll, .fade-on-scroll');
    animateOnScroll.forEach(function (value, index) {
      var waypoint = new Waypoint({
        element: value,
        handler: function (direction) {
          if (direction == 'down') {
            var thisElement = this.element;
            thisElement.classList.add('animate');
            setTimeout(function () {
              thisElement.classList.remove('animate-on-scroll', 'fade-on-scroll', 'animate');
              waypoint.destroy()
            }, 3000);
          }
        },
        offset: '75%'
      })
    });
  }
  if (document.querySelector('.stagger-on-scroll')) {
    var staggerOnScroll = document.querySelectorAll('.stagger-on-scroll');
    staggerOnScroll.forEach(function (value, index) {
      var waypoint = new Waypoint({
        element: value,
        handler: function (direction) {
          if (direction == 'down') {
            var thisElement = this.element;
            thisElement.classList.add('animate');
            var children = $(thisElement).find(".stagger-child")
            $(children).velocity("transition.slideUpIn", {
              stagger: 450,
              duration: 800,
              complete: function () {
                waypoint.destroy()
                $(this).css({ 'transform': '' });
              }
            })
          }
        },
        offset: '75%'
      })
    });
  }
  if (document.querySelector('.stagger-fast-on-scroll')) {
    var staggerOnScroll = document.querySelectorAll('.stagger-fast-on-scroll');
    staggerOnScroll.forEach(function (value, index) {
      var waypoint = new Waypoint({
        element: value,
        handler: function (direction) {
          if (direction == 'down') {
            var thisElement = this.element;
            thisElement.classList.add('animate');
            var children = $(thisElement).find(".stagger-child")
            $(children).velocity("transition.slideUpIn", {
              stagger: 250,
              duration: 800,
              complete: function () {
                waypoint.destroy()
                $(this).css({ 'transform': '' });
              }
            })
          }
        },
        offset: '75%'
      })
    });
  }
  if (document.querySelector('.blast-on-scroll')) {
    var blastOnScroll = document.querySelectorAll('.blast-on-scroll');
    blastOnScroll.forEach(function (value, index) {
      $(value).blast()
      var waypoint = new Waypoint({
        element: value,
        handler: function (direction) {
          if (direction == 'down') {
            var thisElement = this.element;
            thisElement.classList.add('animate');
            var children = $(thisElement).find(".blast")
            $(children).velocity("transition.fadeIn", {
              stagger: 150,
            })
          }
        },
        offset: '75%'
      })
    });
  }
}
