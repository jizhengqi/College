define("index:widget/story/story.js",function(r,t,o){var e={};e={init:function(){this.story()},story:function(){var r=new Swiper(".story-container",{loop:!0,slidesPerView:1,speed:1e3,autoplay:5e3,grabCursor:!0,height:200});$(".story-container").hover(function(){r.stopAutoplay(),$(".story-arrow-left,.story-arrow-right").stop(!0,!0),$(".story-arrow-left,.story-arrow-right").fadeIn()},function(){r.startAutoplay(),$(".story-arrow-left,.story-arrow-right").fadeOut()}),$(".story-arrow-left").click(function(){r.swipePrev()}),$(".story-arrow-right").click(function(){r.swipeNext()})}},o.exports=e});