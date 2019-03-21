(function($) {
    var clicknumber = 0;
    var methods = {
        init: function(options) {},
        pop: function(options) { //弹出层
            var _H = $(window).height();
            var _W = $(window).width();
            var jumpstop = 0;
            var stop = 1;
            /*
             * options.width(number)	弹出层宽度（必选）
             * options.height(number) 弹出层高度（必选）
             * options.zIndex(number) 弹出层index轴 ，默认为9999；（可选）
             * options.poparent(jquery节点) 要插入的父节点,默认为‘body’（可选）
             * options.opacity(0~1) 背景透明度（可选）
             * option.popId(jqeury节点 ) 要插入的弹出层ID或者calss,最好为ID，强调唯一性！（必选）
             * option.popHtml(插入弹出层元素结构) 如“<div id='test'></div>"；（可选）
             * option.popFunc(function方法) 弹出层回调方法；（可选）
             * option.closePop(function方法) 关闭回调方法；（可选）
             * option.time(1~100000)//X秒跳转，X为整数，如：1为1秒（可选）
             * option.timeId(id)//为一个ID节点，用来储存时间显示（可选）
             * option.url(URL)//一个链接，倒计时跳转路径。（可选）
             * 关闭按钮约定名称为 calss = popclose;（可选）
             * */
            var settings = {
                'width': 100,
                'height': 100,
                'zIndex': 9999,
                'poparent': 'body',
                'opacity': 0.5,
                'popId': null,
                'popHtml': null,
                'popFunc': null,
                'time': null,
                'timeId': null,
                'url': null,
                'closePop': null
            };
            // 如果存在选项，则合并之
            if (options) {
                $.extend(settings, options);
            }
            var popTop;
            var popLeft = (_W - settings.width) / 2;
            if (settings.popHtml === null) {
                return this.each(function() {
                    var $this = $(this);
                    if (settings.height == 'auto') {
                        settings.height = $this.height();
                    };
                    popTop = (_H - settings.height) / 2;
                    $this.show();
                    $this.css({
                        width: settings.width,
                        height: settings.height,
                        zIndex: settings.zIndex,
                        top: popTop,
                        left: popLeft,
                        position: 'fixed'
                    });
                    closebox();
                    if (settings.time !== null) {
                        jump(settings.time, settings.timeId, settings.url);
                    }
                });
            } else if (settings.popHtml !== null) {
                $(settings.poparent).append(settings.popHtml);
                if (settings.height == 'auto') {
                    settings.height = $(settings.popId).height();
                };
                popTop = (_H - settings.height) / 2;
                $(settings.popId).css({
                    width: settings.width,
                    height: settings.height,
                    zIndex: settings.zIndex,
                    top: popTop,
                    left: popLeft,
                    position: 'fixed'
                });
                closebox()
            };

            function closebox() {
                if (settings.popFunc !== null) {
                    settings.popFunc()
                };
                var backlayer = "<div id='blacklayer'></div>"
                $("body").append(backlayer);
                var dh = $(document).height();

                $('#blacklayer').css({
                    zIndex: settings.zIndex - 10,
                    background: "#000",
                    opacity: settings.opacity,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: dh
                })
                $('.popclose').bind("click", function() {
                    stop = 0;
                    $('#blacklayer').remove();
                    if (settings.popHtml === null) {
                        $(settings.popId).hide();
                    } else {
                        $(settings.popId).remove();
                    }
                    if (settings.closePop != null) {
                        settings.closePop();
                    }
                })
            }

            if (settings.time !== null) {

                jump(settings.time, settings.timeId, settings.url);
            }

            function jump(time, element_id, url) { //X秒跳转
                if (stop === 0) return false
                _jumpfunc = window.setTimeout(function() {
                    time--;
                    if (time > 0) {
                        if (jumpstop == 1) {
                            return false;
                        } else {

                            $(element_id).html(time + "秒");
                            jump(time, element_id, url)
                        }
                    } else {
                        if (url == null) {
                            $('#blacklayer').remove();
                            $(settings.popId).remove();
                        } else {
                            document.location = url;
                        }
                    }
                }, 1000);
            }
        },
        tag: function(options) { //标签切换
            var settings = {
                'type': "click",
                'selected': 'on',
                'contentClass': '.content',
                'func': null
            };
            // 如果存在选项，则合并之
            if (options) {
                $.extend(settings, options);
            }
            if (settings.type != 'click' && settings.type != 'mouseover') return false;
            $(this).eq(0).addClass(settings.selected);
            return this.each(function() {
                var $this = $(this);
                $(settings.contentClass).hide();
                $(settings.contentClass).eq(0).show();
                $this.bind(settings.type, contentShow);

                function contentShow() {
                    var _index = $this.index();
                    $this.siblings().removeClass(settings.selected);
                    $this.addClass(settings.selected);
                    $(settings.contentClass).hide();
                    $(settings.contentClass).eq(_index).show();
                    if (settings.func != null) {
                        settings.func();
                    }
                }
            })
        },
        imgmove: function(options) { //多小图片幻灯
            var settings = {
                    oneEle: null,
                    oneWidth: null,
                    loop: false,
                    boxWidth: null,
                    prev: null,
                    next: null
                }
                // 如果存在选项，则合并之
            if (options) {
                $.extend(settings, options);
            }

            function movefunc() {
                var number = $(settings.oneEle).size();
                var length = number * settings.oneWidth;
                var boxlen = length / settings.boxWidth;
                if (boxlen % settings.boxWidth > 0) {
                    boxlen + 1;
                }
                var par = $(settings.oneEle).parent();
                if (settings.loop == true) {
                    $(settings.oneEle).parent().width(length).css("left", -settings.oneWidth);
                    var par = $(settings.oneEle).parent();
                    var li = $(settings.oneEle).last();
                    par.prepend(li.clone())
                    li.remove();
                } else {
                    $(settings.oneEle).parent().width(length);
                }
                $(settings.prev).click(function() {
                    if (settings.loop == true) {
                        var li = $(settings.oneEle).last();
                        TweenMax.to(par, 1, {
                            left: 0,
                            onComplete: function() {
                                par.prepend(li.clone())
                                par.css("left", -settings.oneWidth);
                                $(settings.oneEle).last().remove();
                            },
                            ease: Quart.easeOut
                        });
                    } else {
                        if (clicknumber > 0) {
                            clicknumber--;
                            TweenMax.to(par, 1, {
                                left: -settings.boxWidth * clicknumber,
                                ease: Quart.easeOut
                            });

                        };
                    }
                });
                $(settings.next).click(function() {
                    if (settings.loop == true) {
                        TweenMax.to(par, 0.4, {
                            left: -settings.oneWidth,
                            onComplete: function() {
                                par.css("left", "0px");
                                var li = $(settings.oneEle).slice(0, 1);
                                par.append(li.clone())
                                $(settings.oneEle).slice(0, 1).remove();
                                console.log("ok")
                            },
                            ease: Quart.easeOut
                        });
                    } else {
                        if (clicknumber < boxlen - 1) {
                            clicknumber++
                            TweenMax.to(par, 1, {
                                left: -settings.boxWidth * clicknumber,
                                ease: Quart.easeOut
                            });
                        }
                    }
                });
            }
            movefunc();
        }
    };
    $.fn.tooltip = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }
    };
})(jQuery);