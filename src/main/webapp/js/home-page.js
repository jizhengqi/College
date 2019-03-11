var JK_lock = "open";
var homePage = homePage || {};

homePage = {

    init: function() {
        this.bindE();
        this.footer();
    },

    bindE: function() {
        $('#popup').mouseover(this.popShow);
        $('.que-pop').mouseleave(this.moveOut);
        $('.lesson-list li').hover(
            homePage.lessonHover,
            homePage.lessonOut
        );
        $(window).on('resize', this.footer);
    },
    popShow: function() {

        $('.que-pop').show();
        $('#popup').mouseleave(function() {
            var t = setTimeout(homePage.popHide, 500);
            $('#popup').mouseover(function() {
                clearTimeout(t);
            });
            $('.que-pop').mouseover(function() {
                clearTimeout(t);
            });
        });
    },
    moveOut: function() {
        var t = setTimeout(function() {
            $('.que-pop').hide();
        }, 500);
        $('#popup').mousemove(function() {
            clearTimeout(t);
        });
    },
    popHide: function() {
        $('.que-pop').hide();
    },
    lessonHover: function() {

        var _play = $(this).find('.lessonplay');
        TweenMax.to(_play, 0.6, {
            opacity: 1,
            ease: Quart.easeOut
        });
        var cancel_fav = $(this).find('.cancel-favorites');
        if (cancel_fav.length > 0 && cancel_fav.attr('class').indexOf('cancel-stop') < 0) {
            cancel_fav.show();
        }
        var lesson_shoucang = $(this).find('.lesson-shoucang');
        if (lesson_shoucang.length > 0) {
            lesson_shoucang.show();
        }

        if (JK_lock === "close") {
            return false
        }
        var less = $(this).children('.lesson-infor');
        var learn1 = $(this).find('.learn-number');
        var learn2 = $(this).find('.zhongji');
        learn1.show();
        learn2.show();
        less.addClass("lesson-hover");
        $(this).find('.lessonicon-box').css("bottom", "-2px");
        TweenMax.to(less, 0.6, {
            height: 175,
            ease: Quart.easeOut
        });
        var _p = less.find("p");
        TweenMax.to(_p, 0.15, {
            display: "block",
            height: 52,
            opacity: 1,
            ease: Linear.easeOut
        });
    },
    lessonOut: function(p, obj) {
        var obj = typeof(obj) == 'object' ? obj : $(this);
        obj.find('.jd-line').show();
        var _play = obj.find('.lessonplay');
        TweenMax.to(_play, 0.6, {
            opacity: 0,
            ease: Quart.easeNone
        });
        var cancel_favorites_obj = obj.find('.cancel-favorites');
        if (cancel_favorites_obj.length > 0 && cancel_favorites_obj.attr('class').indexOf('cancel-stop') < 0) {
            cancel_favorites_obj.hide();
        }
        var lesson_shoucang = obj.find('.lesson-shoucang');
        if (lesson_shoucang.length > 0 && lesson_shoucang.attr('class').indexOf('ysc') < 0) {
            lesson_shoucang.hide();
        }

        if (JK_lock === "close") {
            return false
        }
        var less = obj.children('.lesson-infor');
        var learn1 = obj.find('.learn-number');
        var learn2 = obj.find('.zhongji');
        learn1.hide();
        learn2.hide();
        less.removeClass("lesson-hover");
        obj.find('.lessonicon-box').css("bottom", "7px");
        TweenMax.to(less, 0.6, {
            height: 88,
            ease: Quart.easeNone
        });
        var _p = less.find("p");
        TweenMax.to(_p, 0.3, {
            height: 0,
            opacity: 0,
            display: 'none',
            ease: Linear.easeNone
        });
    },
    footer: function() {
        var winHeight = $(window).height();
        var docHeight = $(document.body).height();
        if (docHeight > winHeight) {
            $('#footer').css({
                'position': 'relative',
                'width': '100%',
                'bottom': '0px'
            })
        } else {
            $('#footer').css({
                'position': 'absolute',
                'width': '100%',
                'bottom': '0px'
            })
        }
    }
};

$(function() {
    homePage.init();
});
