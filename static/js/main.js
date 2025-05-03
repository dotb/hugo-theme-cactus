/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

/**
 * Handler functions
 */
function cactiShowHidePreviousPost() {
  $('#i-prev').toggle();
}

function cactiShowHideNextPost() {
  $('#i-next').toggle();
}

function cactiShowHideTopPost() {
  $('#i-top').toggle();
}

function cactiShowHideSharePost() {
  $('#i-share').toggle();
}

function cactiShowHideSharePostClick() {
  $('#share').toggle();
  return false;
}

function cactiTopPostClick() {
  $('html, body').animate({ scrollTop: 0 }, 'fast');
}

/**
 * Attach event handlers
 */
function cactiAttachRolloverListener(domItem, rollOverFuction) {
  domItem.onmouseover = rollOverFuction;
  domItem.onmouseout = rollOverFuction;
  rollOverFuction();
}

function cactiAttachClickListener(domItem, clickFuction) {
  domItem.onclick = clickFunction;
}

document.addEventListener('DOMContentLoaded', function () {
  cactiAttachRolloverListener(document.getElementById('menu-icon-previous'), cactiShowHidePreviousPost);
  cactiAttachRolloverListener(document.getElementById('menu-icon-next'), cactiShowHideNextPost);
  cactiAttachRolloverListener(document.getElementById('menu-icon-top'), cactiShowHideTopPost);
  cactiAttachRolloverListener(document.getElementById('menu-icon-share'), cactiShowHideSharePost);
  cactiAttachClickListener(document.getElementById('menu-icon-top'), cactiTopPostClick);
});

$(document).ready(function() {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function() {
      if (menu.css("visibility") === "hidden") {
        menu.css("visibility", "visible");
        menuIcon.addClass("active");
      } else {
        menu.css("visibility", "hidden");
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function() {
        var topDistance = menu.offset().top;

        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 50) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 100) {
          nav.hide();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }
});
