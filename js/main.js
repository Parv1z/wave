$(document).ready(function($) {
	"use strict";
	
	$('#mobile-menu').hcOffcanvasNav({
		disableAt: 992,
		customToggle: $('#mobile-menu-btn'),
		pushContent: $('#app'),
		navTitle: 'Главное меню',
		levelTitles: true,
		levelTitleAsBack: true
	});
	
	$('#scroll-to-top').on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, 800);
        return false;
    });
	$(window).on( 'scroll', function() {
	  if ($(window).scrollTop() > 300) {
	    $("#scroll-to-top").fadeIn(500);
	  } else {
	    $("#scroll-to-top").fadeOut(500);
	  }
	});
	$(window).on( 'scroll', function(){
	  if ($(window).scrollTop() >= 100) {
	    $('.header').addClass('sticky-header');
	   }
	   else {
	    $('.header').removeClass('sticky-header');
	   }
	});
	
});

var mainSlider = $('#main-slider-wrapper').slick({
	autoplaySpeed : 4000,
	arrows : false,
	dots : true,
	appendDots : '.main-slider-dots',
	fade : true
}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
	var animatingElements = $('div.main-slider-item[data-slick-index="' + nextSlide + '"]').find('.animate__animated.animate__fadeInUp');
	animatingElements.each(function() {
		var anim_class = $(this).attr('class');console.log(anim_class);
		$(this).removeClass(anim_class).addClass(anim_class);
	});
});

var helpers = {
	addZeros: function (n) {
		return (n < 10) ? '0' + n : '' + n;
	}
};

function sliderAboutInit() {
  var $slider = $('.wv_about_slider_box');
  $slider.each(function() {
    var $sliderParent = $(this).parent();
    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      fade: true,
      infinite: true,
      prevArrow: $('.wv_about_prev'),
      nextArrow: $('.wv_about_next'),
    });

    if ($(this).find('.wv_about_slider_item').length > 1) {
      $(this).siblings('.wv_about_numbers').show();
    }

    $(this).on('afterChange', function(event, slick, currentSlide){
      $sliderParent.find('.wv_about_numbers .active').html(helpers.addZeros(currentSlide + 1));
    });

    var sliderItemsNum = $(this).find('.slick-slide').not('.slick-cloned').length;
    $sliderParent.find('.wv_about_numbers .total').html(helpers.addZeros(sliderItemsNum));

  });

};

sliderAboutInit();

var lFollowX = 0,
	lFollowY = 0,
	x = 0,
	y = 0,
	friction = 1 / 30;

function moveBackground() {
	x += (lFollowX - x) * friction;
	y += (lFollowY - y) * friction;

	translate = 'translateX(' + x + 'px) translateY(' + y + 'px)';

	$('.animate-this').css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
	});

	window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function (e) {

	var isHovered = $('.animate-this:hover').length > 0;

	if (!isHovered) {
		var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX)),
			lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));

		lFollowX = (20 * lMouseX) / 80;
		lFollowY = (10 * lMouseY) / 80;
	}
});

moveBackground();

$('.wv_staff-box').slick({
	arrows : false,
	dots : true,
	slidesToShow : 4,
	responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 769,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 481,
			settings: {
				slidesToShow: 1
			}
		}
	]
});

$('.wv_reviews-box').slick({
	slidesToShow: 4,
	responsive: [
	{
		breakpoint: 1200,
		settings: {
			slidesToShow: 3
		}
	},
	{
		breakpoint: 992,
		settings: {
			slidesToShow: 2
		}
	},
	{
		breakpoint: 769,
		settings: {
			arrows : false,
			slidesToShow: 2
		}
	},
	{
		breakpoint: 576,
		settings: {
			arrows : false,
			slidesToShow: 1
		}
	}
  ]
});

function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}
var a = 0;
if ($(".wv_counters-item").length){
	$(window).scroll(function () {
	  var oTop = $(".wv_counters-item").offset().top - window.innerHeight;
	  if (a == 0 && $(window).scrollTop() > oTop) {
		  $(".wv_wd-counter").each(function () {
			  var $this = $(this), countTo = $this.attr("data-number");
			  $({countNum: $this.text()}).animate({countNum: countTo}, {
				  duration: 2000,
				  easing: "swing",
				  step: function () {
					  if (this.countNum > 999){
						abbreviateNumber(this.countNum);
					  } else {
						  $this.text(Math.ceil(this.countNum).toLocaleString("en"));
					  }
				  },
				  complete: function () {
					  $this.text(
						  abbreviateNumber(this.countNum)
					  );
				  }
			  });
		  });
		  a = 1;
	  }
	});
}

var center = [55.75574086633052,37.50617980957031];
ymaps.ready(init_map);
function init_map(){
	var myMap = new ymaps.Map("map", {
		center: center,
		zoom: 12,
		controls: []
	});
	myMap.geoObjects.add(new ymaps.Placemark([55.75574086633052,37.50617980957031]));
}