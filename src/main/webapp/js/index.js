/*! 极客前端组王君岩出品 */ ! function (i) {
    function e(a) {
        if (n[a]) return n[a].exports;
        var d = n[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return i[a].call(d.exports, d, d.exports, e), d.loaded = !0, d.exports
    }
    var n = {};
    return e.m = i, e.c = n, e.p = "", e(0)
}([function (i, e, n) {
    "use strict";
    var a = n(1),
        d = n(3),
        m = n(4),
        t = n(6),
        o = n(7),
        c = n(8),
        l = n(9),
        s = n(10),
        r = n(11);
    $(document).ready(function () {
        var i = location.pathname;
        i.indexOf("user") > -1 && (a.zhiye.init(), d.udomain.init(), m.base.init()), i.indexOf("vip") > -1 && t.myvip.init(), i.indexOf("sns") > -1 && o.mysns.init(), i.indexOf("security") > -1 && c.setID.init(), i.indexOf("notify") > -1 && l.notify.init(), i.indexOf("quan") > -1 && s.coupon.init(), i.indexOf("business") > -1 && r.company.init()
    })
}, function (i, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.zhiye = void 0;
    var a = n(2),
        d = {
            init: function () {
                d.staBind(), d.dironeBind()
            },
            getUrl: a.DOMAIN.FULL + "/api/getJob/",
            subUrl: a.DOMAIN.FULL + "/api/setUserInfo/",
            staPop: function () {
                $("#statusPop").find(".status-selects").hide(), $("#statusPop").tooltip("pop", {
                    width: 410,
                    height: 280,
                    popId: "#statusPop",
                    opacity: .4
                })
            },
            staBind: function () {
                function i() {
                    "你所在的年级" != $("#select-one").val() && "您所从事的职业" != $("#select-one").val() && "入学年份" != $("#select-two").val() && "0" != $("#select-two").val() ? (d.statusKey = !0, e()) : (d.statusKey = !1, e())
                }

                function e() {
                    1 == d.statusKey ? $("#zhiyeSub").removeClass("gray-btn").addClass("green-btn").on("click", d.staSub) : $("#zhiyeSub").removeClass("green-btn").addClass("gray-btn").off("click", d.staSub)
                }

                function n(i) {
                    i.preventDefault(), d.statusKey = !1, $("#zhiyeSub").removeClass("green-btn").addClass("gray-btn").off("click", d.staSub), $("#statusBtns li").removeClass("active")
                }
                $("#zyStatus").on("click", d.staPop), $("#statusBtns li").each(function () {
                    var i = $(this);
                    i.on("click", function () {
                        if ($("#statusBtns li").removeClass("active"), i.addClass("active"), "3" != i.attr("data-value")) {
                            var n = d.staOptions($(this).attr("data-value"))[0],
                                a = d.staOptions($(this).attr("data-value"))[1];
                            $("#select-one").html(n), $("#select-two").html(a), $(".status-selects select").css({
                                color: "#999"
                            }), $(".status-selects").show(), d.statusKey = !1, e()
                        } else $("#select-one").html(""), $("#select-two").html(""), $(".status-selects").hide(), d.statusKey = !0, e()
                    })
                }), $(".status-selects select").each(function () {
                    var e = $(this);
                    e.on("change", function () {
                        var n = e.val();
                        "0" == n || "你所在的年级" == n || "您所从事的职业" == n || "入学年份" == n ? (e.css({
                            color: "#999"
                        }), i()) : (e.css({
                            color: "#333"
                        }), i())
                    })
                }), $("#statusPop").find(".popclose").each(function () {
                    $(this).on("click", n)
                })
            },
            staOptions: function (i) {
                function e(i) {
                    return i.map(function (i) {
                        return '<option value="' + i + '">' + i + "</option>"
                    }).join("")
                }
                for (var n = ["入学年份"], a = 0; a < 41; a++) {
                    var d = 2016 - a;
                    n.push(d)
                }
                var m = {
                    student: {
                        grade: ["你所在的年级", "高中及以下", "专科", "大学本科", "研究生及以上"],
                        year: n
                    },
                    career: {
                        job: ["您所从事的职业", "技术", "产品", "设计", "测试", "运营", "其他"],
                        year: ["工作年限", "1 年以下", "1-2 年", "3-5 年", "6-10 年", "10 年以上"]
                    }
                };
                if ("1" == i) {
                    var t = e(m.student.grade),
                        o = e(m.student.year);
                    return [t, o]
                }
                if ("2" == i) {
                    var c = e(m.career.job),
                        l = m.career.year.map(function (i, e) {
                            return '<option value="' + e + '">' + i + "</option>"
                        }).join("");
                    return [c, l]
                }
            },
            statusKey: !1,
            staData: {},
            staSub: function (i) {
                if (i.preventDefault(), d.statusKey) {
                    var e = function (i, e, n) {
                        var a = e,
                            d = n;
                        return a && d ? '<i class="career-icon"></i><span class="career-span">' + i + '</span><i class="career-sel"></i><span class="careersel-span">' + e + "  |  " + n + '</span><span id="zyStatus" class="newPop">修改</span>' : '<i class="career-icon"></i><span class="career-span">' + i + '</span><span id="zyStatus" class="newPop">修改</span>'
                    };
                    d.statusKey = !1;
                    var n = $("#statusBtns").find(".active").attr("data-value"),
                        m = $("#statusBtns").find(".active").text(),
                        t = $("#select-one").val() || "",
                        o = $("#select-one").find("option:selected").text(),
                        c = $("#select-two").val() || "",
                        l = $("#select-two").find("option:selected").text(),
                        s = e(m, o, l);
                    switch (n) {
                        case "1":
                            d.staData = {
                                career_status: n,
                                career_type: t,
                                school_year_enter: c,
                                work_experience: 0,
                                v6_type: 1,
                                stoken: a.DOMAIN.TOKEN
                            };
                            break;
                        case "2":
                            d.staData = {
                                career_status: n,
                                career_type: t,
                                school_year_enter: null,
                                work_experience: c,
                                v6_type: 1,
                                stoken: a.DOMAIN.TOKEN
                            };
                            break;
                        case "3":
                            d.staData = {
                                career_status: n,
                                career_type: 0,
                                work_experience: 0,
                                school_year_enter: null,
                                v6_type: 1,
                                stoken: a.DOMAIN.TOKEN
                            }
                    }
                    $.ajax({
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        url: d.subUrl,
                        data: d.staData,
                        type: "get",
                        success: function (i) {
                            d.statusKey = !0, 200 == i.code ? ($("#stoken").attr("value", i.stoken), a.V6JKXY.msgBox(1, "提交成功"), $(".popclose").trigger("click"), $(".status-pop").html(s), $("#zyStatus").on("click", d.staPop)) : a.V6JKXY.msgBox(0, i.msg)
                        },
                        error: function () {
                            d.statusKey = !0, a.V6JKXY.msgBox(0, "网络错误")
                        }
                    })
                }
            },
            dirPop: function () {
                function i(i) {
                    var e = i.map(function (i) {
                        return '<li data-item="' + i.item_id + '">' + i.name + "</li>"
                    }).join("");
                    return e
                }
                $.ajax({
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    url: d.getUrl,
                    success: function (e) {
                        200 == e.code ? ($("#directionUl").html(i(e.data)), $("#directionUl li").each(function () {
                            var i = $(this);
                            i.on("click", function () {
                                i.hasClass("active") ? i.removeClass("active") : $("#directionUl .active").length < 3 && i.addClass("active"), $("#directionUl .active").length < 4 && $("#directionUl .active").length > 0 ? (d.dirPart1Key = !0, $("#dirSubbtn1").removeClass("gray-btn").addClass("green-btn").on("click", d.dirPart1Sub)) : (d.dirPart1Key = !1, $("#dirSubbtn1").removeClass("green-btn").addClass("gray-btn").off("click", d.dirPart1Sub))
                            })
                        }), $("#directionPopone").tooltip("pop", {
                            width: 580,
                            height: 320,
                            popId: "#directionPopone",
                            opacity: .4
                        })) : a.V6JKXY.msgBox(0, e.msg)
                    },
                    error: function () {
                        a.V6JKXY.msgBox(0, "网络错误")
                    }
                })
            },
            dironeBind: function () {
                $("#zyDirection").on("click", d.dirPop), $("#directionPopone").find(".popclose").each(function () {
                    $(this).on("click", function (i) {
                        i.preventDefault(), d.dirPart1Key = !1, $("#dirSubbtn1").removeClass("green-btn").addClass("gray-btn").off("click", d.dirPart1Sub)
                    })
                })
            },
            dirPart1Key: !1,
            dirPart1Sub: function (i) {
                i.preventDefault();
                var e = [],
                    n = [],
                    m = "",
                    t = void 0,
                    o = void 0,
                    c = void 0;
                if (d.dirPart1Key) {
                    var l = function (i) {
                        return i.map(function (i) {
                            return '<li><span class="name">' + i.name + "</span></li>"
                        }).join("")
                    };
                    d.dirPart1Key = !1;
                    for (var s = 0; s < $("#directionUl .active").length; s++) {
                        var r = $("#directionUl .active")[s],
                            u = $(r).attr("data-item"),
                            h = $(r).text(),
                            p = {
                                name: h,
                                item: u
                            };
                        e.push(p), n[s] = u + "-0"
                    }
                    m = n.join("|"), $("#dirlevelUl").html(d.dirlevelItems(e));
                    var f = '<ul id="direndUl">' + l(e) + '</ul><a id="zyDirection" class="newPop">修改</a>';
                    $.ajax({
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        url: d.subUrl,
                        data: {
                            career_interest: m,
                            v6_type: 1,
                            stoken: a.DOMAIN.TOKEN
                        },
                        type: "get",
                        success: function (i) {
                            if (200 == i.code) {
                                var e = function () {
                                    $("#directionPoptwo").tooltip("pop", {
                                        width: 580,
                                        height: "auto",
                                        popId: "#directionPoptwo",
                                        opacity: .4
                                    })
                                };
                                $(".popclose").trigger("click"), d.dirtwoBind(), e(), $("#stoken").attr("value", i.stoken), $(".dir-pop").html(f), $("#zyDirection").on("click", d.dirPop), c = parseInt($("#dirlevelUl").height() + 190), t = parseInt($(window).height() - c) / 2, o = parseInt($(window).width() - 580) / 2;
                                var n = "height: " + c + "px; width: 580px; z-index: 9999; top: " + t + "px; left: " + o + "px; position: fixed;";
                                $("#directionPoptwo").attr("style", n)
                            } else a.V6JKXY.msgBox(0, i.msg), setTimeout(function () {
                                d.dirPart1Key = !0
                            }, 1e3)
                        },
                        error: function () {
                            setTimeout(function () {
                                d.dirPart1Key = !0
                            }, 1e3), a.V6JKXY.msgBox(0, "网络错误")
                        }
                    })
                }
            },
            dirlevelItems: function (i) {
                var e = i.map(function (i) {
                    return '<li class="dirlevel-item">\n                <dl class="cf">\n                    <dt>' + i.name + '</dt>\n                    <dd>\n                        <ul class="dirlevelItems" data-item="' + i.item + '">\n                            <li data-item="121">完全不了解</li>\n                            <li data-item="122">有点了解</li>\n                            <li data-item="123">熟悉</li>\n                            <li data-item="124">精通</li>\n                        </ul>\n                        <ul class="dircolorItems">\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                            <li></li>\n                        </ul>\n                    </dd>\n                </dl>\n            </li>'
                }).join("");
                return e
            },
            dirtwoBind: function () {
                $(".dirlevelItems").each(function () {
                    var i = void 0;
                    $(this).children("li").each(function (e) {
                        function n(n) {
                            var d = n;
                            "click" === d && (m.addClass("active").siblings("li").removeClass("active"), i = e), a(e)
                        }

                        function a(i) {
                            if (void 0 !== i) {
                                var e = m.closest("ul").next("ul").children("li")[i];
                                $(e).nextAll("li").removeClass("active"), $(e).addClass("active").prevAll("li").addClass("active")
                            }
                        }
                        var m = $(this);
                        m.on("click", function () {
                            n("click");
                            for (var i = $("#dirlevelUl").children("li").length, e = [], a = 0; a < i; a++) {
                                var m = $("#dirlevelUl").children("li")[a],
                                    t = $(m).find(".dirlevelItems").children("li").hasClass("active");
                                t && e.push(m)
                            }
                            i == e.length ? (d.dirPart2Key = !0, $("#dirSubbtn2").removeClass("gray-btn").addClass("green-btn").on("click", d.dirPart2Sub)) : (d.dirPart2Key = !1, $("#dirSubbtn1").removeClass("green-btn").addClass("gray-btn").off("click", d.dirPart2Sub))
                        }), m.on("mouseenter", function () {
                            n("mouse")
                        }), m.on("mouseleave", function () {
                            m.closest("ul").next("ul").children("li").removeClass("active"), a(i)
                        })
                    })
                }), $("#directionPoptwo").find(".popclose").each(function () {
                    $(this).on("click", function (i) {
                        i.preventDefault(), d.dirPart2Key = !1, $("#dirSubbtn2").removeClass("green-btn").addClass("gray-btn").off("click", d.dirPart2Sub)
                    })
                })
            },
            dirPart2Key: !1,
            dirPart2Sub: function (i) {
                i.preventDefault();
                var e = [],
                    n = "",
                    m = [],
                    t = "",
                    o = "";
                if (d.dirPart2Key) {
                    var c = function (i) {
                        for (var e = parseInt(i.color), n = 4 - e, a = "", d = 0; d < e; d++) a += '<li class="active"></li>';
                        if (0 != n)
                            for (var m = 0; m < n; m++) a += "<li></li>";
                        var t = '<li>\n                                <span class="name">' + i.name + '</span>\n                                <ul class="cf">\n                                    ' + a + '\n                                </ul><span class="level">' + i.text + "</span>\n                            </li>";
                        return t
                    };
                    d.dirPart2Key = !1;
                    for (var l = 0; l < $("#dirlevelUl").find(".dirlevel-item").length; l++) {
                        var s = $("#dirlevelUl").find(".dirlevel-item")[l],
                            r = $(s).find(".dirlevelItems").attr("data-item"),
                            u = $(s).find(".dirlevelItems").find(".active").attr("data-item"),
                            h = r + "-" + u;
                        m.push(h);
                        var p = $(s).find("dt").text(),
                            f = $(s).find(".dircolorItems").find(".active").length,
                            v = $(s).find(".dirlevelItems").find(".active").text(),
                            y = {
                                name: p,
                                color: f,
                                text: v
                            };
                        e.push(y)
                    }
                    n = m.join("|");
                    for (var g = 0; g < e.length; g++) t += c(e[g]);
                    o = '<ul id="direndUl">\n                            ' + t + '\n                      </ul>\n                      <a id="zyDirection" class="newPop">修改</a>', $.ajax({
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        url: d.subUrl,
                        data: {
                            career_interest: n,
                            v6_type: 1,
                            stoken: a.DOMAIN.TOKEN
                        },
                        type: "get",
                        success: function (i) {
                            d.dirPart2Key = !0, 200 == i.code ? ($("#stoken").attr("value", i.stoken), a.V6JKXY.msgBox(1, "提交成功"), $(".popclose").trigger("click"), $(".dir-pop").html(o), $("#zyDirection").on("click", d.dirPop)) : a.V6JKXY.msgBox(0, i.msg)
                        },
                        error: function () {
                            d.dirPart2Key = !0, a.V6JKXY.msgBox(0, "网络错误")
                        }
                    })
                }
            }
        };
    e.zhiye = d
}, function (i, e) {
    "use strict";

    function n(i) {
        var e, n = RegExp(d + "([^/]+)/", "i"),
            a = i.match(n);
        return a = a[1], e = a.split(".")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = {};
    a.msgBox = function (i, e, n, a) {
        var e = e ? e : "亲爱的VIP，这是来自极客学院小雪的 Hello~",
            d = "warning",
            n = parseInt(n) ? parseInt(n) : 1e3;
        switch (i) {
            case 1:
                var m = "waring-success";
                break;
            case 0:
                var m = "waring-failure";
                break;
            case 2:
            default:
                var m = "waring-sub"
        }
        $("#" + d).remove();
        var t;
        t = '<div class="web-dia-tip ' + m + '" id="' + d + '" >', t += e, t += "</div>", $("body").append(t);
        var o = $("#" + d).width() / 2;
        $("#" + d).css("marginLeft", -o), $("#" + d).stop().animate({
            top: "0px",
            opacity: 1
        }, 300, function () {
            $("#" + d).delay(n).animate({
                top: "-50px",
                opacity: 0
            }, 500, function () {
                $("#" + d).remove(), "function" == typeof a && a()
            })
        })
    };
    var d = "https:" == document.location.protocol ? "https://" : "http://",
        m = n(location.href),
        t = m[1] + "." + m[2],
        o = (d + "my." + m[1] + ".tv", {
            FULL: d + "my." + t,
            BASE: t,
            TOKEN: function () {
                return $("#stoken").val()
            }
        });
    e.V6JKXY = a, e.DOMAIN = o
}, function (i, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.udomain = void 0;
    var a = n(2),
        d = {
            init: function () {
                d.bindE()
            },
            subUrl: a.DOMAIN.FULL + "/api/setDomain/",
            bindE: function () {
                $(".domain-area-setup").on("click", function () {
                    $(".domain-area-setup").hide(), $(".domain-area-input").fadeIn(), $(".domain-area-input .cancel").on("click", function () {
                        $(".domain-area-input").fadeOut(500), setTimeout(function () {
                            $(".domain-area-setup").show()
                        }, 600)
                    })
                }), $("#domainBtn").on("click", d.domainSub)
            },
            dosubKey: !0,
            verDomain: function (i) {
                return /^[0-9a-z_]+$/.test(i)
            },
            domainSub: function (i) {
                i.preventDefault();
                $("#domainChange").val().trim();
                if (d.dosubKey) {
                    d.dosubKey = !1;
                    var e = $("#domainChange").val().trim();
                    if ("" === e) return d.dosubKey = !0, a.V6JKXY.msgBox(0, "域名不能为空"), !1;
                    if (!d.verDomain(e)) return d.dosubKey = !0, a.V6JKXY.msgBox(0, "域名格式不符合规则"), !1;
                    if (e.length > 25) return d.dosubKey = !0, a.V6JKXY.msgBox(0, "域名25个字符以内"), !1;
                    $.ajax({
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        url: d.subUrl,
                        data: {
                            domain: e,
                            stoken: a.DOMAIN.TOKEN
                        },
                        type: "get",
                        success: function (i) {
                            200 == i.code ? ($("#stoken").attr("value", i.stoken), a.V6JKXY.msgBox(1, "提交成功"), $(".domain-area-input").hide(), $("#sucDomain").text(e), $(".domain-area-url").css({
                                display: "inline-block"
                            })) : (d.dosubKey = !0, a.V6JKXY.msgBox(0, i.msg))
                        },
                        error: function () {
                            d.dosubKey = !0, a.V6JKXY.msgBox(0, "网络错误")
                        }
                    })
                }
            }
        };
    e.udomain = d
}, function (i, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.base = void 0;
    var a = n(2),
        d = n(5),
        m = {
            init: function () {
                m.bindE(), m.photoPop(), m.laydate(), m.home()
            },
            usernameKey: !0,
            usernameUrl: a.DOMAIN.FULL + "/api/setUname/",
            bindE: function () {
                function i(i, e) {
                    var n = i;
                    "修改" == n ? ($(".username").hide(), $("#changeUsername").hide(), $("#uname").css({
                        display: "inline-block"
                    }), $("#usernameTips").removeClass("username-tips"), $(".changeuser-btns").css({
                        display: "inline-block"
                    })) : ($("#uname").hide(), $("#usernameTips").addClass("username-tips"), $(".changeuser-btns").hide(), $(".username").css({
                        display: "inline-block"
                    }), $("#changeUsername").css({
                        display: "inline-block"
                    }), e && ($("#changeUsername").hide(), $(".username").text(e)))
                }
                $("#basArea").on("keyup", function () {
                    var i = $("#basArea").val().length,
                        e = 200 - parseInt(i);
                    $("#tipsNum").text(e)
                }), $("#changeUsername").on("click", function (e) {
                    e.preventDefault(), i("修改")
                }), $("#usernameSubBtn").on("click", function (e) {
                    e.preventDefault();
                    var n = $("#uname").val();
                    if (m.usernameKey) {
                        if (m.usernameKey = !1, "" == n) return m.usernameKey = !0, a.V6JKXY.msgBox(0, "用户名不能为空"), !1;
                        $.ajax({
                            url: m.usernameUrl,
                            jsonp: "jsoncallback",
                            dataType: "jsonp",
                            data: {
                                uname: n,
                                stoken: a.DOMAIN.TOKEN
                            },
                            type: "get",
                            success: function (e) {
                                m.usernameKey = !0, 200 == e.code ? ($("#stoken").attr("value", e.stoken), a.V6JKXY.msgBox(1, "修改成功"), i("成功", n)) : a.V6JKXY.msgBox(0, e.msg)
                            },
                            error: function () {
                                m.usernameKey = !0, a.V6JKXY.msgBox(0, "网络错误")
                            }
                        })
                    }
                }), $("#usernameCanBtn").on("click", function (e) {
                    e.preventDefault(), i("取消")
                })
            },
            photoPop: function () {
                $("#setPhoto").on("click", function () {
                    $("#setPhotoPop").tooltip("pop", {
                        width: 670,
                        height: 511,
                        popId: "#setPhotoPop",
                        opacity: .4
                    })
                }), m.uploadPhoto()
            },
            home: function () {
                function i(i, e) {
                    var n = "",
                        a = "",
                        d = e;
                    return a = 1 == d ? '<option value="0">省</option>' : '<option value="0">市</option>', n = a + i.map(function (i) {
                        return '<option value="' + i.id + '">' + i.name + "</option>"
                    })
                }
                var e = d.home.child,
                    n = [],
                    a = $("#proviceSel").attr("data-value") || 0,
                    m = $("#citySel").attr("data-value") || 0;
                if ($("#proviceSel").html(i(e, 1)).val(a), 0 != a) {
                    var t = parseInt(a) - 2;
                    n = e[t].child, $("#citySel").html(i(n, 2)).val(m)
                }
                $("#proviceSel").on("change", function () {
                    for (var a = $("#proviceSel").val(), d = 0; d < e.length; d++) e[d].id == a && (n = e[d].child);
                    $("#citySel").html(i(n, 2))
                })
            },
            laydate: function (i) {
                function e() {
                    return i.apply(this, arguments)
                }
                return e.toString = function () {
                    return i.toString()
                }, e
            }(function () {
                laydate({
                    elem: "#calendar",
                    event: "focus",
                    start: "1992-01-01 23:00:00"
                })
            }),
            uploadPhoto: function () {
                swfobject.addDomLoadEvent(function () {
                    new fullAvatarEditor("/static/v6/dist/js/plu/fullAvatarEditor.swf", "/static/v6/dist/js/plu/expressInstall.swf", "swfContainer", {
                        id: "swf",
                        upload_url: "/image/upload_avatar_new",
                        method: "post",
                        src_upload: 2,
                        avatar_box_border_width: 0,
                        avatar_sizes: "100*100",
                        avatar_sizes_desc: "100*100像素|50*50像素|32*32像素",
                        avatar_tools_visible: !1,
                        browse_box_background: "#fff",
                        tab_visible: !1,
                        browse_tip_font: 'erdana,"Lantinghei SC","Hiragino Sans GB","Microsoft Yahei",Helvetica,arial,sans-serif',
                        browse_button_font: 'erdana,"Lantinghei SC","Hiragino Sans GB","Microsoft Yahei",Helvetica,arial,sans-serif',
                        button_font: 'erdana,"Lantinghei SC","Hiragino Sans GB","Microsoft Yahei",Helvetica,arial,sans-serif',
                        checkbox_font: 'erdana,"Lantinghei SC","Hiragino Sans GB","Microsoft Yahei",Helvetica,arial,sans-serif',
                        avatar_intro_font: 'erdana,"Lantinghei SC","Hiragino Sans GB","Microsoft Yahei",Helvetica,arial,sans-serif',
                        tooltip_font: 'erdana,"Lantinghei SC","Hiragino Sans GB","Microsoft Yahei",Helvetica,arial,sans-serif',
                        src_size_over_limit_font: 'Verdana,"Lantinghei SC","Hiragino Sans GB","Microsoft Yahei",Helvetica,arial,sans-serif'
                    }, function (i) {
                        switch (i.code) {
                            case 5:
                                0 == i.type && i.content.success && window.location.reload()
                        }
                    })
                })
            }
        };
    e.base = m
}, function (i, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = {
        id: "1",
        name: "中国",
        child: [{
            id: "2",
            name: "北京市",
            child: [{
                id: "36",
                name: "东城区"
            }, {
                id: "37",
                name: "西城区"
            }, {
                id: "38",
                name: "崇文区"
            }, {
                id: "39",
                name: "宣武区"
            }, {
                id: "40",
                name: "朝阳区"
            }, {
                id: "41",
                name: "石景山区"
            }, {
                id: "42",
                name: "海淀区"
            }, {
                id: "43",
                name: "门头沟区"
            }, {
                id: "44",
                name: "房山区"
            }, {
                id: "45",
                name: "通州区"
            }, {
                id: "46",
                name: "顺义区"
            }, {
                id: "47",
                name: "昌平区"
            }, {
                id: "48",
                name: "大兴区"
            }, {
                id: "49",
                name: "怀柔区"
            }, {
                id: "50",
                name: "平谷区"
            }, {
                id: "51",
                name: "密云县"
            }, {
                id: "52",
                name: "延庆县"
            }]
        }, {
            id: "3",
            name: "上海市",
            child: [{
                id: "53",
                name: "黄浦区"
            }, {
                id: "54",
                name: "卢湾区"
            }, {
                id: "55",
                name: "徐汇区"
            }, {
                id: "56",
                name: "长宁区"
            }, {
                id: "57",
                name: "静安区"
            }, {
                id: "58",
                name: "普陀区"
            }, {
                id: "59",
                name: "闸北区"
            }, {
                id: "60",
                name: "虹口区"
            }, {
                id: "61",
                name: "杨浦区"
            }, {
                id: "62",
                name: "闵行区"
            }, {
                id: "63",
                name: "宝山区"
            }, {
                id: "64",
                name: "嘉定区"
            }, {
                id: "65",
                name: "浦东新区"
            }, {
                id: "66",
                name: "金山区"
            }, {
                id: "67",
                name: "松江区"
            }, {
                id: "68",
                name: "青浦区"
            }, {
                id: "69",
                name: "南汇区"
            }, {
                id: "70",
                name: "奉贤区"
            }, {
                id: "71",
                name: "崇明县"
            }]
        }, {
            id: "4",
            name: "天津市",
            child: [{
                id: "72",
                name: "和平区"
            }, {
                id: "73",
                name: "河东区"
            }, {
                id: "74",
                name: "河西区"
            }, {
                id: "75",
                name: "南开区"
            }, {
                id: "76",
                name: "河北区"
            }, {
                id: "77",
                name: "红桥区"
            }, {
                id: "78",
                name: "塘沽区"
            }, {
                id: "79",
                name: "汉沽区"
            }, {
                id: "80",
                name: "大港区"
            }, {
                id: "81",
                name: "东丽区"
            }, {
                id: "82",
                name: "西青区"
            }, {
                id: "83",
                name: "津南区"
            }, {
                id: "84",
                name: "北辰区"
            }, {
                id: "85",
                name: "武清区"
            }, {
                id: "86",
                name: "宝坻区"
            }, {
                id: "87",
                name: "宁河县"
            }, {
                id: "88",
                name: "静海县"
            }, {
                id: "89",
                name: "蓟县"
            }]
        }, {
            id: "5",
            name: "重庆市",
            child: [{
                id: "90",
                name: "万州区"
            }, {
                id: "91",
                name: "涪陵区"
            }, {
                id: "92",
                name: "渝中区"
            }, {
                id: "93",
                name: "大渡口区"
            }, {
                id: "94",
                name: "江北区"
            }, {
                id: "95",
                name: "沙坪坝区"
            }, {
                id: "96",
                name: "九龙坡区"
            }, {
                id: "97",
                name: "南岸区"
            }, {
                id: "98",
                name: "北碚区"
            }, {
                id: "99",
                name: "万盛区"
            }, {
                id: "100",
                name: "双桥区"
            }, {
                id: "101",
                name: "渝北区"
            }, {
                id: "102",
                name: "巴南区"
            }, {
                id: "103",
                name: "黔江区"
            }, {
                id: "104",
                name: "长寿区"
            }, {
                id: "105",
                name: "綦江县"
            }, {
                id: "106",
                name: "潼南县"
            }, {
                id: "107",
                name: "铜梁县"
            }, {
                id: "108",
                name: "大足县"
            }, {
                id: "109",
                name: "荣昌县"
            }, {
                id: "110",
                name: "璧山县"
            }, {
                id: "111",
                name: "梁平县"
            }, {
                id: "112",
                name: "城口县"
            }, {
                id: "113",
                name: "丰都县"
            }, {
                id: "114",
                name: "垫江县"
            }, {
                id: "115",
                name: "武隆县"
            }, {
                id: "116",
                name: "忠县"
            }, {
                id: "117",
                name: "开县"
            }, {
                id: "118",
                name: "云阳县"
            }, {
                id: "119",
                name: "奉节县"
            }, {
                id: "120",
                name: "巫山县"
            }, {
                id: "121",
                name: "巫溪县"
            }, {
                id: "122",
                name: "石柱县"
            }, {
                id: "123",
                name: "秀山县"
            }, {
                id: "124",
                name: "酉阳县"
            }, {
                id: "125",
                name: "彭水县"
            }, {
                id: "126",
                name: "江津区"
            }, {
                id: "127",
                name: "合川区"
            }, {
                id: "128",
                name: "永川区"
            }, {
                id: "129",
                name: "南川区"
            }]
        }, {
            id: "6",
            name: "河北省",
            child: [{
                id: "130",
                name: "石家庄市",
                child: [{
                    id: "540",
                    name: "长安区"
                }, {
                    id: "541",
                    name: "桥东区"
                }, {
                    id: "542",
                    name: "桥西区"
                }, {
                    id: "543",
                    name: "新华区"
                }, {
                    id: "544",
                    name: "井陉矿区"
                }, {
                    id: "545",
                    name: "裕华区"
                }, {
                    id: "546",
                    name: "井陉县"
                }, {
                    id: "547",
                    name: "正定县"
                }, {
                    id: "548",
                    name: "栾城县"
                }, {
                    id: "549",
                    name: "行唐县"
                }, {
                    id: "550",
                    name: "灵寿县"
                }, {
                    id: "551",
                    name: "高邑县"
                }, {
                    id: "552",
                    name: "深泽县"
                }, {
                    id: "553",
                    name: "赞皇县"
                }, {
                    id: "554",
                    name: "无极县"
                }, {
                    id: "555",
                    name: "平山县"
                }, {
                    id: "556",
                    name: "元氏县"
                }, {
                    id: "557",
                    name: "赵县"
                }, {
                    id: "558",
                    name: "辛集市"
                }, {
                    id: "559",
                    name: "藁城市"
                }, {
                    id: "560",
                    name: "晋州市"
                }, {
                    id: "561",
                    name: "新乐市"
                }, {
                    id: "562",
                    name: "鹿泉市"
                }]
            }, {
                id: "131",
                name: "唐山市",
                child: [{
                    id: "563",
                    name: "路南区"
                }, {
                    id: "564",
                    name: "路北区"
                }, {
                    id: "565",
                    name: "古冶区"
                }, {
                    id: "566",
                    name: "开平区"
                }, {
                    id: "567",
                    name: "丰南区"
                }, {
                    id: "568",
                    name: "丰润区"
                }, {
                    id: "569",
                    name: "滦县"
                }, {
                    id: "570",
                    name: "滦南县"
                }, {
                    id: "571",
                    name: "乐亭县"
                }, {
                    id: "572",
                    name: "迁西县"
                }, {
                    id: "573",
                    name: "玉田县"
                }, {
                    id: "574",
                    name: "唐海县"
                }, {
                    id: "575",
                    name: "遵化市"
                }, {
                    id: "576",
                    name: "迁安市"
                }]
            }, {
                id: "132",
                name: "秦皇岛市",
                child: [{
                    id: "577",
                    name: "海港区"
                }, {
                    id: "578",
                    name: "山海关区"
                }, {
                    id: "579",
                    name: "北戴河区"
                }, {
                    id: "580",
                    name: "青龙县"
                }, {
                    id: "581",
                    name: "昌黎县"
                }, {
                    id: "582",
                    name: "抚宁县"
                }, {
                    id: "583",
                    name: "卢龙县"
                }]
            }, {
                id: "133",
                name: "邯郸市",
                child: [{
                    id: "584",
                    name: "邯山区"
                }, {
                    id: "585",
                    name: "丛台区"
                }, {
                    id: "586",
                    name: "复兴区"
                }, {
                    id: "587",
                    name: "峰峰矿区"
                }, {
                    id: "588",
                    name: "邯郸县"
                }, {
                    id: "589",
                    name: "临漳县"
                }, {
                    id: "590",
                    name: "成安县"
                }, {
                    id: "591",
                    name: "大名县"
                }, {
                    id: "592",
                    name: "涉县"
                }, {
                    id: "593",
                    name: "磁县"
                }, {
                    id: "594",
                    name: "肥乡县"
                }, {
                    id: "595",
                    name: "永年县"
                }, {
                    id: "596",
                    name: "邱县"
                }, {
                    id: "597",
                    name: "鸡泽县"
                }, {
                    id: "598",
                    name: "广平县"
                }, {
                    id: "599",
                    name: "馆陶县"
                }, {
                    id: "600",
                    name: "魏县"
                }, {
                    id: "601",
                    name: "曲周县"
                }, {
                    id: "602",
                    name: "武安市"
                }]
            }, {
                id: "134",
                name: "邢台市",
                child: [{
                    id: "603",
                    name: "桥东区"
                }, {
                    id: "604",
                    name: "桥西区"
                }, {
                    id: "605",
                    name: "邢台县"
                }, {
                    id: "606",
                    name: "临城县"
                }, {
                    id: "607",
                    name: "内丘县"
                }, {
                    id: "608",
                    name: "柏乡县"
                }, {
                    id: "609",
                    name: "隆尧县"
                }, {
                    id: "610",
                    name: "任县"
                }, {
                    id: "611",
                    name: "南和县"
                }, {
                    id: "612",
                    name: "宁晋县"
                }, {
                    id: "613",
                    name: "巨鹿县"
                }, {
                    id: "614",
                    name: "新河县"
                }, {
                    id: "615",
                    name: "广宗县"
                }, {
                    id: "616",
                    name: "平乡县"
                }, {
                    id: "617",
                    name: "威县"
                }, {
                    id: "618",
                    name: "清河县"
                }, {
                    id: "619",
                    name: "临西县"
                }, {
                    id: "620",
                    name: "南宫市"
                }, {
                    id: "621",
                    name: "沙河市"
                }]
            }, {
                id: "135",
                name: "保定市",
                child: [{
                    id: "622",
                    name: "新市区"
                }, {
                    id: "623",
                    name: "北市区"
                }, {
                    id: "624",
                    name: "南市区"
                }, {
                    id: "625",
                    name: "满城县"
                }, {
                    id: "626",
                    name: "清苑县"
                }, {
                    id: "627",
                    name: "涞水县"
                }, {
                    id: "628",
                    name: "阜平县"
                }, {
                    id: "629",
                    name: "徐水县"
                }, {
                    id: "630",
                    name: "定兴县"
                }, {
                    id: "631",
                    name: "唐县"
                }, {
                    id: "632",
                    name: "高阳县"
                }, {
                    id: "633",
                    name: "容城县"
                }, {
                    id: "634",
                    name: "涞源县"
                }, {
                    id: "635",
                    name: "望都县"
                }, {
                    id: "636",
                    name: "安新县"
                }, {
                    id: "637",
                    name: "易县"
                }, {
                    id: "638",
                    name: "曲阳县"
                }, {
                    id: "639",
                    name: "蠡县"
                }, {
                    id: "640",
                    name: "顺平县"
                }, {
                    id: "641",
                    name: "博野县"
                }, {
                    id: "642",
                    name: "雄县"
                }, {
                    id: "643",
                    name: "涿州市"
                }, {
                    id: "644",
                    name: "定州市"
                }, {
                    id: "645",
                    name: "安国市"
                }, {
                    id: "646",
                    name: "高碑店市"
                }]
            }, {
                id: "136",
                name: "张家口市",
                child: [{
                    id: "647",
                    name: "桥东区"
                }, {
                    id: "648",
                    name: "桥西区"
                }, {
                    id: "649",
                    name: "宣化区"
                }, {
                    id: "650",
                    name: "下花园区"
                }, {
                    id: "651",
                    name: "宣化县"
                }, {
                    id: "652",
                    name: "张北县"
                }, {
                    id: "653",
                    name: "康保县"
                }, {
                    id: "654",
                    name: "沽源县"
                }, {
                    id: "655",
                    name: "尚义县"
                }, {
                    id: "656",
                    name: "蔚县"
                }, {
                    id: "657",
                    name: "阳原县"
                }, {
                    id: "658",
                    name: "怀安县"
                }, {
                    id: "659",
                    name: "万全县"
                }, {
                    id: "660",
                    name: "怀来县"
                }, {
                    id: "661",
                    name: "涿鹿县"
                }, {
                    id: "662",
                    name: "赤城县"
                }, {
                    id: "663",
                    name: "崇礼县"
                }]
            }, {
                id: "137",
                name: "承德市",
                child: [{
                    id: "664",
                    name: "双桥区"
                }, {
                    id: "665",
                    name: "双滦区"
                }, {
                    id: "666",
                    name: "鹰手营子矿区"
                }, {
                    id: "667",
                    name: "承德县"
                }, {
                    id: "668",
                    name: "兴隆县"
                }, {
                    id: "669",
                    name: "平泉县"
                }, {
                    id: "670",
                    name: "滦平县"
                }, {
                    id: "671",
                    name: "隆化县"
                }, {
                    id: "672",
                    name: "丰宁县"
                }, {
                    id: "673",
                    name: "宽城县"
                }, {
                    id: "674",
                    name: "围场县"
                }]
            }, {
                id: "138",
                name: "沧州市",
                child: [{
                    id: "675",
                    name: "新华区"
                }, {
                    id: "676",
                    name: "运河区"
                }, {
                    id: "677",
                    name: "沧县"
                }, {
                    id: "678",
                    name: "青县"
                }, {
                    id: "679",
                    name: "东光县"
                }, {
                    id: "680",
                    name: "海兴县"
                }, {
                    id: "681",
                    name: "盐山县"
                }, {
                    id: "682",
                    name: "肃宁县"
                }, {
                    id: "683",
                    name: "南皮县"
                }, {
                    id: "684",
                    name: "吴桥县"
                }, {
                    id: "685",
                    name: "献县"
                }, {
                    id: "686",
                    name: "孟村县"
                }, {
                    id: "687",
                    name: "泊头市"
                }, {
                    id: "688",
                    name: "任丘市"
                }, {
                    id: "689",
                    name: "黄骅市"
                }, {
                    id: "690",
                    name: "河间市"
                }]
            }, {
                id: "139",
                name: "廊坊市",
                child: [{
                    id: "691",
                    name: "安次区"
                }, {
                    id: "692",
                    name: "广阳区"
                }, {
                    id: "693",
                    name: "固安县"
                }, {
                    id: "694",
                    name: "永清县"
                }, {
                    id: "695",
                    name: "香河县"
                }, {
                    id: "696",
                    name: "大城县"
                }, {
                    id: "697",
                    name: "文安县"
                }, {
                    id: "698",
                    name: "大厂县"
                }, {
                    id: "699",
                    name: "霸州市"
                }, {
                    id: "700",
                    name: "三河市"
                }]
            }, {
                id: "140",
                name: "衡水市",
                child: [{
                    id: "701",
                    name: "桃城区"
                }, {
                    id: "702",
                    name: "枣强县"
                }, {
                    id: "703",
                    name: "武邑县"
                }, {
                    id: "704",
                    name: "武强县"
                }, {
                    id: "705",
                    name: "饶阳县"
                }, {
                    id: "706",
                    name: "安平县"
                }, {
                    id: "707",
                    name: "故城县"
                }, {
                    id: "708",
                    name: "景县"
                }, {
                    id: "709",
                    name: "阜城县"
                }, {
                    id: "710",
                    name: "冀州市"
                }, {
                    id: "711",
                    name: "深州市"
                }]
            }]
        }, {
            id: "7",
            name: "山西省",
            child: [{
                id: "141",
                name: "太原市",
                child: [{
                    id: "712",
                    name: "小店区"
                }, {
                    id: "713",
                    name: "迎泽区"
                }, {
                    id: "714",
                    name: "杏花岭区"
                }, {
                    id: "715",
                    name: "尖草坪区"
                }, {
                    id: "716",
                    name: "万柏林区"
                }, {
                    id: "717",
                    name: "晋源区"
                }, {
                    id: "718",
                    name: "清徐县"
                }, {
                    id: "719",
                    name: "阳曲县"
                }, {
                    id: "720",
                    name: "娄烦县"
                }, {
                    id: "721",
                    name: "古交市"
                }]
            }, {
                id: "142",
                name: "大同市",
                child: [{
                    id: "722",
                    name: "城区"
                }, {
                    id: "723",
                    name: "矿区"
                }, {
                    id: "724",
                    name: "南郊区"
                }, {
                    id: "725",
                    name: "新荣区"
                }, {
                    id: "726",
                    name: "阳高县"
                }, {
                    id: "727",
                    name: "天镇县"
                }, {
                    id: "728",
                    name: "广灵县"
                }, {
                    id: "729",
                    name: "灵丘县"
                }, {
                    id: "730",
                    name: "浑源县"
                }, {
                    id: "731",
                    name: "左云县"
                }, {
                    id: "732",
                    name: "大同县"
                }]
            }, {
                id: "143",
                name: "阳泉市",
                child: [{
                    id: "733",
                    name: "城区"
                }, {
                    id: "734",
                    name: "矿区"
                }, {
                    id: "735",
                    name: "郊区"
                }, {
                    id: "736",
                    name: "平定县"
                }, {
                    id: "737",
                    name: "盂县"
                }]
            }, {
                id: "144",
                name: "长治市",
                child: [{
                    id: "738",
                    name: "城区"
                }, {
                    id: "739",
                    name: "郊区"
                }, {
                    id: "740",
                    name: "长治县"
                }, {
                    id: "741",
                    name: "襄垣县"
                }, {
                    id: "742",
                    name: "屯留县"
                }, {
                    id: "743",
                    name: "平顺县"
                }, {
                    id: "744",
                    name: "黎城县"
                }, {
                    id: "745",
                    name: "壶关县"
                }, {
                    id: "746",
                    name: "长子县"
                }, {
                    id: "747",
                    name: "武乡县"
                }, {
                    id: "748",
                    name: "沁县"
                }, {
                    id: "749",
                    name: "沁源县"
                }, {
                    id: "750",
                    name: "潞城市"
                }]
            }, {
                id: "145",
                name: "晋城市",
                child: [{
                    id: "751",
                    name: "城区"
                }, {
                    id: "752",
                    name: "沁水县"
                }, {
                    id: "753",
                    name: "阳城县"
                }, {
                    id: "754",
                    name: "陵川县"
                }, {
                    id: "755",
                    name: "泽州县"
                }, {
                    id: "756",
                    name: "高平市"
                }]
            }, {
                id: "146",
                name: "朔州市",
                child: [{
                    id: "757",
                    name: "朔城区"
                }, {
                    id: "758",
                    name: "平鲁区"
                }, {
                    id: "759",
                    name: "山阴县"
                }, {
                    id: "760",
                    name: "应县"
                }, {
                    id: "761",
                    name: "右玉县"
                }, {
                    id: "762",
                    name: "怀仁县"
                }]
            }, {
                id: "147",
                name: "晋中市",
                child: [{
                    id: "763",
                    name: "榆次区"
                }, {
                    id: "764",
                    name: "榆社县"
                }, {
                    id: "765",
                    name: "左权县"
                }, {
                    id: "766",
                    name: "和顺县"
                }, {
                    id: "767",
                    name: "昔阳县"
                }, {
                    id: "768",
                    name: "寿阳县"
                }, {
                    id: "769",
                    name: "太谷县"
                }, {
                    id: "770",
                    name: "祁县"
                }, {
                    id: "771",
                    name: "平遥县"
                }, {
                    id: "772",
                    name: "灵石县"
                }, {
                    id: "773",
                    name: "介休市"
                }]
            }, {
                id: "148",
                name: "运城市",
                child: [{
                    id: "774",
                    name: "盐湖区"
                }, {
                    id: "775",
                    name: "临猗县"
                }, {
                    id: "776",
                    name: "万荣县"
                }, {
                    id: "777",
                    name: "闻喜县"
                }, {
                    id: "778",
                    name: "稷山县"
                }, {
                    id: "779",
                    name: "新绛县"
                }, {
                    id: "780",
                    name: "绛县"
                }, {
                    id: "781",
                    name: "垣曲县"
                }, {
                    id: "782",
                    name: "夏县"
                }, {
                    id: "783",
                    name: "平陆县"
                }, {
                    id: "784",
                    name: "芮城县"
                }, {
                    id: "785",
                    name: "永济市"
                }, {
                    id: "786",
                    name: "河津市"
                }]
            }, {
                id: "149",
                name: "忻州市",
                child: [{
                    id: "787",
                    name: "忻府区"
                }, {
                    id: "788",
                    name: "定襄县"
                }, {
                    id: "789",
                    name: "五台县"
                }, {
                    id: "790",
                    name: "代县"
                }, {
                    id: "791",
                    name: "繁峙县"
                }, {
                    id: "792",
                    name: "宁武县"
                }, {
                    id: "793",
                    name: "静乐县"
                }, {
                    id: "794",
                    name: "神池县"
                }, {
                    id: "795",
                    name: "五寨县"
                }, {
                    id: "796",
                    name: "岢岚县"
                }, {
                    id: "797",
                    name: "河曲县"
                }, {
                    id: "798",
                    name: "保德县"
                }, {
                    id: "799",
                    name: "偏关县"
                }, {
                    id: "800",
                    name: "原平市"
                }]
            }, {
                id: "150",
                name: "临汾市",
                child: [{
                    id: "801",
                    name: "尧都区"
                }, {
                    id: "802",
                    name: "曲沃县"
                }, {
                    id: "803",
                    name: "翼城县"
                }, {
                    id: "804",
                    name: "襄汾县"
                }, {
                    id: "805",
                    name: "洪洞县"
                }, {
                    id: "806",
                    name: "古县"
                }, {
                    id: "807",
                    name: "安泽县"
                }, {
                    id: "808",
                    name: "浮山县"
                }, {
                    id: "809",
                    name: "吉县"
                }, {
                    id: "810",
                    name: "乡宁县"
                }, {
                    id: "811",
                    name: "大宁县"
                }, {
                    id: "812",
                    name: "隰县"
                }, {
                    id: "813",
                    name: "永和县"
                }, {
                    id: "814",
                    name: "蒲县"
                }, {
                    id: "815",
                    name: "汾西县"
                }, {
                    id: "816",
                    name: "侯马市"
                }, {
                    id: "817",
                    name: "霍州市"
                }]
            }, {
                id: "151",
                name: "吕梁市",
                child: [{
                    id: "818",
                    name: "离石区"
                }, {
                    id: "819",
                    name: "文水县"
                }, {
                    id: "820",
                    name: "交城县"
                }, {
                    id: "821",
                    name: "兴县"
                }, {
                    id: "822",
                    name: "临县"
                }, {
                    id: "823",
                    name: "柳林县"
                }, {
                    id: "824",
                    name: "石楼县"
                }, {
                    id: "825",
                    name: "岚县"
                }, {
                    id: "826",
                    name: "方山县"
                }, {
                    id: "827",
                    name: "中阳县"
                }, {
                    id: "828",
                    name: "交口县"
                }, {
                    id: "829",
                    name: "孝义市"
                }, {
                    id: "830",
                    name: "汾阳市"
                }]
            }]
        }, {
            id: "8",
            name: "内蒙古",
            child: [{
                id: "152",
                name: "呼和浩特市",
                child: [{
                    id: "831",
                    name: "新城区"
                }, {
                    id: "832",
                    name: "回民区"
                }, {
                    id: "833",
                    name: "玉泉区"
                }, {
                    id: "834",
                    name: "赛罕区"
                }, {
                    id: "835",
                    name: "土默特左旗"
                }, {
                    id: "836",
                    name: "托克托县"
                }, {
                    id: "837",
                    name: "和林格尔县"
                }, {
                    id: "838",
                    name: "清水河县"
                }, {
                    id: "839",
                    name: "武川县"
                }]
            }, {
                id: "153",
                name: "包头市",
                child: [{
                    id: "840",
                    name: "东河区"
                }, {
                    id: "841",
                    name: "昆都仑区"
                }, {
                    id: "842",
                    name: "青山区"
                }, {
                    id: "843",
                    name: "石拐区"
                }, {
                    id: "844",
                    name: "白云矿区"
                }, {
                    id: "845",
                    name: "九原区"
                }, {
                    id: "846",
                    name: "土默特右旗"
                }, {
                    id: "847",
                    name: "固阳县"
                }, {
                    id: "848",
                    name: "达尔罕茂明安联合旗"
                }]
            }, {
                id: "154",
                name: "乌海市",
                child: [{
                    id: "849",
                    name: "海勃湾区"
                }, {
                    id: "850",
                    name: "海南区"
                }, {
                    id: "851",
                    name: "乌达区"
                }]
            }, {
                id: "155",
                name: "赤峰市",
                child: [{
                    id: "852",
                    name: "红山区"
                }, {
                    id: "853",
                    name: "元宝山区"
                }, {
                    id: "854",
                    name: "松山区"
                }, {
                    id: "855",
                    name: "阿鲁科尔沁旗"
                }, {
                    id: "856",
                    name: "巴林左旗"
                }, {
                    id: "857",
                    name: "巴林右旗"
                }, {
                    id: "858",
                    name: "林西县"
                }, {
                    id: "859",
                    name: "克什克腾旗"
                }, {
                    id: "860",
                    name: "翁牛特旗"
                }, {
                    id: "861",
                    name: "喀喇沁旗"
                }, {
                    id: "862",
                    name: "宁城县"
                }, {
                    id: "863",
                    name: "敖汉旗"
                }]
            }, {
                id: "156",
                name: "通辽市",
                child: [{
                    id: "864",
                    name: "科尔沁区"
                }, {
                    id: "865",
                    name: "科尔沁左翼中旗"
                }, {
                    id: "866",
                    name: "科尔沁左翼后旗"
                }, {
                    id: "867",
                    name: "开鲁县"
                }, {
                    id: "868",
                    name: "库伦旗"
                }, {
                    id: "869",
                    name: "奈曼旗"
                }, {
                    id: "870",
                    name: "扎鲁特旗"
                }, {
                    id: "871",
                    name: "霍林郭勒市"
                }]
            }, {
                id: "157",
                name: "鄂尔多斯市",
                child: [{
                    id: "872",
                    name: "东胜区"
                }, {
                    id: "873",
                    name: "达拉特旗"
                }, {
                    id: "874",
                    name: "准格尔旗"
                }, {
                    id: "875",
                    name: "鄂托克前旗"
                }, {
                    id: "876",
                    name: "鄂托克旗"
                }, {
                    id: "877",
                    name: "杭锦旗"
                }, {
                    id: "878",
                    name: "乌审旗"
                }, {
                    id: "879",
                    name: "伊金霍洛旗"
                }]
            }, {
                id: "158",
                name: "呼伦贝尔市",
                child: [{
                    id: "880",
                    name: "海拉尔区"
                }, {
                    id: "881",
                    name: "阿荣旗"
                }, {
                    id: "882",
                    name: "莫力达瓦达斡尔族自治旗"
                }, {
                    id: "883",
                    name: "鄂伦春自治旗"
                }, {
                    id: "884",
                    name: "鄂温克族自治旗"
                }, {
                    id: "885",
                    name: "陈巴尔虎旗"
                }, {
                    id: "886",
                    name: "新巴尔虎左旗"
                }, {
                    id: "887",
                    name: "新巴尔虎右旗"
                }, {
                    id: "888",
                    name: "满洲里市"
                }, {
                    id: "889",
                    name: "牙克石市"
                }, {
                    id: "890",
                    name: "扎兰屯市"
                }, {
                    id: "891",
                    name: "额尔古纳市"
                }, {
                    id: "892",
                    name: "根河市"
                }]
            }, {
                id: "159",
                name: "巴彦淖尔市",
                child: [{
                    id: "893",
                    name: "临河区"
                }, {
                    id: "894",
                    name: "五原县"
                }, {
                    id: "895",
                    name: "磴口县"
                }, {
                    id: "896",
                    name: "乌拉特前旗"
                }, {
                    id: "897",
                    name: "乌拉特中旗"
                }, {
                    id: "898",
                    name: "乌拉特后旗"
                }, {
                    id: "899",
                    name: "杭锦后旗"
                }]
            }, {
                id: "160",
                name: "乌兰察布市",
                child: [{
                    id: "900",
                    name: "集宁区"
                }, {
                    id: "901",
                    name: "卓资县"
                }, {
                    id: "902",
                    name: "化德县"
                }, {
                    id: "903",
                    name: "商都县"
                }, {
                    id: "904",
                    name: "兴和县"
                }, {
                    id: "905",
                    name: "凉城县"
                }, {
                    id: "906",
                    name: "察哈尔右翼前旗"
                }, {
                    id: "907",
                    name: "察哈尔右翼中旗"
                }, {
                    id: "908",
                    name: "察哈尔右翼后旗"
                }, {
                    id: "909",
                    name: "四子王旗"
                }, {
                    id: "910",
                    name: "丰镇市"
                }]
            }, {
                id: "161",
                name: "兴安盟",
                child: [{
                    id: "911",
                    name: "乌兰浩特市"
                }, {
                    id: "912",
                    name: "阿尔山市"
                }, {
                    id: "913",
                    name: "科尔沁右翼前旗"
                }, {
                    id: "914",
                    name: "科尔沁右翼中旗"
                }, {
                    id: "915",
                    name: "扎赉特旗"
                }, {
                    id: "916",
                    name: "突泉县"
                }]
            }, {
                id: "162",
                name: "锡林郭勒盟",
                child: [{
                    id: "917",
                    name: "二连浩特市"
                }, {
                    id: "918",
                    name: "锡林浩特市"
                }, {
                    id: "919",
                    name: "阿巴嘎旗"
                }, {
                    id: "920",
                    name: "苏尼特左旗"
                }, {
                    id: "921",
                    name: "苏尼特右旗"
                }, {
                    id: "922",
                    name: "东乌珠穆沁旗"
                }, {
                    id: "923",
                    name: "西乌珠穆沁旗"
                }, {
                    id: "924",
                    name: "太仆寺旗"
                }, {
                    id: "925",
                    name: "镶黄旗"
                }, {
                    id: "926",
                    name: "正镶白旗"
                }, {
                    id: "927",
                    name: "正蓝旗"
                }, {
                    id: "928",
                    name: "多伦县"
                }]
            }, {
                id: "163",
                name: "阿拉善盟",
                child: [{
                    id: "929",
                    name: "阿拉善左旗"
                }, {
                    id: "930",
                    name: "阿拉善右旗"
                }, {
                    id: "931",
                    name: "额济纳旗"
                }]
            }]
        }, {
            id: "9",
            name: "辽宁省",
            child: [{
                id: "164",
                name: "沈阳市",
                child: [{
                    id: "932",
                    name: "和平区"
                }, {
                    id: "933",
                    name: "沈河区"
                }, {
                    id: "934",
                    name: "大东区"
                }, {
                    id: "935",
                    name: "皇姑区"
                }, {
                    id: "936",
                    name: "铁西区"
                }, {
                    id: "937",
                    name: "苏家屯区"
                }, {
                    id: "938",
                    name: "东陵区"
                }, {
                    id: "939",
                    name: "新城子区"
                }, {
                    id: "940",
                    name: "于洪区"
                }, {
                    id: "941",
                    name: "辽中县"
                }, {
                    id: "942",
                    name: "康平县"
                }, {
                    id: "943",
                    name: "法库县"
                }, {
                    id: "944",
                    name: "新民市"
                }]
            }, {
                id: "165",
                name: "大连市",
                child: [{
                    id: "945",
                    name: "中山区"
                }, {
                    id: "946",
                    name: "西岗区"
                }, {
                    id: "947",
                    name: "沙河口区"
                }, {
                    id: "948",
                    name: "甘井子区"
                }, {
                    id: "949",
                    name: "旅顺口区"
                }, {
                    id: "950",
                    name: "金州区"
                }, {
                    id: "951",
                    name: "长海县"
                }, {
                    id: "952",
                    name: "瓦房店市"
                }, {
                    id: "953",
                    name: "普兰店市"
                }, {
                    id: "954",
                    name: "庄河市"
                }]
            }, {
                id: "166",
                name: "鞍山市",
                child: [{
                    id: "955",
                    name: "铁东区"
                }, {
                    id: "956",
                    name: "铁西区"
                }, {
                    id: "957",
                    name: "立山区"
                }, {
                    id: "958",
                    name: "千山区"
                }, {
                    id: "959",
                    name: "台安县"
                }, {
                    id: "960",
                    name: "岫岩满族自治县"
                }, {
                    id: "961",
                    name: "海城市"
                }]
            }, {
                id: "167",
                name: "抚顺市",
                child: [{
                    id: "962",
                    name: "新抚区"
                }, {
                    id: "963",
                    name: "东洲区"
                }, {
                    id: "964",
                    name: "望花区"
                }, {
                    id: "965",
                    name: "顺城区"
                }, {
                    id: "966",
                    name: "抚顺县"
                }, {
                    id: "967",
                    name: "新宾满族自治县"
                }, {
                    id: "968",
                    name: "清原满族自治县"
                }]
            }, {
                id: "168",
                name: "本溪市",
                child: [{
                    id: "969",
                    name: "平山区"
                }, {
                    id: "970",
                    name: "溪湖区"
                }, {
                    id: "971",
                    name: "明山区"
                }, {
                    id: "972",
                    name: "南芬区"
                }, {
                    id: "973",
                    name: "本溪满族自治县"
                }, {
                    id: "974",
                    name: "桓仁满族自治县"
                }]
            }, {
                id: "169",
                name: "丹东市",
                child: [{
                    id: "975",
                    name: "元宝区"
                }, {
                    id: "976",
                    name: "振兴区"
                }, {
                    id: "977",
                    name: "振安区"
                }, {
                    id: "978",
                    name: "宽甸满族自治县"
                }, {
                    id: "979",
                    name: "东港市"
                }, {
                    id: "980",
                    name: "凤城市"
                }]
            }, {
                id: "170",
                name: "锦州市",
                child: [{
                    id: "981",
                    name: "古塔区"
                }, {
                    id: "982",
                    name: "凌河区"
                }, {
                    id: "983",
                    name: "太和区"
                }, {
                    id: "984",
                    name: "黑山县"
                }, {
                    id: "985",
                    name: "义县"
                }, {
                    id: "986",
                    name: "凌海市"
                }, {
                    id: "987",
                    name: "北镇市"
                }]
            }, {
                id: "171",
                name: "营口市",
                child: [{
                    id: "988",
                    name: "站前区"
                }, {
                    id: "989",
                    name: "西市区"
                }, {
                    id: "990",
                    name: "鲅鱼圈区"
                }, {
                    id: "991",
                    name: "老边区"
                }, {
                    id: "992",
                    name: "盖州市"
                }, {
                    id: "993",
                    name: "大石桥市"
                }]
            }, {
                id: "172",
                name: "阜新市",
                child: [{
                    id: "994",
                    name: "海州区"
                }, {
                    id: "995",
                    name: "新邱区"
                }, {
                    id: "996",
                    name: "太平区"
                }, {
                    id: "997",
                    name: "清河门区"
                }, {
                    id: "998",
                    name: "细河区"
                }, {
                    id: "999",
                    name: "阜新蒙古族自治县"
                }, {
                    id: "1000",
                    name: "彰武县"
                }]
            }, {
                id: "173",
                name: "辽阳市",
                child: [{
                    id: "1001",
                    name: "白塔区"
                }, {
                    id: "1002",
                    name: "文圣区"
                }, {
                    id: "1003",
                    name: "宏伟区"
                }, {
                    id: "1004",
                    name: "弓长岭区"
                }, {
                    id: "1005",
                    name: "太子河区"
                }, {
                    id: "1006",
                    name: "辽阳县"
                }, {
                    id: "1007",
                    name: "灯塔市"
                }]
            }, {
                id: "174",
                name: "盘锦市",
                child: [{
                    id: "1008",
                    name: "双台子区"
                }, {
                    id: "1009",
                    name: "兴隆台区"
                }, {
                    id: "1010",
                    name: "大洼县"
                }, {
                    id: "1011",
                    name: "盘山县"
                }]
            }, {
                id: "175",
                name: "铁岭市",
                child: [{
                    id: "1012",
                    name: "银州区"
                }, {
                    id: "1013",
                    name: "清河区"
                }, {
                    id: "1014",
                    name: "铁岭县"
                }, {
                    id: "1015",
                    name: "西丰县"
                }, {
                    id: "1016",
                    name: "昌图县"
                }, {
                    id: "1017",
                    name: "调兵山市"
                }, {
                    id: "1018",
                    name: "开原市"
                }]
            }, {
                id: "176",
                name: "朝阳市",
                child: [{
                    id: "1019",
                    name: "双塔区"
                }, {
                    id: "1020",
                    name: "龙城区"
                }, {
                    id: "1021",
                    name: "朝阳县"
                }, {
                    id: "1022",
                    name: "建平县"
                }, {
                    id: "1023",
                    name: "喀喇沁左翼蒙古族自治县"
                }, {
                    id: "1024",
                    name: "北票市"
                }, {
                    id: "1025",
                    name: "凌源市"
                }]
            }, {
                id: "177",
                name: "葫芦岛市",
                child: [{
                    id: "1026",
                    name: "连山区"
                }, {
                    id: "1027",
                    name: "龙港区"
                }, {
                    id: "1028",
                    name: "南票区"
                }, {
                    id: "1029",
                    name: "绥中县"
                }, {
                    id: "1030",
                    name: "建昌县"
                }, {
                    id: "1031",
                    name: "兴城市"
                }]
            }]
        }, {
            id: "10",
            name: "吉林省",
            child: [{
                id: "178",
                name: "长春市",
                child: [{
                    id: "1032",
                    name: "南关区"
                }, {
                    id: "1033",
                    name: "宽城区"
                }, {
                    id: "1034",
                    name: "朝阳区"
                }, {
                    id: "1035",
                    name: "二道区"
                }, {
                    id: "1036",
                    name: "绿园区"
                }, {
                    id: "1037",
                    name: "双阳区"
                }, {
                    id: "1038",
                    name: "农安县"
                }, {
                    id: "1039",
                    name: "九台市"
                }, {
                    id: "1040",
                    name: "榆树市"
                }, {
                    id: "1041",
                    name: "德惠市"
                }]
            }, {
                id: "179",
                name: "吉林市",
                child: [{
                    id: "1042",
                    name: "昌邑区"
                }, {
                    id: "1043",
                    name: "龙潭区"
                }, {
                    id: "1044",
                    name: "船营区"
                }, {
                    id: "1045",
                    name: "丰满区"
                }, {
                    id: "1046",
                    name: "永吉县"
                }, {
                    id: "1047",
                    name: "蛟河市"
                }, {
                    id: "1048",
                    name: "桦甸市"
                }, {
                    id: "1049",
                    name: "舒兰市"
                }, {
                    id: "1050",
                    name: "磐石市"
                }]
            }, {
                id: "180",
                name: "四平市",
                child: [{
                    id: "1051",
                    name: "铁西区"
                }, {
                    id: "1052",
                    name: "铁东区"
                }, {
                    id: "1053",
                    name: "梨树县"
                }, {
                    id: "1054",
                    name: "伊通满族自治县"
                }, {
                    id: "1055",
                    name: "公主岭市"
                }, {
                    id: "1056",
                    name: "双辽市"
                }]
            }, {
                id: "181",
                name: "辽源市",
                child: [{
                    id: "1057",
                    name: "龙山区"
                }, {
                    id: "1058",
                    name: "西安区"
                }, {
                    id: "1059",
                    name: "东丰县"
                }, {
                    id: "1060",
                    name: "东辽县"
                }]
            }, {
                id: "182",
                name: "通化市",
                child: [{
                    id: "1061",
                    name: "东昌区"
                }, {
                    id: "1062",
                    name: "二道江区"
                }, {
                    id: "1063",
                    name: "通化县"
                }, {
                    id: "1064",
                    name: "辉南县"
                }, {
                    id: "1065",
                    name: "柳河县"
                }, {
                    id: "1066",
                    name: "梅河口市"
                }, {
                    id: "1067",
                    name: "集安市"
                }]
            }, {
                id: "183",
                name: "白山市",
                child: [{
                    id: "1068",
                    name: "八道江区"
                }, {
                    id: "1069",
                    name: "抚松县"
                }, {
                    id: "1070",
                    name: "靖宇县"
                }, {
                    id: "1071",
                    name: "长白朝鲜族自治县"
                }, {
                    id: "1072",
                    name: "江源县"
                }, {
                    id: "1073",
                    name: "临江市"
                }]
            }, {
                id: "184",
                name: "松原市",
                child: [{
                    id: "1074",
                    name: "宁江区"
                }, {
                    id: "1075",
                    name: "前郭尔罗斯蒙古族自治县"
                }, {
                    id: "1076",
                    name: "长岭县"
                }, {
                    id: "1077",
                    name: "乾安县"
                }, {
                    id: "1078",
                    name: "扶余县"
                }]
            }, {
                id: "185",
                name: "白城市",
                child: [{
                    id: "1079",
                    name: "洮北区"
                }, {
                    id: "1080",
                    name: "镇赉县"
                }, {
                    id: "1081",
                    name: "通榆县"
                }, {
                    id: "1082",
                    name: "洮南市"
                }, {
                    id: "1083",
                    name: "大安市"
                }]
            }, {
                id: "186",
                name: "延边",
                child: [{
                    id: "1084",
                    name: "延吉市"
                }, {
                    id: "1085",
                    name: "图们市"
                }, {
                    id: "1086",
                    name: "敦化市"
                }, {
                    id: "1087",
                    name: "珲春市"
                }, {
                    id: "1088",
                    name: "龙井市"
                }, {
                    id: "1089",
                    name: "和龙市"
                }, {
                    id: "1090",
                    name: "汪清县"
                }, {
                    id: "1091",
                    name: "安图县"
                }]
            }]
        }, {
            id: "11",
            name: "黑龙江省",
            child: [{
                id: "187",
                name: "哈尔滨市",
                child: [{
                    id: "1092",
                    name: "道里区"
                }, {
                    id: "1093",
                    name: "南岗区"
                }, {
                    id: "1094",
                    name: "道外区"
                }, {
                    id: "1095",
                    name: "香坊区"
                }, {
                    id: "1096",
                    name: "动力区"
                }, {
                    id: "1097",
                    name: "平房区"
                }, {
                    id: "1098",
                    name: "松北区"
                }, {
                    id: "1099",
                    name: "呼兰区"
                }, {
                    id: "1100",
                    name: "依兰县"
                }, {
                    id: "1101",
                    name: "方正县"
                }, {
                    id: "1102",
                    name: "宾县"
                }, {
                    id: "1103",
                    name: "巴彦县"
                }, {
                    id: "1104",
                    name: "木兰县"
                }, {
                    id: "1105",
                    name: "通河县"
                }, {
                    id: "1106",
                    name: "延寿县"
                }, {
                    id: "1107",
                    name: "阿城市"
                }, {
                    id: "1108",
                    name: "双城市"
                }, {
                    id: "1109",
                    name: "尚志市"
                }, {
                    id: "1110",
                    name: "五常市"
                }]
            }, {
                id: "188",
                name: "齐齐哈尔市",
                child: [{
                    id: "1111",
                    name: "龙沙区"
                }, {
                    id: "1112",
                    name: "建华区"
                }, {
                    id: "1113",
                    name: "铁锋区"
                }, {
                    id: "1114",
                    name: "昂昂溪区"
                }, {
                    id: "1115",
                    name: "富拉尔基区"
                }, {
                    id: "1116",
                    name: "碾子山区"
                }, {
                    id: "1117",
                    name: "梅里斯达斡尔族区"
                }, {
                    id: "1118",
                    name: "龙江县"
                }, {
                    id: "1119",
                    name: "依安县"
                }, {
                    id: "1120",
                    name: "泰来县"
                }, {
                    id: "1121",
                    name: "甘南县"
                }, {
                    id: "1122",
                    name: "富裕县"
                }, {
                    id: "1123",
                    name: "克山县"
                }, {
                    id: "1124",
                    name: "克东县"
                }, {
                    id: "1125",
                    name: "拜泉县"
                }, {
                    id: "1126",
                    name: "讷河市"
                }]
            }, {
                id: "189",
                name: "鸡西市",
                child: [{
                    id: "1127",
                    name: "鸡冠区"
                }, {
                    id: "1128",
                    name: "恒山区"
                }, {
                    id: "1129",
                    name: "滴道区"
                }, {
                    id: "1130",
                    name: "梨树区"
                }, {
                    id: "1131",
                    name: "城子河区"
                }, {
                    id: "1132",
                    name: "麻山区"
                }, {
                    id: "1133",
                    name: "鸡东县"
                }, {
                    id: "1134",
                    name: "虎林市"
                }, {
                    id: "1135",
                    name: "密山市"
                }]
            }, {
                id: "190",
                name: "鹤岗市",
                child: [{
                    id: "1136",
                    name: "向阳区"
                }, {
                    id: "1137",
                    name: "工农区"
                }, {
                    id: "1138",
                    name: "南山区"
                }, {
                    id: "1139",
                    name: "兴安区"
                }, {
                    id: "1140",
                    name: "东山区"
                }, {
                    id: "1141",
                    name: "兴山区"
                }, {
                    id: "1142",
                    name: "萝北县"
                }, {
                    id: "1143",
                    name: "绥滨县"
                }]
            }, {
                id: "191",
                name: "双鸭山市",
                child: [{
                    id: "1144",
                    name: "尖山区"
                }, {
                    id: "1145",
                    name: "岭东区"
                }, {
                    id: "1146",
                    name: "四方台区"
                }, {
                    id: "1147",
                    name: "宝山区"
                }, {
                    id: "1148",
                    name: "集贤县"
                }, {
                    id: "1149",
                    name: "友谊县"
                }, {
                    id: "1150",
                    name: "宝清县"
                }, {
                    id: "1151",
                    name: "饶河县"
                }]
            }, {
                id: "192",
                name: "大庆市",
                child: [{
                    id: "1152",
                    name: "萨尔图区"
                }, {
                    id: "1153",
                    name: "龙凤区"
                }, {
                    id: "1154",
                    name: "让胡路区"
                }, {
                    id: "1155",
                    name: "红岗区"
                }, {
                    id: "1156",
                    name: "大同区"
                }, {
                    id: "1157",
                    name: "肇州县"
                }, {
                    id: "1158",
                    name: "肇源县"
                }, {
                    id: "1159",
                    name: "林甸县"
                }, {
                    id: "1160",
                    name: "杜尔伯特蒙古族自治县"
                }]
            }, {
                id: "193",
                name: "伊春市",
                child: [{
                    id: "1161",
                    name: "伊春区"
                }, {
                    id: "1162",
                    name: "南岔区"
                }, {
                    id: "1163",
                    name: "友好区"
                }, {
                    id: "1164",
                    name: "西林区"
                }, {
                    id: "1165",
                    name: "翠峦区"
                }, {
                    id: "1166",
                    name: "新青区"
                }, {
                    id: "1167",
                    name: "美溪区"
                }, {
                    id: "1168",
                    name: "金山屯区"
                }, {
                    id: "1169",
                    name: "五营区"
                }, {
                    id: "1170",
                    name: "乌马河区"
                }, {
                    id: "1171",
                    name: "汤旺河区"
                }, {
                    id: "1172",
                    name: "带岭区"
                }, {
                    id: "1173",
                    name: "乌伊岭区"
                }, {
                    id: "1174",
                    name: "红星区"
                }, {
                    id: "1175",
                    name: "上甘岭区"
                }, {
                    id: "1176",
                    name: "嘉荫县"
                }, {
                    id: "1177",
                    name: "铁力市"
                }]
            }, {
                id: "194",
                name: "佳木斯市",
                child: [{
                    id: "1178",
                    name: "永红区"
                }, {
                    id: "1179",
                    name: "向阳区"
                }, {
                    id: "1180",
                    name: "前进区"
                }, {
                    id: "1181",
                    name: "东风区"
                }, {
                    id: "1182",
                    name: "郊区"
                }, {
                    id: "1183",
                    name: "桦南县"
                }, {
                    id: "1184",
                    name: "桦川县"
                }, {
                    id: "1185",
                    name: "汤原县"
                }, {
                    id: "1186",
                    name: "抚远县"
                }, {
                    id: "1187",
                    name: "同江市"
                }, {
                    id: "1188",
                    name: "富锦市"
                }]
            }, {
                id: "195",
                name: "七台河市",
                child: [{
                    id: "1189",
                    name: "新兴区"
                }, {
                    id: "1190",
                    name: "桃山区"
                }, {
                    id: "1191",
                    name: "茄子河区"
                }, {
                    id: "1192",
                    name: "勃利县"
                }]
            }, {
                id: "196",
                name: "牡丹江市",
                child: [{
                    id: "1193",
                    name: "东安区"
                }, {
                    id: "1194",
                    name: "阳明区"
                }, {
                    id: "1195",
                    name: "爱民区"
                }, {
                    id: "1196",
                    name: "西安区"
                }, {
                    id: "1197",
                    name: "东宁县"
                }, {
                    id: "1198",
                    name: "林口县"
                }, {
                    id: "1199",
                    name: "绥芬河市"
                }, {
                    id: "1200",
                    name: "海林市"
                }, {
                    id: "1201",
                    name: "宁安市"
                }, {
                    id: "1202",
                    name: "穆棱市"
                }]
            }, {
                id: "197",
                name: "黑河市",
                child: [{
                    id: "1203",
                    name: "爱辉区"
                }, {
                    id: "1204",
                    name: "嫩江县"
                }, {
                    id: "1205",
                    name: "逊克县"
                }, {
                    id: "1206",
                    name: "孙吴县"
                }, {
                    id: "1207",
                    name: "北安市"
                }, {
                    id: "1208",
                    name: "五大连池市"
                }]
            }, {
                id: "198",
                name: "绥化市",
                child: [{
                    id: "1209",
                    name: "北林区"
                }, {
                    id: "1210",
                    name: "望奎县"
                }, {
                    id: "1211",
                    name: "兰西县"
                }, {
                    id: "1212",
                    name: "青冈县"
                }, {
                    id: "1213",
                    name: "庆安县"
                }, {
                    id: "1214",
                    name: "明水县"
                }, {
                    id: "1215",
                    name: "绥棱县"
                }, {
                    id: "1216",
                    name: "安达市"
                }, {
                    id: "1217",
                    name: "肇东市"
                }, {
                    id: "1218",
                    name: "海伦市"
                }]
            }, {
                id: "199",
                name: "大兴安岭地区",
                child: [{
                    id: "1219",
                    name: "呼玛县"
                }, {
                    id: "1220",
                    name: "塔河县"
                }, {
                    id: "1221",
                    name: "漠河县"
                }]
            }]
        }, {
            id: "12",
            name: "江苏省",
            child: [{
                id: "200",
                name: "南京市",
                child: [{
                    id: "1222",
                    name: "玄武区"
                }, {
                    id: "1223",
                    name: "白下区"
                }, {
                    id: "1224",
                    name: "秦淮区"
                }, {
                    id: "1225",
                    name: "建邺区"
                }, {
                    id: "1226",
                    name: "鼓楼区"
                }, {
                    id: "1227",
                    name: "下关区"
                }, {
                    id: "1228",
                    name: "浦口区"
                }, {
                    id: "1229",
                    name: "栖霞区"
                }, {
                    id: "1230",
                    name: "雨花台区"
                }, {
                    id: "1231",
                    name: "江宁区"
                }, {
                    id: "1232",
                    name: "六合区"
                }, {
                    id: "1233",
                    name: "溧水县"
                }, {
                    id: "1234",
                    name: "高淳县"
                }]
            }, {
                id: "201",
                name: "无锡市",
                child: [{
                    id: "1235",
                    name: "崇安区"
                }, {
                    id: "1236",
                    name: "南长区"
                }, {
                    id: "1237",
                    name: "北塘区"
                }, {
                    id: "1238",
                    name: "锡山区"
                }, {
                    id: "1239",
                    name: "惠山区"
                }, {
                    id: "1240",
                    name: "滨湖区"
                }, {
                    id: "1241",
                    name: "江阴市"
                }, {
                    id: "1242",
                    name: "宜兴市"
                }]
            }, {
                id: "202",
                name: "徐州市",
                child: [{
                    id: "1243",
                    name: "鼓楼区"
                }, {
                    id: "1244",
                    name: "云龙区"
                }, {
                    id: "1245",
                    name: "九里区"
                }, {
                    id: "1246",
                    name: "贾汪区"
                }, {
                    id: "1247",
                    name: "泉山区"
                }, {
                    id: "1248",
                    name: "丰县"
                }, {
                    id: "1249",
                    name: "沛县"
                }, {
                    id: "1250",
                    name: "铜山县"
                }, {
                    id: "1251",
                    name: "睢宁县"
                }, {
                    id: "1252",
                    name: "新沂市"
                }, {
                    id: "1253",
                    name: "邳州市"
                }]
            }, {
                id: "203",
                name: "常州市",
                child: [{
                    id: "1254",
                    name: "天宁区"
                }, {
                    id: "1255",
                    name: "钟楼区"
                }, {
                    id: "1256",
                    name: "戚墅堰区"
                }, {
                    id: "1257",
                    name: "新北区"
                }, {
                    id: "1258",
                    name: "武进区"
                }, {
                    id: "1259",
                    name: "溧阳市"
                }, {
                    id: "1260",
                    name: "金坛市"
                }]
            }, {
                id: "204",
                name: "苏州市",
                child: [{
                    id: "1261",
                    name: "沧浪区"
                }, {
                    id: "1262",
                    name: "平江区"
                }, {
                    id: "1263",
                    name: "金阊区"
                }, {
                    id: "1264",
                    name: "虎丘区"
                }, {
                    id: "1265",
                    name: "吴中区"
                }, {
                    id: "1266",
                    name: "相城区"
                }, {
                    id: "1267",
                    name: "常熟市"
                }, {
                    id: "1268",
                    name: "张家港市"
                }, {
                    id: "1269",
                    name: "昆山市"
                }, {
                    id: "1270",
                    name: "吴江市"
                }, {
                    id: "1271",
                    name: "太仓市"
                }]
            }, {
                id: "205",
                name: "南通市",
                child: [{
                    id: "1272",
                    name: "崇川区"
                }, {
                    id: "1273",
                    name: "港闸区"
                }, {
                    id: "1274",
                    name: "海安县"
                }, {
                    id: "1275",
                    name: "如东县"
                }, {
                    id: "1276",
                    name: "启东市"
                }, {
                    id: "1277",
                    name: "如皋市"
                }, {
                    id: "1278",
                    name: "通州市"
                }, {
                    id: "1279",
                    name: "海门市"
                }]
            }, {
                id: "206",
                name: "连云港市",
                child: [{
                    id: "1280",
                    name: "连云区"
                }, {
                    id: "1281",
                    name: "新浦区"
                }, {
                    id: "1282",
                    name: "海州区"
                }, {
                    id: "1283",
                    name: "赣榆县"
                }, {
                    id: "1284",
                    name: "东海县"
                }, {
                    id: "1285",
                    name: "灌云县"
                }, {
                    id: "1286",
                    name: "灌南县"
                }]
            }, {
                id: "207",
                name: "淮安市",
                child: [{
                    id: "1287",
                    name: "清河区"
                }, {
                    id: "1288",
                    name: "楚州区"
                }, {
                    id: "1289",
                    name: "淮阴区"
                }, {
                    id: "1290",
                    name: "清浦区"
                }, {
                    id: "1291",
                    name: "涟水县"
                }, {
                    id: "1292",
                    name: "洪泽县"
                }, {
                    id: "1293",
                    name: "盱眙县"
                }, {
                    id: "1294",
                    name: "金湖县"
                }]
            }, {
                id: "208",
                name: "盐城市",
                child: [{
                    id: "1295",
                    name: "亭湖区"
                }, {
                    id: "1296",
                    name: "盐都区"
                }, {
                    id: "1297",
                    name: "响水县"
                }, {
                    id: "1298",
                    name: "滨海县"
                }, {
                    id: "1299",
                    name: "阜宁县"
                }, {
                    id: "1300",
                    name: "射阳县"
                }, {
                    id: "1301",
                    name: "建湖县"
                }, {
                    id: "1302",
                    name: "东台市"
                }, {
                    id: "1303",
                    name: "大丰市"
                }]
            }, {
                id: "209",
                name: "扬州市",
                child: [{
                    id: "1304",
                    name: "广陵区"
                }, {
                    id: "1305",
                    name: "邗江区"
                }, {
                    id: "1306",
                    name: "维扬区"
                }, {
                    id: "1307",
                    name: "宝应县"
                }, {
                    id: "1308",
                    name: "仪征市"
                }, {
                    id: "1309",
                    name: "高邮市"
                }, {
                    id: "1310",
                    name: "江都市"
                }]
            }, {
                id: "210",
                name: "镇江市",
                child: [{
                    id: "1311",
                    name: "京口区"
                }, {
                    id: "1312",
                    name: "润州区"
                }, {
                    id: "1313",
                    name: "丹徒区"
                }, {
                    id: "1314",
                    name: "丹阳市"
                }, {
                    id: "1315",
                    name: "扬中市"
                }, {
                    id: "1316",
                    name: "句容市"
                }]
            }, {
                id: "211",
                name: "泰州市",
                child: [{
                    id: "1317",
                    name: "海陵区"
                }, {
                    id: "1318",
                    name: "高港区"
                }, {
                    id: "1319",
                    name: "兴化市"
                }, {
                    id: "1320",
                    name: "靖江市"
                }, {
                    id: "1321",
                    name: "泰兴市"
                }, {
                    id: "1322",
                    name: "姜堰市"
                }]
            }, {
                id: "212",
                name: "宿迁市",
                child: [{
                    id: "1323",
                    name: "宿城区"
                }, {
                    id: "1324",
                    name: "宿豫区"
                }, {
                    id: "1325",
                    name: "沭阳县"
                }, {
                    id: "1326",
                    name: "泗阳县"
                }, {
                    id: "1327",
                    name: "泗洪县"
                }]
            }]
        }, {
            id: "13",
            name: "浙江省",
            child: [{
                id: "213",
                name: "杭州市",
                child: [{
                    id: "1328",
                    name: "上城区"
                }, {
                    id: "1329",
                    name: "下城区"
                }, {
                    id: "1330",
                    name: "江干区"
                }, {
                    id: "1331",
                    name: "拱墅区"
                }, {
                    id: "1332",
                    name: "西湖区"
                }, {
                    id: "1333",
                    name: "滨江区"
                }, {
                    id: "1334",
                    name: "萧山区"
                }, {
                    id: "1335",
                    name: "余杭区"
                }, {
                    id: "1336",
                    name: "桐庐县"
                }, {
                    id: "1337",
                    name: "淳安县"
                }, {
                    id: "1338",
                    name: "建德市"
                }, {
                    id: "1339",
                    name: "富阳市"
                }, {
                    id: "1340",
                    name: "临安市"
                }]
            }, {
                id: "214",
                name: "宁波市",
                child: [{
                    id: "1341",
                    name: "海曙区"
                }, {
                    id: "1342",
                    name: "江东区"
                }, {
                    id: "1343",
                    name: "江北区"
                }, {
                    id: "1344",
                    name: "北仑区"
                }, {
                    id: "1345",
                    name: "镇海区"
                }, {
                    id: "1346",
                    name: "鄞州区"
                }, {
                    id: "1347",
                    name: "象山县"
                }, {
                    id: "1348",
                    name: "宁海县"
                }, {
                    id: "1349",
                    name: "余姚市"
                }, {
                    id: "1350",
                    name: "慈溪市"
                }, {
                    id: "1351",
                    name: "奉化市"
                }]
            }, {
                id: "215",
                name: "温州市",
                child: [{
                    id: "1352",
                    name: "鹿城区"
                }, {
                    id: "1353",
                    name: "龙湾区"
                }, {
                    id: "1354",
                    name: "瓯海区"
                }, {
                    id: "1355",
                    name: "洞头县"
                }, {
                    id: "1356",
                    name: "永嘉县"
                }, {
                    id: "1357",
                    name: "平阳县"
                }, {
                    id: "1358",
                    name: "苍南县"
                }, {
                    id: "1359",
                    name: "文成县"
                }, {
                    id: "1360",
                    name: "泰顺县"
                }, {
                    id: "1361",
                    name: "瑞安市"
                }, {
                    id: "1362",
                    name: "乐清市"
                }]
            }, {
                id: "216",
                name: "嘉兴市",
                child: [{
                    id: "1363",
                    name: "秀城区"
                }, {
                    id: "1364",
                    name: "秀洲区"
                }, {
                    id: "1365",
                    name: "嘉善县"
                }, {
                    id: "1366",
                    name: "海盐县"
                }, {
                    id: "1367",
                    name: "海宁市"
                }, {
                    id: "1368",
                    name: "平湖市"
                }, {
                    id: "1369",
                    name: "桐乡市"
                }]
            }, {
                id: "217",
                name: "湖州市",
                child: [{
                    id: "1370",
                    name: "吴兴区"
                }, {
                    id: "1371",
                    name: "南浔区"
                }, {
                    id: "1372",
                    name: "德清县"
                }, {
                    id: "1373",
                    name: "长兴县"
                }, {
                    id: "1374",
                    name: "安吉县"
                }]
            }, {
                id: "218",
                name: "绍兴市",
                child: [{
                    id: "1375",
                    name: "越城区"
                }, {
                    id: "1376",
                    name: "绍兴县"
                }, {
                    id: "1377",
                    name: "新昌县"
                }, {
                    id: "1378",
                    name: "诸暨市"
                }, {
                    id: "1379",
                    name: "上虞市"
                }, {
                    id: "1380",
                    name: "嵊州市"
                }]
            }, {
                id: "219",
                name: "金华市",
                child: [{
                    id: "1381",
                    name: "婺城区"
                }, {
                    id: "1382",
                    name: "金东区"
                }, {
                    id: "1383",
                    name: "武义县"
                }, {
                    id: "1384",
                    name: "浦江县"
                }, {
                    id: "1385",
                    name: "磐安县"
                }, {
                    id: "1386",
                    name: "兰溪市"
                }, {
                    id: "1387",
                    name: "义乌市"
                }, {
                    id: "1388",
                    name: "东阳市"
                }, {
                    id: "1389",
                    name: "永康市"
                }]
            }, {
                id: "220",
                name: "衢州市",
                child: [{
                    id: "1390",
                    name: "柯城区"
                }, {
                    id: "1391",
                    name: "衢江区"
                }, {
                    id: "1392",
                    name: "常山县"
                }, {
                    id: "1393",
                    name: "开化县"
                }, {
                    id: "1394",
                    name: "龙游县"
                }, {
                    id: "1395",
                    name: "江山市"
                }]
            }, {
                id: "221",
                name: "舟山市",
                child: [{
                    id: "1396",
                    name: "定海区"
                }, {
                    id: "1397",
                    name: "普陀区"
                }, {
                    id: "1398",
                    name: "岱山县"
                }, {
                    id: "1399",
                    name: "嵊泗县"
                }]
            }, {
                id: "222",
                name: "台州市",
                child: [{
                    id: "1400",
                    name: "椒江区"
                }, {
                    id: "1401",
                    name: "黄岩区"
                }, {
                    id: "1402",
                    name: "路桥区"
                }, {
                    id: "1403",
                    name: "玉环县"
                }, {
                    id: "1404",
                    name: "三门县"
                }, {
                    id: "1405",
                    name: "天台县"
                }, {
                    id: "1406",
                    name: "仙居县"
                }, {
                    id: "1407",
                    name: "温岭市"
                }, {
                    id: "1408",
                    name: "临海市"
                }]
            }, {
                id: "223",
                name: "丽水市",
                child: [{
                    id: "1409",
                    name: "莲都区"
                }, {
                    id: "1410",
                    name: "青田县"
                }, {
                    id: "1411",
                    name: "缙云县"
                }, {
                    id: "1412",
                    name: "遂昌县"
                }, {
                    id: "1413",
                    name: "松阳县"
                }, {
                    id: "1414",
                    name: "云和县"
                }, {
                    id: "1415",
                    name: "庆元县"
                }, {
                    id: "1416",
                    name: "景宁畲族自治县"
                }, {
                    id: "1417",
                    name: "龙泉市"
                }]
            }]
        }, {
            id: "14",
            name: "安徽省",
            child: [{
                id: "224",
                name: "合肥市",
                child: [{
                    id: "1418",
                    name: "瑶海区"
                }, {
                    id: "1419",
                    name: "庐阳区"
                }, {
                    id: "1420",
                    name: "蜀山区"
                }, {
                    id: "1421",
                    name: "包河区"
                }, {
                    id: "1422",
                    name: "长丰县"
                }, {
                    id: "1423",
                    name: "肥东县"
                }, {
                    id: "1424",
                    name: "肥西县"
                }]
            }, {
                id: "225",
                name: "芜湖市",
                child: [{
                    id: "1425",
                    name: "镜湖区"
                }, {
                    id: "1426",
                    name: "弋江区"
                }, {
                    id: "1427",
                    name: "鸠江区"
                }, {
                    id: "1428",
                    name: "三山区"
                }, {
                    id: "1429",
                    name: "芜湖县"
                }, {
                    id: "1430",
                    name: "繁昌县"
                }, {
                    id: "1431",
                    name: "南陵县"
                }]
            }, {
                id: "226",
                name: "蚌埠市",
                child: [{
                    id: "1432",
                    name: "龙子湖区"
                }, {
                    id: "1433",
                    name: "蚌山区"
                }, {
                    id: "1434",
                    name: "禹会区"
                }, {
                    id: "1435",
                    name: "淮上区"
                }, {
                    id: "1436",
                    name: "怀远县"
                }, {
                    id: "1437",
                    name: "五河县"
                }, {
                    id: "1438",
                    name: "固镇县"
                }]
            }, {
                id: "227",
                name: "淮南市",
                child: [{
                    id: "1439",
                    name: "大通区"
                }, {
                    id: "1440",
                    name: "田家庵区"
                }, {
                    id: "1441",
                    name: "谢家集区"
                }, {
                    id: "1442",
                    name: "八公山区"
                }, {
                    id: "1443",
                    name: "潘集区"
                }, {
                    id: "1444",
                    name: "凤台县"
                }]
            }, {
                id: "228",
                name: "马鞍山市",
                child: [{
                    id: "1445",
                    name: "金家庄区"
                }, {
                    id: "1446",
                    name: "花山区"
                }, {
                    id: "1447",
                    name: "雨山区"
                }, {
                    id: "1448",
                    name: "当涂县"
                }]
            }, {
                id: "229",
                name: "淮北市",
                child: [{
                    id: "1449",
                    name: "杜集区"
                }, {
                    id: "1450",
                    name: "相山区"
                }, {
                    id: "1451",
                    name: "烈山区"
                }, {
                    id: "1452",
                    name: "濉溪县"
                }]
            }, {
                id: "230",
                name: "铜陵市",
                child: [{
                    id: "1453",
                    name: "铜官山区"
                }, {
                    id: "1454",
                    name: "狮子山区"
                }, {
                    id: "1455",
                    name: "郊区"
                }, {
                    id: "1456",
                    name: "铜陵县"
                }]
            }, {
                id: "231",
                name: "安庆市",
                child: [{
                    id: "1457",
                    name: "迎江区"
                }, {
                    id: "1458",
                    name: "大观区"
                }, {
                    id: "1459",
                    name: "宜秀区"
                }, {
                    id: "1460",
                    name: "怀宁县"
                }, {
                    id: "1461",
                    name: "枞阳县"
                }, {
                    id: "1462",
                    name: "潜山县"
                }, {
                    id: "1463",
                    name: "太湖县"
                }, {
                    id: "1464",
                    name: "宿松县"
                }, {
                    id: "1465",
                    name: "望江县"
                }, {
                    id: "1466",
                    name: "岳西县"
                }, {
                    id: "1467",
                    name: "桐城市"
                }]
            }, {
                id: "232",
                name: "黄山市",
                child: [{
                    id: "1468",
                    name: "屯溪区"
                }, {
                    id: "1469",
                    name: "黄山区"
                }, {
                    id: "1470",
                    name: "徽州区"
                }, {
                    id: "1471",
                    name: "歙县"
                }, {
                    id: "1472",
                    name: "休宁县"
                }, {
                    id: "1473",
                    name: "黟县"
                }, {
                    id: "1474",
                    name: "祁门县"
                }]
            }, {
                id: "233",
                name: "滁州市",
                child: [{
                    id: "1475",
                    name: "琅琊区"
                }, {
                    id: "1476",
                    name: "南谯区"
                }, {
                    id: "1477",
                    name: "来安县"
                }, {
                    id: "1478",
                    name: "全椒县"
                }, {
                    id: "1479",
                    name: "定远县"
                }, {
                    id: "1480",
                    name: "凤阳县"
                }, {
                    id: "1481",
                    name: "天长市"
                }, {
                    id: "1482",
                    name: "明光市"
                }]
            }, {
                id: "234",
                name: "阜阳市",
                child: [{
                    id: "1483",
                    name: "颍州区"
                }, {
                    id: "1484",
                    name: "颍东区"
                }, {
                    id: "1485",
                    name: "颍泉区"
                }, {
                    id: "1486",
                    name: "临泉县"
                }, {
                    id: "1487",
                    name: "太和县"
                }, {
                    id: "1488",
                    name: "阜南县"
                }, {
                    id: "1489",
                    name: "颍上县"
                }, {
                    id: "1490",
                    name: "界首市"
                }]
            }, {
                id: "235",
                name: "宿州市",
                child: [{
                    id: "1491",
                    name: "埇桥区"
                }, {
                    id: "1492",
                    name: "砀山县"
                }, {
                    id: "1493",
                    name: "萧县"
                }, {
                    id: "1494",
                    name: "灵璧县"
                }, {
                    id: "1495",
                    name: "泗县"
                }]
            }, {
                id: "236",
                name: "巢湖市",
                child: [{
                    id: "1496",
                    name: "居巢区"
                }, {
                    id: "1497",
                    name: "庐江县"
                }, {
                    id: "1498",
                    name: "无为县"
                }, {
                    id: "1499",
                    name: "含山县"
                }, {
                    id: "1500",
                    name: "和县"
                }]
            }, {
                id: "237",
                name: "六安市",
                child: [{
                    id: "1501",
                    name: "金安区"
                }, {
                    id: "1502",
                    name: "裕安区"
                }, {
                    id: "1503",
                    name: "寿县"
                }, {
                    id: "1504",
                    name: "霍邱县"
                }, {
                    id: "1505",
                    name: "舒城县"
                }, {
                    id: "1506",
                    name: "金寨县"
                }, {
                    id: "1507",
                    name: "霍山县"
                }]
            }, {
                id: "238",
                name: "亳州市",
                child: [{
                    id: "1508",
                    name: "谯城区"
                }, {
                    id: "1509",
                    name: "涡阳县"
                }, {
                    id: "1510",
                    name: "蒙城县"
                }, {
                    id: "1511",
                    name: "利辛县"
                }]
            }, {
                id: "239",
                name: "池州市",
                child: [{
                    id: "1512",
                    name: "贵池区"
                }, {
                    id: "1513",
                    name: "东至县"
                }, {
                    id: "1514",
                    name: "石台县"
                }, {
                    id: "1515",
                    name: "青阳县"
                }]
            }, {
                id: "240",
                name: "宣城市",
                child: [{
                    id: "1516",
                    name: "宣州区"
                }, {
                    id: "1517",
                    name: "郎溪县"
                }, {
                    id: "1518",
                    name: "广德县"
                }, {
                    id: "1519",
                    name: "泾县"
                }, {
                    id: "1520",
                    name: "绩溪县"
                }, {
                    id: "1521",
                    name: "旌德县"
                }, {
                    id: "1522",
                    name: "宁国市"
                }]
            }]
        }, {
            id: "15",
            name: "福建省",
            child: [{
                id: "241",
                name: "福州市",
                child: [{
                    id: "1523",
                    name: "鼓楼区"
                }, {
                    id: "1524",
                    name: "台江区"
                }, {
                    id: "1525",
                    name: "仓山区"
                }, {
                    id: "1526",
                    name: "马尾区"
                }, {
                    id: "1527",
                    name: "晋安区"
                }, {
                    id: "1528",
                    name: "闽侯县"
                }, {
                    id: "1529",
                    name: "连江县"
                }, {
                    id: "1530",
                    name: "罗源县"
                }, {
                    id: "1531",
                    name: "闽清县"
                }, {
                    id: "1532",
                    name: "永泰县"
                }, {
                    id: "1533",
                    name: "平潭县"
                }, {
                    id: "1534",
                    name: "福清市"
                }, {
                    id: "1535",
                    name: "长乐市"
                }]
            }, {
                id: "242",
                name: "厦门市",
                child: [{
                    id: "1536",
                    name: "思明区"
                }, {
                    id: "1537",
                    name: "海沧区"
                }, {
                    id: "1538",
                    name: "湖里区"
                }, {
                    id: "1539",
                    name: "集美区"
                }, {
                    id: "1540",
                    name: "同安区"
                }, {
                    id: "1541",
                    name: "翔安区"
                }]
            }, {
                id: "243",
                name: "莆田市",
                child: [{
                    id: "1542",
                    name: "城厢区"
                }, {
                    id: "1543",
                    name: "涵江区"
                }, {
                    id: "1544",
                    name: "荔城区"
                }, {
                    id: "1545",
                    name: "秀屿区"
                }, {
                    id: "1546",
                    name: "仙游县"
                }]
            }, {
                id: "244",
                name: "三明市",
                child: [{
                    id: "1547",
                    name: "梅列区"
                }, {
                    id: "1548",
                    name: "三元区"
                }, {
                    id: "1549",
                    name: "明溪县"
                }, {
                    id: "1550",
                    name: "清流县"
                }, {
                    id: "1551",
                    name: "宁化县"
                }, {
                    id: "1552",
                    name: "大田县"
                }, {
                    id: "1553",
                    name: "尤溪县"
                }, {
                    id: "1554",
                    name: "沙县"
                }, {
                    id: "1555",
                    name: "将乐县"
                }, {
                    id: "1556",
                    name: "泰宁县"
                }, {
                    id: "1557",
                    name: "建宁县"
                }, {
                    id: "1558",
                    name: "永安市"
                }]
            }, {
                id: "245",
                name: "泉州市",
                child: [{
                    id: "1559",
                    name: "鲤城区"
                }, {
                    id: "1560",
                    name: "丰泽区"
                }, {
                    id: "1561",
                    name: "洛江区"
                }, {
                    id: "1562",
                    name: "泉港区"
                }, {
                    id: "1563",
                    name: "惠安县"
                }, {
                    id: "1564",
                    name: "安溪县"
                }, {
                    id: "1565",
                    name: "永春县"
                }, {
                    id: "1566",
                    name: "德化县"
                }, {
                    id: "1567",
                    name: "金门县"
                }, {
                    id: "1568",
                    name: "石狮市"
                }, {
                    id: "1569",
                    name: "晋江市"
                }, {
                    id: "1570",
                    name: "南安市"
                }]
            }, {
                id: "246",
                name: "漳州市",
                child: [{
                    id: "1571",
                    name: "芗城区"
                }, {
                    id: "1572",
                    name: "龙文区"
                }, {
                    id: "1573",
                    name: "云霄县"
                }, {
                    id: "1574",
                    name: "漳浦县"
                }, {
                    id: "1575",
                    name: "诏安县"
                }, {
                    id: "1576",
                    name: "长泰县"
                }, {
                    id: "1577",
                    name: "东山县"
                }, {
                    id: "1578",
                    name: "南靖县"
                }, {
                    id: "1579",
                    name: "平和县"
                }, {
                    id: "1580",
                    name: "华安县"
                }, {
                    id: "1581",
                    name: "龙海市"
                }]
            }, {
                id: "247",
                name: "南平市",
                child: [{
                    id: "1582",
                    name: "延平区"
                }, {
                    id: "1583",
                    name: "顺昌县"
                }, {
                    id: "1584",
                    name: "浦城县"
                }, {
                    id: "1585",
                    name: "光泽县"
                }, {
                    id: "1586",
                    name: "松溪县"
                }, {
                    id: "1587",
                    name: "政和县"
                }, {
                    id: "1588",
                    name: "邵武市"
                }, {
                    id: "1589",
                    name: "武夷山市"
                }, {
                    id: "1590",
                    name: "建瓯市"
                }, {
                    id: "1591",
                    name: "建阳市"
                }]
            }, {
                id: "248",
                name: "龙岩市",
                child: [{
                    id: "1592",
                    name: "新罗区"
                }, {
                    id: "1593",
                    name: "长汀县"
                }, {
                    id: "1594",
                    name: "永定县"
                }, {
                    id: "1595",
                    name: "上杭县"
                }, {
                    id: "1596",
                    name: "武平县"
                }, {
                    id: "1597",
                    name: "连城县"
                }, {
                    id: "1598",
                    name: "漳平市"
                }]
            }, {
                id: "249",
                name: "宁德市",
                child: [{
                    id: "1599",
                    name: "蕉城区"
                }, {
                    id: "1600",
                    name: "霞浦县"
                }, {
                    id: "1601",
                    name: "古田县"
                }, {
                    id: "1602",
                    name: "屏南县"
                }, {
                    id: "1603",
                    name: "寿宁县"
                }, {
                    id: "1604",
                    name: "周宁县"
                }, {
                    id: "1605",
                    name: "柘荣县"
                }, {
                    id: "1606",
                    name: "福安市"
                }, {
                    id: "1607",
                    name: "福鼎市"
                }]
            }]
        }, {
            id: "16",
            name: "江西省",
            child: [{
                id: "250",
                name: "南昌市",
                child: [{
                    id: "1608",
                    name: "东湖区"
                }, {
                    id: "1609",
                    name: "西湖区"
                }, {
                    id: "1610",
                    name: "青云谱区"
                }, {
                    id: "1611",
                    name: "湾里区"
                }, {
                    id: "1612",
                    name: "青山湖区"
                }, {
                    id: "1613",
                    name: "南昌县"
                }, {
                    id: "1614",
                    name: "新建县"
                }, {
                    id: "1615",
                    name: "安义县"
                }, {
                    id: "1616",
                    name: "进贤县"
                }]
            }, {
                id: "251",
                name: "景德镇市",
                child: [{
                    id: "1617",
                    name: "昌江区"
                }, {
                    id: "1618",
                    name: "珠山区"
                }, {
                    id: "1619",
                    name: "浮梁县"
                }, {
                    id: "1620",
                    name: "乐平市"
                }]
            }, {
                id: "252",
                name: "萍乡市",
                child: [{
                    id: "1621",
                    name: "安源区"
                }, {
                    id: "1622",
                    name: "湘东区"
                }, {
                    id: "1623",
                    name: "莲花县"
                }, {
                    id: "1624",
                    name: "上栗县"
                }, {
                    id: "1625",
                    name: "芦溪县"
                }]
            }, {
                id: "253",
                name: "九江市",
                child: [{
                    id: "1626",
                    name: "庐山区"
                }, {
                    id: "1627",
                    name: "浔阳区"
                }, {
                    id: "1628",
                    name: "九江县"
                }, {
                    id: "1629",
                    name: "武宁县"
                }, {
                    id: "1630",
                    name: "修水县"
                }, {
                    id: "1631",
                    name: "永修县"
                }, {
                    id: "1632",
                    name: "德安县"
                }, {
                    id: "1633",
                    name: "星子县"
                }, {
                    id: "1634",
                    name: "都昌县"
                }, {
                    id: "1635",
                    name: "湖口县"
                }, {
                    id: "1636",
                    name: "彭泽县"
                }, {
                    id: "1637",
                    name: "瑞昌市"
                }]
            }, {
                id: "254",
                name: "新余市",
                child: [{
                    id: "1638",
                    name: "渝水区"
                }, {
                    id: "1639",
                    name: "分宜县"
                }]
            }, {
                id: "255",
                name: "鹰潭市",
                child: [{
                    id: "1640",
                    name: "月湖区"
                }, {
                    id: "1641",
                    name: "余江县"
                }, {
                    id: "1642",
                    name: "贵溪市"
                }]
            }, {
                id: "256",
                name: "赣州市",
                child: [{
                    id: "1643",
                    name: "章贡区"
                }, {
                    id: "1644",
                    name: "赣县"
                }, {
                    id: "1645",
                    name: "信丰县"
                }, {
                    id: "1646",
                    name: "大余县"
                }, {
                    id: "1647",
                    name: "上犹县"
                }, {
                    id: "1648",
                    name: "崇义县"
                }, {
                    id: "1649",
                    name: "安远县"
                }, {
                    id: "1650",
                    name: "龙南县"
                }, {
                    id: "1651",
                    name: "定南县"
                }, {
                    id: "1652",
                    name: "全南县"
                }, {
                    id: "1653",
                    name: "宁都县"
                }, {
                    id: "1654",
                    name: "于都县"
                }, {
                    id: "1655",
                    name: "兴国县"
                }, {
                    id: "1656",
                    name: "会昌县"
                }, {
                    id: "1657",
                    name: "寻乌县"
                }, {
                    id: "1658",
                    name: "石城县"
                }, {
                    id: "1659",
                    name: "瑞金市"
                }, {
                    id: "1660",
                    name: "南康市"
                }]
            }, {
                id: "257",
                name: "吉安市",
                child: [{
                    id: "1661",
                    name: "吉州区"
                }, {
                    id: "1662",
                    name: "青原区"
                }, {
                    id: "1663",
                    name: "吉安县"
                }, {
                    id: "1664",
                    name: "吉水县"
                }, {
                    id: "1665",
                    name: "峡江县"
                }, {
                    id: "1666",
                    name: "新干县"
                }, {
                    id: "1667",
                    name: "永丰县"
                }, {
                    id: "1668",
                    name: "泰和县"
                }, {
                    id: "1669",
                    name: "遂川县"
                }, {
                    id: "1670",
                    name: "万安县"
                }, {
                    id: "1671",
                    name: "安福县"
                }, {
                    id: "1672",
                    name: "永新县"
                }, {
                    id: "1673",
                    name: "井冈山市"
                }]
            }, {
                id: "258",
                name: "宜春市",
                child: [{
                    id: "1674",
                    name: "袁州区"
                }, {
                    id: "1675",
                    name: "奉新县"
                }, {
                    id: "1676",
                    name: "万载县"
                }, {
                    id: "1677",
                    name: "上高县"
                }, {
                    id: "1678",
                    name: "宜丰县"
                }, {
                    id: "1679",
                    name: "靖安县"
                }, {
                    id: "1680",
                    name: "铜鼓县"
                }, {
                    id: "1681",
                    name: "丰城市"
                }, {
                    id: "1682",
                    name: "樟树市"
                }, {
                    id: "1683",
                    name: "高安市"
                }]
            }, {
                id: "259",
                name: "抚州市",
                child: [{
                    id: "1684",
                    name: "临川区"
                }, {
                    id: "1685",
                    name: "南城县"
                }, {
                    id: "1686",
                    name: "黎川县"
                }, {
                    id: "1687",
                    name: "南丰县"
                }, {
                    id: "1688",
                    name: "崇仁县"
                }, {
                    id: "1689",
                    name: "乐安县"
                }, {
                    id: "1690",
                    name: "宜黄县"
                }, {
                    id: "1691",
                    name: "金溪县"
                }, {
                    id: "1692",
                    name: "资溪县"
                }, {
                    id: "1693",
                    name: "东乡县"
                }, {
                    id: "1694",
                    name: "广昌县"
                }]
            }, {
                id: "260",
                name: "上饶市",
                child: [{
                    id: "1695",
                    name: "信州区"
                }, {
                    id: "1696",
                    name: "上饶县"
                }, {
                    id: "1697",
                    name: "广丰县"
                }, {
                    id: "1698",
                    name: "玉山县"
                }, {
                    id: "1699",
                    name: "铅山县"
                }, {
                    id: "1700",
                    name: "横峰县"
                }, {
                    id: "1701",
                    name: "弋阳县"
                }, {
                    id: "1702",
                    name: "余干县"
                }, {
                    id: "1703",
                    name: "鄱阳县"
                }, {
                    id: "1704",
                    name: "万年县"
                }, {
                    id: "1705",
                    name: "婺源县"
                }, {
                    id: "1706",
                    name: "德兴市"
                }]
            }]
        }, {
            id: "17",
            name: "山东省",
            child: [{
                id: "261",
                name: "济南市",
                child: [{
                    id: "1707",
                    name: "历下区"
                }, {
                    id: "1708",
                    name: "市中区"
                }, {
                    id: "1709",
                    name: "槐荫区"
                }, {
                    id: "1710",
                    name: "天桥区"
                }, {
                    id: "1711",
                    name: "历城区"
                }, {
                    id: "1712",
                    name: "长清区"
                }, {
                    id: "1713",
                    name: "平阴县"
                }, {
                    id: "1714",
                    name: "济阳县"
                }, {
                    id: "1715",
                    name: "商河县"
                }, {
                    id: "1716",
                    name: "章丘市"
                }]
            }, {
                id: "262",
                name: "青岛市",
                child: [{
                    id: "1717",
                    name: "市南区"
                }, {
                    id: "1718",
                    name: "市北区"
                }, {
                    id: "1719",
                    name: "四方区"
                }, {
                    id: "1720",
                    name: "黄岛区"
                }, {
                    id: "1721",
                    name: "崂山区"
                }, {
                    id: "1722",
                    name: "李沧区"
                }, {
                    id: "1723",
                    name: "城阳区"
                }, {
                    id: "1724",
                    name: "胶州市"
                }, {
                    id: "1725",
                    name: "即墨市"
                }, {
                    id: "1726",
                    name: "平度市"
                }, {
                    id: "1727",
                    name: "胶南市"
                }, {
                    id: "1728",
                    name: "莱西市"
                }]
            }, {
                id: "263",
                name: "淄博市",
                child: [{
                    id: "1729",
                    name: "淄川区"
                }, {
                    id: "1730",
                    name: "张店区"
                }, {
                    id: "1731",
                    name: "博山区"
                }, {
                    id: "1732",
                    name: "临淄区"
                }, {
                    id: "1733",
                    name: "周村区"
                }, {
                    id: "1734",
                    name: "桓台县"
                }, {
                    id: "1735",
                    name: "高青县"
                }, {
                    id: "1736",
                    name: "沂源县"
                }]
            }, {
                id: "264",
                name: "枣庄市",
                child: [{
                    id: "1737",
                    name: "市中区"
                }, {
                    id: "1738",
                    name: "薛城区"
                }, {
                    id: "1739",
                    name: "峄城区"
                }, {
                    id: "1740",
                    name: "台儿庄区"
                }, {
                    id: "1741",
                    name: "山亭区"
                }, {
                    id: "1742",
                    name: "滕州市"
                }]
            }, {
                id: "265",
                name: "东营市",
                child: [{
                    id: "1743",
                    name: "东营区"
                }, {
                    id: "1744",
                    name: "河口区"
                }, {
                    id: "1745",
                    name: "垦利县"
                }, {
                    id: "1746",
                    name: "利津县"
                }, {
                    id: "1747",
                    name: "广饶县"
                }]
            }, {
                id: "266",
                name: "烟台市",
                child: [{
                    id: "1748",
                    name: "芝罘区"
                }, {
                    id: "1749",
                    name: "福山区"
                }, {
                    id: "1750",
                    name: "牟平区"
                }, {
                    id: "1751",
                    name: "莱山区"
                }, {
                    id: "1752",
                    name: "长岛县"
                }, {
                    id: "1753",
                    name: "龙口市"
                }, {
                    id: "1754",
                    name: "莱阳市"
                }, {
                    id: "1755",
                    name: "莱州市"
                }, {
                    id: "1756",
                    name: "蓬莱市"
                }, {
                    id: "1757",
                    name: "招远市"
                }, {
                    id: "1758",
                    name: "栖霞市"
                }, {
                    id: "1759",
                    name: "海阳市"
                }]
            }, {
                id: "267",
                name: "潍坊市",
                child: [{
                    id: "1760",
                    name: "潍城区"
                }, {
                    id: "1761",
                    name: "寒亭区"
                }, {
                    id: "1762",
                    name: "坊子区"
                }, {
                    id: "1763",
                    name: "奎文区"
                }, {
                    id: "1764",
                    name: "临朐县"
                }, {
                    id: "1765",
                    name: "昌乐县"
                }, {
                    id: "1766",
                    name: "青州市"
                }, {
                    id: "1767",
                    name: "诸城市"
                }, {
                    id: "1768",
                    name: "寿光市"
                }, {
                    id: "1769",
                    name: "安丘市"
                }, {
                    id: "1770",
                    name: "高密市"
                }, {
                    id: "1771",
                    name: "昌邑市"
                }]
            }, {
                id: "268",
                name: "济宁市",
                child: [{
                    id: "1772",
                    name: "市中区"
                }, {
                    id: "1773",
                    name: "任城区"
                }, {
                    id: "1774",
                    name: "微山县"
                }, {
                    id: "1775",
                    name: "鱼台县"
                }, {
                    id: "1776",
                    name: "金乡县"
                }, {
                    id: "1777",
                    name: "嘉祥县"
                }, {
                    id: "1778",
                    name: "汶上县"
                }, {
                    id: "1779",
                    name: "泗水县"
                }, {
                    id: "1780",
                    name: "梁山县"
                }, {
                    id: "1781",
                    name: "曲阜市"
                }, {
                    id: "1782",
                    name: "兖州市"
                }, {
                    id: "1783",
                    name: "邹城市"
                }]
            }, {
                id: "269",
                name: "泰安市",
                child: [{
                    id: "1784",
                    name: "泰山区"
                }, {
                    id: "1785",
                    name: "岱岳区"
                }, {
                    id: "1786",
                    name: "宁阳县"
                }, {
                    id: "1787",
                    name: "东平县"
                }, {
                    id: "1788",
                    name: "新泰市"
                }, {
                    id: "1789",
                    name: "肥城市"
                }]
            }, {
                id: "270",
                name: "威海市",
                child: [{
                    id: "1790",
                    name: "环翠区"
                }, {
                    id: "1791",
                    name: "文登市"
                }, {
                    id: "1792",
                    name: "荣成市"
                }, {
                    id: "1793",
                    name: "乳山市"
                }]
            }, {
                id: "271",
                name: "日照市",
                child: [{
                    id: "1794",
                    name: "东港区"
                }, {
                    id: "1795",
                    name: "岚山区"
                }, {
                    id: "1796",
                    name: "五莲县"
                }, {
                    id: "1797",
                    name: "莒县"
                }]
            }, {
                id: "272",
                name: "莱芜市",
                child: [{
                    id: "1798",
                    name: "莱城区"
                }, {
                    id: "1799",
                    name: "钢城区"
                }]
            }, {
                id: "273",
                name: "临沂市",
                child: [{
                    id: "1800",
                    name: "兰山区"
                }, {
                    id: "1801",
                    name: "罗庄区"
                }, {
                    id: "1802",
                    name: "河东区"
                }, {
                    id: "1803",
                    name: "沂南县"
                }, {
                    id: "1804",
                    name: "郯城县"
                }, {
                    id: "1805",
                    name: "沂水县"
                }, {
                    id: "1806",
                    name: "苍山县"
                }, {
                    id: "1807",
                    name: "费县"
                }, {
                    id: "1808",
                    name: "平邑县"
                }, {
                    id: "1809",
                    name: "莒南县"
                }, {
                    id: "1810",
                    name: "蒙阴县"
                }, {
                    id: "1811",
                    name: "临沭县"
                }]
            }, {
                id: "274",
                name: "德州市",
                child: [{
                    id: "1812",
                    name: "德城区"
                }, {
                    id: "1813",
                    name: "陵县"
                }, {
                    id: "1814",
                    name: "宁津县"
                }, {
                    id: "1815",
                    name: "庆云县"
                }, {
                    id: "1816",
                    name: "临邑县"
                }, {
                    id: "1817",
                    name: "齐河县"
                }, {
                    id: "1818",
                    name: "平原县"
                }, {
                    id: "1819",
                    name: "夏津县"
                }, {
                    id: "1820",
                    name: "武城县"
                }, {
                    id: "1821",
                    name: "乐陵市"
                }, {
                    id: "1822",
                    name: "禹城市"
                }]
            }, {
                id: "275",
                name: "聊城市",
                child: [{
                    id: "1823",
                    name: "东昌府区"
                }, {
                    id: "1824",
                    name: "阳谷县"
                }, {
                    id: "1825",
                    name: "莘县"
                }, {
                    id: "1826",
                    name: "茌平县"
                }, {
                    id: "1827",
                    name: "东阿县"
                }, {
                    id: "1828",
                    name: "冠县"
                }, {
                    id: "1829",
                    name: "高唐县"
                }, {
                    id: "1830",
                    name: "临清市"
                }]
            }, {
                id: "276",
                name: "滨州市",
                child: [{
                    id: "1831",
                    name: "滨城区"
                }, {
                    id: "1832",
                    name: "惠民县"
                }, {
                    id: "1833",
                    name: "阳信县"
                }, {
                    id: "1834",
                    name: "无棣县"
                }, {
                    id: "1835",
                    name: "沾化县"
                }, {
                    id: "1836",
                    name: "博兴县"
                }, {
                    id: "1837",
                    name: "邹平县"
                }]
            }, {
                id: "277",
                name: "荷泽市",
                child: [{
                    id: "1838",
                    name: "牡丹区"
                }, {
                    id: "1839",
                    name: "曹县"
                }, {
                    id: "1840",
                    name: "单县"
                }, {
                    id: "1841",
                    name: "成武县"
                }, {
                    id: "1842",
                    name: "巨野县"
                }, {
                    id: "1843",
                    name: "郓城县"
                }, {
                    id: "1844",
                    name: "鄄城县"
                }, {
                    id: "1845",
                    name: "定陶县"
                }, {
                    id: "1846",
                    name: "东明县"
                }]
            }]
        }, {
            id: "18",
            name: "河南省",
            child: [{
                id: "278",
                name: "郑州市",
                child: [{
                    id: "1847",
                    name: "中原区"
                }, {
                    id: "1848",
                    name: "二七区"
                }, {
                    id: "1849",
                    name: "管城回族区"
                }, {
                    id: "1850",
                    name: "金水区"
                }, {
                    id: "1851",
                    name: "上街区"
                }, {
                    id: "1852",
                    name: "惠济区"
                }, {
                    id: "1853",
                    name: "中牟县"
                }, {
                    id: "1854",
                    name: "巩义市"
                }, {
                    id: "1855",
                    name: "荥阳市"
                }, {
                    id: "1856",
                    name: "新密市"
                }, {
                    id: "1857",
                    name: "新郑市"
                }, {
                    id: "1858",
                    name: "登封市"
                }]
            }, {
                id: "279",
                name: "开封市",
                child: [{
                    id: "1859",
                    name: "龙亭区"
                }, {
                    id: "1860",
                    name: "顺河回族区"
                }, {
                    id: "1861",
                    name: "鼓楼区"
                }, {
                    id: "1862",
                    name: "禹王台区"
                }, {
                    id: "1863",
                    name: "金明区"
                }, {
                    id: "1864",
                    name: "杞县"
                }, {
                    id: "1865",
                    name: "通许县"
                }, {
                    id: "1866",
                    name: "尉氏县"
                }, {
                    id: "1867",
                    name: "开封县"
                }, {
                    id: "1868",
                    name: "兰考县"
                }]
            }, {
                id: "280",
                name: "洛阳市",
                child: [{
                    id: "1869",
                    name: "老城区"
                }, {
                    id: "1870",
                    name: "西工区"
                }, {
                    id: "1871",
                    name: "廛河回族区"
                }, {
                    id: "1872",
                    name: "涧西区"
                }, {
                    id: "1873",
                    name: "吉利区"
                }, {
                    id: "1874",
                    name: "洛龙区"
                }, {
                    id: "1875",
                    name: "孟津县"
                }, {
                    id: "1876",
                    name: "新安县"
                }, {
                    id: "1877",
                    name: "栾川县"
                }, {
                    id: "1878",
                    name: "嵩县"
                }, {
                    id: "1879",
                    name: "汝阳县"
                }, {
                    id: "1880",
                    name: "宜阳县"
                }, {
                    id: "1881",
                    name: "洛宁县"
                }, {
                    id: "1882",
                    name: "伊川县"
                }, {
                    id: "1883",
                    name: "偃师市"
                }]
            }, {
                id: "281",
                name: "平顶山市",
                child: [{
                    id: "1884",
                    name: "新华区"
                }, {
                    id: "1885",
                    name: "卫东区"
                }, {
                    id: "1886",
                    name: "石龙区"
                }, {
                    id: "1887",
                    name: "湛河区"
                }, {
                    id: "1888",
                    name: "宝丰县"
                }, {
                    id: "1889",
                    name: "叶县"
                }, {
                    id: "1890",
                    name: "鲁山县"
                }, {
                    id: "1891",
                    name: "郏县"
                }, {
                    id: "1892",
                    name: "舞钢市"
                }, {
                    id: "1893",
                    name: "汝州市"
                }]
            }, {
                id: "282",
                name: "安阳市",
                child: [{
                    id: "1894",
                    name: "文峰区"
                }, {
                    id: "1895",
                    name: "北关区"
                }, {
                    id: "1896",
                    name: "殷都区"
                }, {
                    id: "1897",
                    name: "龙安区"
                }, {
                    id: "1898",
                    name: "安阳县"
                }, {
                    id: "1899",
                    name: "汤阴县"
                }, {
                    id: "1900",
                    name: "滑县"
                }, {
                    id: "1901",
                    name: "内黄县"
                }, {
                    id: "1902",
                    name: "林州市"
                }]
            }, {
                id: "283",
                name: "鹤壁市",
                child: [{
                    id: "1903",
                    name: "鹤山区"
                }, {
                    id: "1904",
                    name: "山城区"
                }, {
                    id: "1905",
                    name: "淇滨区"
                }, {
                    id: "1906",
                    name: "浚县"
                }, {
                    id: "1907",
                    name: "淇县"
                }]
            }, {
                id: "284",
                name: "新乡市",
                child: [{
                    id: "1908",
                    name: "红旗区"
                }, {
                    id: "1909",
                    name: "卫滨区"
                }, {
                    id: "1910",
                    name: "凤泉区"
                }, {
                    id: "1911",
                    name: "牧野区"
                }, {
                    id: "1912",
                    name: "新乡县"
                }, {
                    id: "1913",
                    name: "获嘉县"
                }, {
                    id: "1914",
                    name: "原阳县"
                }, {
                    id: "1915",
                    name: "延津县"
                }, {
                    id: "1916",
                    name: "封丘县"
                }, {
                    id: "1917",
                    name: "长垣县"
                }, {
                    id: "1918",
                    name: "卫辉市"
                }, {
                    id: "1919",
                    name: "辉县市"
                }]
            }, {
                id: "285",
                name: "焦作市",
                child: [{
                    id: "1920",
                    name: "解放区"
                }, {
                    id: "1921",
                    name: "中站区"
                }, {
                    id: "1922",
                    name: "马村区"
                }, {
                    id: "1923",
                    name: "山阳区"
                }, {
                    id: "1924",
                    name: "修武县"
                }, {
                    id: "1925",
                    name: "博爱县"
                }, {
                    id: "1926",
                    name: "武陟县"
                }, {
                    id: "1927",
                    name: "温县"
                }, {
                    id: "1928",
                    name: "济源市"
                }, {
                    id: "1929",
                    name: "沁阳市"
                }, {
                    id: "1930",
                    name: "孟州市"
                }]
            }, {
                id: "286",
                name: "濮阳市",
                child: [{
                    id: "1931",
                    name: "华龙区"
                }, {
                    id: "1932",
                    name: "清丰县"
                }, {
                    id: "1933",
                    name: "南乐县"
                }, {
                    id: "1934",
                    name: "范县"
                }, {
                    id: "1935",
                    name: "台前县"
                }, {
                    id: "1936",
                    name: "濮阳县"
                }]
            }, {
                id: "287",
                name: "许昌市",
                child: [{
                    id: "1937",
                    name: "魏都区"
                }, {
                    id: "1938",
                    name: "许昌县"
                }, {
                    id: "1939",
                    name: "鄢陵县"
                }, {
                    id: "1940",
                    name: "襄城县"
                }, {
                    id: "1941",
                    name: "禹州市"
                }, {
                    id: "1942",
                    name: "长葛市"
                }]
            }, {
                id: "288",
                name: "漯河市",
                child: [{
                    id: "1943",
                    name: "源汇区"
                }, {
                    id: "1944",
                    name: "郾城区"
                }, {
                    id: "1945",
                    name: "召陵区"
                }, {
                    id: "1946",
                    name: "舞阳县"
                }, {
                    id: "1947",
                    name: "临颍县"
                }]
            }, {
                id: "289",
                name: "三门峡市",
                child: [{
                    id: "1948",
                    name: "湖滨区"
                }, {
                    id: "1949",
                    name: "渑池县"
                }, {
                    id: "1950",
                    name: "陕县"
                }, {
                    id: "1951",
                    name: "卢氏县"
                }, {
                    id: "1952",
                    name: "义马市"
                }, {
                    id: "1953",
                    name: "灵宝市"
                }]
            }, {
                id: "290",
                name: "南阳市",
                child: [{
                    id: "1954",
                    name: "宛城区"
                }, {
                    id: "1955",
                    name: "卧龙区"
                }, {
                    id: "1956",
                    name: "南召县"
                }, {
                    id: "1957",
                    name: "方城县"
                }, {
                    id: "1958",
                    name: "西峡县"
                }, {
                    id: "1959",
                    name: "镇平县"
                }, {
                    id: "1960",
                    name: "内乡县"
                }, {
                    id: "1961",
                    name: "淅川县"
                }, {
                    id: "1962",
                    name: "社旗县"
                }, {
                    id: "1963",
                    name: "唐河县"
                }, {
                    id: "1964",
                    name: "新野县"
                }, {
                    id: "1965",
                    name: "桐柏县"
                }, {
                    id: "1966",
                    name: "邓州市"
                }]
            }, {
                id: "291",
                name: "商丘市",
                child: [{
                    id: "1967",
                    name: "梁园区"
                }, {
                    id: "1968",
                    name: "睢阳区"
                }, {
                    id: "1969",
                    name: "民权县"
                }, {
                    id: "1970",
                    name: "睢县"
                }, {
                    id: "1971",
                    name: "宁陵县"
                }, {
                    id: "1972",
                    name: "柘城县"
                }, {
                    id: "1973",
                    name: "虞城县"
                }, {
                    id: "1974",
                    name: "夏邑县"
                }, {
                    id: "1975",
                    name: "永城市"
                }]
            }, {
                id: "292",
                name: "信阳市",
                child: [{
                    id: "1976",
                    name: "浉河区"
                }, {
                    id: "1977",
                    name: "平桥区"
                }, {
                    id: "1978",
                    name: "罗山县"
                }, {
                    id: "1979",
                    name: "光山县"
                }, {
                    id: "1980",
                    name: "新县"
                }, {
                    id: "1981",
                    name: "商城县"
                }, {
                    id: "1982",
                    name: "固始县"
                }, {
                    id: "1983",
                    name: "潢川县"
                }, {
                    id: "1984",
                    name: "淮滨县"
                }, {
                    id: "1985",
                    name: "息县"
                }]
            }, {
                id: "293",
                name: "周口市",
                child: [{
                    id: "1986",
                    name: "川汇区"
                }, {
                    id: "1987",
                    name: "扶沟县"
                }, {
                    id: "1988",
                    name: "西华县"
                }, {
                    id: "1989",
                    name: "商水县"
                }, {
                    id: "1990",
                    name: "沈丘县"
                }, {
                    id: "1991",
                    name: "郸城县"
                }, {
                    id: "1992",
                    name: "淮阳县"
                }, {
                    id: "1993",
                    name: "太康县"
                }, {
                    id: "1994",
                    name: "鹿邑县"
                }, {
                    id: "1995",
                    name: "项城市"
                }]
            }, {
                id: "294",
                name: "驻马店市",
                child: [{
                    id: "1996",
                    name: "驿城区"
                }, {
                    id: "1997",
                    name: "西平县"
                }, {
                    id: "1998",
                    name: "上蔡县"
                }, {
                    id: "1999",
                    name: "平舆县"
                }, {
                    id: "2000",
                    name: "正阳县"
                }, {
                    id: "2001",
                    name: "确山县"
                }, {
                    id: "2002",
                    name: "泌阳县"
                }, {
                    id: "2003",
                    name: "汝南县"
                }, {
                    id: "2004",
                    name: "遂平县"
                }, {
                    id: "2005",
                    name: "新蔡县"
                }]
            }]
        }, {
            id: "19",
            name: "湖北省",
            child: [{
                id: "295",
                name: "武汉市",
                child: [{
                    id: "2006",
                    name: "江岸区"
                }, {
                    id: "2007",
                    name: "江汉区"
                }, {
                    id: "2008",
                    name: "硚口区"
                }, {
                    id: "2009",
                    name: "汉阳区"
                }, {
                    id: "2010",
                    name: "武昌区"
                }, {
                    id: "2011",
                    name: "青山区"
                }, {
                    id: "2012",
                    name: "洪山区"
                }, {
                    id: "2013",
                    name: "东西湖区"
                }, {
                    id: "2014",
                    name: "汉南区"
                }, {
                    id: "2015",
                    name: "蔡甸区"
                }, {
                    id: "2016",
                    name: "江夏区"
                }, {
                    id: "2017",
                    name: "黄陂区"
                }, {
                    id: "2018",
                    name: "新洲区"
                }]
            }, {
                id: "296",
                name: "黄石市",
                child: [{
                    id: "2019",
                    name: "黄石港区"
                }, {
                    id: "2020",
                    name: "西塞山区"
                }, {
                    id: "2021",
                    name: "下陆区"
                }, {
                    id: "2022",
                    name: "铁山区"
                }, {
                    id: "2023",
                    name: "阳新县"
                }, {
                    id: "2024",
                    name: "大冶市"
                }]
            }, {
                id: "297",
                name: "十堰市",
                child: [{
                    id: "2025",
                    name: "茅箭区"
                }, {
                    id: "2026",
                    name: "张湾区"
                }, {
                    id: "2027",
                    name: "郧县"
                }, {
                    id: "2028",
                    name: "郧西县"
                }, {
                    id: "2029",
                    name: "竹山县"
                }, {
                    id: "2030",
                    name: "竹溪县"
                }, {
                    id: "2031",
                    name: "房县"
                }, {
                    id: "2032",
                    name: "丹江口市"
                }]
            }, {
                id: "298",
                name: "宜昌市",
                child: [{
                    id: "2033",
                    name: "西陵区"
                }, {
                    id: "2034",
                    name: "伍家岗区"
                }, {
                    id: "2035",
                    name: "点军区"
                }, {
                    id: "2036",
                    name: "猇亭区"
                }, {
                    id: "2037",
                    name: "夷陵区"
                }, {
                    id: "2038",
                    name: "远安县"
                }, {
                    id: "2039",
                    name: "兴山县"
                }, {
                    id: "2040",
                    name: "秭归县"
                }, {
                    id: "2041",
                    name: "长阳土家族自治县"
                }, {
                    id: "2042",
                    name: "五峰土家族自治县"
                }, {
                    id: "2043",
                    name: "宜都市"
                }, {
                    id: "2044",
                    name: "当阳市"
                }, {
                    id: "2045",
                    name: "枝江市"
                }]
            }, {
                id: "299",
                name: "襄樊市",
                child: [{
                    id: "2046",
                    name: "襄城区"
                }, {
                    id: "2047",
                    name: "樊城区"
                }, {
                    id: "2048",
                    name: "襄阳区"
                }, {
                    id: "2049",
                    name: "南漳县"
                }, {
                    id: "2050",
                    name: "谷城县"
                }, {
                    id: "2051",
                    name: "保康县"
                }, {
                    id: "2052",
                    name: "老河口市"
                }, {
                    id: "2053",
                    name: "枣阳市"
                }, {
                    id: "2054",
                    name: "宜城市"
                }]
            }, {
                id: "300",
                name: "鄂州市",
                child: [{
                    id: "2055",
                    name: "梁子湖区"
                }, {
                    id: "2056",
                    name: "华容区"
                }, {
                    id: "2057",
                    name: "鄂城区"
                }]
            }, {
                id: "301",
                name: "荆门市",
                child: [{
                    id: "2058",
                    name: "东宝区"
                }, {
                    id: "2059",
                    name: "掇刀区"
                }, {
                    id: "2060",
                    name: "京山县"
                }, {
                    id: "2061",
                    name: "沙洋县"
                }, {
                    id: "2062",
                    name: "钟祥市"
                }]
            }, {
                id: "302",
                name: "孝感市",
                child: [{
                    id: "2063",
                    name: "孝南区"
                }, {
                    id: "2064",
                    name: "孝昌县"
                }, {
                    id: "2065",
                    name: "大悟县"
                }, {
                    id: "2066",
                    name: "云梦县"
                }, {
                    id: "2067",
                    name: "应城市"
                }, {
                    id: "2068",
                    name: "安陆市"
                }, {
                    id: "2069",
                    name: "汉川市"
                }]
            }, {
                id: "303",
                name: "荆州市",
                child: [{
                    id: "2070",
                    name: "沙市区"
                }, {
                    id: "2071",
                    name: "荆州区"
                }, {
                    id: "2072",
                    name: "公安县"
                }, {
                    id: "2073",
                    name: "监利县"
                }, {
                    id: "2074",
                    name: "江陵县"
                }, {
                    id: "2075",
                    name: "石首市"
                }, {
                    id: "2076",
                    name: "洪湖市"
                }, {
                    id: "2077",
                    name: "松滋市"
                }]
            }, {
                id: "304",
                name: "黄冈市",
                child: [{
                    id: "2078",
                    name: "黄州区"
                }, {
                    id: "2079",
                    name: "团风县"
                }, {
                    id: "2080",
                    name: "红安县"
                }, {
                    id: "2081",
                    name: "罗田县"
                }, {
                    id: "2082",
                    name: "英山县"
                }, {
                    id: "2083",
                    name: "浠水县"
                }, {
                    id: "2084",
                    name: "蕲春县"
                }, {
                    id: "2085",
                    name: "黄梅县"
                }, {
                    id: "2086",
                    name: "麻城市"
                }, {
                    id: "2087",
                    name: "武穴市"
                }]
            }, {
                id: "305",
                name: "咸宁市",
                child: [{
                    id: "2088",
                    name: "咸安区"
                }, {
                    id: "2089",
                    name: "嘉鱼县"
                }, {
                    id: "2090",
                    name: "通城县"
                }, {
                    id: "2091",
                    name: "崇阳县"
                }, {
                    id: "2092",
                    name: "通山县"
                }, {
                    id: "2093",
                    name: "赤壁市"
                }]
            }, {
                id: "306",
                name: "随州市",
                child: [{
                    id: "2094",
                    name: "曾都区"
                }, {
                    id: "2095",
                    name: "广水市"
                }]
            }, {
                id: "307",
                name: "恩施土家族苗族自治州",
                child: [{
                    id: "2096",
                    name: "恩施市"
                }, {
                    id: "2097",
                    name: "利川市"
                }, {
                    id: "2098",
                    name: "建始县"
                }, {
                    id: "2099",
                    name: "巴东县"
                }, {
                    id: "2100",
                    name: "宣恩县"
                }, {
                    id: "2101",
                    name: "咸丰县"
                }, {
                    id: "2102",
                    name: "来凤县"
                }, {
                    id: "2103",
                    name: "鹤峰县"
                }]
            }, {
                id: "308",
                name: "仙桃市"
            }, {
                id: "309",
                name: "潜江市"
            }, {
                id: "310",
                name: "天门市"
            }, {
                id: "311",
                name: "神农架林区"
            }]
        }, {
            id: "20",
            name: "湖南省",
            child: [{
                id: "312",
                name: "长沙市",
                child: [{
                    id: "2104",
                    name: "芙蓉区"
                }, {
                    id: "2105",
                    name: "天心区"
                }, {
                    id: "2106",
                    name: "岳麓区"
                }, {
                    id: "2107",
                    name: "开福区"
                }, {
                    id: "2108",
                    name: "雨花区"
                }, {
                    id: "2109",
                    name: "长沙县"
                }, {
                    id: "2110",
                    name: "望城县"
                }, {
                    id: "2111",
                    name: "宁乡县"
                }, {
                    id: "2112",
                    name: "浏阳市"
                }]
            }, {
                id: "313",
                name: "株洲市",
                child: [{
                    id: "2113",
                    name: "荷塘区"
                }, {
                    id: "2114",
                    name: "芦淞区"
                }, {
                    id: "2115",
                    name: "石峰区"
                }, {
                    id: "2116",
                    name: "天元区"
                }, {
                    id: "2117",
                    name: "株洲县"
                }, {
                    id: "2118",
                    name: "攸县"
                }, {
                    id: "2119",
                    name: "茶陵县"
                }, {
                    id: "2120",
                    name: "炎陵县"
                }, {
                    id: "2121",
                    name: "醴陵市"
                }]
            }, {
                id: "314",
                name: "湘潭市",
                child: [{
                    id: "2122",
                    name: "雨湖区"
                }, {
                    id: "2123",
                    name: "岳塘区"
                }, {
                    id: "2124",
                    name: "湘潭县"
                }, {
                    id: "2125",
                    name: "湘乡市"
                }, {
                    id: "2126",
                    name: "韶山市"
                }]
            }, {
                id: "315",
                name: "衡阳市",
                child: [{
                    id: "2127",
                    name: "珠晖区"
                }, {
                    id: "2128",
                    name: "雁峰区"
                }, {
                    id: "2129",
                    name: "石鼓区"
                }, {
                    id: "2130",
                    name: "蒸湘区"
                }, {
                    id: "2131",
                    name: "南岳区"
                }, {
                    id: "2132",
                    name: "衡阳县"
                }, {
                    id: "2133",
                    name: "衡南县"
                }, {
                    id: "2134",
                    name: "衡山县"
                }, {
                    id: "2135",
                    name: "衡东县"
                }, {
                    id: "2136",
                    name: "祁东县"
                }, {
                    id: "2137",
                    name: "耒阳市"
                }, {
                    id: "2138",
                    name: "常宁市"
                }]
            }, {
                id: "316",
                name: "邵阳市",
                child: [{
                    id: "2139",
                    name: "双清区"
                }, {
                    id: "2140",
                    name: "大祥区"
                }, {
                    id: "2141",
                    name: "北塔区"
                }, {
                    id: "2142",
                    name: "邵东县"
                }, {
                    id: "2143",
                    name: "新邵县"
                }, {
                    id: "2144",
                    name: "邵阳县"
                }, {
                    id: "2145",
                    name: "隆回县"
                }, {
                    id: "2146",
                    name: "洞口县"
                }, {
                    id: "2147",
                    name: "绥宁县"
                }, {
                    id: "2148",
                    name: "新宁县"
                }, {
                    id: "2149",
                    name: "城步苗族自治县"
                }, {
                    id: "2150",
                    name: "武冈市"
                }]
            }, {
                id: "317",
                name: "岳阳市",
                child: [{
                    id: "2151",
                    name: "岳阳楼区"
                }, {
                    id: "2152",
                    name: "云溪区"
                }, {
                    id: "2153",
                    name: "君山区"
                }, {
                    id: "2154",
                    name: "岳阳县"
                }, {
                    id: "2155",
                    name: "华容县"
                }, {
                    id: "2156",
                    name: "湘阴县"
                }, {
                    id: "2157",
                    name: "平江县"
                }, {
                    id: "2158",
                    name: "汨罗市"
                }, {
                    id: "2159",
                    name: "临湘市"
                }]
            }, {
                id: "318",
                name: "常德市",
                child: [{
                    id: "2160",
                    name: "武陵区"
                }, {
                    id: "2161",
                    name: "鼎城区"
                }, {
                    id: "2162",
                    name: "安乡县"
                }, {
                    id: "2163",
                    name: "汉寿县"
                }, {
                    id: "2164",
                    name: "澧县"
                }, {
                    id: "2165",
                    name: "临澧县"
                }, {
                    id: "2166",
                    name: "桃源县"
                }, {
                    id: "2167",
                    name: "石门县"
                }, {
                    id: "2168",
                    name: "津市市"
                }]
            }, {
                id: "319",
                name: "张家界市",
                child: [{
                    id: "2169",
                    name: "永定区"
                }, {
                    id: "2170",
                    name: "武陵源区"
                }, {
                    id: "2171",
                    name: "慈利县"
                }, {
                    id: "2172",
                    name: "桑植县"
                }]
            }, {
                id: "320",
                name: "益阳市",
                child: [{
                    id: "2173",
                    name: "资阳区"
                }, {
                    id: "2174",
                    name: "赫山区"
                }, {
                    id: "2175",
                    name: "南县"
                }, {
                    id: "2176",
                    name: "桃江县"
                }, {
                    id: "2177",
                    name: "安化县"
                }, {
                    id: "2178",
                    name: "沅江市"
                }]
            }, {
                id: "321",
                name: "郴州市",
                child: [{
                    id: "2179",
                    name: "北湖区"
                }, {
                    id: "2180",
                    name: "苏仙区"
                }, {
                    id: "2181",
                    name: "桂阳县"
                }, {
                    id: "2182",
                    name: "宜章县"
                }, {
                    id: "2183",
                    name: "永兴县"
                }, {
                    id: "2184",
                    name: "嘉禾县"
                }, {
                    id: "2185",
                    name: "临武县"
                }, {
                    id: "2186",
                    name: "汝城县"
                }, {
                    id: "2187",
                    name: "桂东县"
                }, {
                    id: "2188",
                    name: "安仁县"
                }, {
                    id: "2189",
                    name: "资兴市"
                }]
            }, {
                id: "322",
                name: "永州市",
                child: [{
                    id: "2190",
                    name: "零陵区"
                }, {
                    id: "2191",
                    name: "冷水滩区"
                }, {
                    id: "2192",
                    name: "祁阳县"
                }, {
                    id: "2193",
                    name: "东安县"
                }, {
                    id: "2194",
                    name: "双牌县"
                }, {
                    id: "2195",
                    name: "道县"
                }, {
                    id: "2196",
                    name: "江永县"
                }, {
                    id: "2197",
                    name: "宁远县"
                }, {
                    id: "2198",
                    name: "蓝山县"
                }, {
                    id: "2199",
                    name: "新田县"
                }, {
                    id: "2200",
                    name: "江华瑶族自治县"
                }]
            }, {
                id: "323",
                name: "怀化市",
                child: [{
                    id: "2201",
                    name: "鹤城区"
                }, {
                    id: "2202",
                    name: "中方县"
                }, {
                    id: "2203",
                    name: "沅陵县"
                }, {
                    id: "2204",
                    name: "辰溪县"
                }, {
                    id: "2205",
                    name: "溆浦县"
                }, {
                    id: "2206",
                    name: "会同县"
                }, {
                    id: "2207",
                    name: "麻阳苗族自治县"
                }, {
                    id: "2208",
                    name: "新晃侗族自治县"
                }, {
                    id: "2209",
                    name: "芷江侗族自治县"
                }, {
                    id: "2210",
                    name: "靖州苗族侗族自治县"
                }, {
                    id: "2211",
                    name: "通道侗族自治县"
                }, {
                    id: "2212",
                    name: "洪江市"
                }]
            }, {
                id: "324",
                name: "娄底市",
                child: [{
                    id: "2213",
                    name: "娄星区"
                }, {
                    id: "2214",
                    name: "双峰县"
                }, {
                    id: "2215",
                    name: "新化县"
                }, {
                    id: "2216",
                    name: "冷水江市"
                }, {
                    id: "2217",
                    name: "涟源市"
                }]
            }, {
                id: "325",
                name: "湘西土家族苗族自治州",
                child: [{
                    id: "2218",
                    name: "吉首市"
                }, {
                    id: "2219",
                    name: "泸溪县"
                }, {
                    id: "2220",
                    name: "凤凰县"
                }, {
                    id: "2221",
                    name: "花垣县"
                }, {
                    id: "2222",
                    name: "保靖县"
                }, {
                    id: "2223",
                    name: "古丈县"
                }, {
                    id: "2224",
                    name: "永顺县"
                }, {
                    id: "2225",
                    name: "龙山县"
                }]
            }]
        }, {
            id: "21",
            name: "广东省",
            child: [{
                id: "326",
                name: "广州市",
                child: [{
                    id: "2226",
                    name: "荔湾区"
                }, {
                    id: "2227",
                    name: "越秀区"
                }, {
                    id: "2228",
                    name: "海珠区"
                }, {
                    id: "2229",
                    name: "天河区"
                }, {
                    id: "2230",
                    name: "白云区"
}, {
                    id: "2231",
                    name: "黄埔区"
                }, {
                    id: "2232",
                    name: "番禺区"
                }, {
                    id: "2233",
                    name: "花都区"
                }, {
                    id: "2234",
                    name: "南沙区"
                }, {
                    id: "2235",
                    name: "萝岗区"
                }, {
                    id: "2236",
                    name: "增城市"
                }, {
                    id: "2237",
                    name: "从化市"
                }]
            }, {
                id: "327",
                name: "韶关市",
                child: [{
                    id: "2238",
                    name: "武江区"
                }, {
                    id: "2239",
                    name: "浈江区"
                }, {
                    id: "2240",
                    name: "曲江区"
                }, {
                    id: "2241",
                    name: "始兴县"
                }, {
                    id: "2242",
                    name: "仁化县"
                }, {
                    id: "2243",
                    name: "翁源县"
                }, {
                    id: "2244",
                    name: "乳源瑶族自治县"
                }, {
                    id: "2245",
                    name: "新丰县"
                }, {
                    id: "2246",
                    name: "乐昌市"
                }, {
                    id: "2247",
                    name: "南雄市"
                }]
            }, {
                id: "328",
                name: "深圳市",
                child: [{
                    id: "2248",
                    name: "罗湖区"
                }, {
                    id: "2249",
                    name: "福田区"
                }, {
                    id: "2250",
                    name: "南山区"
                }, {
                    id: "2251",
                    name: "宝安区"
                }, {
                    id: "2252",
                    name: "龙岗区"
                }, {
                    id: "2253",
                    name: "盐田区"
                }]
            }, {
                id: "329",
                name: "珠海市",
                child: [{
                    id: "2254",
                    name: "香洲区"
                }, {
                    id: "2255",
                    name: "斗门区"
                }, {
                    id: "2256",
                    name: "金湾区"
                }]
            }, {
                id: "330",
                name: "汕头市",
                child: [{
                    id: "2257",
                    name: "龙湖区"
                }, {
                    id: "2258",
                    name: "金平区"
                }, {
                    id: "2259",
                    name: "濠江区"
                }, {
                    id: "2260",
                    name: "潮阳区"
                }, {
                    id: "2261",
                    name: "潮南区"
                }, {
                    id: "2262",
                    name: "澄海区"
                }, {
                    id: "2263",
                    name: "南澳县"
                }]
            }, {
                id: "331",
                name: "佛山市",
                child: [{
                    id: "2264",
                    name: "禅城区"
                }, {
                    id: "2265",
                    name: "南海区"
                }, {
                    id: "2266",
                    name: "顺德区"
                }, {
                    id: "2267",
                    name: "三水区"
                }, {
                    id: "2268",
                    name: "高明区"
                }]
            }, {
                id: "332",
                name: "江门市",
                child: [{
                    id: "2269",
                    name: "蓬江区"
                }, {
                    id: "2270",
                    name: "江海区"
                }, {
                    id: "2271",
                    name: "新会区"
                }, {
                    id: "2272",
                    name: "台山市"
                }, {
                    id: "2273",
                    name: "开平市"
                }, {
                    id: "2274",
                    name: "鹤山市"
                }, {
                    id: "2275",
                    name: "恩平市"
                }]
            }, {
                id: "333",
                name: "湛江市",
                child: [{
                    id: "2276",
                    name: "赤坎区"
                }, {
                    id: "2277",
                    name: "霞山区"
                }, {
                    id: "2278",
                    name: "坡头区"
                }, {
                    id: "2279",
                    name: "麻章区"
                }, {
                    id: "2280",
                    name: "遂溪县"
                }, {
                    id: "2281",
                    name: "徐闻县"
                }, {
                    id: "2282",
                    name: "廉江市"
                }, {
                    id: "2283",
                    name: "雷州市"
                }, {
                    id: "2284",
                    name: "吴川市"
                }]
            }, {
                id: "334",
                name: "茂名市",
                child: [{
                    id: "2285",
                    name: "茂南区"
                }, {
                    id: "2286",
                    name: "茂港区"
                }, {
                    id: "2287",
                    name: "电白县"
                }, {
                    id: "2288",
                    name: "高州市"
                }, {
                    id: "2289",
                    name: "化州市"
                }, {
                    id: "2290",
                    name: "信宜市"
                }]
            }, {
                id: "335",
                name: "肇庆市",
                child: [{
                    id: "2291",
                    name: "端州区"
                }, {
                    id: "2292",
                    name: "鼎湖区"
                }, {
                    id: "2293",
                    name: "广宁县"
                }, {
                    id: "2294",
                    name: "怀集县"
                }, {
                    id: "2295",
                    name: "封开县"
                }, {
                    id: "2296",
                    name: "德庆县"
                }, {
                    id: "2297",
                    name: "高要市"
                }, {
                    id: "2298",
                    name: "四会市"
                }]
            }, {
                id: "336",
                name: "惠州市",
                child: [{
                    id: "2299",
                    name: "惠城区"
                }, {
                    id: "2300",
                    name: "惠阳区"
                }, {
                    id: "2301",
                    name: "博罗县"
                }, {
                    id: "2302",
                    name: "惠东县"
                }, {
                    id: "2303",
                    name: "龙门县"
                }]
            }, {
                id: "337",
                name: "梅州市",
                child: [{
                    id: "2304",
                    name: "梅江区"
                }, {
                    id: "2305",
                    name: "梅县"
                }, {
                    id: "2306",
                    name: "大埔县"
                }, {
                    id: "2307",
                    name: "丰顺县"
                }, {
                    id: "2308",
                    name: "五华县"
                }, {
                    id: "2309",
                    name: "平远县"
                }, {
                    id: "2310",
                    name: "蕉岭县"
                }, {
                    id: "2311",
                    name: "兴宁市"
                }]
            }, {
                id: "338",
                name: "汕尾市",
                child: [{
                    id: "2312",
                    name: "城区"
                }, {
                    id: "2313",
                    name: "海丰县"
                }, {
                    id: "2314",
                    name: "陆河县"
                }, {
                    id: "2315",
                    name: "陆丰市"
                }]
            }, {
                id: "339",
                name: "河源市",
                child: [{
                    id: "2316",
                    name: "源城区"
                }, {
                    id: "2317",
                    name: "紫金县"
                }, {
                    id: "2318",
                    name: "龙川县"
                }, {
                    id: "2319",
                    name: "连平县"
                }, {
                    id: "2320",
                    name: "和平县"
                }, {
                    id: "2321",
                    name: "东源县"
                }]
            }, {
                id: "340",
                name: "阳江市",
                child: [{
                    id: "2322",
                    name: "江城区"
                }, {
                    id: "2323",
                    name: "阳西县"
                }, {
                    id: "2324",
                    name: "阳东县"
                }, {
                    id: "2325",
                    name: "阳春市"
                }]
            }, {
                id: "341",
                name: "清远市",
                child: [{
                    id: "2326",
                    name: "清城区"
                }, {
                    id: "2327",
                    name: "佛冈县"
                }, {
                    id: "2328",
                    name: "阳山县"
                }, {
                    id: "2329",
                    name: "连山壮族瑶族自治县"
                }, {
                    id: "2330",
                    name: "连南瑶族自治县"
                }, {
                    id: "2331",
                    name: "清新县"
                }, {
                    id: "2332",
                    name: "英德市"
                }, {
                    id: "2333",
                    name: "连州市"
                }]
            }, {
                id: "342",
                name: "东莞市"
            }, {
                id: "343",
                name: "中山市"
            }, {
                id: "344",
                name: "潮州市",
                child: [{
                    id: "2334",
                    name: "湘桥区"
                }, {
                    id: "2335",
                    name: "潮安县"
                }, {
                    id: "2336",
                    name: "饶平县"
                }]
            }, {
                id: "345",
                name: "揭阳市",
                child: [{
                    id: "2337",
                    name: "榕城区"
                }, {
                    id: "2338",
                    name: "揭东县"
                }, {
                    id: "2339",
                    name: "揭西县"
                }, {
                    id: "2340",
                    name: "惠来县"
                }, {
                    id: "2341",
                    name: "普宁市"
                }]
            }, {
                id: "346",
                name: "云浮市",
                child: [{
                    id: "2342",
                    name: "云城区"
                }, {
                    id: "2343",
                    name: "新兴县"
                }, {
                    id: "2344",
                    name: "郁南县"
                }, {
                    id: "2345",
                    name: "云安县"
                }, {
                    id: "2346",
                    name: "罗定市"
                }]
            }]
        }, {
            id: "22",
            name: "广西",
            child: [{
                id: "347",
                name: "南宁市",
                child: [{
                    id: "2347",
                    name: "兴宁区"
                }, {
                    id: "2348",
                    name: "青秀区"
                }, {
                    id: "2349",
                    name: "江南区"
                }, {
                    id: "2350",
                    name: "西乡塘区"
                }, {
                    id: "2351",
                    name: "良庆区"
                }, {
                    id: "2352",
                    name: "邕宁区"
                }, {
                    id: "2353",
                    name: "武鸣县"
                }, {
                    id: "2354",
                    name: "隆安县"
                }, {
                    id: "2355",
                    name: "马山县"
                }, {
                    id: "2356",
                    name: "上林县"
                }, {
                    id: "2357",
                    name: "宾阳县"
                }, {
                    id: "2358",
                    name: "横县"
                }]
            }, {
                id: "348",
                name: "柳州市",
                child: [{
                    id: "2359",
                    name: "城中区"
                }, {
                    id: "2360",
                    name: "鱼峰区"
                }, {
                    id: "2361",
                    name: "柳南区"
                }, {
                    id: "2362",
                    name: "柳北区"
                }, {
                    id: "2363",
                    name: "柳江县"
                }, {
                    id: "2364",
                    name: "柳城县"
                }, {
                    id: "2365",
                    name: "鹿寨县"
                }, {
                    id: "2366",
                    name: "融安县"
                }, {
                    id: "2367",
                    name: "融水苗族自治县"
                }, {
                    id: "2368",
                    name: "三江侗族自治县"
                }]
            }, {
                id: "349",
                name: "桂林市",
                child: [{
                    id: "2369",
                    name: "秀峰区"
                }, {
                    id: "2370",
                    name: "叠彩区"
                }, {
                    id: "2371",
                    name: "象山区"
                }, {
                    id: "2372",
                    name: "七星区"
                }, {
                    id: "2373",
                    name: "雁山区"
                }, {
                    id: "2374",
                    name: "阳朔县"
                }, {
                    id: "2375",
                    name: "临桂县"
                }, {
                    id: "2376",
                    name: "灵川县"
                }, {
                    id: "2377",
                    name: "全州县"
                }, {
                    id: "2378",
                    name: "兴安县"
                }, {
                    id: "2379",
                    name: "永福县"
                }, {
                    id: "2380",
                    name: "灌阳县"
                }, {
                    id: "2381",
                    name: "龙胜各族自治县"
                }, {
                    id: "2382",
                    name: "资源县"
                }, {
                    id: "2383",
                    name: "平乐县"
                }, {
                    id: "2384",
                    name: "荔蒲县"
                }, {
                    id: "2385",
                    name: "恭城瑶族自治县"
                }]
            }, {
                id: "350",
                name: "梧州市",
                child: [{
                    id: "2386",
                    name: "万秀区"
                }, {
                    id: "2387",
                    name: "蝶山区"
                }, {
                    id: "2388",
                    name: "长洲区"
                }, {
                    id: "2389",
                    name: "苍梧县"
                }, {
                    id: "2390",
                    name: "藤县"
                }, {
                    id: "2391",
                    name: "蒙山县"
                }, {
                    id: "2392",
                    name: "岑溪市"
                }]
            }, {
                id: "351",
                name: "北海市",
                child: [{
                    id: "2393",
                    name: "海城区"
                }, {
                    id: "2394",
                    name: "银海区"
                }, {
                    id: "2395",
                    name: "铁山港区"
                }, {
                    id: "2396",
                    name: "合浦县"
                }]
            }, {
                id: "352",
                name: "防城港市",
                child: [{
                    id: "2397",
                    name: "港口区"
                }, {
                    id: "2398",
                    name: "防城区"
                }, {
                    id: "2399",
                    name: "上思县"
                }, {
                    id: "2400",
                    name: "东兴市"
                }]
            }, {
                id: "353",
                name: "钦州市",
                child: [{
                    id: "2401",
                    name: "钦南区"
                }, {
                    id: "2402",
                    name: "钦北区"
                }, {
                    id: "2403",
                    name: "灵山县"
                }, {
                    id: "2404",
                    name: "浦北县"
                }]
            }, {
                id: "354",
                name: "贵港市",
                child: [{
                    id: "2405",
                    name: "港北区"
                }, {
                    id: "2406",
                    name: "港南区"
                }, {
                    id: "2407",
                    name: "覃塘区"
                }, {
                    id: "2408",
                    name: "平南县"
                }, {
                    id: "2409",
                    name: "桂平市"
                }]
            }, {
                id: "355",
                name: "玉林市",
                child: [{
                    id: "2410",
                    name: "玉州区"
                }, {
                    id: "2411",
                    name: "容县"
                }, {
                    id: "2412",
                    name: "陆川县"
                }, {
                    id: "2413",
                    name: "博白县"
                }, {
                    id: "2414",
                    name: "兴业县"
                }, {
                    id: "2415",
                    name: "北流市"
                }]
            }, {
                id: "356",
                name: "百色市",
                child: [{
                    id: "2416",
                    name: "右江区"
                }, {
                    id: "2417",
                    name: "田阳县"
                }, {
                    id: "2418",
                    name: "田东县"
                }, {
                    id: "2419",
                    name: "平果县"
                }, {
                    id: "2420",
                    name: "德保县"
                }, {
                    id: "2421",
                    name: "靖西县"
                }, {
                    id: "2422",
                    name: "那坡县"
                }, {
                    id: "2423",
                    name: "凌云县"
                }, {
                    id: "2424",
                    name: "乐业县"
                }, {
                    id: "2425",
                    name: "田林县"
                }, {
                    id: "2426",
                    name: "西林县"
                }, {
                    id: "2427",
                    name: "隆林各族自治县"
                }]
            }, {
                id: "357",
                name: "贺州市",
                child: [{
                    id: "2428",
                    name: "八步区"
                }, {
                    id: "2429",
                    name: "昭平县"
                }, {
                    id: "2430",
                    name: "钟山县"
                }, {
                    id: "2431",
                    name: "富川瑶族自治县"
                }]
            }, {
                id: "358",
                name: "河池市",
                child: [{
                    id: "2432",
                    name: "金城江区"
                }, {
                    id: "2433",
                    name: "南丹县"
                }, {
                    id: "2434",
                    name: "天峨县"
                }, {
                    id: "2435",
                    name: "凤山县"
                }, {
                    id: "2436",
                    name: "东兰县"
                }, {
                    id: "2437",
                    name: "罗城仫佬族自治县"
                }, {
                    id: "2438",
                    name: "环江毛南族自治县"
                }, {
                    id: "2439",
                    name: "巴马瑶族自治县"
                }, {
                    id: "2440",
                    name: "都安瑶族自治县"
                }, {
                    id: "2441",
                    name: "大化瑶族自治县"
                }, {
                    id: "2442",
                    name: "宜州市"
                }]
            }, {
                id: "359",
                name: "来宾市",
                child: [{
                    id: "2443",
                    name: "兴宾区"
                }, {
                    id: "2444",
                    name: "忻城县"
                }, {
                    id: "2445",
                    name: "象州县"
                }, {
                    id: "2446",
                    name: "武宣县"
                }, {
                    id: "2447",
                    name: "金秀瑶族自治县"
                }, {
                    id: "2448",
                    name: "合山市"
                }]
            }, {
                id: "360",
                name: "崇左市",
                child: [{
                    id: "2449",
                    name: "江洲区"
                }, {
                    id: "2450",
                    name: "扶绥县"
                }, {
                    id: "2451",
                    name: "宁明县"
                }, {
                    id: "2452",
                    name: "龙州县"
                }, {
                    id: "2453",
                    name: "大新县"
                }, {
                    id: "2454",
                    name: "天等县"
                }, {
                    id: "2455",
                    name: "凭祥市"
                }]
            }]
        }, {
            id: "23",
            name: "海南省",
            child: [{
                id: "361",
                name: "海口市",
                child: [{
                    id: "2456",
                    name: "秀英区"
                }, {
                    id: "2457",
                    name: "龙华区"
                }, {
                    id: "2458",
                    name: "琼山区"
                }, {
                    id: "2459",
                    name: "美兰区"
                }]
            }, {
                id: "362",
                name: "三亚市"
            }, {
                id: "363",
                name: "五指山市"
            }, {
                id: "364",
                name: "琼海市"
            }, {
                id: "365",
                name: "儋州市"
            }, {
                id: "366",
                name: "文昌市"
            }, {
                id: "367",
                name: "万宁市"
            }, {
                id: "368",
                name: "东方市"
            }, {
                id: "369",
                name: "定安县"
            }, {
                id: "370",
                name: "屯昌县"
            }, {
                id: "371",
                name: "澄迈县"
            }, {
                id: "372",
                name: "临高县"
            }, {
                id: "373",
                name: "白沙黎族自治县"
            }, {
                id: "374",
                name: "昌江黎族自治县"
            }, {
                id: "375",
                name: "乐东黎族自治县"
            }, {
                id: "376",
                name: "陵水黎族自治县"
            }, {
                id: "377",
                name: "保亭黎族苗族自治县"
            }, {
                id: "378",
                name: "琼中黎族苗族自治县"
            }, {
                id: "379",
                name: "西沙群岛"
            }, {
                id: "380",
                name: "南沙群岛"
            }, {
                id: "381",
                name: "中沙群岛的岛礁及其海域"
            }]
        }, {
            id: "24",
            name: "四川省",
            child: [{
                id: "382",
                name: "成都市",
                child: [{
                    id: "2460",
                    name: "锦江区"
                }, {
                    id: "2461",
                    name: "青羊区"
                }, {
                    id: "2462",
                    name: "金牛区"
                }, {
                    id: "2463",
                    name: "武侯区"
                }, {
                    id: "2464",
                    name: "成华区"
                }, {
                    id: "2465",
                    name: "龙泉驿区"
                }, {
                    id: "2466",
                    name: "青白江区"
                }, {
                    id: "2467",
                    name: "新都区"
                }, {
                    id: "2468",
                    name: "温江区"
                }, {
                    id: "2469",
                    name: "金堂县"
                }, {
                    id: "2470",
                    name: "双流县"
                }, {
                    id: "2471",
                    name: "郫县"
                }, {
                    id: "2472",
                    name: "大邑县"
                }, {
                    id: "2473",
                    name: "蒲江县"
                }, {
                    id: "2474",
                    name: "新津县"
                }, {
                    id: "2475",
                    name: "都江堰市"
                }, {
                    id: "2476",
                    name: "彭州市"
                }, {
                    id: "2477",
                    name: "邛崃市"
                }, {
                    id: "2478",
                    name: "崇州市"
                }]
            }, {
                id: "383",
                name: "自贡市",
                child: [{
                    id: "2479",
                    name: "自流井区"
                }, {
                    id: "2480",
                    name: "贡井区"
                }, {
                    id: "2481",
                    name: "大安区"
                }, {
                    id: "2482",
                    name: "沿滩区"
                }, {
                    id: "2483",
                    name: "荣县"
                }, {
                    id: "2484",
                    name: "富顺县"
                }]
            }, {
                id: "384",
                name: "攀枝花市",
                child: [{
                    id: "2485",
                    name: "东区"
                }, {
                    id: "2486",
                    name: "西区"
                }, {
                    id: "2487",
                    name: "仁和区"
                }, {
                    id: "2488",
                    name: "米易县"
                }, {
                    id: "2489",
                    name: "盐边县"
                }]
            }, {
                id: "385",
                name: "泸州市",
                child: [{
                    id: "2490",
                    name: "江阳区"
                }, {
                    id: "2491",
                    name: "纳溪区"
                }, {
                    id: "2492",
                    name: "龙马潭区"
                }, {
                    id: "2493",
                    name: "泸县"
                }, {
                    id: "2494",
                    name: "合江县"
                }, {
                    id: "2495",
                    name: "叙永县"
                }, {
                    id: "2496",
                    name: "古蔺县"
                }]
            }, {
                id: "386",
                name: "德阳市",
                child: [{
                    id: "2497",
                    name: "旌阳区"
                }, {
                    id: "2498",
                    name: "中江县"
                }, {
                    id: "2499",
                    name: "罗江县"
                }, {
                    id: "2500",
                    name: "广汉市"
                }, {
                    id: "2501",
                    name: "什邡市"
                }, {
                    id: "2502",
                    name: "绵竹市"
                }]
            }, {
                id: "387",
                name: "绵阳市",
                child: [{
                    id: "2503",
                    name: "涪城区"
                }, {
                    id: "2504",
                    name: "游仙区"
                }, {
                    id: "2505",
                    name: "三台县"
                }, {
                    id: "2506",
                    name: "盐亭县"
                }, {
                    id: "2507",
                    name: "安县"
                }, {
                    id: "2508",
                    name: "梓潼县"
                }, {
                    id: "2509",
                    name: "北川羌族自治县"
                }, {
                    id: "2510",
                    name: "平武县"
                }, {
                    id: "2511",
                    name: "江油市"
                }]
            }, {
                id: "388",
                name: "广元市",
                child: [{
                    id: "2512",
                    name: "市中区"
                }, {
                    id: "2513",
                    name: "元坝区"
                }, {
                    id: "2514",
                    name: "朝天区"
                }, {
                    id: "2515",
                    name: "旺苍县"
                }, {
                    id: "2516",
                    name: "青川县"
                }, {
                    id: "2517",
                    name: "剑阁县"
                }, {
                    id: "2518",
                    name: "苍溪县"
                }]
            }, {
                id: "389",
                name: "遂宁市",
                child: [{
                    id: "2519",
                    name: "船山区"
                }, {
                    id: "2520",
                    name: "安居区"
                }, {
                    id: "2521",
                    name: "蓬溪县"
                }, {
                    id: "2522",
                    name: "射洪县"
                }, {
                    id: "2523",
                    name: "大英县"
                }]
            }, {
                id: "390",
                name: "内江市",
                child: [{
                    id: "2524",
                    name: "市中区"
                }, {
                    id: "2525",
                    name: "东兴区"
                }, {
                    id: "2526",
                    name: "威远县"
                }, {
                    id: "2527",
                    name: "资中县"
                }, {
                    id: "2528",
                    name: "隆昌县"
                }]
            }, {
                id: "391",
                name: "乐山市",
                child: [{
                    id: "2529",
                    name: "市中区"
                }, {
                    id: "2530",
                    name: "沙湾区"
                }, {
                    id: "2531",
                    name: "五通桥区"
                }, {
                    id: "2532",
                    name: "金口河区"
                }, {
                    id: "2533",
                    name: "犍为县"
                }, {
                    id: "2534",
                    name: "井研县"
                }, {
                    id: "2535",
                    name: "夹江县"
                }, {
                    id: "2536",
                    name: "沐川县"
                }, {
                    id: "2537",
                    name: "峨边彝族自治县"
                }, {
                    id: "2538",
                    name: "马边彝族自治县"
                }, {
                    id: "2539",
                    name: "峨眉山市"
                }]
            }, {
                id: "392",
                name: "南充市",
                child: [{
                    id: "2540",
                    name: "顺庆区"
                }, {
                    id: "2541",
                    name: "高坪区"
                }, {
                    id: "2542",
                    name: "嘉陵区"
                }, {
                    id: "2543",
                    name: "南部县"
                }, {
                    id: "2544",
                    name: "营山县"
                }, {
                    id: "2545",
                    name: "蓬安县"
                }, {
                    id: "2546",
                    name: "仪陇县"
                }, {
                    id: "2547",
                    name: "西充县"
                }, {
                    id: "2548",
                    name: "阆中市"
                }]
            }, {
                id: "393",
                name: "眉山市",
                child: [{
                    id: "2549",
                    name: "东坡区"
                }, {
                    id: "2550",
                    name: "仁寿县"
                }, {
                    id: "2551",
                    name: "彭山县"
                }, {
                    id: "2552",
                    name: "洪雅县"
                }, {
                    id: "2553",
                    name: "丹棱县"
                }, {
                    id: "2554",
                    name: "青神县"
                }]
            }, {
                id: "394",
                name: "宜宾市",
                child: [{
                    id: "2555",
                    name: "翠屏区"
                }, {
                    id: "2556",
                    name: "宜宾县"
                }, {
                    id: "2557",
                    name: "南溪县"
                }, {
                    id: "2558",
                    name: "江安县"
                }, {
                    id: "2559",
                    name: "长宁县"
                }, {
                    id: "2560",
                    name: "高县"
                }, {
                    id: "2561",
                    name: "珙县"
                }, {
                    id: "2562",
                    name: "筠连县"
                }, {
                    id: "2563",
                    name: "兴文县"
                }, {
                    id: "2564",
                    name: "屏山县"
                }]
            }, {
                id: "395",
                name: "广安市",
                child: [{
                    id: "2565",
                    name: "广安区"
                }, {
                    id: "2566",
                    name: "岳池县"
                }, {
                    id: "2567",
                    name: "武胜县"
                }, {
                    id: "2568",
                    name: "邻水县"
                }, {
                    id: "2569",
                    name: "华蓥市"
                }]
            }, {
                id: "396",
                name: "达州市",
                child: [{
                    id: "2570",
                    name: "通川区"
                }, {
                    id: "2571",
                    name: "达县"
                }, {
                    id: "2572",
                    name: "宣汉县"
                }, {
                    id: "2573",
                    name: "开江县"
                }, {
                    id: "2574",
                    name: "大竹县"
                }, {
                    id: "2575",
                    name: "渠县"
                }, {
                    id: "2576",
                    name: "万源市"
                }]
            }, {
                id: "397",
                name: "雅安市",
                child: [{
                    id: "2577",
                    name: "雨城区"
                }, {
                    id: "2578",
                    name: "名山县"
                }, {
                    id: "2579",
                    name: "荥经县"
                }, {
                    id: "2580",
                    name: "汉源县"
                }, {
                    id: "2581",
                    name: "石棉县"
                }, {
                    id: "2582",
                    name: "天全县"
                }, {
                    id: "2583",
                    name: "芦山县"
                }, {
                    id: "2584",
                    name: "宝兴县"
                }]
            }, {
                id: "398",
                name: "巴中市",
                child: [{
                    id: "2585",
                    name: "巴州区"
                }, {
                    id: "2586",
                    name: "通江县"
                }, {
                    id: "2587",
                    name: "南江县"
                }, {
                    id: "2588",
                    name: "平昌县"
                }]
            }, {
                id: "399",
                name: "资阳市",
                child: [{
                    id: "2589",
                    name: "雁江区"
                }, {
                    id: "2590",
                    name: "安岳县"
                }, {
                    id: "2591",
                    name: "乐至县"
                }, {
                    id: "2592",
                    name: "简阳市"
                }]
            }, {
                id: "400",
                name: "阿坝州",
                child: [{
                    id: "2593",
                    name: "汶川县"
                }, {
                    id: "2594",
                    name: "理县"
                }, {
                    id: "2595",
                    name: "茂县"
                }, {
                    id: "2596",
                    name: "松潘县"
                }, {
                    id: "2597",
                    name: "九寨沟县"
                }, {
                    id: "2598",
                    name: "金川县"
                }, {
                    id: "2599",
                    name: "小金县"
                }, {
                    id: "2600",
                    name: "黑水县"
                }, {
                    id: "2601",
                    name: "马尔康县"
                }, {
                    id: "2602",
                    name: "壤塘县"
                }, {
                    id: "2603",
                    name: "阿坝县"
                }, {
                    id: "2604",
                    name: "若尔盖县"
                }, {
                    id: "2605",
                    name: "红原县"
                }]
            }, {
                id: "401",
                name: "甘孜州",
                child: [{
                    id: "2606",
                    name: "康定县"
                }, {
                    id: "2607",
                    name: "泸定县"
                }, {
                    id: "2608",
                    name: "丹巴县"
                }, {
                    id: "2609",
                    name: "九龙县"
                }, {
                    id: "2610",
                    name: "雅江县"
                }, {
                    id: "2611",
                    name: "道孚县"
                }, {
                    id: "2612",
                    name: "炉霍县"
                }, {
                    id: "2613",
                    name: "甘孜县"
                }, {
                    id: "2614",
                    name: "新龙县"
                }, {
                    id: "2615",
                    name: "德格县"
                }, {
                    id: "2616",
                    name: "白玉县"
                }, {
                    id: "2617",
                    name: "石渠县"
                }, {
                    id: "2618",
                    name: "色达县"
                }, {
                    id: "2619",
                    name: "理塘县"
                }, {
                    id: "2620",
                    name: "巴塘县"
                }, {
                    id: "2621",
                    name: "乡城县"
                }, {
                    id: "2622",
                    name: "稻城县"
                }, {
                    id: "2623",
                    name: "得荣县"
                }]
            }, {
                id: "402",
                name: "凉山州",
                child: [{
                    id: "2624",
                    name: "西昌市"
                }, {
                    id: "2625",
                    name: "木里藏族自治县"
                }, {
                    id: "2626",
                    name: "盐源县"
                }, {
                    id: "2627",
                    name: "德昌县"
                }, {
                    id: "2628",
                    name: "会理县"
                }, {
                    id: "2629",
                    name: "会东县"
                }, {
                    id: "2630",
                    name: "宁南县"
                }, {
                    id: "2631",
                    name: "普格县"
                }, {
                    id: "2632",
                    name: "布拖县"
                }, {
                    id: "2633",
                    name: "金阳县"
                }, {
                    id: "2634",
                    name: "昭觉县"
                }, {
                    id: "2635",
                    name: "喜德县"
                }, {
                    id: "2636",
                    name: "冕宁县"
                }, {
                    id: "2637",
                    name: "越西县"
                }, {
                    id: "2638",
                    name: "甘洛县"
                }, {
                    id: "2639",
                    name: "美姑县"
                }, {
                    id: "2640",
                    name: "雷波县"
                }]
            }]
        }, {
            id: "25",
            name: "贵州省",
            child: [{
                id: "403",
                name: "贵阳市",
                child: [{
                    id: "2641",
                    name: "南明区"
                }, {
                    id: "2642",
                    name: "云岩区"
                }, {
                    id: "2643",
                    name: "花溪区"
                }, {
                    id: "2644",
                    name: "乌当区"
                }, {
                    id: "2645",
                    name: "白云区"
                }, {
                    id: "2646",
                    name: "小河区"
                }, {
                    id: "2647",
                    name: "开阳县"
                }, {
                    id: "2648",
                    name: "息烽县"
                }, {
                    id: "2649",
                    name: "修文县"
                }, {
                    id: "2650",
                    name: "清镇市"
                }]
            }, {
                id: "404",
                name: "六盘水市",
                child: [{
                    id: "2651",
                    name: "钟山区"
                }, {
                    id: "2652",
                    name: "六枝特区"
                }, {
                    id: "2653",
                    name: "水城县"
                }, {
                    id: "2654",
                    name: "盘县"
                }]
            }, {
                id: "405",
                name: "遵义市",
                child: [{
                    id: "2655",
                    name: "红花岗区"
                }, {
                    id: "2656",
                    name: "汇川区"
                }, {
                    id: "2657",
                    name: "遵义县"
                }, {
                    id: "2658",
                    name: "桐梓县"
                }, {
                    id: "2659",
                    name: "绥阳县"
                }, {
                    id: "2660",
                    name: "正安县"
                }, {
                    id: "2661",
                    name: "道真仡佬族苗族自治县"
                }, {
                    id: "2662",
                    name: "务川仡佬族苗族自治县"
                }, {
                    id: "2663",
                    name: "凤冈县"
                }, {
                    id: "2664",
                    name: "湄潭县"
                }, {
                    id: "2665",
                    name: "余庆县"
                }, {
                    id: "2666",
                    name: "习水县"
                }, {
                    id: "2667",
                    name: "赤水市"
                }, {
                    id: "2668",
                    name: "仁怀市"
                }]
            }, {
                id: "406",
                name: "安顺市",
                child: [{
                    id: "2669",
                    name: "西秀区"
                }, {
                    id: "2670",
                    name: "平坝县"
                }, {
                    id: "2671",
                    name: "普定县"
                }, {
                    id: "2672",
                    name: "镇宁布依族苗族自治县"
                }, {
                    id: "2673",
                    name: "关岭布依族苗族自治县"
                }, {
                    id: "2674",
                    name: "紫云苗族布依族自治县"
                }]
            }, {
                id: "407",
                name: "铜仁地区",
                child: [{
                    id: "2675",
                    name: "铜仁市"
                }, {
                    id: "2676",
                    name: "江口县"
                }, {
                    id: "2677",
                    name: "玉屏侗族自治县"
                }, {
                    id: "2678",
                    name: "石阡县"
                }, {
                    id: "2679",
                    name: "思南县"
                }, {
                    id: "2680",
                    name: "印江土家族苗族自治县"
                }, {
                    id: "2681",
                    name: "德江县"
                }, {
                    id: "2682",
                    name: "沿河土家族自治县"
                }, {
                    id: "2683",
                    name: "松桃苗族自治县"
                }, {
                    id: "2684",
                    name: "万山特区"
                }]
            }, {
                id: "408",
                name: "黔西南州",
                child: [{
                    id: "2685",
                    name: "兴义市"
                }, {
                    id: "2686",
                    name: "兴仁县"
                }, {
                    id: "2687",
                    name: "普安县"
                }, {
                    id: "2688",
                    name: "晴隆县"
                }, {
                    id: "2689",
                    name: "贞丰县"
                }, {
                    id: "2690",
                    name: "望谟县"
                }, {
                    id: "2691",
                    name: "册亨县"
                }, {
                    id: "2692",
                    name: "安龙县"
                }]
            }, {
                id: "409",
                name: "毕节地区",
                child: [{
                    id: "2693",
                    name: "毕节市"
                }, {
                    id: "2694",
                    name: "大方县"
                }, {
                    id: "2695",
                    name: "黔西县"
                }, {
                    id: "2696",
                    name: "金沙县"
                }, {
                    id: "2697",
                    name: "织金县"
                }, {
                    id: "2698",
                    name: "纳雍县"
                }, {
                    id: "2699",
                    name: "威宁彝族回族苗族自治县"
                }, {
                    id: "2700",
                    name: "赫章县"
                }]
            }, {
                id: "410",
                name: "黔东南州",
                child: [{
                    id: "2701",
                    name: "凯里市"
                }, {
                    id: "2702",
                    name: "黄平县"
                }, {
                    id: "2703",
                    name: "施秉县"
                }, {
                    id: "2704",
                    name: "三穗县"
                }, {
                    id: "2705",
                    name: "镇远县"
                }, {
                    id: "2706",
                    name: "岑巩县"
                }, {
                    id: "2707",
                    name: "天柱县"
                }, {
                    id: "2708",
                    name: "锦屏县"
                }, {
                    id: "2709",
                    name: "剑河县"
                }, {
                    id: "2710",
                    name: "台江县"
                }, {
                    id: "2711",
                    name: "黎平县"
                }, {
                    id: "2712",
                    name: "榕江县"
                }, {
                    id: "2713",
                    name: "从江县"
                }, {
                    id: "2714",
                    name: "雷山县"
                }, {
                    id: "2715",
                    name: "麻江县"
                }, {
                    id: "2716",
                    name: "丹寨县"
                }]
            }, {
                id: "411",
                name: "黔南州",
                child: [{
                    id: "2717",
                    name: "都匀市"
                }, {
                    id: "2718",
                    name: "福泉市"
                }, {
                    id: "2719",
                    name: "荔波县"
                }, {
                    id: "2720",
                    name: "贵定县"
                }, {
                    id: "2721",
                    name: "瓮安县"
                }, {
                    id: "2722",
                    name: "独山县"
                }, {
                    id: "2723",
                    name: "平塘县"
                }, {
                    id: "2724",
                    name: "罗甸县"
                }, {
                    id: "2725",
                    name: "长顺县"
                }, {
                    id: "2726",
                    name: "龙里县"
                }, {
                    id: "2727",
                    name: "惠水县"
                }, {
                    id: "2728",
                    name: "三都水族自治县"
                }]
            }]
        }, {
            id: "26",
            name: "云南省",
            child: [{
                id: "412",
                name: "昆明市",
                child: [{
                    id: "2729",
                    name: "五华区"
                }, {
                    id: "2730",
                    name: "盘龙区"
                }, {
                    id: "2731",
                    name: "官渡区"
                }, {
                    id: "2732",
                    name: "西山区"
                }, {
                    id: "2733",
                    name: "东川区"
                }, {
                    id: "2734",
                    name: "呈贡县"
                }, {
                    id: "2735",
                    name: "晋宁县"
                }, {
                    id: "2736",
                    name: "富民县"
                }, {
                    id: "2737",
                    name: "宜良县"
                }, {
                    id: "2738",
                    name: "石林彝族自治县"
                }, {
                    id: "2739",
                    name: "嵩明县"
                }, {
                    id: "2740",
                    name: "禄劝彝族苗族自治县"
                }, {
                    id: "2741",
                    name: "寻甸回族彝族自治县"
                }, {
                    id: "2742",
                    name: "安宁市"
                }]
            }, {
                id: "413",
                name: "曲靖市",
                child: [{
                    id: "2743",
                    name: "麒麟区"
                }, {
                    id: "2744",
                    name: "马龙县"
                }, {
                    id: "2745",
                    name: "陆良县"
                }, {
                    id: "2746",
                    name: "师宗县"
                }, {
                    id: "2747",
                    name: "罗平县"
                }, {
                    id: "2748",
                    name: "富源县"
                }, {
                    id: "2749",
                    name: "会泽县"
                }, {
                    id: "2750",
                    name: "沾益县"
                }, {
                    id: "2751",
                    name: "宣威市"
                }]
            }, {
                id: "414",
                name: "玉溪市",
                child: [{
                    id: "2752",
                    name: "红塔区"
                }, {
                    id: "2753",
                    name: "江川县"
                }, {
                    id: "2754",
                    name: "澄江县"
                }, {
                    id: "2755",
                    name: "通海县"
                }, {
                    id: "2756",
                    name: "华宁县"
                }, {
                    id: "2757",
                    name: "易门县"
                }, {
                    id: "2758",
                    name: "峨山彝族自治县"
                }, {
                    id: "2759",
                    name: "新平彝族傣族自治县"
                }, {
                    id: "2760",
                    name: "元江哈尼族彝族傣族自治县"
                }]
            }, {
                id: "415",
                name: "保山市",
                child: [{
                    id: "2761",
                    name: "隆阳区"
                }, {
                    id: "2762",
                    name: "施甸县"
                }, {
                    id: "2763",
                    name: "腾冲县"
                }, {
                    id: "2764",
                    name: "龙陵县"
                }, {
                    id: "2765",
                    name: "昌宁县"
                }]
            }, {
                id: "416",
                name: "昭通市",
                child: [{
                    id: "2766",
                    name: "昭阳区"
                }, {
                    id: "2767",
                    name: "鲁甸县"
                }, {
                    id: "2768",
                    name: "巧家县"
                }, {
                    id: "2769",
                    name: "盐津县"
                }, {
                    id: "2770",
                    name: "大关县"
                }, {
                    id: "2771",
                    name: "永善县"
                }, {
                    id: "2772",
                    name: "绥江县"
                }, {
                    id: "2773",
                    name: "镇雄县"
                }, {
                    id: "2774",
                    name: "彝良县"
                }, {
                    id: "2775",
                    name: "威信县"
                }, {
                    id: "2776",
                    name: "水富县"
                }]
            }, {
                id: "417",
                name: "丽江市",
                child: [{
                    id: "2777",
                    name: "古城区"
                }, {
                    id: "2778",
                    name: "玉龙纳西族自治县"
                }, {
                    id: "2779",
                    name: "永胜县"
                }, {
                    id: "2780",
                    name: "华坪县"
                }, {
                    id: "2781",
                    name: "宁蒗彝族自治县"
                }]
            }, {
                id: "418",
                name: "思茅市",
                child: [{
                    id: "2782",
                    name: "翠云区"
                }, {
                    id: "2783",
                    name: "普洱哈尼族彝族自治县"
                }, {
                    id: "2784",
                    name: "墨江哈尼族自治县"
                }, {
                    id: "2785",
                    name: "景东彝族自治县"
                }, {
                    id: "2786",
                    name: "景谷傣族彝族自治县"
                }, {
                    id: "2787",
                    name: "镇沅彝族哈尼族拉祜族自治县"
                }, {
                    id: "2788",
                    name: "江城哈尼族彝族自治县"
                }, {
                    id: "2789",
                    name: "孟连傣族拉祜族佤族自治县"
                }, {
                    id: "2790",
                    name: "澜沧拉祜族自治县"
                }, {
                    id: "2791",
                    name: "西盟佤族自治县"
                }]
            }, {
                id: "419",
                name: "临沧市",
                child: [{
                    id: "2792",
                    name: "临翔区"
                }, {
                    id: "2793",
                    name: "凤庆县"
                }, {
                    id: "2794",
                    name: "云县"
                }, {
                    id: "2795",
                    name: "永德县"
                }, {
                    id: "2796",
                    name: "镇康县"
                }, {
                    id: "2797",
                    name: "双江拉祜族佤族布朗族傣族自治县"
                }, {
                    id: "2798",
                    name: "耿马傣族佤族自治县"
                }]
            }, {
                id: "420",
                name: "楚雄州",
                child: [{
                    id: "2799",
                    name: "沧源佤族自治县"
                }, {
                    id: "2800",
                    name: "楚雄市"
                }, {
                    id: "2801",
                    name: "双柏县"
                }, {
                    id: "2802",
                    name: "牟定县"
                }, {
                    id: "2803",
                    name: "南华县"
                }, {
                    id: "2804",
                    name: "姚安县"
                }, {
                    id: "2805",
                    name: "大姚县"
                }, {
                    id: "2806",
                    name: "永仁县"
                }, {
                    id: "2807",
                    name: "元谋县"
                }, {
                    id: "2808",
                    name: "武定县"
                }, {
                    id: "2809",
                    name: "禄丰县"
                }]
            }, {
                id: "421",
                name: "红河州",
                child: [{
                    id: "2810",
                    name: "个旧市"
                }, {
                    id: "2811",
                    name: "开远市"
                }, {
                    id: "2812",
                    name: "蒙自县"
                }, {
                    id: "2813",
                    name: "屏边苗族自治县"
                }, {
                    id: "2814",
                    name: "建水县"
                }, {
                    id: "2815",
                    name: "石屏县"
                }, {
                    id: "2816",
                    name: "弥勒县"
                }, {
                    id: "2817",
                    name: "泸西县"
                }, {
                    id: "2818",
                    name: "元阳县"
                }, {
                    id: "2819",
                    name: "红河县"
                }, {
                    id: "2820",
                    name: "金平苗族瑶族傣族自治县"
                }, {
                    id: "2821",
                    name: "绿春县"
                }, {
                    id: "2822",
                    name: "河口瑶族自治县"
                }]
            }, {
                id: "422",
                name: "文山州",
                child: [{
                    id: "2823",
                    name: "文山县"
                }, {
                    id: "2824",
                    name: "砚山县"
                }, {
                    id: "2825",
                    name: "西畴县"
                }, {
                    id: "2826",
                    name: "麻栗坡县"
                }, {
                    id: "2827",
                    name: "马关县"
                }, {
                    id: "2828",
                    name: "丘北县"
                }, {
                    id: "2829",
                    name: "广南县"
                }, {
                    id: "2830",
                    name: "富宁县"
                }]
            }, {
                id: "423",
                name: "西双版纳",
                child: [{
                    id: "2831",
                    name: "景洪市"
                }, {
                    id: "2832",
                    name: "勐海县"
                }, {
                    id: "2833",
                    name: "勐腊县"
                }]
            }, {
                id: "424",
                name: "大理",
                child: [{
                    id: "2834",
                    name: "大理市"
                }, {
                    id: "2835",
                    name: "漾濞彝族自治县"
                }, {
                    id: "2836",
                    name: "祥云县"
                }, {
                    id: "2837",
                    name: "宾川县"
                }, {
                    id: "2838",
                    name: "弥渡县"
                }, {
                    id: "2839",
                    name: "南涧彝族自治县"
                }, {
                    id: "2840",
                    name: "巍山彝族回族自治县"
                }, {
                    id: "2841",
                    name: "永平县"
                }, {
                    id: "2842",
                    name: "云龙县"
                }, {
                    id: "2843",
                    name: "洱源县"
                }, {
                    id: "2844",
                    name: "剑川县"
                }, {
                    id: "2845",
                    name: "鹤庆县"
                }]
            }, {
                id: "425",
                name: "德宏",
                child: [{
                    id: "2846",
                    name: "瑞丽市"
                }, {
                    id: "2847",
                    name: "潞西市"
                }, {
                    id: "2848",
                    name: "梁河县"
                }, {
                    id: "2849",
                    name: "盈江县"
                }, {
                    id: "2850",
                    name: "陇川县"
                }]
            }, {
                id: "426",
                name: "怒江",
                child: [{
                    id: "2851",
                    name: "泸水县"
                }, {
                    id: "2852",
                    name: "福贡县"
                }, {
                    id: "2853",
                    name: "贡山独龙族怒族自治县"
                }, {
                    id: "2854",
                    name: "兰坪白族普米族自治县"
                }]
            }, {
                id: "427",
                name: "迪庆",
                child: [{
                    id: "2855",
                    name: "香格里拉县"
                }, {
                    id: "2856",
                    name: "德钦县"
                }, {
                    id: "2857",
                    name: "维西傈僳族自治县"
                }]
            }]
        }, {
            id: "27",
            name: "西藏",
            child: [{
                id: "428",
                name: "拉萨市",
                child: [{
                    id: "2858",
                    name: "城关区"
                }, {
                    id: "2859",
                    name: "林周县"
                }, {
                    id: "2860",
                    name: "当雄县"
                }, {
                    id: "2861",
                    name: "尼木县"
                }, {
                    id: "2862",
                    name: "曲水县"
                }, {
                    id: "2863",
                    name: "堆龙德庆县"
                }, {
                    id: "2864",
                    name: "达孜县"
                }, {
                    id: "2865",
                    name: "墨竹工卡县"
                }]
            }, {
                id: "429",
                name: "昌都",
                child: [{
                    id: "2866",
                    name: "昌都县"
                }, {
                    id: "2867",
                    name: "江达县"
                }, {
                    id: "2868",
                    name: "贡觉县"
                }, {
                    id: "2869",
                    name: "类乌齐县"
                }, {
                    id: "2870",
                    name: "丁青县"
                }, {
                    id: "2871",
                    name: "察雅县"
                }, {
                    id: "2872",
                    name: "八宿县"
                }, {
                    id: "2873",
                    name: "左贡县"
                }, {
                    id: "2874",
                    name: "芒康县"
                }, {
                    id: "2875",
                    name: "洛隆县"
                }, {
                    id: "2876",
                    name: "边坝县"
                }]
            }, {
                id: "430",
                name: "山南",
                child: [{
                    id: "2877",
                    name: "乃东县"
                }, {
                    id: "2878",
                    name: "扎囊县"
                }, {
                    id: "2879",
                    name: "贡嘎县"
                }, {
                    id: "2880",
                    name: "桑日县"
                }, {
                    id: "2881",
                    name: "琼结县"
                }, {
                    id: "2882",
                    name: "曲松县"
                }, {
                    id: "2883",
                    name: "措美县"
                }, {
                    id: "2884",
                    name: "洛扎县"
                }, {
                    id: "2885",
                    name: "加查县"
                }, {
                    id: "2886",
                    name: "隆子县"
                }, {
                    id: "2887",
                    name: "错那县"
                }, {
                    id: "2888",
                    name: "浪卡子县"
                }]
            }, {
                id: "431",
                name: "日喀则",
                child: [{
                    id: "2889",
                    name: "日喀则市"
                }, {
                    id: "2890",
                    name: "南木林县"
                }, {
                    id: "2891",
                    name: "江孜县"
                }, {
                    id: "2892",
                    name: "定日县"
                }, {
                    id: "2893",
                    name: "萨迦县"
                }, {
                    id: "2894",
                    name: "拉孜县"
                }, {
                    id: "2895",
                    name: "昂仁县"
                }, {
                    id: "2896",
                    name: "谢通门县"
                }, {
                    id: "2897",
                    name: "白朗县"
                }, {
                    id: "2898",
                    name: "仁布县"
                }, {
                    id: "2899",
                    name: "康马县"
                }, {
                    id: "2900",
                    name: "定结县"
                }, {
                    id: "2901",
                    name: "仲巴县"
                }, {
                    id: "2902",
                    name: "亚东县"
                }, {
                    id: "2903",
                    name: "吉隆县"
                }, {
                    id: "2904",
                    name: "聂拉木县"
                }, {
                    id: "2905",
                    name: "萨嘎县"
                }, {
                    id: "2906",
                    name: "岗巴县"
                }]
            }, {
                id: "432",
                name: "那曲",
                child: [{
                    id: "2907",
                    name: "那曲县"
                }, {
                    id: "2908",
                    name: "嘉黎县"
                }, {
                    id: "2909",
                    name: "比如县"
                }, {
                    id: "2910",
                    name: "聂荣县"
                }, {
                    id: "2911",
                    name: "安多县"
                }, {
                    id: "2912",
                    name: "申扎县"
                }, {
                    id: "2913",
                    name: "索县"
                }, {
                    id: "2914",
                    name: "班戈县"
                }, {
                    id: "2915",
                    name: "巴青县"
                }, {
                    id: "2916",
                    name: "尼玛县"
                }]
            }, {
                id: "433",
                name: "阿里",
                child: [{
                    id: "2917",
                    name: "普兰县"
                }, {
                    id: "2918",
                    name: "札达县"
                }, {
                    id: "2919",
                    name: "噶尔县"
                }, {
                    id: "2920",
                    name: "日土县"
                }, {
                    id: "2921",
                    name: "革吉县"
                }, {
                    id: "2922",
                    name: "改则县"
                }, {
                    id: "2923",
                    name: "措勤县"
                }]
            }, {
                id: "434",
                name: "林芝",
                child: [{
                    id: "2924",
                    name: "林芝县"
                }, {
                    id: "2925",
                    name: "工布江达县"
                }, {
                    id: "2926",
                    name: "米林县"
                }, {
                    id: "2927",
                    name: "墨脱县"
                }, {
                    id: "2928",
                    name: "波密县"
                }, {
                    id: "2929",
                    name: "察隅县"
                }, {
                    id: "2930",
                    name: "朗县"
                }]
            }]
        }, {
            id: "28",
            name: "陕西省",
            child: [{
                id: "435",
                name: "西安市",
                child: [{
                    id: "2931",
                    name: "新城区"
                }, {
                    id: "2932",
                    name: "碑林区"
                }, {
                    id: "2933",
                    name: "莲湖区"
                }, {
                    id: "2934",
                    name: "灞桥区"
                }, {
                    id: "2935",
                    name: "未央区"
                }, {
                    id: "2936",
                    name: "雁塔区"
                }, {
                    id: "2937",
                    name: "阎良区"
                }, {
                    id: "2938",
                    name: "临潼区"
                }, {
                    id: "2939",
                    name: "长安区"
                }, {
                    id: "2940",
                    name: "蓝田县"
                }, {
                    id: "2941",
                    name: "周至县"
                }, {
                    id: "2942",
                    name: "户县"
                }, {
                    id: "2943",
                    name: "高陵县"
                }]
            }, {
                id: "436",
                name: "铜川市",
                child: [{
                    id: "2944",
                    name: "王益区"
                }, {
                    id: "2945",
                    name: "印台区"
                }, {
                    id: "2946",
                    name: "耀州区"
                }, {
                    id: "2947",
                    name: "宜君县"
                }]
            }, {
                id: "437",
                name: "宝鸡市",
                child: [{
                    id: "2948",
                    name: "渭滨区"
                }, {
                    id: "2949",
                    name: "金台区"
                }, {
                    id: "2950",
                    name: "陈仓区"
                }, {
                    id: "2951",
                    name: "凤翔县"
                }, {
                    id: "2952",
                    name: "岐山县"
                }, {
                    id: "2953",
                    name: "扶风县"
                }, {
                    id: "2954",
                    name: "眉县"
                }, {
                    id: "2955",
                    name: "陇县"
                }, {
                    id: "2956",
                    name: "千阳县"
                }, {
                    id: "2957",
                    name: "麟游县"
                }, {
                    id: "2958",
                    name: "凤县"
                }, {
                    id: "2959",
                    name: "太白县"
                }]
            }, {
                id: "438",
                name: "咸阳市",
                child: [{
                    id: "2960",
                    name: "秦都区"
                }, {
                    id: "2961",
                    name: "杨凌区"
                }, {
                    id: "2962",
                    name: "渭城区"
                }, {
                    id: "2963",
                    name: "三原县"
                }, {
                    id: "2964",
                    name: "泾阳县"
                }, {
                    id: "2965",
                    name: "乾县"
                }, {
                    id: "2966",
                    name: "礼泉县"
                }, {
                    id: "2967",
                    name: "永寿县"
                }, {
                    id: "2968",
                    name: "彬县"
                }, {
                    id: "2969",
                    name: "长武县"
                }, {
                    id: "2970",
                    name: "旬邑县"
                }, {
                    id: "2971",
                    name: "淳化县"
                }, {
                    id: "2972",
                    name: "武功县"
                }, {
                    id: "2973",
                    name: "兴平市"
                }]
            }, {
                id: "439",
                name: "渭南市",
                child: [{
                    id: "2974",
                    name: "临渭区"
                }, {
                    id: "2975",
                    name: "华县"
                }, {
                    id: "2976",
                    name: "潼关县"
                }, {
                    id: "2977",
                    name: "大荔县"
                }, {
                    id: "2978",
                    name: "合阳县"
                }, {
                    id: "2979",
                    name: "澄城县"
                }, {
                    id: "2980",
                    name: "蒲城县"
                }, {
                    id: "2981",
                    name: "白水县"
                }, {
                    id: "2982",
                    name: "富平县"
                }, {
                    id: "2983",
                    name: "韩城市"
                }, {
                    id: "2984",
                    name: "华阴市"
                }]
            }, {
                id: "440",
                name: "延安市",
                child: [{
                    id: "2985",
                    name: "宝塔区"
                }, {
                    id: "2986",
                    name: "延长县"
                }, {
                    id: "2987",
                    name: "延川县"
                }, {
                    id: "2988",
                    name: "子长县"
                }, {
                    id: "2989",
                    name: "安塞县"
                }, {
                    id: "2990",
                    name: "志丹县"
                }, {
                    id: "2991",
                    name: "吴起县"
                }, {
                    id: "2992",
                    name: "甘泉县"
                }, {
                    id: "2993",
                    name: "富县"
                }, {
                    id: "2994",
                    name: "洛川县"
                }, {
                    id: "2995",
                    name: "宜川县"
                }, {
                    id: "2996",
                    name: "黄龙县"
                }, {
                    id: "2997",
                    name: "黄陵县"
                }]
            }, {
                id: "441",
                name: "汉中市",
                child: [{
                    id: "2998",
                    name: "汉台区"
                }, {
                    id: "2999",
                    name: "南郑县"
                }, {
                    id: "3000",
                    name: "城固县"
                }, {
                    id: "3001",
                    name: "洋县"
                }, {
                    id: "3002",
                    name: "西乡县"
                }, {
                    id: "3003",
                    name: "勉县"
                }, {
                    id: "3004",
                    name: "宁强县"
                }, {
                    id: "3005",
                    name: "略阳县"
                }, {
                    id: "3006",
                    name: "镇巴县"
                }, {
                    id: "3007",
                    name: "留坝县"
                }, {
                    id: "3008",
                    name: "佛坪县"
                }]
            }, {
                id: "442",
                name: "榆林市",
                child: [{
                    id: "3009",
                    name: "榆阳区"
                }, {
                    id: "3010",
                    name: "神木县"
                }, {
                    id: "3011",
                    name: "府谷县"
                }, {
                    id: "3012",
                    name: "横山县"
                }, {
                    id: "3013",
                    name: "靖边县"
                }, {
                    id: "3014",
                    name: "定边县"
                }, {
                    id: "3015",
                    name: "绥德县"
                }, {
                    id: "3016",
                    name: "米脂县"
                }, {
                    id: "3017",
                    name: "佳县"
                }, {
                    id: "3018",
                    name: "吴堡县"
                }, {
                    id: "3019",
                    name: "清涧县"
                }, {
                    id: "3020",
                    name: "子洲县"
                }]
            }, {
                id: "443",
                name: "安康市",
                child: [{
                    id: "3021",
                    name: "汉滨区"
                }, {
                    id: "3022",
                    name: "汉阴县"
                }, {
                    id: "3023",
                    name: "石泉县"
                }, {
                    id: "3024",
                    name: "宁陕县"
                }, {
                    id: "3025",
                    name: "紫阳县"
                }, {
                    id: "3026",
                    name: "岚皋县"
                }, {
                    id: "3027",
                    name: "平利县"
                }, {
                    id: "3028",
                    name: "镇坪县"
                }, {
                    id: "3029",
                    name: "旬阳县"
                }, {
                    id: "3030",
                    name: "白河县"
                }]
            }, {
                id: "444",
                name: "商洛市",
                child: [{
                    id: "3031",
                    name: "商州区"
                }, {
                    id: "3032",
                    name: "洛南县"
                }, {
                    id: "3033",
                    name: "丹凤县"
                }, {
                    id: "3034",
                    name: "商南县"
                }, {
                    id: "3035",
                    name: "山阳县"
                }, {
                    id: "3036",
                    name: "镇安县"
                }, {
                    id: "3037",
                    name: "柞水县"
                }]
            }]
        }, {
            id: "29",
            name: "甘肃省",
            child: [{
                id: "445",
                name: "兰州市",
                child: [{
                    id: "3038",
                    name: "城关区"
                }, {
                    id: "3039",
                    name: "七里河区"
                }, {
                    id: "3040",
                    name: "西固区"
                }, {
                    id: "3041",
                    name: "安宁区"
                }, {
                    id: "3042",
                    name: "红古区"
                }, {
                    id: "3043",
                    name: "永登县"
                }, {
                    id: "3044",
                    name: "皋兰县"
                }, {
                    id: "3045",
                    name: "榆中县"
                }]
            }, {
                id: "446",
                name: "嘉峪关市"
            }, {
                id: "447",
                name: "金昌市",
                child: [{
                    id: "3046",
                    name: "金川区"
                }, {
                    id: "3047",
                    name: "永昌县"
                }]
            }, {
                id: "448",
                name: "白银市",
                child: [{
                    id: "3048",
                    name: "白银区"
                }, {
                    id: "3049",
                    name: "平川区"
                }, {
                    id: "3050",
                    name: "靖远县"
                }, {
                    id: "3051",
                    name: "会宁县"
                }, {
                    id: "3052",
                    name: "景泰县"
                }]
            }, {
                id: "449",
                name: "天水市",
                child: [{
                    id: "3053",
                    name: "秦城区"
                }, {
                    id: "3054",
                    name: "北道区"
                }, {
                    id: "3055",
                    name: "清水县"
                }, {
                    id: "3056",
                    name: "秦安县"
                }, {
                    id: "3057",
                    name: "甘谷县"
                }, {
                    id: "3058",
                    name: "武山县"
                }, {
                    id: "3059",
                    name: "张家川回族自治县"
                }]
            }, {
                id: "450",
                name: "武威市",
                child: [{
                    id: "3060",
                    name: "凉州区"
                }, {
                    id: "3061",
                    name: "民勤县"
                }, {
                    id: "3062",
                    name: "古浪县"
                }, {
                    id: "3063",
                    name: "天祝藏族自治县"
                }]
            }, {
                id: "451",
                name: "张掖市",
                child: [{
                    id: "3064",
                    name: "甘州区"
                }, {
                    id: "3065",
                    name: "肃南裕固族自治县"
                }, {
                    id: "3066",
                    name: "民乐县"
                }, {
                    id: "3067",
                    name: "临泽县"
                }, {
                    id: "3068",
                    name: "高台县"
                }, {
                    id: "3069",
                    name: "山丹县"
                }]
            }, {
                id: "452",
                name: "平凉市",
                child: [{
                    id: "3070",
                    name: "崆峒区"
                }, {
                    id: "3071",
                    name: "泾川县"
                }, {
                    id: "3072",
                    name: "灵台县"
                }, {
                    id: "3073",
                    name: "崇信县"
                }, {
                    id: "3074",
                    name: "华亭县"
                }, {
                    id: "3075",
                    name: "庄浪县"
                }, {
                    id: "3076",
                    name: "静宁县"
                }]
            }, {
                id: "453",
                name: "酒泉市",
                child: [{
                    id: "3077",
                    name: "肃州区"
                }, {
                    id: "3078",
                    name: "金塔县"
                }, {
                    id: "3079",
                    name: "瓜州县"
                }, {
                    id: "3080",
                    name: "肃北蒙古族自治县"
                }, {
                    id: "3081",
                    name: "阿克塞哈萨克族自治县"
                }, {
                    id: "3082",
                    name: "玉门市"
                }, {
                    id: "3083",
                    name: "敦煌市"
                }]
            }, {
                id: "454",
                name: "庆阳市",
                child: [{
                    id: "3084",
                    name: "西峰区"
                }, {
                    id: "3085",
                    name: "庆城县"
                }, {
                    id: "3086",
                    name: "环县"
                }, {
                    id: "3087",
                    name: "华池县"
                }, {
                    id: "3088",
                    name: "合水县"
                }, {
                    id: "3089",
                    name: "正宁县"
                }, {
                    id: "3090",
                    name: "宁县"
                }, {
                    id: "3091",
                    name: "镇原县"
                }]
            }, {
                id: "455",
                name: "定西市",
                child: [{
                    id: "3092",
                    name: "安定区"
                }, {
                    id: "3093",
                    name: "通渭县"
                }, {
                    id: "3094",
                    name: "陇西县"
                }, {
                    id: "3095",
                    name: "渭源县"
                }, {
                    id: "3096",
                    name: "临洮县"
                }, {
                    id: "3097",
                    name: "漳县"
                }, {
                    id: "3098",
                    name: "岷县"
                }]
            }, {
                id: "456",
                name: "陇南市",
                child: [{
                    id: "3099",
                    name: "武都区"
                }, {
                    id: "3100",
                    name: "成县"
                }, {
                    id: "3101",
                    name: "文县"
                }, {
                    id: "3102",
                    name: "宕昌县"
                }, {
                    id: "3103",
                    name: "康县"
                }, {
                    id: "3104",
                    name: "西和县"
                }, {
                    id: "3105",
                    name: "礼县"
                }, {
                    id: "3106",
                    name: "徽县"
                }, {
                    id: "3107",
                    name: "两当县"
                }]
            }, {
                id: "457",
                name: "临夏州",
                child: [{
                    id: "3108",
                    name: "临夏市"
                }, {
                    id: "3109",
                    name: "临夏县"
                }, {
                    id: "3110",
                    name: "康乐县"
                }, {
                    id: "3111",
                    name: "永靖县"
                }, {
                    id: "3112",
                    name: "广河县"
                }, {
                    id: "3113",
                    name: "和政县"
                }, {
                    id: "3114",
                    name: "东乡族自治县"
                }, {
                    id: "3115",
                    name: "积石山保安族东乡族撒拉族自治县"
                }]
            }, {
                id: "458",
                name: "甘州",
                child: [{
                    id: "3116",
                    name: "合作市"
                }, {
                    id: "3117",
                    name: "临潭县"
                }, {
                    id: "3118",
                    name: "卓尼县"
                }, {
                    id: "3119",
                    name: "舟曲县"
                }, {
                    id: "3120",
                    name: "迭部县"
                }, {
                    id: "3121",
                    name: "玛曲县"
                }, {
                    id: "3122",
                    name: "碌曲县"
                }, {
                    id: "3123",
                    name: "夏河县"
                }]
            }]
        }, {
            id: "30",
            name: "青海省",
            child: [{
                id: "459",
                name: "西宁市",
                child: [{
                    id: "3124",
                    name: "城东区"
                }, {
                    id: "3125",
                    name: "城中区"
                }, {
                    id: "3126",
                    name: "城西区"
                }, {
                    id: "3127",
                    name: "城北区"
                }, {
                    id: "3128",
                    name: "大通回族土族自治县"
                }, {
                    id: "3129",
                    name: "湟中县"
                }, {
                    id: "3130",
                    name: "湟源县"
                }]
            }, {
                id: "460",
                name: "海东地区",
                child: [{
                    id: "3131",
                    name: "平安县"
                }, {
                    id: "3132",
                    name: "民和回族土族自治县"
                }, {
                    id: "3133",
                    name: "乐都县"
                }, {
                    id: "3134",
                    name: "互助土族自治县"
                }, {
                    id: "3135",
                    name: "化隆回族自治县"
                }, {
                    id: "3136",
                    name: "循化撒拉族自治县"
                }]
            }, {
                id: "461",
                name: "海州",
                child: [{
                    id: "3137",
                    name: "门源回族自治县"
                }, {
                    id: "3138",
                    name: "祁连县"
                }, {
                    id: "3139",
                    name: "海晏县"
                }, {
                    id: "3140",
                    name: "刚察县"
                }]
            }, {
                id: "462",
                name: "黄南州",
                child: [{
                    id: "3141",
                    name: "同仁县"
                }, {
                    id: "3142",
                    name: "尖扎县"
                }, {
                    id: "3143",
                    name: "泽库县"
                }, {
                    id: "3144",
                    name: "河南蒙古族自治县"
                }]
            }, {
                id: "463",
                name: "海南州",
                child: [{
                    id: "3145",
                    name: "共和县"
                }, {
                    id: "3146",
                    name: "同德县"
                }, {
                    id: "3147",
                    name: "贵德县"
                }, {
                    id: "3148",
                    name: "兴海县"
                }, {
                    id: "3149",
                    name: "贵南县"
                }]
            }, {
                id: "464",
                name: "果洛州",
                child: [{
                    id: "3150",
                    name: "玛沁县"
                }, {
                    id: "3151",
                    name: "班玛县"
                }, {
                    id: "3152",
                    name: "甘德县"
                }, {
                    id: "3153",
                    name: "达日县"
                }, {
                    id: "3154",
                    name: "久治县"
                }, {
                    id: "3155",
                    name: "玛多县"
                }]
            }, {
                id: "465",
                name: "玉树州",
                child: [{
                    id: "3156",
                    name: "玉树县"
                }, {
                    id: "3157",
                    name: "杂多县"
                }, {
                    id: "3158",
                    name: "称多县"
                }, {
                    id: "3159",
                    name: "治多县"
                }, {
                    id: "3160",
                    name: "囊谦县"
                }, {
                    id: "3161",
                    name: "曲麻莱县"
                }]
            }, {
                id: "466",
                name: "海西州",
                child: [{
                    id: "3162",
                    name: "格尔木市"
                }, {
                    id: "3163",
                    name: "德令哈市"
                }, {
                    id: "3164",
                    name: "乌兰县"
                }, {
                    id: "3165",
                    name: "都兰县"
                }, {
                    id: "3166",
                    name: "天峻县"
                }]
            }]
        }, {
            id: "31",
            name: "宁夏",
            child: [{
                id: "467",
                name: "银川市",
                child: [{
                    id: "3167",
                    name: "兴庆区"
                }, {
                    id: "3168",
                    name: "西夏区"
                }, {
                    id: "3169",
                    name: "金凤区"
                }, {
                    id: "3170",
                    name: "永宁县"
                }, {
                    id: "3171",
                    name: "贺兰县"
                }, {
                    id: "3172",
                    name: "灵武市"
                }]
            }, {
                id: "468",
                name: "石嘴山市",
                child: [{
                    id: "3173",
                    name: "大武口区"
                }, {
                    id: "3174",
                    name: "惠农区"
                }, {
                    id: "3175",
                    name: "平罗县"
                }]
            }, {
                id: "469",
                name: "吴忠市",
                child: [{
                    id: "3176",
                    name: "利通区"
                }, {
                    id: "3177",
                    name: "盐池县"
                }, {
                    id: "3178",
                    name: "同心县"
                }, {
                    id: "3179",
                    name: "青铜峡市"
                }]
            }, {
                id: "470",
                name: "固原市",
                child: [{
                    id: "3180",
                    name: "原州区"
                }, {
                    id: "3181",
                    name: "西吉县"
                }, {
                    id: "3182",
                    name: "隆德县"
                }, {
                    id: "3183",
                    name: "泾源县"
                }, {
                    id: "3184",
                    name: "彭阳县"
                }]
            }, {
                id: "471",
                name: "中卫市",
                child: [{
                    id: "3185",
                    name: "沙坡头区"
                }, {
                    id: "3186",
                    name: "中宁县"
                }, {
                    id: "3187",
                    name: "海原县"
                }]
            }]
        }, {
            id: "32",
            name: "新疆",
            child: [{
                id: "472",
                name: "乌鲁木齐市",
                child: [{
                    id: "3188",
                    name: "天山区"
                }, {
                    id: "3189",
                    name: "沙依巴克区"
                }, {
                    id: "3190",
                    name: "新市区"
                }, {
                    id: "3191",
                    name: "水磨沟区"
                }, {
                    id: "3192",
                    name: "头屯河区"
                }, {
                    id: "3193",
                    name: "达坂城区"
                }, {
                    id: "3194",
                    name: "东山区"
                }, {
                    id: "3195",
                    name: "乌鲁木齐县"
                }]
            }, {
                id: "473",
                name: "克拉玛依市",
                child: [{
                    id: "3196",
                    name: "独山子区"
                }, {
                    id: "3197",
                    name: "克拉玛依区"
                }, {
                    id: "3198",
                    name: "白碱滩区"
                }, {
                    id: "3199",
                    name: "乌尔禾区"
                }]
            }, {
                id: "474",
                name: "吐鲁番地区",
                child: [{
                    id: "3200",
                    name: "吐鲁番市"
                }, {
                    id: "3201",
                    name: "鄯善县"
                }, {
                    id: "3202",
                    name: "托克逊县"
                }]
            }, {
                id: "475",
                name: "哈密地区",
                child: [{
                    id: "3203",
                    name: "哈密市"
                }, {
                    id: "3204",
                    name: "巴里坤哈萨克自治县"
                }, {
                    id: "3205",
                    name: "伊吾县"
                }]
            }, {
                id: "476",
                name: "昌吉州",
                child: [{
                    id: "3206",
                    name: "昌吉市"
                }, {
                    id: "3207",
                    name: "阜康市"
                }, {
                    id: "3208",
                    name: "米泉市"
                }, {
                    id: "3209",
                    name: "呼图壁县"
                }, {
                    id: "3210",
                    name: "玛纳斯县"
                }, {
                    id: "3211",
                    name: "奇台县"
                }, {
                    id: "3212",
                    name: "吉木萨尔县"
                }, {
                    id: "3213",
                    name: "木垒哈萨克自治县"
                }]
            }, {
                id: "477",
                name: "博尔州",
                child: [{
                    id: "3214",
                    name: "博乐市"
                }, {
                    id: "3215",
                    name: "精河县"
                }, {
                    id: "3216",
                    name: "温泉县"
                }]
            }, {
                id: "478",
                name: "巴音郭楞州",
                child: [{
                    id: "3217",
                    name: "库尔勒市"
                }, {
                    id: "3218",
                    name: "轮台县"
                }, {
                    id: "3219",
                    name: "尉犁县"
                }, {
                    id: "3220",
                    name: "若羌县"
                }, {
                    id: "3221",
                    name: "且末县"
                }, {
                    id: "3222",
                    name: "焉耆回族自治县"
                }, {
                    id: "3223",
                    name: "和静县"
                }, {
                    id: "3224",
                    name: "和硕县"
                }, {
                    id: "3225",
                    name: "博湖县"
                }]
            }, {
                id: "479",
                name: "阿克苏地区",
                child: [{
                    id: "3226",
                    name: "阿克苏市"
                }, {
                    id: "3227",
                    name: "温宿县"
                }, {
                    id: "3228",
                    name: "库车县"
                }, {
                    id: "3229",
                    name: "沙雅县"
                }, {
                    id: "3230",
                    name: "新和县"
                }, {
                    id: "3231",
                    name: "拜城县"
                }, {
                    id: "3232",
                    name: "乌什县"
                }, {
                    id: "3233",
                    name: "阿瓦提县"
                }, {
                    id: "3234",
                    name: "柯坪县"
                }]
            }, {
                id: "480",
                name: "克孜勒苏柯尔克孜自治州",
                child: [{
                    id: "3235",
                    name: "阿图什市"
                }, {
                    id: "3236",
                    name: "阿克陶县"
                }, {
                    id: "3237",
                    name: "阿合奇县"
                }, {
                    id: "3238",
                    name: "乌恰县"
                }]
            }, {
                id: "481",
                name: "喀什地区",
                child: [{
                    id: "3239",
                    name: "喀什市"
                }, {
                    id: "3240",
                    name: "疏附县"
                }, {
                    id: "3241",
                    name: "疏勒县"
                }, {
                    id: "3242",
                    name: "英吉沙县"
                }, {
                    id: "3243",
                    name: "泽普县"
                }, {
                    id: "3244",
                    name: "莎车县"
                }, {
                    id: "3245",
                    name: "叶城县"
                }, {
                    id: "3246",
                    name: "麦盖提县"
                }, {
                    id: "3247",
                    name: "岳普湖县"
                }, {
                    id: "3248",
                    name: "伽师县"
                }, {
                    id: "3249",
                    name: "巴楚县"
                }, {
                    id: "3250",
                    name: "塔什库尔干塔吉克自治县"
                }]
            }, {
                id: "482",
                name: "和田地区",
                child: [{
                    id: "3251",
                    name: "和田市"
                }, {
                    id: "3252",
                    name: "和田县"
                }, {
                    id: "3253",
                    name: "墨玉县"
                }, {
                    id: "3254",
                    name: "皮山县"
                }, {
                    id: "3255",
                    name: "洛浦县"
                }, {
                    id: "3256",
                    name: "策勒县"
                }, {
                    id: "3257",
                    name: "于田县"
                }, {
                    id: "3258",
                    name: "民丰县"
                }]
            }, {
                id: "483",
                name: "伊犁州",
                child: [{
                    id: "3259",
                    name: "伊宁市"
                }, {
                    id: "3260",
                    name: "奎屯市"
                }, {
                    id: "3261",
                    name: "伊宁县"
                }, {
                    id: "3262",
                    name: "察布查尔锡伯自治县"
                }, {
                    id: "3263",
                    name: "霍城县"
                }, {
                    id: "3264",
                    name: "巩留县"
                }, {
                    id: "3265",
                    name: "新源县"
                }, {
                    id: "3266",
                    name: "昭苏县"
                }, {
                    id: "3267",
                    name: "特克斯县"
                }, {
                    id: "3268",
                    name: "尼勒克县"
                }]
            }, {
                id: "484",
                name: "塔城地区",
                child: [{
                    id: "3269",
                    name: "塔城市"
                }, {
                    id: "3270",
                    name: "乌苏市"
                }, {
                    id: "3271",
                    name: "额敏县"
                }, {
                    id: "3272",
                    name: "沙湾县"
                }, {
                    id: "3273",
                    name: "托里县"
                }, {
                    id: "3274",
                    name: "裕民县"
                }, {
                    id: "3275",
                    name: "和布克赛尔蒙古自治县"
                }]
            }, {
                id: "485",
                name: "阿勒泰地区",
                child: [{
                    id: "3276",
                    name: "阿勒泰市"
                }, {
                    id: "3277",
                    name: "布尔津县"
                }, {
                    id: "3278",
                    name: "富蕴县"
                }, {
                    id: "3279",
                    name: "福海县"
                }, {
                    id: "3280",
                    name: "哈巴河县"
                }, {
                    id: "3281",
                    name: "青河县"
                }, {
                    id: "3282",
                    name: "吉木乃县"
                }]
            }, {
                id: "486",
                name: "石河子市"
            }, {
                id: "487",
                name: "阿拉尔市"
            }, {
                id: "488",
                name: "图木舒克市"
            }, {
                id: "489",
                name: "五家渠市"
            }]
        }, {
            id: "33",
            name: "台湾省",
            child: [{
                id: "490",
                name: "台北市"
            }, {
                id: "491",
                name: "高雄市"
            }, {
                id: "492",
                name: "基隆市"
            }, {
                id: "493",
                name: "新竹市"
            }, {
                id: "494",
                name: "台中市"
            }, {
                id: "495",
                name: "嘉义市"
            }, {
                id: "496",
                name: "台南市"
            }, {
                id: "497",
                name: "台北县"
            }, {
                id: "498",
                name: "桃园县"
            }, {
                id: "499",
                name: "新竹县"
            }, {
                id: "500",
                name: "苗栗县"
            }, {
                id: "501",
                name: "台中县"
            }, {
                id: "502",
                name: "彰化县"
            }, {
                id: "503",
                name: "南投县"
            }, {
                id: "504",
                name: "云林县"
            }, {
                id: "505",
                name: "嘉义县"
            }, {
                id: "506",
                name: "台南县"
            }, {
                id: "507",
                name: "高雄县"
            }, {
                id: "508",
                name: "屏东县"
            }, {
                id: "509",
                name: "宜兰县"
            }, {
                id: "510",
                name: "花莲县"
            }, {
                id: "511",
                name: "台东县"
            }, {
                id: "512",
                name: "澎湖县"
            }, {
                id: "513",
                name: "金门县"
            }, {
                id: "514",
                name: "连江县"
            }]
        }, {
            id: "34",
            name: "香港",
            child: [{
                id: "515",
                name: "中西区"
            }, {
                id: "516",
                name: "东区"
            }, {
                id: "517",
                name: "南区"
            }, {
                id: "518",
                name: "湾仔区"
            }, {
                id: "519",
                name: "九龙城区"
            }, {
                id: "520",
                name: "观塘区"
            }, {
                id: "521",
                name: "深水埗区"
            }, {
                id: "522",
                name: "黄大仙区"
            }, {
                id: "523",
                name: "油尖旺区"
            }, {
                id: "524",
                name: "离岛区"
            }, {
                id: "525",
                name: "葵青区"
            }, {
                id: "526",
                name: "北区"
            }, {
                id: "527",
                name: "西贡区"
            }, {
                id: "528",
                name: "沙田区"
            }, {
                id: "529",
                name: "大埔区"
            }, {
                id: "530",
                name: "荃湾区"
            }, {
                id: "531",
                name: "屯门区"
            }, {
                id: "532",
                name: "元朗区"
            }]
        }, {
            id: "35",
            name: "澳门",
            child: [{
                id: "533",
                name: "花地玛堂区"
            }, {
                id: "534",
                name: "市圣安多尼堂区"
            }, {
                id: "535",
                name: "大堂区"
            }, {
                id: "536",
                name: "望德堂区"
            }, {
                id: "537",
                name: "风顺堂区"
            }, {
                id: "538",
                name: "嘉模堂区"
            }, {
                id: "539",
                name: "圣方济各堂区"
            }]
        }, {
            id: "3358",
            name: "钓鱼岛",
            child: [{
                id: "3359",
                name: "钓鱼岛"
            }]
        }]
    };
    e.home = n
}, function (i, e, n) {
    "use strict";

    function a(i, e) {
        if (!(i instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.myvip = void 0;
    var d = function () {
            function i(i, e) {
                for (var n = 0; n < e.length; n++) {
                    var a = e[n];
                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(i, a.key, a)
                }
            }
            return function (e, n, a) {
                return n && i(e.prototype, n), a && i(e, a), e
            }
        }(),
        m = n(2),
        t = function () {
            function i() {
                a(this, i), this.navKey = !0, this.getKey = !0, this.codeUrl = m.DOMAIN.FULL + "/api/fcodeCheck/"
            }
            return d(i, [{
                key: "init",
                value: function () {
                    this.bindE(), this.getHistory()
                }
            }, {
                key: "bindE",
                value: function () {
                    var i = this;
                    $("#getBtn").on("click", function (e) {
                        e.preventDefault(), i.getVip()
                    })
                }
            }, {
                key: "getHistory",
                value: function () {
                    var i = this,
                        e = void 0,
                        n = void 0;
                    $("#exNav li").each(function (a) {
                        var d = $(this);
                        d.on("click", function () {
                            var m = $("#exCon li")[a];
                            "block" !== $(m).css("display") && "list-item" !== $(m).css("display") && i.navKey && (i.navKey = !1, $("#exNav li").removeClass("active"),
                                d.addClass("active"), $("#exCon li").fadeOut(100), e = setTimeout(function () {
                                    $("#exCon li").eq(a).fadeIn(100)
                                }, 100), n = setTimeout(function () {
                                    i.navKey = !0
                                }, 210))
                        })
                    })
                }
            }, {
                key: "getVip",
                value: function () {
                    var i = this,
                        e = $("#getInput").val();
                    this.getKey && (this.getKey = !1, "" === e ? (this.getKey = !0, m.V6JKXY.msgBox(0, "请输入F码")) : $.ajax({
                        url: this.codeUrl,
                        data: {
                            fcode: e
                        },
                        type: "get",
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        success: function (e) {
                            if (i.getKey = !0, 200 == e.code) {
                                var n = void 0;
                                m.V6JKXY.msgBox(1, "获取F码成功"), header.state(), n = setTimeout(function () {
                                    window.location.reload()
                                }, 1500)
                            } else m.V6JKXY.msgBox(0, e.msg)
                        },
                        error: function () {
                            m.V6JKXY.msgBox(0, "网络错误"), i.getKey = !0
                        }
                    }))
                }
            }]), i
        }(),
        o = new t;
    e.myvip = o
}, function (i, e, n) {
    "use strict";

    function a(i, e) {
        if (!(i instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.mysns = void 0;
    var d = function () {
            function i(i, e) {
                for (var n = 0; n < e.length; n++) {
                    var a = e[n];
                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(i, a.key, a)
                }
            }
            return function (e, n, a) {
                return n && i(e.prototype, n), a && i(e, a), e
            }
        }(),
        m = n(2),
        t = function () {
            function i() {
                a(this, i)
            }
            return d(i, [{
                key: "init",
                value: function () {
                    this.bindE()
                }
            }, {
                key: "bindE",
                value: function () {
                    var i = this;
                    $("#bindQQ").on("click", function () {
                        return i.bindAccount("qq")
                    }), $("#bindWeibo").on("click", function () {
                        return i.bindAccount("weibo")
                    }), $("#bindEoe").on("click", function () {
                        return i.bindAccount("eoe")
                    }), $("#bindWeixin").on("click", function () {
                        return i.bindAccount("weixin")
                    }), $(".unbindBtn").each(function () {
                        var i = $(this);
                        i.on("click", function () {
                            function e() {
                                $("#unbind-pop1").tooltip("pop", {
                                    width: 360,
                                    height: 236,
                                    popId: "#unbind-pop1",
                                    opacity: .4
                                }), o.on("click", function () {
                                    $.ajax({
                                        url: "/api/bindCount/?jsoncallback=?",
                                        type: "get",
                                        dataType: "jsonp",
                                        success: function (i) {
                                            0 == i.code ? (l.click(), n()) : a()
                                        },
                                        error: function () {
                                            m.V6JKXY.msgBox(0, "网络错误")
                                        }
                                    })
                                })
                            }

                            function n() {
                                $("#unbind-pop2").tooltip("pop", {
                                    width: 360,
                                    height: 344,
                                    popId: "#unbind-pop2",
                                    opacity: .4
                                }), c.on("click", a)
                            }

                            function a() {
                                $.ajax({
                                    url: "/api/disconnect/?jsoncallback=?",
                                    data: {
                                        id: r
                                    },
                                    type: "get",
                                    dataType: "jsonp",
                                    success: function (i) {
                                        200 == i.code ? m.V6JKXY.msgBox(1, i.msg, 1e3, function () {
                                            location.reload()
                                        }) : m.V6JKXY.msgBox(0, i.msg, 1e3)
                                    },
                                    error: function () {
                                        m.V6JKXY.msgBox(0, "网络错误")
                                    }
                                })
                            }
                            var d = $("#unbind-pop1"),
                                t = $("#unbind-pop2"),
                                o = d.find(".unbind01-btn"),
                                c = t.find(".unbind02-btn"),
                                l = d.find(".popclose"),
                                s = (t.find(".popclose"), i.attr("id")),
                                r = i.attr("data-id"),
                                u = $(".otherName");
                            "unbindQQ" == s ? u.html("QQ") : "unbindWeibo" == s ? u.html("微博") : "unbindEoe" == s ? u.html("eoe") : "unbindWeixin" == s && u.html("微信"), e()
                        })
                    })
                }
            }, {
                key: "bindAccount",
                value: function (i) {
                    var e = "https:" == document.location.protocol ? "https://" : "http://";
                    window.open(e + "passport." + m.DOMAIN.BASE + "/connect/" + i)
                }
            }]), i
        }(),
        o = new t;
    e.mysns = o
}, function (i, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.setID = void 0;
    var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (i) {
            return typeof i
        } : function (i) {
            return i && "function" == typeof Symbol && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i
        },
        m = n(2),
        t = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,60}[a-z0-9]+$/,
        o = /^0?1[2-9][0-9]\d{8}$/,
        c = c || {};
    e.setID = c = {
        init: function () {
            this.bindElem(), this.setPwd(), this.setEmail(), this.setPhone()
        },
        bindElem: function () {
            var i = this;
            $("#changePw").on("click", i.verifyMy), $("#changePhone").on("click", i.verifyMy), $("#changeEmail").on("click", i.verifyMy), $(".unbindBtn").on("click", i.unbindPop)
        },
        setPwd: function () {
            var i = $("#initPwd");
            $("#setPwd").bind("click", function () {
                $("#setPwdPopup").tooltip("pop", {
                    width: 360,
                    height: 332,
                    popId: "#setPwdPopup",
                    opacity: .4,
                    popFunc: function () {}
                })
            });
            var e = $(".initPwdBtn");
            i.keydown(function (i) {
                13 == i.keyCode && e.click()
            }), i.keyup(function () {
                i.ckPassWord("strong")
            }), e.bind("click", c.initPwdBtn)
        },
        setEmail: function () {
            $("#setEmail").on("click", function () {
                $("#set-email").tooltip("pop", {
                    width: 360,
                    height: 250,
                    popId: "#set-email",
                    opacity: .4,
                    popFunc: function () {}
                })
            });
            var i = $("#set-email"),
                e = (i.find(".popclose"), i.find(".init-email")),
                n = $(".set-email-btn");
            n.on("click", function () {
                var i = $.trim(e.val());
                i ? t.test(i) ? $.ajax({
                    url: m.DOMAIN.FULL + "/api/sendEmail/?jsoncallback=?",
                    data: {
                        email: i
                    },
                    type: "get",
                    dataType: "jsonp",
                    success: function (i) {
                        200 == i.code ? m.V6JKXY.msgBox(1, i.msg, 1e3, function () {
                            location.reload()
                        }) : m.V6JKXY.msgBox(0, i.msg, 1e3)
                    },
                    error: function () {
                        m.V6JKXY.msgBox(0, "网络错误")
                    }
                }) : m.V6JKXY.msgBox(0, "邮箱格式错误", 1e3) : m.V6JKXY.msgBox(0, "邮箱不能为空", 1e3)
            })
        },
        setPhone: function () {
            var i = this;
            $("#setPhone").on("click", function () {
                $("#set-phone").tooltip("pop", {
                    width: 360,
                    height: 310,
                    popId: "#set-phone",
                    opacity: .4,
                    popFunc: function () {}
                })
            }), $("#set-phone .get-code").on("click", i.getMcode);
            var e = $("#set-phone"),
                n = (e.find(".popclose"), e.find(".init-phone")),
                a = $(".set-phone-btn");
            a.on("click", function () {
                var i = $.trim(n.val()),
                    a = $.trim(e.find(".auth-code").val());
                i ? o.test(i) ? a ? $.ajax({
                    url: m.DOMAIN.FULL + "/api/setPhone/",
                    data: {
                        phone: i,
                        sms: a
                    },
                    type: "get",
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    success: function (i) {
                        200 == i.code ? m.V6JKXY.msgBox(1, i.msg, 1e3, function () {
                            location.reload()
                        }) : m.V6JKXY.msgBox(0, i.msg, 1e3)
                    },
                    error: function () {
                        m.V6JKXY.msgBox(0, "网络错误")
                    }
                }) : m.V6JKXY.msgBox(0, "验证码不能为空", 1e3) : m.V6JKXY.msgBox(0, "手机号码格式错误", 1e3) : m.V6JKXY.msgBox(0, "手机号码不能为空", 1e3)
            })
        },
        getMcodeKey: !0,
        getMcode: function () {
            var i = $(this),
                e = i.parents("fieldset").find(".phoneNum").val(),
                n = i.parents("fieldset").find(".get-code");
            if (c.getMcodeKey) {
                if (c.getMcodeKey = !1, !e || "" == e) return m.V6JKXY.msgBox(0, "请输入手机号"), void(c.getMcodeKey = !0);
                if (!o.test(e)) return m.V6JKXY.msgBox(0, "手机号格式不正确"), void(c.getMcodeKey = !0);
                $.ajax({
                    url: m.DOMAIN.FULL + "/api/sendPhone/",
                    data: {
                        phone: e,
                        send_type: 1
                    },
                    type: "get",
                    dataType: "jsonp",
                    jsonp: "jsoncallback",
                    success: function (i) {
                        if (200 == i.status || 200 == i.code) {
                            var e = function (i) {
                                    n.html(i + "后重新获取"), n.addClass("dis-btn"), n.css({
                                        cursor: "not-allowed"
                                    });
                                    var e = i;
                                    a = setInterval(function () {
                                        0 === e ? (n.html("重新获取"), c.getMcodeKey = !0, n.css({
                                            cursor: "pointer"
                                        }), clearInterval(a)) : n.html(--e + "后重新获取")
                                    }, 1e3)
                                },
                                a = void 0;
                            e(60)
                        } else n.text("获取失败"), setTimeout(function () {
                            n.text("重新获取"), n.css({
                                cursor: "pointer"
                            })
                        }, 1e3), m.V6JKXY.msgBox(0, "验证码发送失败, 原因: " + i.msg), c.getMcodeKey = !0
                    },
                    error: function () {
                        n.text("获取失败"), setTimeout(function () {
                            n.text("重新获取")
                        }, 1e3), m.V6JKXY.msgBox(0, "服务器错误，请重试！"), c.getMcodeKey = !0
                    }
                })
            }
        },
        verifyMy: function (i) {
            function e(i) {
                var e = $("#verifyPwd"),
                    n = $("#verifyOther");
                "1" == i ? e.show().siblings().hide() : n.show().siblings().hide()
            }

            function n() {
                function i(a) {
                    if (n.html("已发送(" + a + ")"), a > 0) {
                        var d = a - 1;
                        setTimeout(function () {
                            return i(d)
                        }, 1e3)
                    } else n.css("background-color", "#ff8530"), n.css("border-color", "#ff8530"), n.html("发送验证码"), n.on("click", e)
                }

                function e() {
                    var e = $("#verifyType").val();
                    if ("2" == e) var a = "/api/sendPhone/?jsoncallback=?";
                    else if ("3" == e) var a = "/api/sendEmailCode/?jsoncallback=?";
                    $.ajax({
                        url: a,
                        type: "get",
                        dataType: "jsonp",
                        success: function (e) {
                            200 == e.code ? (m.V6JKXY.msgBox(1, e.msg, 1e3), n.css("background-color", "#DDDDDD"), n.css("border-color", "#DDDDDD"), n.off("click"), i(60)) : m.V6JKXY.msgBox(0, e.msg, 1e3)
                        },
                        error: function () {
                            m.V6JKXY.msgBox(0, "网络错误")
                        }
                    })
                }
                var n = $("#verify-pop .get-code");
                n.on("click", e)
            }

            function a() {
                var i, e, n = $("#verifyIdBtn");
                n.off("click"), n.on("click", function () {
                    var n = $("#verifyType").val();
                    if ("1" == n) {
                        var a = $.trim($("#ver-pwd").val());
                        i = "/api/verifyPassword/?jsoncallback=?", e = {
                            old_password: a,
                            veriy_type: 1
                        };
                        var m = d(i, e);
                        m = null
                    } else if ("2" == n) {
                        var t = s.find(".auth-code").val();
                        i = "/api/verifyPassword/?jsoncallback=?", e = {
                            dynamic_code: t,
                            veriy_type: 2
                        };
                        var m = d(i, e);
                        m = null
                    } else if ("3" == n) {
                        var t = s.find(".auth-code").val();
                        i = "/api/verifyPassword/?jsoncallback=?", e = {
                            dynamic_code: t,
                            veriy_type: 3
                        };
                        var m = d(i, e);
                        m = null
                    }
                })
            }

            function d(i, e) {
                $.ajax({
                    url: i,
                    data: e,
                    type: "get",
                    dataType: "jsonp",
                    success: function (i) {
                        if (200 == i.code) {
                            m.V6JKXY.msgBox(1, i.msg, 1e3), r.click();
                            var e = t();
                            e = null
                        } else m.V6JKXY.msgBox(0, i.msg, 1e3)
                    },
                    error: function () {
                        m.V6JKXY.msgBox(0, "网络错误")
                    }
                })
            }

            function t() {
                return "changePw" == o.attr("id") ? (l.changePwd(), !1) : "changeEmail" == o.attr("id") ? (l.changeEmail(), !1) : "changePhone" == o.attr("id") ? (l.changePhone(), !1) : void 0
            }
            var o = $(this),
                l = c,
                s = $("#verify-pop"),
                r = s.find(".popclose");
            $("#verify-pop").tooltip("pop", {
                width: 360,
                height: 360,
                popId: "#verify-pop",
                opacity: .4,
                popFunc: function () {
                    var i = $("#verifyType"),
                        d = i.val();
                    e(d), i.on("change", function () {
                        d = i.val(), e(d)
                    });
                    var m = n();
                    m = null;
                    var t = a();
                    t = null
                }
            })
        },
        changePwd: function (i) {
            var e = ($("#changePw"), $("#password-pop")),
                n = void 0,
                a = void 0,
                d = e.find(".new-pw"),
                t = e.find(".repeat-pw"),
                o = (e.find(".popclose"), e.find(".changepw-btn"));
            e.tooltip("pop", {
                width: 360,
                height: 332,
                popId: "#password-pop",
                opacity: .4,
                popFunc: function () {
                    d.keyup(function () {
                        d.ckPassWord("strong")
                    }), d.keydown(function (i) {
                        if (i.ctrlKey) return !1
                    }), t.keydown(function (i) {
                        return !i.ctrlKey && void(13 == i.keyCode && o.click())
                    }), o.click(function () {
                        n = d.val(), a = t.val(), n && "" != n ? n.length < 6 ? m.V6JKXY.msgBox(0, "密码长度需要大于5位") : n != a ? m.V6JKXY.msgBox(0, "确认密码与新密码不一致") : $.ajax({
                            url: "/api/setOnePassword/?jsoncallback=?",
                            data: {
                                password1: n,
                                password2: a
                            },
                            type: "get",
                            dataType: "jsonp",
                            success: function (i) {
                                200 != i.code ? m.V6JKXY.msgBox(0, i.msg, 1e3) : m.V6JKXY.msgBox(1, "修改密码成功", 1e3, function () {
                                    location.reload()
                                })
                            },
                            error: function () {
                                m.V6JKXY.msgBox(0, "网络错误")
                            }
                        }) : m.V6JKXY.msgBox(0, "请输入新密码", 1e3)
                    })
                }
            })
        },
        changeEmail: function () {
            $("#change-email").tooltip("pop", {
                width: 360,
                height: 250,
                popId: "#change-email",
                opacity: .4,
                popFunc: function () {}
            });
            var i = $("#change-email"),
                e = (i.find(".popclose"), i.find(".new-email")),
                n = $(".change-email-btn");
            e.keydown(function () {
                if (13 == event.keyCode) return n.click(), !1
            }), n.bind("click", function () {
                var i = e.val();
                t.test(i) ? $.ajax({
                    url: "/api/sendEmail/?jsoncallback=?",
                    data: {
                        email: i
                    },
                    type: "get",
                    dataType: "jsonp",
                    success: function (i) {
                        200 == i.code ? m.V6JKXY.msgBox(1, "我们已经发送一封邮件到您的邮箱，请尽快查收邮件！ 如果没有收到您可以看看垃圾邮件， 或重新绑定。", 1e3, function () {
                            location.reload()
                        }) : m.V6JKXY.msgBox(0, i.msg, 1e3)
                    },
                    error: function () {
                        m.V6JKXY.msgBox(0, "网络错误")
                    }
                }) : m.V6JKXY.msgBox(0, "邮箱格式错误", 1e3)
            })
        },
        changePhone: function () {
            var i = this;
            $("#change-phone").tooltip("pop", {
                width: 360,
                height: 310,
                popId: "#change-phone",
                opacity: .4,
                popFunc: function () {}
            }), $("#change-phone .get-code").on("click", i.getMcode);
            var e = $("#change-phone"),
                n = (e.find(".popclose"), e.find(".new-phone")),
                a = $(".change-phone-btn");
            a.on("click", function () {
                var i = $.trim(n.val()),
                    a = $.trim(e.find(".auth-code").val());
                i ? o.test(i) ? a ? $.ajax({
                    url: "/api/setPhone/?jsoncallback=?",
                    data: {
                        phone: i,
                        sms: a
                    },
                    type: "get",
                    dataType: "jsonp",
                    success: function (i) {
                        200 == i.code ? m.V6JKXY.msgBox(1, i.msg, 1e3, function () {
                            location.reload()
                        }) : m.V6JKXY.msgBox(0, i.msg, 1e3)
                    },
                    error: function () {
                        m.V6JKXY.msgBox(0, "网络错误")
                    }
                }) : m.V6JKXY.msgBox(0, "验证码不能为空", 1e3) : m.V6JKXY.msgBox(0, "手机号码格式错误", 1e3) : m.V6JKXY.msgBox(0, "手机号码不能为空", 1e3)
            })
        },
        initPwdBtn: function () {
            var i = $("#initPwd").val(),
                e = $("#initPwdConfirm").val();
            if (void 0 == i || "" == i) m.V6JKXY.msgBox(0, "请输入密码", 1e3);
            else if (i.length < 6) m.V6JKXY.msgBox(0, "密码长度要大于6位", 1e3);
            else if (void 0 == e || "" == e) m.V6JKXY.msgBox(0, "请确认密码", 1e3);
            else if (i != e) m.V6JKXY.msgBox(0, "两次密码不一致", 1e3);
            else {
                var n = m.DOMAIN.FULL + "/api/setOnePassword/?jsoncallback=?";
                $.ajax({
                    url: n,
                    data: {
                        password1: i,
                        password2: e
                    },
                    type: "get",
                    dataType: "jsonp",
                    success: function (i) {
                        i.code == parseInt(200) ? (location.reload(), m.V6JKXY.msgBox(1, i.msg, 1e3)) : m.V6JKXY.msgBox(1, i.msg, 1e3)
                    },
                    error: function () {
                        m.V6JKXY.msgBox(0, "网络错误")
                    }
                })
            }
        }
    };
    var l = {
        level: ["", "太简单了", "一般般", "很安全"],
        main: function (i, e) {
            if ("" == e) return 0;
            var n = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"),
                a = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"),
                d = new RegExp("(?=.{6,}).*", "g");
            return 0 == d.test(e) ? 1 : n.test(e) ? 3 : a.test(e) ? 2 : 1
        },
        genReport: function (i, e) {
            if (("undefined" == typeof i ? "undefined" : d(i)) && i) {
                var n = l.main(i, e);
                l.handleReport(i, n), "function" == typeof callBack && callBack(i, n)
            }
        },
        passwordSix: function (i) {
            var e = $(this),
                n = i.length;
            n < 6 && n > 0 ? e.next().next(".warning").remove() : e.next().next(".warning").remove()
        },
        passwordLen: function (i, e, n) {
            var a = i.length,
                d = -1,
                m = $(this);
            if (1 == arguments.length)
                for (var t = 0; t < a; t++) d = i.charCodeAt(t), d < 32 || d > 126 ? m.next().next(".warning").remove() : m.next(".warning").remove();
            else
                for (var t = 0; t < a; t++) d = i.charCodeAt(t), (d < 32 || d > 126) && $(e).html(n)
        },
        callBack: "",
        handleReport: function (i, e) {
            switch (e) {
                case 1:
                    i.next(".pwd-strong").find("span").css("background", "#ddd"), i.next(".pwd-strong").find("span").eq(0).css("background", "#da4619");
                    break;
                case 2:
                    i.next(".pwd-strong").find("span").css("background", "#ddd"), i.next(".pwd-strong").find("span:lt(2)").css("background", "#ff5c00");
                    break;
                case 3:
                    i.next(".pwd-strong").find("span").css("background", "#35b558")
            }
        }
    };
    $.fn.ckEmailEmpty = function (i) {
        var e = $(this),
            n = $(this).val().trim();
        return "" != n || (e.next(".warning").remove(), 0 == arguments.length ? e.after("<span  class='warning empty' cktype='false'>请输入邮箱</span>") : e.after("<span  class='warning empty'  cktype='false'>" + i + "</span>"), e.bind("focus", function () {
            e.next(".warning").remove()
        }), !1)
    }, $.encrypt = function (i) {
        for (var e = "", n = 0; n < i.length; n++) a = i.charCodeAt(n), 0 != n && (e += "|"), e += new Number(a).toString(10);
        return e
    }, $.fn.ckEmail = function (i, e) {
        function n() {
            $(this).next(".warning").remove(), $(this).after("<span  class='warning'></span>");
            var e = $(this).val().trim(),
                n = /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(e);
            if (n)
                if (null != i) {
                    var a = $(this);
                    $.post(i, {
                        email: e,
                        isajax: 1
                    }, function (i) {
                        return "1" == i.status ? (a.next(".warning").removeClass("wrong").addClass("right").html(""), a.next(".warning").attr("cktype", "true"), !0) : (a.next(".warning").removeClass("right").addClass("wrong").html("邮箱已存在"), a.next(".warning").attr("cktype", "false"), !1)
                    }, "json")
                } else $(this).next(".warning").addClass("right").html(""), $(this).next(".warning").attr("cktype", "true");
            else $(this).next(".warning").addClass("wrong").html("邮箱输入有误"), $(this).next(".warning").attr("cktype", "false")
        }
        null != e ? $(this).bind(e, n) : this.bind("focusout", n)
    }, $.fn.ckPassWord = function (i) {
        var e = '<div class="safety pwd-strong">';
        e += '<span class="level-1" level="1">弱</span>', e += '<span class="level-2" level="2">中</span>', e += '<span class="level-3" level="3">强</span> </div>';
        var n = $(this);
        "strong" == i ? ($(".pwd-strong").remove(), n.after(e), n.bind("keyup", function () {
            var i = n.val().trim();
            l.passwordLen(i), l.genReport(n, i)
        }), $(this).bind("focusout", function () {
            var i = n.val().trim();
            l.passwordSix(i)
        })) : 0 == arguments.length && (n.bind("keyup", function () {
            var i = n.val().trim();
            l.passwordLen(i)
        }), $(this).bind("focusout", function () {
            var i = n.val().trim();
            "" != i && l.passwordSix(i)
        }))
    }, e.setID = c
}, function (i, e, n) {
    "use strict";

    function a(i, e) {
        if (!(i instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.notify = void 0;
    var d = function () {
            function i(i, e) {
                for (var n = 0; n < e.length; n++) {
                    var a = e[n];
                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(i, a.key, a)
                }
            }
            return function (e, n, a) {
                return n && i(e.prototype, n), a && i(e, a), e
            }
        }(),
        m = n(2),
        t = function () {
            function i() {
                a(this, i), this.removeUrl = m.DOMAIN.FULL + "//", this.confirmKey = !0
            }
            return d(i, [{
                key: "init",
                value: function () {
                    this.bindE(), $("#notifySave").on("click", this.notifySave)
                }
            }, {
                key: "bindE",
                value: function () {
                    $("#notifyClick").on("click", function (i) {
                        i.preventDefault(), $("#notifyPop").tooltip("pop", {
                            width: 410,
                            height: 230,
                            popId: "#notifyPop",
                            opacity: .4
                        })
                    }), $("#notifyConfirm").on("click", this.confirm)
                }
            }, {
                key: "notifySave",
                value: function (i) {
                    i.preventDefault(), m.V6JKXY.msgBox(1, "保存成功", 500, function () {
                        $("#notifyForm").submit()
                    })
                }
            }, {
                key: "confirm",
                value: function (i) {
                    i.preventDefault()
                }
            }]), i
        }(),
        o = new t;
    e.notify = o
}, function (i, e) {
    "use strict";

    function n(i, e) {
        if (!(i instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = function () {
            function i(i, e) {
                for (var n = 0; n < e.length; n++) {
                    var a = e[n];
                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(i, a.key, a)
                }
            }
            return function (e, n, a) {
                return n && i(e.prototype, n), a && i(e, a), e
            }
        }(),
        d = function () {
            function i() {
                n(this, i)
            }
            return a(i, [{
                key: "init",
                value: function () {
                    this.bindE()
                }
            }, {
                key: "bindE",
                value: function () {
                    var i = document.getElementById("allCoupon");
                    i && i.addEventListener("click", this.toDisplay)
                }
            }, {
                key: "toDisplay",
                value: function () {
                    var i = $("#allCoupon"),
                        e = $(".coupon .coupon-show"),
                        n = $(".coupon-hide .coupon-show .coupon-item");
                    n.appendTo(e), i.fadeOut()
                }
            }]), i
        }(),
        m = new d;
    e.coupon = m
}, function (i, e, n) {
    "use strict";

    function a(i, e) {
        if (!(i instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.company = void 0;
    var d = function () {
            function i(i, e) {
                for (var n = 0; n < e.length; n++) {
                    var a = e[n];
                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(i, a.key, a)
                }
            }
            return function (e, n, a) {
                return n && i(e.prototype, n), a && i(e, a), e
            }
        }(),
        m = n(2),
        t = function () {
            function i() {
                a(this, i), this.confirmData = null, this.company_id = null, this.popElement = $("#popup .content"), this.popButton = $("#popup .btn-contain"), this.API = {
                    applybind: m.DOMAIN.FULL + "/setting/applybind",
                    applyjoin: m.DOMAIN.FULL + "/setting/confirmbind",
                    cancelapply: m.DOMAIN.FULL + "/setting/cancelapply"
                }
            }
            return d(i, [{
                key: "init",
                value: function () {
                    this._applyQuery(), this._bindClosePop(), this._cancelApply(), this._cancelApplyButton()
                }
            }, {
                key: "_cancelApply",
                value: function () {
                    var i = this;
                    $(".operator .control").on("click", function () {
                        var e = $(this).data("action");
                        "remove-associate" == e && i._popupFn("解除关联请联系企业管理员", 1), "cancel-apply" == e && (i._popupFn("确定取消申请吗？", 4), i.company_id = $(this).data("company"))
                    })
                }
            }, {
                key: "_cancelApplyButton",
                value: function () {
                    var i = this;
                    $("#popup").on("click", "#cancelApply", function () {
                        var e = {
                            company_id: i.company_id
                        };
                        i._requestFn(i.API.cancelapply, "get", e).then(function (i) {
                            0 == i.error ? window.location.reload() : m.V6JKXY.msgBox(0, "取消申请失败", 2e3)
                        })
                    })
                }
            }, {
                key: "_applyQuery",
                value: function (i) {
                    var e = this;
                    $(".apply-bind").on("click", function () {
                        var i = $.trim($(this).data("type")),
                            n = $.trim($(this).siblings("input").val()),
                            a = {
                                type: i,
                                content: n
                            };
                        return "" == n && 1 == i ? void m.V6JKXY.msgBox(0, "请输入企业邮箱") : "" == n && 2 == i ? void m.V6JKXY.msgBox(0, "请输入企业码") : void e._requestFn(e.API.applybind, "get", a).then(function (n) {
                            400 == n.error && 1 == i ? e._popupFn(n.message, 1) : 401 == n.error && 1 == i ? e._popupFn(n.message, 1) : 0 == n.error && 1 == i ? e._popupFn(n.message, 1) : 401 == n.error && 2 == i ? e._popupFn(n.message, 1) : 0 == n.error && 2 == i ? (e.popElement.html(e._searchHasResult(n.data)), e._popButton(2, n.btn), $("#popup").show()) : m.V6JKXY.msgBox(0, "未知错误，请联系技术人员")
                        })
                    })
                }
            }, {
                key: "_popupFn",
                value: function (i, e) {
                    this.popElement.html(this._searchNoResult(i)), this._popButton(e), $("#popup").show()
                }
            }, {
                key: "_popButton",
                value: function (i, e) {
                    1 == i ? this.popButton.html('<a href="javascript:void(0)" class="confirm close">确定</a>') : 2 == i ? this.popButton.html('<a href="' + e + '" class="confirm">申请加入</a>') : 3 == i ? this.popButton.html('<a href="//www.jikexueyuan.com/business/corporate-training" class="confirm">申请开通</a>') : 4 == i && this.popButton.html('<a href="javascript:void(0)" class="confirm" id="cancelApply">取消申请</a>')
                }
            }, {
                key: "_bindClosePop",
                value: function () {
                    var i = this;
                    $("#popup").on("click", ".close", function () {
                        i._closePop()
                    })
                }
            }, {
                key: "_closePop",
                value: function () {
                    $("#popup").hide(), this.popElement.empty(), this.popButton.empty()
                }
            }, {
                key: "_searchNoResult",
                value: function (i) {
                    return '<p class="noresult">' + i + "</p>"
                }
            }, {
                key: "_searchHasResult",
                value: function (i) {
                    return '<div class="company-item">\n                <div class="logo-contain">\n                    <img src="' + i.company_logo + '">\n                </div>\n                <div class="detail">\n                    <h3>' + i.company_name + "<span class=" + (1 == i.service_type ? "purple" : "blue") + ">" + (1 == i.service_type ? "企业版" : "企业专业版") + '</span></h3>\n                    <a href="' + i.company_url + '">' + i.company_url + '</a>\n                </div>\n                <div class="operator">\n                    <p class=' + (1 == i.service_type ? "text-purple" : "text-blue") + ">" + (1 == i.service_type ? "VIP" : "PRO") + "</p>\n                </div>\n            </div>"
                }
            }, {
                key: "_requestFn",
                value: function (i, e, n) {
                    return new Promise(function (a, d) {
                        $.ajax({
                            dataType: "json",
                            type: e,
                            url: i,
                            data: n,
                            success: function (i) {
                                a(i)
                            },
                            error: function (i) {
                                m.V6JKXY.msgBox(0, "网络错误")
                            }
                        })
                    })
                }
            }]), i
        }(),
        o = new t;
    e.company = o
}]);
