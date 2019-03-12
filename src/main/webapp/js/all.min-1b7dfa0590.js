! function (t, e) {
    "function" == typeof define && define.amd ? define("simple-module", ["jquery"], function (i) {
        return t.Module = e(i)
    }) : "object" == typeof exports ? module.exports = e(require("jquery")) : t.SimpleModule = e(jQuery)
}(this, function (t) {
    var e, i = [].slice;
    return e = function () {
        function e(e) {
            var i, n, r, o, s, a, l;
            if (this.opts = t.extend({}, this.opts, e), (i = this.constructor)._connectedClasses || (i._connectedClasses = []), s = function () {
                    var t, e, i, r;
                    for (i = this.constructor._connectedClasses, r = [], t = 0, e = i.length; t < e; t++) n = i[t], l = n.pluginName.charAt(0).toLowerCase() + n.pluginName.slice(1), n.prototype._connected && (n.prototype._module = this), r.push(this[l] = new n);
                    return r
                }.call(this), this._connected) this.opts = t.extend({}, this.opts, this._module.opts);
            else
                for (this._init(), r = 0, a = s.length; r < a; r++) o = s[r], "function" == typeof o._init && o._init();
            this.trigger("initialized")
        }
        return e.extend = function (t) {
            var e, i, n;
            if (null != t && "object" == typeof t) {
                for (e in t) n = t[e], "included" !== e && "extended" !== e && (this[e] = n);
                return null != (i = t.extended) ? i.call(this) : void 0
            }
        }, e.include = function (t) {
            var e, i, n;
            if (null != t && "object" == typeof t) {
                for (e in t) n = t[e], "included" !== e && "extended" !== e && (this.prototype[e] = n);
                return null != (i = t.included) ? i.call(this) : void 0
            }
        }, e.connect = function (t) {
            if ("function" == typeof t) {
                if (!t.pluginName) throw new Error("Module.connect: cannot connect plugin without pluginName");
                return t.prototype._connected = !0, this._connectedClasses || (this._connectedClasses = []), this._connectedClasses.push(t), t.pluginName ? this[t.pluginName] = t : void 0
            }
        }, e.prototype.opts = {}, e.prototype._init = function () {}, e.prototype.on = function () {
            var e, n;
            return e = 1 <= arguments.length ? i.call(arguments, 0) : [], (n = t(this)).on.apply(n, e), this
        }, e.prototype.one = function () {
            var e, n;
            return e = 1 <= arguments.length ? i.call(arguments, 0) : [], (n = t(this)).one.apply(n, e), this
        }, e.prototype.off = function () {
            var e, n;
            return e = 1 <= arguments.length ? i.call(arguments, 0) : [], (n = t(this)).off.apply(n, e), this
        }, e.prototype.trigger = function () {
            var e, n;
            return e = 1 <= arguments.length ? i.call(arguments, 0) : [], (n = t(this)).trigger.apply(n, e), this
        }, e.prototype.triggerHandler = function () {
            var e, n;
            return e = 1 <= arguments.length ? i.call(arguments, 0) : [], (n = t(this)).triggerHandler.apply(n, e)
        }, e.prototype._t = function () {
            var t, e;
            return t = 1 <= arguments.length ? i.call(arguments, 0) : [], (e = this.constructor)._t.apply(e, t)
        }, e._t = function () {
            var t, e, n, r;
            return e = arguments[0], t = 2 <= arguments.length ? i.call(arguments, 1) : [], r = (null != (n = this.i18n[this.locale]) ? n[e] : void 0) || "", t.length > 0 ? (r = r.replace(/([^%]|^)%(?:(\d+)\$)?s/g, function (e, i, n) {
                return n ? i + t[parseInt(n) - 1] : i + t.shift()
            }), r.replace(/%%s/g, "%s")) : r
        }, e.i18n = {
            "zh-CN": {}
        }, e.locale = "zh-CN", e
    }()
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("simple-uploader", ["jquery", "simple-module"], function (i, n) {
        return t.uploader = e(i, n)
    }) : "object" == typeof exports ? module.exports = e(require("jquery"), require("simple-module")) : (t.simple = t.simple || {}, t.simple.uploader = e(jQuery, SimpleModule))
}(this, function (t, e) {
    var i, n, r = function (t, e) {
            function i() {
                this.constructor = t
            }
            for (var n in e) o.call(e, n) && (t[n] = e[n]);
            return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
        },
        o = {}.hasOwnProperty;
    return i = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return r(i, e), i.count = 0, i.prototype.opts = {
            url: "",
            params: null,
            fileKey: "upload_file",
            connectionCount: 3
        }, i.prototype._init = function () {
            return this.files = [], this.queue = [], this.id = ++i.count, this.on("uploadcomplete", function (e) {
                return function (i, n) {
                    return e.files.splice(t.inArray(n, e.files), 1), e.queue.length > 0 && e.files.length < e.opts.connectionCount ? e.upload(e.queue.shift()) : e.uploading = !1
                }
            }(this)), t(window).on("beforeunload.uploader-" + this.id, function (t) {
                return function (e) {
                    if (t.uploading) return e.originalEvent.returnValue = t._t("leaveConfirm"), t._t("leaveConfirm")
                }
            }(this))
        }, i.prototype.generateId = function () {
            var t;
            return t = 0,
                function () {
                    return t += 1
                }
        }(), i.prototype.upload = function (e, i) {
            var n, r, o, s;
            if (null == i && (i = {}), null != e) {
                if (t.isArray(e) || e instanceof FileList)
                    for (r = 0, s = e.length; r < s; r++) n = e[r], this.upload(n, i);
                else t(e).is("input:file") ? (o = t(e).attr("name"), o && (i.fileKey = o), this.upload(t.makeArray(t(e)[0].files), i)) : e.id && e.obj || (e = this.getFile(e));
                if (e && e.obj) {
                    if (t.extend(e, i), this.files.length >= this.opts.connectionCount) return void this.queue.push(e);
                    if (this.triggerHandler("beforeupload", [e]) !== !1) return this.files.push(e), this._xhrUpload(e), this.uploading = !0
                }
            }
        }, i.prototype.getFile = function (t) {
            var e, i, n;
            return t instanceof window.File || t instanceof window.Blob ? (e = null != (i = t.fileName) ? i : t.name, {
                id: this.generateId(),
                url: this.opts.url,
                params: this.opts.params,
                fileKey: this.opts.fileKey,
                name: e,
                size: null != (n = t.fileSize) ? n : t.size,
                ext: e ? e.split(".").pop().toLowerCase() : "",
                obj: t
            }) : null
        }, i.prototype._xhrUpload = function (e) {
            var i, n, r, o;
            if (i = new FormData, i.append(e.fileKey, e.obj), i.append("original_filename", e.name), e.params) {
                r = e.params, "function" == typeof r && (r = r(e));
                for (n in r) o = r[n], i.append(n, o)
            }
            return e.xhr = t.ajax({
                url: e.url,
                data: i,
                processData: !1,
                contentType: !1,
                type: "POST",
                headers: {
                    "X-File-Name": encodeURIComponent(e.name)
                },
                xhr: function () {
                    var e;
                    return e = t.ajaxSettings.xhr(), e && (e.upload.onprogress = function (t) {
                        return function (e) {
                            return t.progress(e)
                        }
                    }(this)), e
                },
                progress: function (t) {
                    return function (i) {
                        if (i.lengthComputable) return t.trigger("uploadprogress", [e, i.loaded, i.total])
                    }
                }(this),
                error: function (t) {
                    return function (i, n, r) {
                        return t.trigger("uploaderror", [e, i, n])
                    }
                }(this),
                success: function (i) {
                    return function (n) {
                        return i.trigger("uploadprogress", [e, e.size, e.size]), i.trigger("uploadsuccess", [e, n]), t(document).trigger("uploadsuccess", [e, n, i])
                    }
                }(this),
                complete: function (t) {
                    return function (i, n) {
                        return t.trigger("uploadcomplete", [e, i.responseText])
                    }
                }(this)
            })
        }, i.prototype.cancel = function (t) {
            var e, i, n, r;
            if (!t.id)
                for (r = this.files, i = 0, n = r.length; i < n; i++)
                    if (e = r[i], e.id === 1 * t) {
                        t = e;
                        break
                    } return this.trigger("uploadcancel", [t]), t.xhr && t.xhr.abort(), t.xhr = null
        }, i.prototype.readImageFile = function (e, i) {
            var n, r;
            if (t.isFunction(i)) return r = new Image, r.onload = function () {
                return i(r)
            }, r.onerror = function () {
                return i()
            }, window.FileReader && FileReader.prototype.readAsDataURL && /^image/.test(e.type) ? (n = new FileReader, n.onload = function (t) {
                return r.src = t.target.result
            }, n.readAsDataURL(e)) : i()
        }, i.prototype.destroy = function () {
            var e, i, n, r;
            for (this.queue.length = 0, r = this.files, i = 0, n = r.length; i < n; i++) e = r[i], this.cancel(e);
            return t(window).off(".uploader-" + this.id), t(document).off(".uploader-" + this.id)
        }, i.i18n = {
            "zh-CN": {
                leaveConfirm: "正在上传文件，如果离开上传会自动取消"
            }
        }, i.locale = "zh-CN", i
    }(e), n = function (t) {
        return new i(t)
    }
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("simple-hotkeys", ["jquery", "simple-module"], function (i, n) {
        return t.hotkeys = e(i, n)
    }) : "object" == typeof exports ? module.exports = e(require("jquery"), require("simple-module")) : (t.simple = t.simple || {}, t.simple.hotkeys = e(jQuery, SimpleModule))
}(this, function (t, e) {
    var i, n, r = function (t, e) {
            function i() {
                this.constructor = t
            }
            for (var n in e) o.call(e, n) && (t[n] = e[n]);
            return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
        },
        o = {}.hasOwnProperty;
    return i = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return r(i, e), i.count = 0, i.keyNameMap = {
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Spacebar",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            45: "Insert",
            46: "Del",
            91: "Meta",
            93: "Meta",
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            65: "A",
            66: "B",
            67: "C",
            68: "D",
            69: "E",
            70: "F",
            71: "G",
            72: "H",
            73: "I",
            74: "J",
            75: "K",
            76: "L",
            77: "M",
            78: "N",
            79: "O",
            80: "P",
            81: "Q",
            82: "R",
            83: "S",
            84: "T",
            85: "U",
            86: "V",
            87: "W",
            88: "X",
            89: "Y",
            90: "Z",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "Multiply",
            107: "Add",
            109: "Subtract",
            110: "Decimal",
            111: "Divide",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            124: "F13",
            125: "F14",
            126: "F15",
            127: "F16",
            128: "F17",
            129: "F18",
            130: "F19",
            131: "F20",
            132: "F21",
            133: "F22",
            134: "F23",
            135: "F24",
            59: ";",
            61: "=",
            186: ";",
            187: "=",
            188: ",",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'"
        }, i.aliases = {
            escape: "esc",
            "delete": "del",
            "return": "enter",
            ctrl: "control",
            space: "spacebar",
            ins: "insert",
            cmd: "meta",
            command: "meta",
            wins: "meta",
            windows: "meta"
        }, i.normalize = function (t) {
            var e, i, n, r, o, s;
            for (o = t.toLowerCase().replace(/\s+/gi, "").split("+"), e = i = 0, s = o.length; i < s; e = ++i) n = o[e], o[e] = this.aliases[n] || n;
            return r = o.pop(), o.sort().push(r), o.join("_")
        }, i.prototype.opts = {
            el: document
        }, i.prototype._init = function () {
            return this.id = ++this.constructor.count, this._map = {}, this._delegate = "string" == typeof this.opts.el ? document : this.opts.el, t(this._delegate).on("keydown.simple-hotkeys-" + this.id, this.opts.el, function (t) {
                return function (e) {
                    var i;
                    return null != (i = t._getHander(e)) ? i.call(t, e) : void 0
                }
            }(this))
        }, i.prototype._getHander = function (t) {
            var e, i;
            if (e = this.constructor.keyNameMap[t.which]) return i = "", t.altKey && (i += "alt_"), t.ctrlKey && (i += "control_"), t.metaKey && (i += "meta_"), t.shiftKey && (i += "shift_"), i += e.toLowerCase(), this._map[i]
        }, i.prototype.respondTo = function (t) {
            return "string" == typeof t ? null != this._map[this.constructor.normalize(t)] : null != this._getHander(t)
        }, i.prototype.add = function (t, e) {
            return this._map[this.constructor.normalize(t)] = e, this
        }, i.prototype.remove = function (t) {
            return delete this._map[this.constructor.normalize(t)], this
        }, i.prototype.destroy = function () {
            return t(this._delegate).off(".simple-hotkeys-" + this.id), this._map = {}, this
        }, i
    }(e), n = function (t) {
        return new i(t)
    }
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("simditor", ["jquery", "simple-module", "simple-hotkeys", "simple-uploader"], function (i, n, r, o) {
        return t.Simditor = e(i, n, r, o)
    }) : "object" == typeof exports ? module.exports = e(require("jquery"), require("simple-module"), require("simple-hotkeys"), require("simple-uploader")) : t.Simditor = e(jQuery, SimpleModule, simple.hotkeys, simple.uploader)
}(this, function (t, e, i, n) {
    var r, o, s, a, l, d, u, p, c, h, f, g, m, y, v, _, b, w, x, C, k, T, N, S, A, E, B, R, I, M, O, P, L, z, W = function (t, e) {
            function i() {
                this.constructor = t
            }
            for (var n in e) F.call(e, n) && (t[n] = e[n]);
            return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
        },
        F = {}.hasOwnProperty,
        j = [].indexOf || function (t) {
            for (var e = 0, i = this.length; e < i; e++)
                if (e in this && this[e] === t) return e;
            return -1
        },
        q = [].slice;
    return A = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.pluginName = "Selection", i.prototype._range = null, i.prototype._startNodes = null, i.prototype._endNodes = null, i.prototype._containerNode = null, i.prototype._nodes = null, i.prototype._blockNodes = null, i.prototype._rootNodes = null, i.prototype._init = function () {
            return this.editor = this._module, this._selection = document.getSelection(), this.editor.on("selectionchanged", function (t) {
                return function (e) {
                    return t.reset(), t._range = t._selection.getRangeAt(0)
                }
            }(this)), this.editor.on("blur", function (t) {
                return function (e) {
                    return t.reset()
                }
            }(this))
        }, i.prototype.reset = function () {
            return this._range = null, this._startNodes = null, this._endNodes = null, this._containerNode = null, this._nodes = null, this._blockNodes = null, this._rootNodes = null
        }, i.prototype.clear = function () {
            var t;
            try {
                this._selection.removeAllRanges()
            } catch (e) {
                t = e
            }
            return this.reset()
        }, i.prototype.range = function (t) {
            var e;
            return t ? (this.clear(), this._selection.addRange(t), this._range = t, e = this.editor.util.browser.firefox || this.editor.util.browser.msie, !this.editor.inputManager.focused && e && this.editor.body.focus()) : !this._range && this.editor.inputManager.focused && this._selection.rangeCount && (this._range = this._selection.getRangeAt(0)), this._range
        }, i.prototype.startNodes = function () {
            return this._range && (this._startNodes || (this._startNodes = function (e) {
                return function () {
                    var i;
                    return i = t(e._range.startContainer).parentsUntil(e.editor.body).get(), i.unshift(e._range.startContainer), t(i)
                }
            }(this)())), this._startNodes
        }, i.prototype.endNodes = function () {
            var e;
            return this._range && (this._endNodes || (this._endNodes = this._range.collapsed ? this.startNodes() : (e = t(this._range.endContainer).parentsUntil(this.editor.body).get(), e.unshift(this._range.endContainer), t(e)))), this._endNodes
        }, i.prototype.containerNode = function () {
            return this._range && (this._containerNode || (this._containerNode = t(this._range.commonAncestorContainer))), this._containerNode
        }, i.prototype.nodes = function () {
            return this._range && (this._nodes || (this._nodes = function (e) {
                return function () {
                    var i;
                    return i = [], e.startNodes().first().is(e.endNodes().first()) ? i = e.startNodes().get() : (e.startNodes().each(function (n, r) {
                        var o, s, a, l, d, u, p;
                        return s = t(r), e.endNodes().index(s) > -1 ? i.push(r) : s.parent().is(e.editor.body) || (u = e.endNodes().index(s.parent())) > -1 ? (o = u && u > -1 ? e.endNodes().eq(u - 1) : e.endNodes().last(), a = s.parent().contents(), p = a.index(s), l = a.index(o), t.merge(i, a.slice(p, l).get())) : (a = s.parent().contents(), d = a.index(s), t.merge(i, a.slice(d).get()))
                    }), e.endNodes().each(function (n, r) {
                        var o, s, a;
                        return o = t(r), o.parent().is(e.editor.body) || e.startNodes().index(o.parent()) > -1 ? (i.push(r), !1) : (s = o.parent().contents(), a = s.index(o), t.merge(i, s.slice(0, a + 1)))
                    })), t(t.unique(i))
                }
            }(this)())), this._nodes
        }, i.prototype.blockNodes = function () {
            if (this._range) return this._blockNodes || (this._blockNodes = function (t) {
                return function () {
                    return t.nodes().filter(function (e, i) {
                        return t.editor.util.isBlockNode(i)
                    })
                }
            }(this)()), this._blockNodes
        }, i.prototype.rootNodes = function () {
            if (this._range) return this._rootNodes || (this._rootNodes = function (e) {
                return function () {
                    return e.nodes().filter(function (i, n) {
                        var r;
                        return r = t(n).parent(), r.is(e.editor.body) || r.is("blockquote")
                    })
                }
            }(this)()), this._rootNodes
        }, i.prototype.rangeAtEndOf = function (e, i) {
            var n, r, o, s, a, l;
            if (null == i && (i = this.range()), i && i.collapsed) return e = t(e)[0], o = i.endContainer, s = this.editor.util.getNodeLength(o), r = i.endOffset === s - 1, a = t(o).contents().last().is("br"), n = i.endOffset === s, !!(r && a || n) && (e === o || !!t.contains(e, o) && (l = !0, t(o).parentsUntil(e).addBack().each(function (e, i) {
                var n, r, o, s;
                if (s = t(i).parent().contents().filter(function () {
                        return !(this !== i && 3 === this.nodeType && !this.nodeValue)
                    }), n = s.last(), o = n.get(0) === i, r = n.is("br") && n.prev().get(0) === i, !o && !r) return l = !1, !1
            }), l))
        }, i.prototype.rangeAtStartOf = function (e, i) {
            var n, r;
            if (null == i && (i = this.range()), i && i.collapsed) return e = t(e)[0], r = i.startContainer, 0 === i.startOffset && (e === r || !!t.contains(e, r) && (n = !0, t(r).parentsUntil(e).addBack().each(function (e, i) {
                var r;
                if (r = t(i).parent().contents().filter(function () {
                        return !(this !== i && 3 === this.nodeType && !this.nodeValue)
                    }), r.first().get(0) !== i) return n = !1
            }), n))
        }, i.prototype.insertNode = function (e, i) {
            if (null == i && (i = this.range()), i) return e = t(e)[0], i.insertNode(e), this.setRangeAfter(e, i)
        }, i.prototype.setRangeAfter = function (e, i) {
            if (null == i && (i = this.range()), null != i) return e = t(e)[0], i.setEndAfter(e), i.collapse(!1), this.range(i)
        }, i.prototype.setRangeBefore = function (e, i) {
            if (null == i && (i = this.range()), null != i) return e = t(e)[0], i.setEndBefore(e), i.collapse(!1), this.range(i)
        }, i.prototype.setRangeAtStartOf = function (e, i) {
            return null == i && (i = this.range()), e = t(e).get(0), i.setEnd(e, 0), i.collapse(!1), this.range(i)
        }, i.prototype.setRangeAtEndOf = function (e, i) {
            var n, r, o, s, a, l, d;
            return null == i && (i = this.range()), r = t(e), e = r[0], r.is("pre") ? (o = r.contents(), o.length > 0 ? (s = o.last(), l = s.text(), a = this.editor.util.getNodeLength(s[0]), "\n" === l.charAt(l.length - 1) ? i.setEnd(s[0], a - 1) : i.setEnd(s[0], a)) : i.setEnd(e, 0)) : (d = this.editor.util.getNodeLength(e), 3 !== e.nodeType && d > 0 && (n = t(e).contents().last(), n.is("br") ? d -= 1 : 3 !== n[0].nodeType && this.editor.util.isEmptyNode(n) && (n.append(this.editor.util.phBr), e = n[0], d = 0)), i.setEnd(e, d)), i.collapse(!1), this.range(i)
        }, i.prototype.deleteRangeContents = function (t) {
            var e, i, n, r;
            return null == t && (t = this.range()), r = t.cloneRange(), n = t.cloneRange(), r.collapse(!0), n.collapse(!1), i = this.rangeAtStartOf(this.editor.body, r), e = this.rangeAtEndOf(this.editor.body, n), !t.collapsed && i && e ? (this.editor.body.empty(), t.setStart(this.editor.body[0], 0), t.collapse(!0), this.range(t)) : t.deleteContents(), t
        }, i.prototype.breakBlockEl = function (e, i) {
            var n;
            return null == i && (i = this.range()), n = t(e), i.collapsed ? (i.setStartBefore(n.get(0)), i.collapsed ? n : n.before(i.extractContents())) : n
        }, i.prototype.save = function (e) {
            var i, n, r;
            if (null == e && (e = this.range()), !this._selectionSaved) return n = e.cloneRange(), n.collapse(!1), r = t("<span/>").addClass("simditor-caret-start"), i = t("<span/>").addClass("simditor-caret-end"), n.insertNode(i[0]), e.insertNode(r[0]), this.clear(), this._selectionSaved = !0
        }, i.prototype.restore = function () {
            var t, e, i, n, r, o, s;
            return !!this._selectionSaved && (r = this.editor.body.find(".simditor-caret-start"), t = this.editor.body.find(".simditor-caret-end"), r.length && t.length ? (o = r.parent(), s = o.contents().index(r), e = t.parent(), i = e.contents().index(t), o[0] === e[0] && (i -= 1), n = document.createRange(), n.setStart(o.get(0), s), n.setEnd(e.get(0), i), r.remove(), t.remove(), this.range(n)) : (r.remove(), t.remove()), this._selectionSaved = !1, n)
        }, i
    }(e), h = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.pluginName = "Formatter", i.prototype.opts = {
            allowedTags: [],
            allowedAttributes: {},
            allowedStyles: {}
        }, i.prototype._init = function () {
            return this.editor = this._module, this._allowedTags = t.merge(["br", "span", "a", "img", "b", "strong", "i", "strike", "u", "font", "p", "ul", "ol", "li", "blockquote", "pre", "code", "h1", "h2", "h3", "h4", "hr"], this.opts.allowedTags), this._allowedAttributes = t.extend({
                img: ["src", "alt", "width", "height", "data-non-image"],
                a: ["href", "target"],
                font: ["color"],
                code: ["class"]
            }, this.opts.allowedAttributes), this._allowedStyles = t.extend({
                span: ["color", "font-size"],
                b: ["color"],
                i: ["color"],
                strong: ["color"],
                strike: ["color"],
                u: ["color"],
                p: ["margin-left", "text-align"],
                h1: ["margin-left", "text-align"],
                h2: ["margin-left", "text-align"],
                h3: ["margin-left", "text-align"],
                h4: ["margin-left", "text-align"]
            }, this.opts.allowedStyles), this.editor.body.on("click", "a", function (t) {
                return !1
            })
        }, i.prototype.decorate = function (t) {
            return null == t && (t = this.editor.body), this.editor.trigger("decorate", [t]), t
        }, i.prototype.undecorate = function (t) {
            return null == t && (t = this.editor.body.clone()), this.editor.trigger("undecorate", [t]), t
        }, i.prototype.autolink = function (e) {
            var i, n, r, o, s, a, l, d, u, p, c, h, f;
            for (null == e && (e = this.editor.body), l = [], r = function (i) {
                    return i.contents().each(function (i, n) {
                        var o, s;
                        if (o = t(n), !o.is("a") && !o.closest("a, pre", e).length) return !o.is("iframe") && o.contents().length ? r(o) : (s = o.text()) && /https?:\/\/|www\./gi.test(s) ? l.push(o) : void 0
                    })
                }, r(e), u = /(https?:\/\/|www\.)[\w\-\.\?&=\/#%:,@\!\+]+/gi, o = 0, a = l.length; o < a; o++) {
                for (n = l[o], h = n.text(), p = [], d = null, s = 0; null !== (d = u.exec(h));) c = h.substring(s, d.index), p.push(document.createTextNode(c)), s = u.lastIndex, f = /^(http(s)?:\/\/|\/)/.test(d[0]) ? d[0] : "http://" + d[0], i = t('<a href="' + f + '" target="_blank" rel="nofollow"></a>').text(d[0]), p.push(i[0]);
                p.push(document.createTextNode(h.substring(s))), n.replaceWith(t(p))
            }
            return e
        }, i.prototype.format = function (e) {
            var i, n, r, o, s, a, l, d, u, p;
            if (null == e && (e = this.editor.body), e.is(":empty")) return e.append("<p>" + this.editor.util.phBr + "</p>"), e;
            for (u = e.contents(), r = 0, s = u.length; r < s; r++) l = u[r], this.cleanNode(l, !0);
            for (p = e.contents(), o = 0, a = p.length; o < a; o++) d = p[o], i = t(d), i.is("br") ? ("undefined" != typeof n && null !== n && (n = null), i.remove()) : this.editor.util.isBlockNode(d) ? i.is("li") ? n && n.is("ul, ol") ? n.append(d) : (n = t("<ul/>").insertBefore(d), n.append(d)) : n = null : (n && !n.is("ul, ol") || (n = t("<p/>").insertBefore(d)), n.append(d), this.editor.util.isEmptyNode(n) && n.append(this.editor.util.phBr));
            return e
        }, i.prototype.cleanNode = function (e, i) {
            var n, r, o, s, a, l, d, u, p, c, h, f, g, m, y, v, _, b;
            if (o = t(e), o.length > 0) {
                if (3 === o[0].nodeType) return _ = o.text().replace(/(\r\n|\n|\r)/gm, ""), void(_ ? (b = document.createTextNode(_), o.replaceWith(b)) : o.remove());
                if (u = o.is("iframe") ? null : o.contents(), p = this.editor.util.isDecoratedNode(o), o.is(this._allowedTags.join(",")) || p) {
                    if (o.is("a") && (r = o.find("img")).length > 0 && (o.replaceWith(r), o = r, u = null), o.is("td") && (n = o.find(this.editor.util.blockNodes.join(","))).length > 0 && (n.each(function (e) {
                            return function (e, i) {
                                return t(i).contents().unwrap()
                            }
                        }(this)), u = o.contents()), o.is("img") && o.hasClass("uploading") && o.remove(), !p) {
                        for (l = this._allowedAttributes[o[0].tagName.toLowerCase()], y = t.makeArray(o[0].attributes), c = 0, f = y.length; c < f; c++) d = y[c], "style" !== d.name && (null != l && (v = d.name, j.call(l, v) >= 0) || o.removeAttr(d.name));
                        this._cleanNodeStyles(o), o.is("span") && 0 === o[0].attributes.length && o.contents().first().unwrap()
                    }
                } else 1 !== o[0].nodeType || o.is(":empty") ? (o.remove(), u = null) : o.is("div, article, dl, header, footer, tr") ? (o.append("<br/>"), u.first().unwrap()) : o.is("table") ? (s = t("<p/>"), o.find("tr").each(function (e, i) {
                    return s.append(t(i).text() + "<br/>")
                }), o.replaceWith(s), u = null) : o.is("thead, tfoot") ? (o.remove(), u = null) : o.is("th") ? (a = t("<td/>").append(o.contents()), o.replaceWith(a)) : u.first().unwrap();
                if (i && null != u && !o.is("pre"))
                    for (h = 0, g = u.length; h < g; h++) m = u[h], this.cleanNode(m, !0);
                return null
            }
        }, i.prototype._cleanNodeStyles = function (e) {
            var i, n, r, o, s, a, l, d, u;
            if (d = e.attr("style")) {
                if (e.removeAttr("style"), i = this._allowedStyles[e[0].tagName.toLowerCase()], !(i && i.length > 0)) return e;
                for (u = {}, s = d.split(";"), n = 0, r = s.length; n < r; n++) l = s[n], l = t.trim(l), o = l.split(":"), (o.length = 2) && (a = o[0], j.call(i, a) >= 0 && (u[t.trim(o[0])] = t.trim(o[1])));
                return Object.keys(u).length > 0 && e.css(u), e
            }
        }, i.prototype.clearHtml = function (e, i) {
            var n, r, o;
            return null == i && (i = !0), n = t("<div/>").append(e), r = n.contents(), o = "", r.each(function (e) {
                return function (n, s) {
                    var a, l;
                    return 3 === s.nodeType ? o += s.nodeValue : 1 === s.nodeType && (a = t(s), l = a.is("iframe") ? null : a.contents(), l && l.length > 0 && (o += e.clearHtml(l)), i && n < r.length - 1 && a.is("br, p, div, li,tr, pre, address, artticle, aside, dl, figcaption, footer, h1, h2,h3, h4, header")) ? o += "\n" : void 0
                }
            }(this)), o
        }, i.prototype.beautify = function (e) {
            var i;
            return i = function (t) {
                return !!(t.is("p") && !t.text() && t.children(":not(br)").length < 1)
            }, e.each(function (e, n) {
                var r, o;
                return r = t(n), o = r.is(':not(img, br, col, td, hr, [class^="simditor-"]):empty'), (o || i(r)) && r.remove(), r.find(':not(img, br, col, td, hr, [class^="simditor-"]):empty').remove()
            })
        }, i
    }(e), _ = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.pluginName = "InputManager", i.prototype._modifierKeys = [16, 17, 18, 91, 93, 224], i.prototype._arrowKeys = [37, 38, 39, 40], i.prototype._init = function () {
            var e, i;
            return this.editor = this._module, this.throttledValueChanged = this.editor.util.throttle(function (t) {
                return function (e) {
                    return setTimeout(function () {
                        return t.editor.trigger("valuechanged", e)
                    }, 10)
                }
            }(this), 300), this.throttledSelectionChanged = this.editor.util.throttle(function (t) {
                return function () {
                    return t.editor.trigger("selectionchanged")
                }
            }(this), 50), t(document).on("selectionchange.simditor" + this.editor.id, function (t) {
                return function (e) {
                    var i;
                    if (t.focused && !t.editor.clipboard.pasting) return (i = function () {
                        return t._selectionTimer && (clearTimeout(t._selectionTimer), t._selectionTimer = null), t.editor.selection._selection.rangeCount > 0 ? t.throttledSelectionChanged() : t._selectionTimer = setTimeout(function () {
                            if (t._selectionTimer = null, t.focused) return i()
                        }, 10)
                    })()
                }
            }(this)), this.editor.on("valuechanged", function (e) {
                return function () {
                    var i;
                    if (e.lastCaretPosition = null, i = e.editor.body.children().filter(function (t, i) {
                            return e.editor.util.isBlockNode(i)
                        }), e.focused && 0 === i.length && (e.editor.selection.save(), e.editor.formatter.format(), e.editor.selection.restore()), e.editor.body.find("hr, pre, .simditor-table").each(function (i, n) {
                            var r, o;
                            if (r = t(n), (r.parent().is("blockquote") || r.parent()[0] === e.editor.body[0]) && (o = !1, 0 === r.next().length && (t("<p/>").append(e.editor.util.phBr).insertAfter(r), o = !0), 0 === r.prev().length && (t("<p/>").append(e.editor.util.phBr).insertBefore(r), o = !0), o)) return e.throttledValueChanged()
                        }), e.editor.body.find("pre:empty").append(e.editor.util.phBr), !e.editor.util.support.onselectionchange && e.focused) return e.throttledSelectionChanged()
                }
            }(this)), this.editor.body.on("keydown", t.proxy(this._onKeyDown, this)).on("keypress", t.proxy(this._onKeyPress, this)).on("keyup", t.proxy(this._onKeyUp, this)).on("mouseup", t.proxy(this._onMouseUp, this)).on("focus", t.proxy(this._onFocus, this)).on("blur", t.proxy(this._onBlur, this)).on("drop", t.proxy(this._onDrop, this)).on("input", t.proxy(this._onInput, this)), this.editor.util.browser.firefox && (this.editor.hotkeys.add("cmd+left", function (t) {
                return function (e) {
                    return e.preventDefault(), t.editor.selection._selection.modify("move", "backward", "lineboundary"), !1
                }
            }(this)), this.editor.hotkeys.add("cmd+right", function (t) {
                return function (e) {
                    return e.preventDefault(), t.editor.selection._selection.modify("move", "forward", "lineboundary"), !1
                }
            }(this)), e = this.editor.util.os.mac ? "cmd+a" : "ctrl+a", this.editor.hotkeys.add(e, function (t) {
                return function (e) {
                    var i, n, r, o;
                    if (i = t.editor.body.children(), i.length > 0) return n = i.first().get(0), r = i.last().get(0), o = document.createRange(), o.setStart(n, 0), o.setEnd(r, t.editor.util.getNodeLength(r)), t.editor.selection.range(o), !1
                }
            }(this))), i = this.editor.util.os.mac ? "cmd+enter" : "ctrl+enter", this.editor.hotkeys.add(i, function (t) {
                return function (e) {
                    return t.editor.el.closest("form").find("button:submit").click(), !1
                }
            }(this))
        }, i.prototype._onFocus = function (t) {
            if (!this.editor.clipboard.pasting) return this.editor.el.addClass("focus").removeClass("error"), this.focused = !0, setTimeout(function (t) {
                return function () {
                    var e, i;
                    if (i = t.editor.selection._selection.getRangeAt(0), i.startContainer === t.editor.body[0] && (t.lastCaretPosition ? t.editor.undoManager.caretPosition(t.lastCaretPosition) : (e = t.editor.body.children().first(), i = document.createRange(), t.editor.selection.setRangeAtStartOf(e, i))), t.lastCaretPosition = null, t.editor.triggerHandler("focus"), !t.editor.util.support.onselectionchange) return t.throttledSelectionChanged()
                }
            }(this), 0)
        }, i.prototype._onBlur = function (t) {
            var e;
            if (!this.editor.clipboard.pasting) return this.editor.el.removeClass("focus"), this.editor.sync(), this.focused = !1, this.lastCaretPosition = null != (e = this.editor.undoManager.currentState()) ? e.caret : void 0, this.editor.triggerHandler("blur")
        }, i.prototype._onMouseUp = function (t) {
            if (!this.editor.util.support.onselectionchange) return this.throttledSelectionChanged()
        }, i.prototype._onKeyDown = function (t) {
            var e, i;
            if (this.editor.triggerHandler(t) === !1) return !1;
            if (!this.editor.hotkeys.respondTo(t)) {
                if (this.editor.keystroke.respondTo(t)) return this.throttledValueChanged(), !1;
                if (e = t.which, !(j.call(this._modifierKeys, e) >= 0 || (i = t.which, j.call(this._arrowKeys, i) >= 0) || this.editor.util.metaKey(t) && 86 === t.which)) return this.editor.util.support.oninput || this.throttledValueChanged(["typing"]), null
            }
        }, i.prototype._onKeyPress = function (t) {
            if (this.editor.triggerHandler(t) === !1) return !1
        }, i.prototype._onKeyUp = function (e) {
            var i, n;
            return this.editor.triggerHandler(e) !== !1 && (!this.editor.util.support.onselectionchange && (n = e.which, j.call(this._arrowKeys, n) >= 0) ? void this.throttledValueChanged() : void(8 !== e.which && 46 !== e.which || !this.editor.util.isEmptyNode(this.editor.body) || (this.editor.body.empty(), i = t("<p/>").append(this.editor.util.phBr).appendTo(this.editor.body), this.editor.selection.setRangeAtStartOf(i))))
        }, i.prototype._onDrop = function (t) {
            return this.editor.triggerHandler(t) !== !1 && this.throttledValueChanged()
        }, i.prototype._onInput = function (t) {
            return this.throttledValueChanged(["oninput"])
        }, i
    }(e), w = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.pluginName = "Keystroke", i.prototype._init = function () {
            return this.editor = this._module, this._keystrokeHandlers = {}, this._initKeystrokeHandlers()
        }, i.prototype.add = function (t, e, i) {
            return t = t.toLowerCase(), t = this.editor.hotkeys.constructor.aliases[t] || t, this._keystrokeHandlers[t] || (this._keystrokeHandlers[t] = {}), this._keystrokeHandlers[t][e] = i
        }, i.prototype.respondTo = function (e) {
            var i, n, r, o;
            if (n = null != (r = this.editor.hotkeys.constructor.keyNameMap[e.which]) ? r.toLowerCase() : void 0) return !!(n in this._keystrokeHandlers && (o = "function" == typeof (i = this._keystrokeHandlers[n])["*"] ? i["*"](e) : void 0, o || this.editor.selection.startNodes().each(function (i) {
                return function (r, s) {
                    var a, l;
                    if (s.nodeType === Node.ELEMENT_NODE) return a = null != (l = i._keystrokeHandlers[n]) ? l[s.tagName.toLowerCase()] : void 0, o = "function" == typeof a ? a(e, t(s)) : void 0, o !== !0 && o !== !1 && void 0
                }
            }(this)), o)) || void 0
        }, i.prototype._initKeystrokeHandlers = function () {
            var e;
            return this.editor.util.browser.safari && this.add("enter", "*", function (e) {
                return function (i) {
                    var n, r;
                    if (i.shiftKey && (n = e.editor.selection.blockNodes().last(), !n.is("pre"))) return r = t("<br/>"), e.editor.selection.rangeAtEndOf(n) ? (e.editor.selection.insertNode(r), e.editor.selection.insertNode(t("<br/>")), e.editor.selection.setRangeBefore(r)) : e.editor.selection.insertNode(r), !0
                }
            }(this)), (this.editor.util.browser.webkit || this.editor.util.browser.msie) && (e = function (e) {
                return function (i, n) {
                    var r;
                    if (e.editor.selection.rangeAtEndOf(n)) return r = t("<p/>").append(e.editor.util.phBr).insertAfter(n), e.editor.selection.setRangeAtStartOf(r), !0
                }
            }(this), this.add("enter", "h1", e), this.add("enter", "h2", e), this.add("enter", "h3", e), this.add("enter", "h4", e), this.add("enter", "h5", e), this.add("enter", "h6", e)), this.add("backspace", "*", function (t) {
                return function (e) {
                    var i, n, r, o;
                    return r = t.editor.selection.rootNodes().first(), n = r.prev(), n.is("hr") && t.editor.selection.rangeAtStartOf(r) ? (t.editor.selection.save(), n.remove(), t.editor.selection.restore(), !0) : (i = t.editor.selection.blockNodes().last(), o = t.editor.util.browser.webkit, o && t.editor.selection.rangeAtStartOf(i) ? (t.editor.selection.save(), t.editor.formatter.cleanNode(i, !0), t.editor.selection.restore(), null) : void 0)
                }
            }(this)), this.add("enter", "li", function (e) {
                return function (i, n) {
                    var r, o, s, a;
                    if (r = n.clone(), r.find("ul, ol").remove(), e.editor.util.isEmptyNode(r) && n.is(e.editor.selection.blockNodes().last())) {
                        if (o = n.parent(), n.next("li").length > 0) {
                            if (!e.editor.util.isEmptyNode(n)) return;
                            o.parent("li").length > 0 ? (s = t("<li/>").append(e.editor.util.phBr).insertAfter(o.parent("li")), a = t("<" + o[0].tagName + "/>").append(n.nextAll("li")), s.append(a)) : (s = t("<p/>").append(e.editor.util.phBr).insertAfter(o), a = t("<" + o[0].tagName + "/>").append(n.nextAll("li")), s.after(a))
                        } else o.parent("li").length > 0 ? (s = t("<li/>").insertAfter(o.parent("li")), n.contents().length > 0 ? s.append(n.contents()) : s.append(e.editor.util.phBr)) : (s = t("<p/>").append(e.editor.util.phBr).insertAfter(o), n.children("ul, ol").length > 0 && s.after(n.children("ul, ol")));
                        return n.prev("li").length ? n.remove() : o.remove(), e.editor.selection.setRangeAtStartOf(s), !0
                    }
                }
            }(this)), this.add("enter", "pre", function (e) {
                return function (i, n) {
                    var r, o, s;
                    return i.preventDefault(), i.shiftKey ? (r = t("<p/>").append(e.editor.util.phBr).insertAfter(n), e.editor.selection.setRangeAtStartOf(r), !0) : (s = e.editor.selection.range(), o = null, s.deleteContents(), !e.editor.util.browser.msie && e.editor.selection.rangeAtEndOf(n) ? (o = document.createTextNode("\n\n"), s.insertNode(o), s.setEnd(o, 1)) : (o = document.createTextNode("\n"), s.insertNode(o), s.setStartAfter(o)), s.collapse(!1), e.editor.selection.range(s), !0)
                }
            }(this)), this.add("enter", "blockquote", function (t) {
                return function (e, i) {
                    var n, r;
                    if (n = t.editor.selection.blockNodes().last(), n.is("p") && !n.next().length && t.editor.util.isEmptyNode(n)) return i.after(n), r = document.createRange(), t.editor.selection.setRangeAtStartOf(n, r), !0
                }
            }(this)), this.add("backspace", "li", function (e) {
                return function (i, n) {
                    var r, o, s, a, l, d, u, p, c;
                    return o = n.children("ul, ol"), l = n.prev("li"), o.length > 0 && l.length > 0 && (c = "", d = null, n.contents().each(function (e, i) {
                        if (1 === i.nodeType && /UL|OL/.test(i.nodeName)) return !1;
                        if (1 !== i.nodeType || !/BR/.test(i.nodeName)) return 3 === i.nodeType && i.nodeValue ? c += i.nodeValue : 1 === i.nodeType && (c += t(i).text()), d = t(i)
                    }), u = e.editor.util.browser.firefox && !d.next("br").length, d && 1 === c.length && u ? (r = t(e.editor.util.phBr).insertAfter(d), d.remove(), e.editor.selection.setRangeBefore(r), !0) : !(c.length > 0) && (p = document.createRange(), a = l.children("ul, ol"), a.length > 0 ? (s = t("<li/>").append(e.editor.util.phBr).appendTo(a), a.append(o.children("li")), n.remove(), e.editor.selection.setRangeAtEndOf(s, p)) : (e.editor.selection.setRangeAtEndOf(l, p), l.append(o), n.remove(), e.editor.selection.range(p)), !0))
                };
            }(this)), this.add("backspace", "pre", function (e) {
                return function (i, n) {
                    var r, o, s;
                    if (e.editor.selection.rangeAtStartOf(n)) return o = n.html().replace("\n", "<br/>") || e.editor.util.phBr, r = t("<p/>").append(o).insertAfter(n), n.remove(), s = document.createRange(), e.editor.selection.setRangeAtStartOf(r, s), !0
                }
            }(this)), this.add("backspace", "blockquote", function (t) {
                return function (e, i) {
                    var n, r;
                    if (t.editor.selection.rangeAtStartOf(i)) return n = i.children().first().unwrap(), r = document.createRange(), t.editor.selection.setRangeAtStartOf(n, r), !0
                }
            }(this))
        }, i
    }(e), P = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.pluginName = "UndoManager", i.prototype._index = -1, i.prototype._capacity = 20, i.prototype._startPosition = null, i.prototype._endPosition = null, i.prototype._init = function () {
            var t, e;
            return this.editor = this._module, this._stack = [], this.editor.util.os.mac ? (e = "cmd+z", t = "shift+cmd+z") : this.editor.util.os.win ? (e = "ctrl+z", t = "ctrl+y") : (e = "ctrl+z", t = "shift+ctrl+z"), this.editor.hotkeys.add(e, function (t) {
                return function (e) {
                    return e.preventDefault(), t.undo(), !1
                }
            }(this)), this.editor.hotkeys.add(t, function (t) {
                return function (e) {
                    return e.preventDefault(), t.redo(), !1
                }
            }(this)), this.throttledPushState = this.editor.util.throttle(function (t) {
                return function () {
                    return t._pushUndoState()
                }
            }(this), 2e3), this.editor.on("valuechanged", function (t) {
                return function (e, i) {
                    if ("undo" !== i && "redo" !== i) return t.throttledPushState()
                }
            }(this)), this.editor.on("selectionchanged", function (t) {
                return function (e) {
                    return t.resetCaretPosition(), t.update()
                }
            }(this)), this.editor.on("focus", function (t) {
                return function (e) {
                    if (0 === t._stack.length) return t._pushUndoState()
                }
            }(this)), this.editor.on("blur", function (t) {
                return function (e) {
                    return t.resetCaretPosition()
                }
            }(this))
        }, i.prototype.resetCaretPosition = function () {
            return this._startPosition = null, this._endPosition = null
        }, i.prototype.startPosition = function () {
            return this.editor.selection._range && (this._startPosition || (this._startPosition = this._getPosition("start"))), this._startPosition
        }, i.prototype.endPosition = function () {
            return this.editor.selection._range && (this._endPosition || (this._endPosition = function (t) {
                return function () {
                    var e;
                    return e = t.editor.selection.range(), e.collapsed ? t._startPosition : t._getPosition("end")
                }
            }(this)())), this._endPosition
        }, i.prototype._pushUndoState = function () {
            var t;
            if (this.editor.triggerHandler("pushundostate") !== !1 && (t = this.caretPosition(), t.start)) return this._index += 1, this._stack.length = this._index, this._stack.push({
                html: this.editor.body.html(),
                caret: this.caretPosition()
            }), this._stack.length > this._capacity ? (this._stack.shift(), this._index -= 1) : void 0
        }, i.prototype.currentState = function () {
            return this._stack.length && this._index > -1 ? this._stack[this._index] : null
        }, i.prototype.undo = function () {
            var t;
            if (!(this._index < 1 || this._stack.length < 2)) return this.editor.hidePopover(), this._index -= 1, t = this._stack[this._index], this.editor.body.get(0).innerHTML = t.html, this.caretPosition(t.caret), this.editor.body.find(".selected").removeClass("selected"), this.editor.sync(), this.editor.trigger("valuechanged", ["undo"])
        }, i.prototype.redo = function () {
            var t;
            if (!(this._index < 0 || this._stack.length < this._index + 2)) return this.editor.hidePopover(), this._index += 1, t = this._stack[this._index], this.editor.body.get(0).innerHTML = t.html, this.caretPosition(t.caret), this.editor.body.find(".selected").removeClass("selected"), this.editor.sync(), this.editor.trigger("valuechanged", ["redo"])
        }, i.prototype.update = function () {
            var t;
            if (t = this.currentState()) return t.html = this.editor.body.html(), t.caret = this.caretPosition()
        }, i.prototype._getNodeOffset = function (e, i) {
            var n, r, o;
            return n = t.isNumeric(i) ? t(e) : t(e).parent(), o = 0, r = !1, n.contents().each(function (t, n) {
                return e !== n && (i !== t || 0 !== t) && (n.nodeType === Node.TEXT_NODE ? !r && n.nodeValue.length > 0 && (o += 1, r = !0) : (o += 1, r = !1), i - 1 !== t && null)
            }), o
        }, i.prototype._getPosition = function (e) {
            var i, n, r, o, s, a, l;
            if (null == e && (e = "start"), l = this.editor.selection.range(), o = l[e + "Offset"], i = this.editor.selection[e + "Nodes"](), n = i.first()[0], n.nodeType === Node.TEXT_NODE) {
                for (a = n.previousSibling; a && a.nodeType === Node.TEXT_NODE;) n = a, o += this.editor.util.getNodeLength(a), a = a.previousSibling;
                r = i.get(), r[0] = n, i = t(r)
            } else o = this._getNodeOffset(n, o);
            return s = [o], i.each(function (t) {
                return function (e, i) {
                    return s.unshift(t._getNodeOffset(i))
                }
            }(this)), s
        }, i.prototype._getNodeByPosition = function (e) {
            var i, n, r, o, s, a, l, d;
            for (a = this.editor.body[0], d = e.slice(0, e.length - 1), r = o = 0, s = d.length; o < s; r = ++o) {
                if (l = d[r], n = a.childNodes, l > n.length - 1) {
                    if (r !== e.length - 2 || !t(a).is("pre:empty")) {
                        a = null;
                        break
                    }
                    i = document.createTextNode(""), a.appendChild(i), n = a.childNodes
                }
                a = n[l]
            }
            return a
        }, i.prototype.caretPosition = function (t) {
            var e, i, n, r, o;
            if (t) {
                if (!t.start) return;
                return r = this._getNodeByPosition(t.start), o = t.start[t.start.length - 1], t.collapsed ? (e = r, i = o) : (e = this._getNodeByPosition(t.end), i = t.start[t.start.length - 1]), r && e ? (n = document.createRange(), n.setStart(r, o), n.setEnd(e, i), this.editor.selection.range(n)) : void("undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("simditor: invalid caret state"))
            }
            return n = this.editor.selection.range(), t = this.editor.inputManager.focused && null != n ? {
                start: this.startPosition(),
                end: this.endPosition(),
                collapsed: n.collapsed
            } : {}
        }, i
    }(e), z = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.pluginName = "Util", i.prototype._init = function () {
            if (this.editor = this._module, this.browser.msie && this.browser.version < 11) return this.phBr = ""
        }, i.prototype.phBr = "<br/>", i.prototype.os = function () {
            var t;
            return t = {}, /Mac/.test(navigator.appVersion) ? t.mac = !0 : /Linux/.test(navigator.appVersion) ? t.linux = !0 : /Win/.test(navigator.appVersion) ? t.win = !0 : /X11/.test(navigator.appVersion) && (t.unix = !0), /Mobi/.test(navigator.appVersion) && (t.mobile = !0), t
        }(), i.prototype.browser = function () {
            var t, e, i, n, r, o, s, a, l, d, u;
            return u = navigator.userAgent, n = /(msie|trident)/i.test(u), t = /chrome|crios/i.test(u), d = /safari/i.test(u) && !t, i = /firefox/i.test(u), e = /edge/i.test(u), n ? {
                msie: !0,
                version: 1 * (null != (r = u.match(/(msie |rv:)(\d+(\.\d+)?)/i)) ? r[2] : void 0)
            } : e ? {
                edge: !0,
                webkit: !0,
                version: 1 * (null != (o = u.match(/edge\/(\d+(\.\d+)?)/i)) ? o[1] : void 0)
            } : t ? {
                webkit: !0,
                chrome: !0,
                version: 1 * (null != (s = u.match(/(?:chrome|crios)\/(\d+(\.\d+)?)/i)) ? s[1] : void 0)
            } : d ? {
                webkit: !0,
                safari: !0,
                version: 1 * (null != (a = u.match(/version\/(\d+(\.\d+)?)/i)) ? a[1] : void 0)
            } : i ? {
                mozilla: !0,
                firefox: !0,
                version: 1 * (null != (l = u.match(/firefox\/(\d+(\.\d+)?)/i)) ? l[1] : void 0)
            } : {}
        }(), i.prototype.support = function () {
            return {
                onselectionchange: function () {
                    var t, e;
                    if (e = document.onselectionchange, void 0 !== e) try {
                        return document.onselectionchange = 0, null === document.onselectionchange
                    } catch (i) {
                        t = i
                    } finally {
                        document.onselectionchange = e
                    }
                    return !1
                }(),
                oninput: function () {
                    return !/(msie|trident)/i.test(navigator.userAgent)
                }()
            }
        }(), i.prototype.reflow = function (e) {
            return null == e && (e = document), t(e)[0].offsetHeight
        }, i.prototype.metaKey = function (t) {
            var e;
            return e = /Mac/.test(navigator.userAgent), e ? t.metaKey : t.ctrlKey
        }, i.prototype.isEmptyNode = function (e) {
            var i;
            return i = t(e), i.is(":empty") || !i.text() && !i.find(":not(br, span, div)").length
        }, i.prototype.isDecoratedNode = function (e) {
            return t(e).is('[class^="simditor-"]')
        }, i.prototype.blockNodes = ["div", "p", "ul", "ol", "li", "blockquote", "hr", "pre", "h1", "h2", "h3", "h4", "h5", "table"], i.prototype.isBlockNode = function (e) {
            return e = t(e)[0], !(!e || 3 === e.nodeType) && new RegExp("^(" + this.blockNodes.join("|") + ")$").test(e.nodeName.toLowerCase())
        }, i.prototype.getNodeLength = function (e) {
            switch (e = t(e)[0], e.nodeType) {
                case 7:
                case 10:
                    return 0;
                case 3:
                case 8:
                    return e.length;
                default:
                    return e.childNodes.length
            }
        }, i.prototype.dataURLtoBlob = function (t) {
            var e, i, n, r, o, s, a, l, d, u, p, c, h;
            if (a = window.Blob && function () {
                    var t;
                    try {
                        return Boolean(new Blob)
                    } catch (e) {
                        return t = e, !1
                    }
                }(), s = a && window.Uint8Array && function () {
                    var t;
                    try {
                        return 100 === new Blob([new Uint8Array(100)]).size
                    } catch (e) {
                        return t = e, !1
                    }
                }(), e = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, h = a || e, !(h && window.atob && window.ArrayBuffer && window.Uint8Array)) return !1;
            for (o = t.split(",")[0].indexOf("base64") >= 0 ? atob(t.split(",")[1]) : decodeURIComponent(t.split(",")[1]), i = new ArrayBuffer(o.length), d = new Uint8Array(i), l = u = 0, c = o.length; 0 <= c ? u <= c : u >= c; l = 0 <= c ? ++u : --u) d[l] = o.charCodeAt(l);
            return p = t.split(",")[0].split(":")[1].split(";")[0], a ? (r = s ? d : i, new Blob([r], {
                type: p
            })) : (n = new e, n.append(i), n.getBlob(p))
        }, i.prototype.throttle = function (t, e) {
            var i, n, r, o, s, a, l;
            return o = 0, l = 0, r = i = s = null, n = function () {
                return l = 0, o = +new Date, s = t.apply(r, i), r = null, i = null
            }, a = function () {
                var t;
                return r = this, i = arguments, t = new Date - o, l || (t >= e ? n() : l = setTimeout(n, e - t)), s
            }, a.clear = function () {
                if (l) return clearTimeout(l), n()
            }, a
        }, i.prototype.formatHTML = function (e) {
            var i, n, r, o, s, a, l, d, u;
            for (a = /<(\/?)(.+?)(\/?)>/g, d = "", o = 0, r = null, n = "  ", l = function (t, e) {
                    return new Array(e + 1).join(t)
                }; null !== (s = a.exec(e));) s.isBlockNode = t.inArray(s[2], this.blockNodes) > -1, s.isStartTag = "/" !== s[1] && "/" !== s[3], s.isEndTag = "/" === s[1] || "/" === s[3], i = r ? r.index + r[0].length : 0, (u = e.substring(i, s.index)).length > 0 && t.trim(u) && (d += u), s.isBlockNode && s.isEndTag && !s.isStartTag && (o -= 1), s.isBlockNode && s.isStartTag && (r && r.isBlockNode && r.isEndTag || (d += "\n"), d += l(n, o)), d += s[0], s.isBlockNode && s.isEndTag && (d += "\n"), s.isBlockNode && s.isStartTag && (o += 1), r = s;
            return t.trim(d)
        }, i
    }(e), M = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.pluginName = "Toolbar", i.prototype.opts = {
            toolbar: !0,
            toolbarFloat: !0,
            toolbarHidden: !1,
            toolbarFloatOffset: 0
        }, i.prototype._tpl = {
            wrapper: '<div class="simditor-toolbar"><ul></ul></div>',
            separator: '<li><span class="separator"></span></li>'
        }, i.prototype._init = function () {
            var e, i, n;
            if (this.editor = this._module, this.opts.toolbar) return t.isArray(this.opts.toolbar) || (this.opts.toolbar = ["bold", "italic", "underline", "strikethrough", "|", "ol", "ul", "blockquote", "code", "|", "link", "image", "|", "indent", "outdent"]), this._render(), this.list.on("click", function (t) {
                return !1
            }), this.wrapper.on("mousedown", function (t) {
                return function (e) {
                    return t.list.find(".menu-on").removeClass(".menu-on")
                }
            }(this)), t(document).on("mousedown.simditor" + this.editor.id, function (t) {
                return function (e) {
                    return t.list.find(".menu-on").removeClass(".menu-on")
                }
            }(this)), !this.opts.toolbarHidden && this.opts.toolbarFloat && (this.wrapper.css("top", this.opts.toolbarFloatOffset), n = 0, i = function (t) {
                return function () {
                    return t.wrapper.css("position", "static"), t.wrapper.width("auto"), t.editor.util.reflow(t.wrapper), t.wrapper.width(t.wrapper.outerWidth()), t.wrapper.css("left", t.editor.util.os.mobile ? t.wrapper.position().left : t.wrapper.offset().left), t.wrapper.css("position", ""), n = t.wrapper.outerHeight(), t.editor.placeholderEl.css("top", n), !0
                }
            }(this), e = null, t(window).on("resize.simditor-" + this.editor.id, function (t) {
                return e = i()
            }), t(window).on("scroll.simditor-" + this.editor.id, function (r) {
                return function (o) {
                    var s, a, l;
                    if (r.wrapper.is(":visible"))
                        if (l = r.editor.wrapper.offset().top, s = l + r.editor.wrapper.outerHeight() - 80, a = t(document).scrollTop() + r.opts.toolbarFloatOffset, a <= l || a >= s) {
                            if (r.editor.wrapper.removeClass("toolbar-floating").css("padding-top", ""), r.editor.util.os.mobile) return r.wrapper.css("top", r.opts.toolbarFloatOffset)
                        } else if (e || (e = i()), r.editor.wrapper.addClass("toolbar-floating").css("padding-top", n), r.editor.util.os.mobile) return r.wrapper.css("top", a - l + r.opts.toolbarFloatOffset)
                }
            }(this))), this.editor.on("destroy", function (t) {
                return function () {
                    return t.buttons.length = 0
                }
            }(this)), t(document).on("mousedown.simditor-" + this.editor.id, function (t) {
                return function (e) {
                    return t.list.find("li.menu-on").removeClass("menu-on")
                }
            }(this))
        }, i.prototype._render = function () {
            var e, i, n, r;
            for (this.buttons = [], this.wrapper = t(this._tpl.wrapper).prependTo(this.editor.wrapper), this.list = this.wrapper.find("ul"), r = this.opts.toolbar, e = 0, i = r.length; e < i; e++)
                if (n = r[e], "|" !== n) {
                    if (!this.constructor.buttons[n]) throw new Error("simditor: invalid toolbar button " + n);
                    this.buttons.push(new this.constructor.buttons[n]({
                        editor: this.editor
                    }))
                } else t(this._tpl.separator).appendTo(this.list);
            if (this.opts.toolbarHidden) return this.wrapper.hide()
        }, i.prototype.findButton = function (t) {
            var e;
            return e = this.list.find(".toolbar-item-" + t).data("button"), null != e ? e : null
        }, i.addButton = function (t) {
            return this.buttons[t.prototype.name] = t
        }, i.buttons = {}, i
    }(e), v = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.pluginName = "Indentation", i.prototype.opts = {
            tabIndent: !0
        }, i.prototype._init = function () {
            return this.editor = this._module, this.editor.keystroke.add("tab", "*", function (t) {
                return function (e) {
                    var i;
                    if (i = t.editor.toolbar.findButton("code"), t.opts.tabIndent || i && i.active) return t.indent(e.shiftKey)
                }
            }(this))
        }, i.prototype.indent = function (e) {
            var i, n, r, o, s;
            return r = this.editor.selection.startNodes(), n = this.editor.selection.endNodes(), i = this.editor.selection.blockNodes(), o = [], i = i.each(function (e, i) {
                var n, r, s, a, l;
                for (n = !0, r = s = 0, a = o.length; s < a; r = ++s) {
                    if (l = o[r], t.contains(i, l)) {
                        n = !1;
                        break
                    }
                    if (t.contains(l, i)) {
                        o.splice(r, 1, i), n = !1;
                        break
                    }
                }
                if (n) return o.push(i)
            }), i = t(o), s = !1, i.each(function (t) {
                return function (i, n) {
                    var r;
                    if (r = e ? t.outdentBlock(n) : t.indentBlock(n)) return s = r
                }
            }(this)), s
        }, i.prototype.indentBlock = function (e) {
            var i, n, r, o, s, a, l, d, u, p;
            if (i = t(e), i.length) {
                if (i.is("pre")) {
                    if (a = this.editor.selection.containerNode(), !a.is(i) && !a.closest("pre").is(i)) return;
                    this.indentText(this.editor.selection.range())
                } else if (i.is("li")) {
                    if (s = i.prev("li"), s.length < 1) return;
                    this.editor.selection.save(), p = i.parent()[0].tagName, n = s.children("ul, ol"), n.length > 0 ? n.append(i) : t("<" + p + "/>").append(i).appendTo(s), this.editor.selection.restore()
                } else if (i.is("p, h1, h2, h3, h4")) u = parseInt(i.css("margin-left")) || 0, u = (Math.round(u / this.opts.indentWidth) + 1) * this.opts.indentWidth, i.css("margin-left", u);
                else {
                    if (!i.is("table") && !i.is(".simditor-table")) return !1;
                    if (l = this.editor.selection.containerNode().closest("td, th"), r = l.next("td, th"), r.length > 0 || (d = l.parent("tr"), o = d.next("tr"), o.length < 1 && d.parent().is("thead") && (o = d.parent("thead").next("tbody").find("tr:first")), r = o.find("td:first, th:first")), !(l.length > 0 && r.length > 0)) return;
                    this.editor.selection.setRangeAtEndOf(r)
                }
                return !0
            }
        }, i.prototype.indentText = function (t) {
            var e, i;
            return e = t.toString().replace(/^(?=.+)/gm, "  "), i = document.createTextNode(e || "  "), t.deleteContents(), t.insertNode(i), e ? (t.selectNode(i), this.editor.selection.range(t)) : this.editor.selection.setRangeAfter(i)
        }, i.prototype.outdentBlock = function (e) {
            var i, n, r, o, s, a, l, d, u, p;
            if (i = t(e), i && i.length > 0) {
                if (i.is("pre")) {
                    if (o = this.editor.selection.containerNode(), !o.is(i) && !o.closest("pre").is(i)) return;
                    this.outdentText(p)
                } else if (i.is("li")) n = i.parent(), r = n.parent("li"), this.editor.selection.save(), r.length < 1 ? (p = document.createRange(), p.setStartBefore(n[0]), p.setEndBefore(i[0]), n.before(p.extractContents()), t("<p/>").insertBefore(n).after(i.children("ul, ol")).append(i.contents()), i.remove()) : (i.next("li").length > 0 && t("<" + n[0].tagName + "/>").append(i.nextAll("li")).appendTo(i), i.insertAfter(r), n.children("li").length < 1 && n.remove()), this.editor.selection.restore();
                else if (i.is("p, h1, h2, h3, h4")) u = parseInt(i.css("margin-left")) || 0, u = Math.max(Math.round(u / this.opts.indentWidth) - 1, 0) * this.opts.indentWidth, i.css("margin-left", 0 === u ? "" : u);
                else {
                    if (!i.is("table") && !i.is(".simditor-table")) return !1;
                    if (l = this.editor.selection.containerNode().closest("td, th"), s = l.prev("td, th"), s.length > 0 || (d = l.parent("tr"), a = d.prev("tr"), a.length < 1 && d.parent().is("tbody") && (a = d.parent("tbody").prev("thead").find("tr:first")), s = a.find("td:last, th:last")), !(l.length > 0 && s.length > 0)) return;
                    this.editor.selection.setRangeAtEndOf(s)
                }
                return !0
            }
        }, i.prototype.outdentText = function (t) {}, i
    }(e), l = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.pluginName = "Clipboard", i.prototype.opts = {
            pasteImage: !1,
            cleanPaste: !1
        }, i.prototype._init = function () {
            return this.editor = this._module, this.opts.pasteImage && "string" != typeof this.opts.pasteImage && (this.opts.pasteImage = "inline"), this.editor.body.on("paste", function (t) {
                return function (e) {
                    var i;
                    if (!t.pasting && !t._pasteBin) return t.editor.triggerHandler(e) !== !1 && (i = t.editor.selection.deleteRangeContents(), t.editor.body.html() ? i.collapsed || i.collapse(!0) : (t.editor.formatter.format(), t.editor.selection.setRangeAtStartOf(t.editor.body.find("p:first"))), !t._processPasteByClipboardApi(e) && (t.editor.inputManager.throttledValueChanged.clear(), t.editor.inputManager.throttledSelectionChanged.clear(), t.editor.undoManager.throttledPushState.clear(), t.editor.selection.reset(), t.editor.undoManager.resetCaretPosition(), t.pasting = !0, t._getPasteContent(function (e) {
                        return t._processPasteContent(e), t._pasteInBlockEl = null, t._pastePlainText = null, t.pasting = !1
                    })))
                }
            }(this))
        }, i.prototype._processPasteByClipboardApi = function (t) {
            var e, i, n, r;
            if (!this.editor.util.browser.edge && t.originalEvent.clipboardData && t.originalEvent.clipboardData.items && t.originalEvent.clipboardData.items.length > 0 && (i = t.originalEvent.clipboardData.items[0], /^image\//.test(i.type))) {
                if (e = i.getAsFile(), null == e || !this.opts.pasteImage) return;
                if (e.name || (e.name = "Clipboard Image.png"), this.editor.triggerHandler("pasting", [e]) === !1) return;
                return r = {}, r[this.opts.pasteImage] = !0, null != (n = this.editor.uploader) && n.upload(e, r), !0
            }
        }, i.prototype._getPasteContent = function (e) {
            var i;
            return this._pasteBin = t('<div contenteditable="true" />').addClass("simditor-paste-bin").attr("tabIndex", "-1").appendTo(this.editor.el), i = {
                html: this.editor.body.html(),
                caret: this.editor.undoManager.caretPosition()
            }, this._pasteBin.focus(), setTimeout(function (n) {
                return function () {
                    var r;
                    return n.editor.hidePopover(), n.editor.body.get(0).innerHTML = i.html, n.editor.undoManager.caretPosition(i.caret), n.editor.body.focus(), n.editor.selection.reset(), n.editor.selection.range(), n._pasteInBlockEl = n.editor.selection.blockNodes().last(), n._pastePlainText = n.opts.cleanPaste || n._pasteInBlockEl.is("pre, table"), n._pastePlainText ? r = n.editor.formatter.clearHtml(n._pasteBin.html(), !0) : (r = t("<div/>").append(n._pasteBin.contents()), r.find("table colgroup").remove(), n.editor.formatter.format(r), n.editor.formatter.decorate(r), n.editor.formatter.beautify(r.children()), r = r.contents()), n._pasteBin.remove(), n._pasteBin = null, e(r)
                }
            }(this), 0)
        }, i.prototype._processPasteContent = function (e) {
            var i, n, r, o, s, a, l, d, u, p, c, h, f, g, m, y, v, _, b, w, x, C, k;
            if (this.editor.triggerHandler("pasting", [e]) !== !1 && (i = this._pasteInBlockEl, e)) {
                if (this._pastePlainText)
                    if (i.is("table")) {
                        for (m = e.split("\n"), d = m.pop(), a = 0, u = m.length; a < u; a++) g = m[a], this.editor.selection.insertNode(document.createTextNode(g)), this.editor.selection.insertNode(t("<br/>"));
                        this.editor.selection.insertNode(document.createTextNode(d))
                    } else
                        for (e = t("<div/>").text(e), w = e.contents(), l = 0, p = w.length; l < p; l++) v = w[l], this.editor.selection.insertNode(t(v)[0]);
                else if (i.is(this.editor.body))
                    for (y = 0, c = e.length; y < c; y++) v = e[y], this.editor.selection.insertNode(v);
                else {
                    if (e.length < 1) return;
                    if (1 === e.length)
                        if (e.is("p")) {
                            if (o = e.contents(), 1 === o.length && o.is("img")) {
                                if (n = o, /^data:image/.test(n.attr("src"))) {
                                    if (!this.opts.pasteImage) return;
                                    return r = this.editor.util.dataURLtoBlob(n.attr("src")), r.name = "Clipboard Image.png", k = {}, k[this.opts.pasteImage] = !0, void(null != (x = this.editor.uploader) && x.upload(r, k))
                                }
                                if (n.is('img[src^="webkit-fake-url://"]')) return
                            }
                            for (_ = 0, h = o.length; _ < h; _++) v = o[_], this.editor.selection.insertNode(v)
                        } else if (i.is("p") && this.editor.util.isEmptyNode(i)) i.replaceWith(e), this.editor.selection.setRangeAtEndOf(e);
                    else if (e.is("ul, ol"))
                        if (1 === e.find("li").length)
                            for (e = t("<div/>").text(e.text()), C = e.contents(), b = 0, f = C.length; b < f; b++) v = C[b], this.editor.selection.insertNode(t(v)[0]);
                        else i.is("li") ? (i.parent().after(e), this.editor.selection.setRangeAtEndOf(e)) : (i.after(e), this.editor.selection.setRangeAtEndOf(e));
                    else i.after(e), this.editor.selection.setRangeAtEndOf(e);
                    else i.is("li") && (i = i.parent()), this.editor.selection.rangeAtStartOf(i) ? s = "before" : this.editor.selection.rangeAtEndOf(i) ? s = "after" : (this.editor.selection.breakBlockEl(i), s = "before"), i[s](e), this.editor.selection.setRangeAtEndOf(e.last())
                }
                return this.editor.inputManager.throttledValueChanged()
            }
        }, i
    }(e), E = function (e) {
        function r() {
            return r.__super__.constructor.apply(this, arguments)
        }
        return W(r, e), r.connect(z), r.connect(_), r.connect(A), r.connect(P), r.connect(w), r.connect(h), r.connect(M), r.connect(v), r.connect(l), r.count = 0, r.prototype.opts = {
            textarea: null,
            placeholder: "",
            defaultImage: "images/image.png",
            params: {},
            upload: !1,
            indentWidth: 40
        }, r.prototype._init = function () {
            var e, o, s, a;
            if (this.textarea = t(this.opts.textarea), this.opts.placeholder = this.opts.placeholder || this.textarea.attr("placeholder"), !this.textarea.length) throw new Error("simditor: param textarea is required.");
            if (o = this.textarea.data("simditor"), null != o && o.destroy(), this.id = ++r.count, this._render(), !i) throw new Error("simditor: simple-hotkeys is required.");
            if (this.hotkeys = i({
                    el: this.body
                }), this.opts.upload && n && (a = "object" == typeof this.opts.upload ? this.opts.upload : {}, this.uploader = n(a)), s = this.textarea.closest("form"), s.length && (s.on("submit.simditor-" + this.id, function (t) {
                    return function () {
                        return t.sync()
                    }
                }(this)), s.on("reset.simditor-" + this.id, function (t) {
                    return function () {
                        return t.setValue("")
                    }
                }(this))), this.on("initialized", function (t) {
                    return function () {
                        if (t.opts.placeholder && t.on("valuechanged", function () {
                                return t._placeholder()
                            }), t.setValue(t.textarea.val().trim() || ""), t.textarea.attr("autofocus")) return t.focus()
                    }
                }(this)), this.util.browser.mozilla) {
                this.util.reflow();
                try {
                    return document.execCommand("enableObjectResizing", !1, !1), document.execCommand("enableInlineTableEditing", !1, !1)
                } catch (l) {
                    e = l
                }
            }
        }, r.prototype._tpl = '<div class="simditor">\n  <div class="simditor-wrapper">\n    <div class="simditor-placeholder"></div>\n    <div class="simditor-body" contenteditable="true">\n    </div>\n  </div>\n</div>', r.prototype._render = function () {
            var e, i, n, r;
            if (this.el = t(this._tpl).insertBefore(this.textarea), this.wrapper = this.el.find(".simditor-wrapper"), this.body = this.wrapper.find(".simditor-body"), this.placeholderEl = this.wrapper.find(".simditor-placeholder").append(this.opts.placeholder), this.el.data("simditor", this), this.wrapper.append(this.textarea), this.textarea.data("simditor", this).blur(), this.body.attr("tabindex", this.textarea.attr("tabindex")), this.util.os.mac ? this.el.addClass("simditor-mac") : this.util.os.linux && this.el.addClass("simditor-linux"), this.util.os.mobile && this.el.addClass("simditor-mobile"), this.opts.params) {
                i = this.opts.params, n = [];
                for (e in i) r = i[e], n.push(t("<input/>", {
                    type: "hidden",
                    name: e,
                    value: r
                }).insertAfter(this.textarea));
                return n
            }
        }, r.prototype._placeholder = function () {
            var t;
            return t = this.body.children(), 0 === t.length || 1 === t.length && this.util.isEmptyNode(t) && parseInt(t.css("margin-left") || 0) < this.opts.indentWidth ? this.placeholderEl.show() : this.placeholderEl.hide()
        }, r.prototype.setValue = function (t) {
            return this.hidePopover(), this.textarea.val(t), this.body.get(0).innerHTML = t, this.formatter.format(), this.formatter.decorate(), this.util.reflow(this.body), this.inputManager.lastCaretPosition = null, this.trigger("valuechanged")
        }, r.prototype.getValue = function () {
            return this.sync()
        }, r.prototype.sync = function () {
            var e, i, n, r, o, s;
            for (i = this.body.clone(), this.formatter.undecorate(i), this.formatter.format(i), this.formatter.autolink(i), e = i.children(), o = e.last("p"), r = e.first("p"); o.is("p") && this.util.isEmptyNode(o);) n = o, o = o.prev("p"), n.remove();
            for (; r.is("p") && this.util.isEmptyNode(r);) n = r, r = o.next("p"), n.remove();
            return i.find("img.uploading").remove(), s = t.trim(i.html()), this.textarea.val(s), s
        }, r.prototype.focus = function () {
            var e, i;
            return this.body.is(":visible") && this.body.is("[contenteditable]") ? this.inputManager.lastCaretPosition ? (this.undoManager.caretPosition(this.inputManager.lastCaretPosition), this.inputManager.lastCaretPosition = null) : (e = this.body.children().last(), e.is("p") || (e = t("<p/>").append(this.util.phBr).appendTo(this.body)), i = document.createRange(), this.selection.setRangeAtEndOf(e, i)) : void this.el.find("textarea:visible").focus()
        }, r.prototype.blur = function () {
            return this.body.is(":visible") && this.body.is("[contenteditable]") ? this.body.blur() : this.body.find("textarea:visible").blur()
        }, r.prototype.hidePopover = function () {
            return this.el.find(".simditor-popover").each(function (e, i) {
                if (i = t(i).data("popover"), i.active) return i.hide()
            })
        }, r.prototype.destroy = function () {
            return this.triggerHandler("destroy"), this.textarea.closest("form").off(".simditor .simditor-" + this.id), this.selection.clear(), this.inputManager.focused = !1, this.textarea.insertBefore(this.el).hide().val("").removeData("simditor"), this.el.remove(), t(document).off(".simditor-" + this.id), t(window).off(".simditor-" + this.id), this.off()
        }, r
    }(e), E.i18n = {
        "zh-CN": {
            blockquote: "引用",
            bold: "加粗文字",
            code: "插入代码",
            color: "文字颜色",
            coloredText: "彩色文字",
            hr: "分隔线",
            image: "插入图片",
            externalImage: "外链图片",
            uploadImage: "上传图片",
            uploadFailed: "上传失败了",
            uploadError: "上传出错了",
            imageUrl: "图片地址",
            imageSize: "图片尺寸",
            imageAlt: "图片描述",
            restoreImageSize: "还原图片尺寸",
            uploading: "正在上传",
            indent: "向右缩进",
            outdent: "向左缩进",
            italic: "斜体文字",
            link: "插入链接",
            linkText: "链接文字",
            linkUrl: "链接地址",
            linkTarget: "打开方式",
            openLinkInCurrentWindow: "在当前窗口中打开",
            openLinkInNewWindow: "在新窗口中打开",
            removeLink: "移除链接",
            ol: "有序列表",
            ul: "无序列表",
            strikethrough: "删除线文字",
            table: "表格",
            deleteRow: "删除行",
            insertRowAbove: "在上面插入行",
            insertRowBelow: "在下面插入行",
            deleteColumn: "删除列",
            insertColumnLeft: "在左边插入列",
            insertColumnRight: "在右边插入列",
            deleteTable: "删除表格",
            title: "标题",
            normalText: "普通文本",
            underline: "下划线文字",
            alignment: "水平对齐",
            alignCenter: "居中",
            alignLeft: "居左",
            alignRight: "居右",
            selectLanguage: "选择程序语言",
            fontScale: "字体大小",
            fontScaleXLarge: "超大字体",
            fontScaleLarge: "大号字体",
            fontScaleNormal: "正常大小",
            fontScaleSmall: "小号字体",
            fontScaleXSmall: "超小字体"
        },
        "en-US": {
            blockquote: "Block Quote",
            bold: "Bold",
            code: "Code",
            color: "Text Color",
            coloredText: "Colored Text",
            hr: "Horizontal Line",
            image: "Insert Image",
            externalImage: "External Image",
            uploadImage: "Upload Image",
            uploadFailed: "Upload failed",
            uploadError: "Error occurs during upload",
            imageUrl: "Url",
            imageSize: "Size",
            imageAlt: "Alt",
            restoreImageSize: "Restore Origin Size",
            uploading: "Uploading",
            indent: "Indent",
            outdent: "Outdent",
            italic: "Italic",
            link: "Insert Link",
            linkText: "Text",
            linkUrl: "Url",
            linkTarget: "Target",
            openLinkInCurrentWindow: "Open link in current window",
            openLinkInNewWindow: "Open link in new window",
            removeLink: "Remove Link",
            ol: "Ordered List",
            ul: "Unordered List",
            strikethrough: "Strikethrough",
            table: "Table",
            deleteRow: "Delete Row",
            insertRowAbove: "Insert Row Above",
            insertRowBelow: "Insert Row Below",
            deleteColumn: "Delete Column",
            insertColumnLeft: "Insert Column Left",
            insertColumnRight: "Insert Column Right",
            deleteTable: "Delete Table",
            title: "Title",
            normalText: "Text",
            underline: "Underline",
            alignment: "Alignment",
            alignCenter: "Align Center",
            alignLeft: "Align Left",
            alignRight: "Align Right",
            selectLanguage: "Select Language",
            fontScale: "Font Size",
            fontScaleXLarge: "X Large Size",
            fontScaleLarge: "Large Size",
            fontScaleNormal: "Normal Size",
            fontScaleSmall: "Small Size",
            fontScaleXSmall: "X Small Size"
        }
    }, a = function (e) {
        function i(t) {
            this.editor = t.editor, this.title = this._t(this.name), i.__super__.constructor.call(this, t)
        }
        return W(i, e), i.prototype._tpl = {
            item: '<li><a tabindex="-1" unselectable="on" class="toolbar-item" href="javascript:;"><span></span></a></li>',
            menuWrapper: '<div class="toolbar-menu"></div>',
            menuItem: '<li><a tabindex="-1" unselectable="on" class="menu-item" href="javascript:;"><span></span></a></li>',
            separator: '<li><span class="separator"></span></li>'
        }, i.prototype.name = "", i.prototype.icon = "", i.prototype.title = "", i.prototype.text = "", i.prototype.htmlTag = "", i.prototype.disableTag = "", i.prototype.menu = !1, i.prototype.active = !1, i.prototype.disabled = !1, i.prototype.needFocus = !0, i.prototype.shortcut = null, i.prototype._init = function () {
            var e, i, n, r;
            for (this.render(), this.el.on("mousedown", function (t) {
                    return function (e) {
                        var i, n, r;
                        return e.preventDefault(), n = t.needFocus && !t.editor.inputManager.focused, !t.el.hasClass("disabled") && !n && (t.menu ? (t.wrapper.toggleClass("menu-on").siblings("li").removeClass("menu-on"), t.wrapper.is(".menu-on") && (i = t.menuWrapper.offset().left + t.menuWrapper.outerWidth() + 5 - t.editor.wrapper.offset().left - t.editor.wrapper.outerWidth(), i > 0 && t.menuWrapper.css({
                            left: "auto",
                            right: 0
                        }), t.trigger("menuexpand")), !1) : (r = t.el.data("param"), t.command(r), !1))
                    }
                }(this)), this.wrapper.on("click", "a.menu-item", function (e) {
                    return function (i) {
                        var n, r, o;
                        return i.preventDefault(), n = t(i.currentTarget), e.wrapper.removeClass("menu-on"), r = e.needFocus && !e.editor.inputManager.focused, !n.hasClass("disabled") && !r && (e.editor.toolbar.wrapper.removeClass("menu-on"), o = n.data("param"), e.command(o), !1)
                    }
                }(this)), this.wrapper.on("mousedown", "a.menu-item", function (t) {
                    return !1
                }), this.editor.on("blur", function (t) {
                    return function () {
                        var e;
                        if (e = t.editor.body.is(":visible") && t.editor.body.is("[contenteditable]"), e && !t.editor.clipboard.pasting) return t.setActive(!1), t.setDisabled(!1)
                    }
                }(this)), null != this.shortcut && this.editor.hotkeys.add(this.shortcut, function (t) {
                    return function (e) {
                        return t.el.mousedown(), !1
                    }
                }(this)), n = this.htmlTag.split(","), e = 0, i = n.length; e < i; e++) r = n[e], r = t.trim(r), r && t.inArray(r, this.editor.formatter._allowedTags) < 0 && this.editor.formatter._allowedTags.push(r);
            return this.editor.on("selectionchanged", function (t) {
                return function (e) {
                    if (t.editor.inputManager.focused) return t._status()
                }
            }(this))
        }, i.prototype.iconClassOf = function (t) {
            return t ? "simditor-icon simditor-icon-" + t : ""
        }, i.prototype.setIcon = function (t) {
            return this.el.find("span").removeClass().addClass(this.iconClassOf(t)).text(this.text)
        }, i.prototype.render = function () {
            if (this.wrapper = t(this._tpl.item).appendTo(this.editor.toolbar.list), this.el = this.wrapper.find("a.toolbar-item"), this.el.attr("title", this.title).addClass("toolbar-item-" + this.name).data("button", this), this.setIcon(this.icon), this.menu) return this.menuWrapper = t(this._tpl.menuWrapper).appendTo(this.wrapper), this.menuWrapper.addClass("toolbar-menu-" + this.name), this.renderMenu()
        }, i.prototype.renderMenu = function () {
            var e, i, n, r, o, s, a, l;
            if (t.isArray(this.menu)) {
                for (this.menuEl = t("<ul/>").appendTo(this.menuWrapper), s = this.menu, l = [], n = 0, r = s.length; n < r; n++) o = s[n], "|" !== o ? (i = t(this._tpl.menuItem).appendTo(this.menuEl), e = i.find("a.menu-item").attr({
                    title: null != (a = o.title) ? a : o.text,
                    "data-param": o.param
                }).addClass("menu-item-" + o.name), o.icon ? l.push(e.find("span").addClass(this.iconClassOf(o.icon))) : l.push(e.find("span").text(o.text))) : t(this._tpl.separator).appendTo(this.menuEl);
                return l
            }
        }, i.prototype.setActive = function (t) {
            if (t !== this.active) return this.active = t, this.el.toggleClass("active", this.active)
        }, i.prototype.setDisabled = function (t) {
            if (t !== this.disabled) return this.disabled = t, this.el.toggleClass("disabled", this.disabled)
        }, i.prototype._disableStatus = function () {
            var t, e, i;
            return i = this.editor.selection.startNodes(), e = this.editor.selection.endNodes(), t = i.filter(this.disableTag).length > 0 || e.filter(this.disableTag).length > 0, this.setDisabled(t), this.disabled && this.setActive(!1), this.disabled
        }, i.prototype._activeStatus = function () {
            var t, e, i, n, r;
            return r = this.editor.selection.startNodes(), i = this.editor.selection.endNodes(), n = r.filter(this.htmlTag), e = i.filter(this.htmlTag), t = n.length > 0 && e.length > 0 && n.is(e), this.node = t ? n : null, this.setActive(t), this.active
        }, i.prototype._status = function () {
            if (this._disableStatus(), !this.disabled) return this._activeStatus()
        }, i.prototype.command = function (t) {}, i.prototype._t = function () {
            var t, e, n;
            return t = 1 <= arguments.length ? q.call(arguments, 0) : [], n = i.__super__._t.apply(this, t), n || (n = (e = this.editor)._t.apply(e, t)), n
        }, i
    }(e), E.Button = a, S = function (e) {
        function i(t) {
            this.button = t.button, this.editor = t.button.editor, i.__super__.constructor.call(this, t)
        }
        return W(i, e), i.prototype.offset = {
            top: 4,
            left: 0
        }, i.prototype.target = null, i.prototype.active = !1, i.prototype._init = function () {
            return this.el = t('<div class="simditor-popover"></div>').appendTo(this.editor.el).data("popover", this), this.render(), this.el.on("mouseenter", function (t) {
                return function (e) {
                    return t.el.addClass("hover")
                }
            }(this)), this.el.on("mouseleave", function (t) {
                return function (e) {
                    return t.el.removeClass("hover")
                }
            }(this))
        }, i.prototype.render = function () {}, i.prototype._initLabelWidth = function () {
            var e;
            if (e = this.el.find(".settings-field"), e.length > 0) return this._labelWidth = 0, e.each(function (e) {
                return function (i, n) {
                    var r, o;
                    if (r = t(n), o = r.find("label"), o.length > 0) return e._labelWidth = Math.max(e._labelWidth, o.width())
                }
            }(this)), e.find("label").width(this._labelWidth)
        }, i.prototype.show = function (e, i) {
            if (null == i && (i = "bottom"), null != e) return this.el.siblings(".simditor-popover").each(function (e, i) {
                if (i = t(i).data("popover"), i.active) return i.hide()
            }), this.active && this.target && this.target.removeClass("selected"), this.target = e.addClass("selected"), this.active ? (this.refresh(i), this.trigger("popovershow")) : (this.active = !0, this.el.css({
                left: -9999
            }).show(), this._labelWidth || this._initLabelWidth(), this.editor.util.reflow(), this.refresh(i), this.trigger("popovershow"))
        }, i.prototype.hide = function () {
            if (this.active) return this.target && this.target.removeClass("selected"), this.target = null, this.active = !1, this.el.hide(), this.trigger("popoverhide")
        }, i.prototype.refresh = function (t) {
            var e, i, n, r, o, s;
            if (null == t && (t = "bottom"), this.active) return e = this.editor.el.offset(), o = this.target.offset(), r = this.target.outerHeight(), "bottom" === t ? s = o.top - e.top + r : "top" === t && (s = o.top - e.top - this.el.height()), n = this.editor.wrapper.width() - this.el.outerWidth() - 10, i = Math.min(o.left - e.left, n), this.el.css({
                top: s + this.offset.top,
                left: i + this.offset.left
            })
        }, i.prototype.destroy = function () {
            return this.target = null, this.active = !1, this.editor.off(".linkpopover"), this.el.remove()
        }, i.prototype._t = function () {
            var t, e, n;
            return t = 1 <= arguments.length ? q.call(arguments, 0) : [], n = i.__super__._t.apply(this, t), n || (n = (e = this.button)._t.apply(e, t)), n
        }, i
    }(e), E.Popover = S, I = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "title", i.prototype.htmlTag = "h1, h2, h3, h4, h5", i.prototype.disableTag = "pre, table", i.prototype._init = function () {
            return this.menu = [{
                name: "normal",
                text: this._t("normalText"),
                param: "p"
            }, "|", {
                name: "h1",
                text: this._t("title") + " 1",
                param: "h1"
            }, {
                name: "h2",
                text: this._t("title") + " 2",
                param: "h2"
            }, {
                name: "h3",
                text: this._t("title") + " 3",
                param: "h3"
            }, {
                name: "h4",
                text: this._t("title") + " 4",
                param: "h4"
            }, {
                name: "h5",
                text: this._t("title") + " 5",
                param: "h5"
            }], i.__super__._init.call(this)
        }, i.prototype.setActive = function (t, e) {
            if (i.__super__.setActive.call(this, t), t && (e || (e = this.node[0].tagName.toLowerCase())), this.el.removeClass("active-p active-h1 active-h2 active-h3 active-h4 active-h5"), t) return this.el.addClass("active active-" + e)
        }, i.prototype.command = function (e) {
            var i;
            return i = this.editor.selection.rootNodes(), this.editor.selection.save(), i.each(function (i) {
                return function (n, r) {
                    var o;
                    if (o = t(r), !(o.is("blockquote") || o.is(e) || o.is(i.disableTag) || i.editor.util.isDecoratedNode(o))) return t("<" + e + "/>").append(o.contents()).replaceAll(o)
                }
            }(this)), this.editor.selection.restore(), this.editor.trigger("valuechanged")
        }, i
    }(a), E.Toolbar.addButton(I), c = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "fontScale", i.prototype.icon = "font", i.prototype.disableTag = "pre", i.prototype.htmlTag = "span", i.prototype.sizeMap = {
            "x-large": "1.5em",
            large: "1.25em",
            small: ".75em",
            "x-small": ".5em"
        }, i.prototype._init = function () {
            return this.menu = [{
                name: "150%",
                text: this._t("fontScaleXLarge"),
                param: "5"
            }, {
                name: "125%",
                text: this._t("fontScaleLarge"),
                param: "4"
            }, {
                name: "100%",
                text: this._t("fontScaleNormal"),
                param: "3"
            }, {
                name: "75%",
                text: this._t("fontScaleSmall"),
                param: "2"
            }, {
                name: "50%",
                text: this._t("fontScaleXSmall"),
                param: "1"
            }], i.__super__._init.call(this)
        }, i.prototype._activeStatus = function () {
            var t, e, i, n, r, o;
            return n = this.editor.selection.range(), o = this.editor.selection.startNodes(), i = this.editor.selection.endNodes(), r = o.filter('span[style*="font-size"]'), e = i.filter('span[style*="font-size"]'), t = o.length > 0 && i.length > 0 && r.is(e), this.setActive(t), this.active
        }, i.prototype.command = function (e) {
            var i, n, r;
            if (r = this.editor.selection.range(), !r.collapsed) return document.execCommand("styleWithCSS", !1, !0), document.execCommand("fontSize", !1, e), document.execCommand("styleWithCSS", !1, !1), this.editor.selection.reset(), this.editor.selection.range(), n = this.editor.selection.containerNode(), i = n[0].nodeType === Node.TEXT_NODE ? n.closest('span[style*="font-size"]') : n.find('span[style*="font-size"]'), i.each(function (e) {
                return function (i, n) {
                    var r, o;
                    return r = t(n), o = n.style.fontSize, /large|x-large|small|x-small/.test(o) ? r.css("fontSize", e.sizeMap[o]) : "medium" === o ? r.replaceWith(r.contents()) : void 0
                }
            }(this)), this.editor.trigger("valuechanged")
        }, i
    }(a), E.Toolbar.addButton(c), s = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "bold", i.prototype.icon = "bold", i.prototype.htmlTag = "b, strong", i.prototype.disableTag = "pre", i.prototype.shortcut = "cmd+b", i.prototype._init = function () {
            return this.editor.util.os.mac ? this.title = this.title + " ( Cmd + b )" : (this.title = this.title + " ( Ctrl + b )", this.shortcut = "ctrl+b"), i.__super__._init.call(this)
        }, i.prototype._activeStatus = function () {
            var t;
            return t = document.queryCommandState("bold") === !0, this.setActive(t), this.active
        }, i.prototype.command = function () {
            return document.execCommand("bold"), this.editor.util.support.oninput || this.editor.trigger("valuechanged"), t(document).trigger("selectionchange")
        }, i
    }(a), E.Toolbar.addButton(s), b = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "italic", i.prototype.icon = "italic", i.prototype.htmlTag = "i", i.prototype.disableTag = "pre", i.prototype.shortcut = "cmd+i", i.prototype._init = function () {
            return this.editor.util.os.mac ? this.title = this.title + " ( Cmd + i )" : (this.title = this.title + " ( Ctrl + i )", this.shortcut = "ctrl+i"), i.__super__._init.call(this)
        }, i.prototype._activeStatus = function () {
            var t;
            return t = document.queryCommandState("italic") === !0, this.setActive(t), this.active
        }, i.prototype.command = function () {
            return document.execCommand("italic"), this.editor.util.support.oninput || this.editor.trigger("valuechanged"), t(document).trigger("selectionchange")
        }, i
    }(a), E.Toolbar.addButton(b), O = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "underline", i.prototype.icon = "underline", i.prototype.htmlTag = "u", i.prototype.disableTag = "pre", i.prototype.shortcut = "cmd+u", i.prototype.render = function () {
            return this.editor.util.os.mac ? this.title = this.title + " ( Cmd + u )" : (this.title = this.title + " ( Ctrl + u )", this.shortcut = "ctrl+u"), i.__super__.render.call(this)
        }, i.prototype._activeStatus = function () {
            var t;
            return t = document.queryCommandState("underline") === !0, this.setActive(t), this.active
        }, i.prototype.command = function () {
            return document.execCommand("underline"), this.editor.util.support.oninput || this.editor.trigger("valuechanged"), t(document).trigger("selectionchange")
        }, i
    }(a), E.Toolbar.addButton(O), p = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "color", i.prototype.icon = "tint", i.prototype.disableTag = "pre", i.prototype.menu = !0, i.prototype.render = function () {
            var t;
            return t = 1 <= arguments.length ? q.call(arguments, 0) : [], i.__super__.render.apply(this, t)
        }, i.prototype.renderMenu = function () {
            return t('<ul class="color-list">\n  <li><a href="javascript:;" class="font-color font-color-1"></a></li>\n  <li><a href="javascript:;" class="font-color font-color-2"></a></li>\n  <li><a href="javascript:;" class="font-color font-color-3"></a></li>\n  <li><a href="javascript:;" class="font-color font-color-4"></a></li>\n  <li><a href="javascript:;" class="font-color font-color-5"></a></li>\n  <li><a href="javascript:;" class="font-color font-color-6"></a></li>\n  <li><a href="javascript:;" class="font-color font-color-7"></a></li>\n  <li><a href="javascript:;" class="font-color font-color-default"></a></li>\n</ul>').appendTo(this.menuWrapper), this.menuWrapper.on("mousedown", ".color-list", function (t) {
                return !1
            }), this.menuWrapper.on("click", ".font-color", function (e) {
                return function (i) {
                    var n, r, o, s, a, l;
                    if (e.wrapper.removeClass("menu-on"), n = t(i.currentTarget), n.hasClass("font-color-default")) {
                        if (r = e.editor.body.find("p, li"), !(r.length > 0)) return;
                        a = window.getComputedStyle(r[0], null).getPropertyValue("color"), o = e._convertRgbToHex(a)
                    } else a = window.getComputedStyle(n[0], null).getPropertyValue("background-color"), o = e._convertRgbToHex(a);
                    if (o) return s = e.editor.selection.range(), !n.hasClass("font-color-default") && s.collapsed && (l = document.createTextNode(e._t("coloredText")), s.insertNode(l), s.selectNodeContents(l), e.editor.selection.range(s)), document.execCommand("styleWithCSS", !1, !0), document.execCommand("foreColor", !1, o), document.execCommand("styleWithCSS", !1, !1), e.editor.util.support.oninput ? void 0 : e.editor.trigger("valuechanged")
                }
            }(this))
        }, i.prototype._convertRgbToHex = function (t) {
            var e, i, n;
            return i = /rgb\((\d+),\s?(\d+),\s?(\d+)\)/g, (e = i.exec(t)) ? (n = function (t, e, i) {
                var n;
                return n = function (t) {
                    var e;
                    return e = t.toString(16), 1 === e.length ? "0" + e : e
                }, "#" + n(t) + n(e) + n(i)
            })(1 * e[1], 1 * e[2], 1 * e[3]) : ""
        }, i
    }(a), E.Toolbar.addButton(p), k = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.type = "", i.prototype.disableTag = "pre, table", i.prototype.command = function (e) {
            var i, n, r;
            return n = this.editor.selection.blockNodes(), r = "ul" === this.type ? "ol" : "ul", this.editor.selection.save(), i = null, n.each(function (e) {
                return function (n, o) {
                    var s;
                    if (s = t(o), !(s.is("blockquote, li") || s.is(e.disableTag) || e.editor.util.isDecoratedNode(s)) && t.contains(document, o)) return s.is(e.type) ? (s.children("li").each(function (i, n) {
                        var r, o;
                        return o = t(n), r = o.children("ul, ol").insertAfter(s), t("<p/>").append(t(n).html() || e.editor.util.phBr).insertBefore(s)
                    }), s.remove()) : s.is(r) ? t("<" + e.type + "/>").append(s.contents()).replaceAll(s) : i && s.prev().is(i) ? (t("<li/>").append(s.html() || e.editor.util.phBr).appendTo(i), s.remove()) : (i = t("<" + e.type + "><li></li></" + e.type + ">"), i.find("li").append(s.html() || e.editor.util.phBr), i.replaceAll(s))
                }
            }(this)), this.editor.selection.restore(), this.editor.trigger("valuechanged")
        }, i
    }(a), T = function (t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return W(e, t), e.prototype.type = "ol", e.prototype.name = "ol", e.prototype.icon = "list-ol", e.prototype.htmlTag = "ol", e.prototype.shortcut = "cmd+/", e.prototype._init = function () {
            return this.editor.util.os.mac ? this.title = this.title + " ( Cmd + / )" : (this.title = this.title + " ( ctrl + / )", this.shortcut = "ctrl+/"), e.__super__._init.call(this)
        }, e
    }(k), L = function (t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return W(e, t), e.prototype.type = "ul", e.prototype.name = "ul", e.prototype.icon = "list-ul", e.prototype.htmlTag = "ul", e.prototype.shortcut = "cmd+.", e.prototype._init = function () {
            return this.editor.util.os.mac ? this.title = this.title + " ( Cmd + . )" : (this.title = this.title + " ( Ctrl + . )", this.shortcut = "ctrl+."), e.__super__._init.call(this)
        }, e
    }(k), E.Toolbar.addButton(T), E.Toolbar.addButton(L), o = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "blockquote", i.prototype.icon = "quote-left", i.prototype.htmlTag = "blockquote", i.prototype.disableTag = "pre, table", i.prototype.command = function () {
            var e, i, n;
            return e = this.editor.selection.rootNodes(), e = e.filter(function (e, i) {
                return !t(i).parent().is("blockquote")
            }), this.editor.selection.save(), n = [], i = function (e) {
                return function () {
                    if (n.length > 0) return t("<" + e.htmlTag + "/>").insertBefore(n[0]).append(n), n.length = 0
                }
            }(this), e.each(function (e) {
                return function (r, o) {
                    var s;
                    if (s = t(o), s.parent().is(e.editor.body)) return s.is(e.htmlTag) ? (i(), s.children().unwrap()) : s.is(e.disableTag) || e.editor.util.isDecoratedNode(s) ? i() : n.push(o)
                }
            }(this)), i(), this.editor.selection.restore(), this.editor.trigger("valuechanged")
        }, i
    }(a), E.Toolbar.addButton(o), d = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "code", i.prototype.icon = "code", i.prototype.htmlTag = "pre", i.prototype.disableTag = "ul, ol, table", i.prototype._init = function () {
            return i.__super__._init.call(this), this.editor.on("decorate", function (e) {
                return function (i, n) {
                    return n.find("pre").each(function (i, n) {
                        return e.decorate(t(n))
                    })
                }
            }(this)), this.editor.on("undecorate", function (e) {
                return function (i, n) {
                    return n.find("pre").each(function (i, n) {
                        return e.undecorate(t(n))
                    })
                }
            }(this))
        }, i.prototype.render = function () {
            var t;
            return t = 1 <= arguments.length ? q.call(arguments, 0) : [], i.__super__.render.apply(this, t), this.popover = new u({
                button: this
            })
        }, i.prototype._checkMode = function () {
            var e, i;
            return i = this.editor.selection.range(), (e = t(i.cloneContents()).find(this.editor.util.blockNodes.join(","))) > 0 || i.collapsed && 0 === this.editor.selection.startNodes().filter("code").length ? (this.inlineMode = !1, this.htmlTag = "pre") : (this.inlineMode = !0, this.htmlTag = "code")
        }, i.prototype._status = function () {
            if (this._checkMode(), i.__super__._status.call(this), !this.inlineMode) return this.active ? this.popover.show(this.node) : this.popover.hide()
        }, i.prototype.decorate = function (t) {
            var e, i, n, r;
            if (e = t.find("> code"), e.length > 0 && (i = null != (n = e.attr("class")) && null != (r = n.match(/lang-(\S+)/)) ? r[1] : void 0, e.contents().unwrap(), i)) return t.attr("data-lang", i)
        }, i.prototype.undecorate = function (e) {
            var i, n;
            return n = e.attr("data-lang"), i = t("<code/>"), n && n !== -1 && i.addClass("lang-" + n), e.wrapInner(i).removeAttr("data-lang")
        }, i.prototype.command = function () {
            return this.inlineMode ? this._inlineCommand() : this._blockCommand()
        }, i.prototype._blockCommand = function () {
            var e, i, n, r;
            return e = this.editor.selection.rootNodes(), n = [], r = [], i = function (e) {
                return function () {
                    var i;
                    if (n.length > 0) return i = t("<" + e.htmlTag + "/>").insertBefore(n[0]).text(e.editor.formatter.clearHtml(n)), r.push(i[0]), n.length = 0
                }
            }(this), e.each(function (e) {
                return function (o, s) {
                    var a, l;
                    return a = t(s), a.is(e.htmlTag) ? (i(), l = t("<p/>").append(a.html().replace("\n", "<br/>")).replaceAll(a), r.push(l[0])) : a.is(e.disableTag) || e.editor.util.isDecoratedNode(a) || a.is("blockquote") ? i() : n.push(s)
                }
            }(this)), i(), this.editor.selection.setRangeAtEndOf(t(r).last()), this.editor.trigger("valuechanged")
        }, i.prototype._inlineCommand = function () {
            var e, i, n;
            return n = this.editor.selection.range(), this.active ? (n.selectNodeContents(this.node[0]), this.editor.selection.save(n), this.node.contents().unwrap(), this.editor.selection.restore()) : (i = t(n.extractContents()), e = t("<" + this.htmlTag + "/>").append(i.contents()), n.insertNode(e[0]), n.selectNodeContents(e[0]), this.editor.selection.range(n)), this.editor.trigger("valuechanged")
        }, i
    }(a), u = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.render = function () {
            var e, i, n, r, o;
            for (this._tpl = '<div class="code-settings">\n  <div class="settings-field">\n    <select class="select-lang">\n      <option value="-1">' + this._t("selectLanguage") + "</option>\n    </select>\n  </div>\n</div>", this.langs = this.editor.opts.codeLanguages || [{
                    name: "Bash",
                    value: "bash"
                }, {
                    name: "C++",
                    value: "c++"
                }, {
                    name: "C#",
                    value: "cs"
                }, {
                    name: "CSS",
                    value: "css"
                }, {
                    name: "Erlang",
                    value: "erlang"
                }, {
                    name: "Less",
                    value: "less"
                }, {
                    name: "Sass",
                    value: "sass"
                }, {
                    name: "Diff",
                    value: "diff"
                }, {
                    name: "CoffeeScript",
                    value: "coffeescript"
                }, {
                    name: "HTML,XML",
                    value: "html"
                }, {
                    name: "JSON",
                    value: "json"
                }, {
                    name: "Java",
                    value: "java"
                }, {
                    name: "JavaScript",
                    value: "js"
                }, {
                    name: "Markdown",
                    value: "markdown"
                }, {
                    name: "Objective C",
                    value: "oc"
                }, {
                    name: "PHP",
                    value: "php"
                }, {
                    name: "Perl",
                    value: "parl"
                }, {
                    name: "Python",
                    value: "python"
                }, {
                    name: "Ruby",
                    value: "ruby"
                }, {
                    name: "SQL",
                    value: "sql"
                }], this.el.addClass("code-popover").append(this._tpl), this.selectEl = this.el.find(".select-lang"), o = this.langs, i = 0, r = o.length; i < r; i++) n = o[i], e = t("<option/>", {
                text: n.name,
                value: n.value
            }).appendTo(this.selectEl);
            return this.selectEl.on("change", function (t) {
                return function (e) {
                    var i;
                    return t.lang = t.selectEl.val(), i = t.target.hasClass("selected"), t.target.removeClass().removeAttr("data-lang"), t.lang !== -1 && t.target.attr("data-lang", t.lang), i && t.target.addClass("selected"), t.editor.trigger("valuechanged")
                }
            }(this)), this.editor.on("valuechanged", function (t) {
                return function (e) {
                    if (t.active) return t.refresh()
                }
            }(this))
        }, i.prototype.show = function () {
            var t;
            return t = 1 <= arguments.length ? q.call(arguments, 0) : [], i.__super__.show.apply(this, t), this.lang = this.target.attr("data-lang"), null != this.lang ? this.selectEl.val(this.lang) : this.selectEl.val(-1)
        }, i
    }(S), E.Toolbar.addButton(d), x = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "link", i.prototype.icon = "link", i.prototype.htmlTag = "a", i.prototype.disableTag = "pre", i.prototype.render = function () {
            var t;
            return t = 1 <= arguments.length ? q.call(arguments, 0) : [], i.__super__.render.apply(this, t), this.popover = new C({
                button: this
            })
        }, i.prototype._status = function () {
            return i.__super__._status.call(this), this.active && !this.editor.selection.rangeAtEndOf(this.node) ? this.popover.show(this.node) : this.popover.hide()
        }, i.prototype.command = function () {
            var e, i, n, r, o, s;
            return o = this.editor.selection.range(), this.active ? (s = document.createTextNode(this.node.text()), this.node.replaceWith(s), o.selectNode(s)) : (e = t(o.extractContents()), r = this.editor.formatter.clearHtml(e.contents(), !1), i = t("<a/>", {
                href: "http://www.example.com",
                target: "_blank",
                text: r || this._t("linkText")
            }), this.editor.selection.blockNodes().length > 0 ? o.insertNode(i[0]) : (n = t("<p/>").append(i), o.insertNode(n[0])), o.selectNodeContents(i[0]), this.popover.one("popovershow", function (t) {
                return function () {
                    return r ? (t.popover.urlEl.focus(), t.popover.urlEl[0].select()) : (t.popover.textEl.focus(), t.popover.textEl[0].select())
                }
            }(this))), this.editor.selection.range(o), this.editor.trigger("valuechanged")
        }, i
    }(a), C = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.render = function () {
            var e;
            return e = '<div class="link-settings">\n  <div class="settings-field">\n    <label>' + this._t("linkText") + '</label>\n    <input class="link-text" type="text"/>\n    <a class="btn-unlink" href="javascript:;" title="' + this._t("removeLink") + '"\n      tabindex="-1">\n      <span class="simditor-icon simditor-icon-unlink"></span>\n    </a>\n  </div>\n  <div class="settings-field">\n    <label>' + this._t("linkUrl") + '</label>\n    <input class="link-url" type="text"/>\n  </div>\n  <div class="settings-field">\n    <label>' + this._t("linkTarget") + '</label>\n    <select class="link-target">\n      <option value="_blank">' + this._t("openLinkInNewWindow") + ' (_blank)</option>\n      <option value="_self">' + this._t("openLinkInCurrentWindow") + " (_self)</option>\n    </select>\n  </div>\n</div>", this.el.addClass("link-popover").append(e), this.textEl = this.el.find(".link-text"), this.urlEl = this.el.find(".link-url"), this.unlinkEl = this.el.find(".btn-unlink"), this.selectTarget = this.el.find(".link-target"), this.textEl.on("keyup", function (t) {
                return function (e) {
                    if (13 !== e.which) return t.target.text(t.textEl.val()), t.editor.inputManager.throttledValueChanged()
                }
            }(this)), this.urlEl.on("keyup", function (t) {
                return function (e) {
                    var i;
                    if (13 !== e.which) return i = t.urlEl.val(), !/https?:\/\/|^\//gi.test(i) && i && (i = "http://" + i), t.target.attr("href", i), t.editor.inputManager.throttledValueChanged()
                }
            }(this)), t([this.urlEl[0], this.textEl[0]]).on("keydown", function (e) {
                return function (i) {
                    var n;
                    if (13 === i.which || 27 === i.which || !i.shiftKey && 9 === i.which && t(i.target).hasClass("link-url")) return i.preventDefault(), n = document.createRange(), e.editor.selection.setRangeAfter(e.target, n), e.hide(), e.editor.inputManager.throttledValueChanged()
                }
            }(this)), this.unlinkEl.on("click", function (t) {
                return function (e) {
                    var i, n;
                    return n = document.createTextNode(t.target.text()), t.target.replaceWith(n), t.hide(), i = document.createRange(), t.editor.selection.setRangeAfter(n, i), t.editor.inputManager.throttledValueChanged()
                }
            }(this)), this.selectTarget.on("change", function (t) {
                return function (e) {
                    return t.target.attr("target", t.selectTarget.val()), t.editor.inputManager.throttledValueChanged()
                }
            }(this))
        }, i.prototype.show = function () {
            var t;
            return t = 1 <= arguments.length ? q.call(arguments, 0) : [], i.__super__.show.apply(this, t), this.textEl.val(this.target.text()), this.urlEl.val(this.target.attr("href"))
        }, i
    }(S), E.Toolbar.addButton(x), g = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "image", i.prototype.icon = "picture-o", i.prototype.htmlTag = "img", i.prototype.disableTag = "pre, table", i.prototype.defaultImage = "", i.prototype.needFocus = !1, i.prototype._init = function () {
            var e, n, r, o;
            if (this.editor.opts.imageButton)
                if (Array.isArray(this.editor.opts.imageButton))
                    for (this.menu = [], o = this.editor.opts.imageButton, n = 0, r = o.length; n < r; n++) e = o[n], this.menu.push({
                        name: e + "-image",
                        text: this._t(e + "Image")
                    });
                else this.menu = !1;
            else null != this.editor.uploader ? this.menu = [{
                name: "upload-image",
                text: this._t("uploadImage")
            }, {
                name: "external-image",
                text: this._t("externalImage")
            }] : this.menu = !1;
            return this.defaultImage = this.editor.opts.defaultImage, this.editor.body.on("click", "img:not([data-non-image])", function (e) {
                return function (i) {
                    var n, r;
                    return n = t(i.currentTarget), r = document.createRange(), r.selectNode(n[0]), e.editor.selection.range(r), e.editor.util.support.onselectionchange || e.editor.trigger("selectionchanged"), !1
                }
            }(this)), this.editor.body.on("mouseup", "img:not([data-non-image])", function (t) {
                return !1
            }), this.editor.on("selectionchanged.image", function (e) {
                return function () {
                    var i, n, r;
                    if (r = e.editor.selection.range(), null != r) return i = t(r.cloneContents()).contents(), 1 === i.length && i.is("img:not([data-non-image])") ? (n = t(r.startContainer).contents().eq(r.startOffset), e.popover.show(n)) : e.popover.hide()
                }
            }(this)), this.editor.on("valuechanged.image", function (e) {
                return function () {
                    var i;
                    if (i = e.editor.wrapper.find(".simditor-image-loading"), i.length > 0) return i.each(function (i, n) {
                        var r, o, s;
                        if (o = t(n), r = o.data("img"), !(r && r.parent().length > 0) && (o.remove(), r && (s = r.data("file"), s && (e.editor.uploader.cancel(s), e.editor.body.find("img.uploading").length < 1)))) return e.editor.uploader.trigger("uploadready", [s])
                    })
                }
            }(this)), i.__super__._init.call(this)
        }, i.prototype.render = function () {
            var t;
            if (t = 1 <= arguments.length ? q.call(arguments, 0) : [], i.__super__.render.apply(this, t), this.popover = new m({
                    button: this
                }), "upload" === this.editor.opts.imageButton) return this._initUploader(this.el)
        }, i.prototype.renderMenu = function () {
            return i.__super__.renderMenu.call(this), this._initUploader()
        }, i.prototype._initUploader = function (e) {
            var i, n, r;
            return null == e && (e = this.menuEl.find(".menu-item-upload-image")), null == this.editor.uploader ? void this.el.find(".btn-upload").remove() : (i = null, n = function (n) {
                return function () {
                    return i && i.remove(), i = t("<input/>", {
                        type: "file",
                        title: n._t("uploadImage"),
                        multiple: !0,
                        accept: "image/*"
                    }).appendTo(e)
                }
            }(this), n(), e.on("click mousedown", "input[type=file]", function (t) {
                return t.stopPropagation()
            }), e.on("change", "input[type=file]", function (t) {
                return function (e) {
                    return t.editor.inputManager.focused ? (t.editor.uploader.upload(i, {
                        inline: !0
                    }), n()) : (t.editor.one("focus", function (e) {
                        return t.editor.uploader.upload(i, {
                            inline: !0
                        }), n()
                    }), t.editor.focus()), t.wrapper.removeClass("menu-on")
                }
            }(this)), this.editor.uploader.on("beforeupload", function (e) {
                return function (i, n) {
                    var r;
                    if (n.inline) return n.img ? r = t(n.img) : (r = e.createImage(n.name), n.img = r), r.addClass("uploading"), r.data("file", n), e.editor.uploader.readImageFile(n.obj, function (t) {
                        var i;
                        if (r.hasClass("uploading")) return i = t ? t.src : e.defaultImage, e.loadImage(r, i, function () {
                            if (e.popover.active) return e.popover.refresh(), e.popover.srcEl.val(e._t("uploading")).prop("disabled", !0)
                        })
                    })
                }
            }(this)), r = t.proxy(this.editor.util.throttle(function (t, e, i, n) {
                var r, o, s;
                if (e.inline && (o = e.img.data("mask"))) return r = o.data("img"), r.hasClass("uploading") && r.parent().length > 0 ? (s = i / n, s = (100 * s).toFixed(0), s > 99 && (s = 99), o.find(".progress").height(100 - s + "%")) : void o.remove()
            }, 500), this), this.editor.uploader.on("uploadprogress", r), this.editor.uploader.on("uploadsuccess", function (e) {
                return function (i, n, r) {
                    var o, s, a;
                    if (n.inline && (o = n.img, o.hasClass("uploading") && o.parent().length > 0)) {
                        if ("object" != typeof r) try {
                            r = t.parseJSON(r)
                        } catch (l) {
                            i = l, r = {
                                success: !1
                            }
                        }
                        return r.success === !1 ? (a = r.msg || e._t("uploadFailed"), alert(a), o.attr("src", e.defaultImage), s = e.defaultImage) : (o.attr("src", r["x:file_path"]), s = r["x:file_path"]), e.loadImage(o, s, function () {
                            var t;
                            if (o.removeData("file"), o.removeClass("uploading").removeClass("loading"), t = o.data("mask"), t && t.remove(), o.removeData("mask"), e.editor.trigger("valuechanged"), e.editor.body.find("img.uploading").length < 1) return e.editor.uploader.trigger("uploadready", [n, r])
                        }), e.popover.active ? (e.popover.srcEl.prop("disabled", !1), e.popover.srcEl.val(r["x:file_path"])) : void 0
                    }
                }
            }(this)), this.editor.uploader.on("uploaderror", function (e) {
                return function (i, n, r) {
                    var o, s, a;
                    if (n.inline && "abort" !== r.statusText) {
                        if (r.responseText) {
                            try {
                                a = t.parseJSON(r.responseText), s = a.msg
                            } catch (l) {
                                i = l, s = e._t("uploadError")
                            }
                            alert(s)
                        }
                        if (o = n.img, o.hasClass("uploading") && o.parent().length > 0) return e.loadImage(o, e.defaultImage, function () {
                            var t;
                            return o.removeData("file"), o.removeClass("uploading").removeClass("loading"), t = o.data("mask"), t && t.remove(), o.removeData("mask")
                        }), e.popover.active && (e.popover.srcEl.prop("disabled", !1), e.popover.srcEl.val(e.defaultImage)), e.editor.trigger("valuechanged"), e.editor.body.find("img.uploading").length < 1 ? e.editor.uploader.trigger("uploadready", [n, a]) : void 0
                    }
                }
            }(this)))
        }, i.prototype._status = function () {
            return this._disableStatus()
        }, i.prototype.loadImage = function (e, i, n) {
            var r, o, s;
            return s = function (t) {
                return function () {
                    var i, n;
                    return i = e.offset(), n = t.editor.wrapper.offset(), r.css({
                        top: i.top - n.top,
                        left: i.left - n.left,
                        width: e.width(),
                        height: e.height()
                    }).show()
                }
            }(this), e.addClass("loading"), r = e.data("mask"), r || (r = t('<div class="simditor-image-loading">\n  <div class="progress"></div>\n</div>').hide().appendTo(this.editor.wrapper), s(), e.data("mask", r), r.data("img", e)), o = new Image, o.onload = function (a) {
                return function () {
                    var l, d;
                    if (e.hasClass("loading") || e.hasClass("uploading")) return d = o.width, l = o.height, e.attr({
                        src: i,
                        width: d,
                        height: l,
                        "data-image-size": d + "," + l
                    }).removeClass("loading"), e.hasClass("uploading") ? (a.editor.util.reflow(a.editor.body), s()) : (r.remove(), e.removeData("mask")), t.isFunction(n) ? n(o) : void 0
                }
            }(this), o.onerror = function (i) {
                return t.isFunction(n) && n(!1), r.remove(), e.removeData("mask").removeClass("loading")
            }, o.src = i
        }, i.prototype.createImage = function (e) {
            var i, n;
            return null == e && (e = "Image"), this.editor.inputManager.focused || this.editor.focus(), n = this.editor.selection.range(), n.deleteContents(), this.editor.selection.range(n), i = t("<img/>").attr("alt", e), n.insertNode(i[0]), this.editor.selection.setRangeAfter(i, n), this.editor.trigger("valuechanged"), i
        }, i.prototype.command = function (t) {
            var e;
            return e = this.createImage(), this.loadImage(e, t || this.defaultImage, function (t) {
                return function () {
                    return t.editor.trigger("valuechanged"), t.editor.util.reflow(e), e.click(), t.popover.one("popovershow", function () {
                        return t.popover.srcEl.focus(), t.popover.srcEl[0].select()
                    })
                }
            }(this))
        }, i
    }(a), m = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.offset = {
            top: 6,
            left: -4
        }, i.prototype.render = function () {
            var e;
            return e = '<div class="link-settings">\n  <div class="settings-field">\n    <label>' + this._t("imageUrl") + '</label>\n    <input class="image-src" type="text" tabindex="1" />\n    <a class="btn-upload" href="javascript:;"\n      title="' + this._t("uploadImage") + '" tabindex="-1">\n      <span class="simditor-icon simditor-icon-upload"></span>\n    </a>\n  </div>\n  <div class=\'settings-field\'>\n    <label>' + this._t("imageAlt") + '</label>\n    <input class="image-alt" id="image-alt" type="text" tabindex="1" />\n  </div>\n  <div class="settings-field">\n    <label>' + this._t("imageSize") + '</label>\n    <input class="image-size" id="image-width" type="text" tabindex="2" />\n    <span class="times">×</span>\n    <input class="image-size" id="image-height" type="text" tabindex="3" />\n    <a class="btn-restore" href="javascript:;"\n      title="' + this._t("restoreImageSize") + '" tabindex="-1">\n      <span class="simditor-icon simditor-icon-undo"></span>\n    </a>\n  </div>\n</div>', this.el.addClass("image-popover").append(e), this.srcEl = this.el.find(".image-src"), this.widthEl = this.el.find("#image-width"), this.heightEl = this.el.find("#image-height"), this.altEl = this.el.find("#image-alt"), this.srcEl.on("keydown", function (t) {
                return function (e) {
                    var i;
                    if (13 === e.which && !t.target.hasClass("uploading")) return e.preventDefault(), i = document.createRange(), t.button.editor.selection.setRangeAfter(t.target, i), t.hide()
                }
            }(this)), this.srcEl.on("blur", function (t) {
                return function (e) {
                    return t._loadImage(t.srcEl.val())
                }
            }(this)), this.el.find(".image-size").on("blur", function (e) {
                return function (i) {
                    return e._resizeImg(t(i.currentTarget)), e.el.data("popover").refresh()
                }
            }(this)), this.el.find(".image-size").on("keyup", function (e) {
                return function (i) {
                    var n;
                    if (n = t(i.currentTarget), 13 !== i.which && 27 !== i.which && 9 !== i.which) return e._resizeImg(n, !0)
                }
            }(this)), this.el.find(".image-size").on("keydown", function (e) {
                return function (i) {
                    var n, r, o;
                    return r = t(i.currentTarget), 13 === i.which || 27 === i.which ? (i.preventDefault(), 13 === i.which ? e._resizeImg(r) : e._restoreImg(), n = e.target, e.hide(), o = document.createRange(), e.button.editor.selection.setRangeAfter(n, o)) : 9 === i.which ? e.el.data("popover").refresh() : void 0
                }
            }(this)), this.altEl.on("keydown", function (t) {
                return function (e) {
                    var i;
                    if (13 === e.which) return e.preventDefault(), i = document.createRange(), t.button.editor.selection.setRangeAfter(t.target, i), t.hide()
                }
            }(this)), this.altEl.on("keyup", function (t) {
                return function (e) {
                    if (13 !== e.which && 27 !== e.which && 9 !== e.which) return t.alt = t.altEl.val(), t.target.attr("alt", t.alt)
                }
            }(this)), this.el.find(".btn-restore").on("click", function (t) {
                return function (e) {
                    return t._restoreImg(), t.el.data("popover").refresh()
                }
            }(this)), this.editor.on("valuechanged", function (t) {
                return function (e) {
                    if (t.active) return t.refresh()
                }
            }(this)), this._initUploader()
        }, i.prototype._initUploader = function () {
            var e, i;
            return e = this.el.find(".btn-upload"), null == this.editor.uploader ? void e.remove() : (i = function (i) {
                return function () {
                    return i.input && i.input.remove(), i.input = t("<input/>", {
                        type: "file",
                        title: i._t("uploadImage"),
                        multiple: !0,
                        accept: "image/*"
                    }).appendTo(e)
                }
            }(this), i(), this.el.on("click mousedown", "input[type=file]", function (t) {
                return t.stopPropagation()
            }), this.el.on("change", "input[type=file]", function (t) {
                return function (e) {
                    return t.editor.uploader.upload(t.input, {
                        inline: !0,
                        img: t.target
                    }), i()
                }
            }(this)))
        }, i.prototype._resizeImg = function (e, i) {
            var n, r, o;
            if (null == i && (i = !1), r = 1 * e.val(), this.target && (t.isNumeric(r) || r < 0)) return e.is(this.widthEl) ? (o = r, n = this.height * r / this.width, this.heightEl.val(n)) : (n = r, o = this.width * r / this.height, this.widthEl.val(o)), i ? void 0 : (this.target.attr({
                width: o,
                height: n
            }), this.editor.trigger("valuechanged"))
        }, i.prototype._restoreImg = function () {
            var t, e;
            return e = (null != (t = this.target.data("image-size")) ? t.split(",") : void 0) || [this.width, this.height], this.target.attr({
                width: 1 * e[0],
                height: 1 * e[1]
            }), this.widthEl.val(e[0]), this.heightEl.val(e[1]), this.editor.trigger("valuechanged")
        }, i.prototype._loadImage = function (t, e) {
            if (/^data:image/.test(t) && !this.editor.uploader) return void(e && e(!1));
            if (this.target.attr("src") !== t) return this.button.loadImage(this.target, t, function (i) {
                return function (n) {
                    var r;
                    if (n) return i.active && (i.width = n.width, i.height = n.height, i.widthEl.val(i.width), i.heightEl.val(i.height)), /^data:image/.test(t) ? (r = i.editor.util.dataURLtoBlob(t), r.name = "Base64 Image.png", i.editor.uploader.upload(r, {
                        inline: !0,
                        img: i.target
                    })) : i.editor.trigger("valuechanged"), e ? e(n) : void 0
                }
            }(this))
        }, i.prototype.show = function () {
            var t, e;
            return e = 1 <= arguments.length ? q.call(arguments, 0) : [], i.__super__.show.apply(this, e), t = this.target, this.width = t.width(), this.height = t.height(), this.alt = t.attr("alt"), t.hasClass("uploading") ? this.srcEl.val(this._t("uploading")).prop("disabled", !0) : (this.srcEl.val(t.attr("src")).prop("disabled", !1), this.widthEl.val(this.width), this.heightEl.val(this.height), this.altEl.val(this.alt))
        }, i
    }(S), E.Toolbar.addButton(g), y = function (t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return W(e, t), e.prototype.name = "indent",
            e.prototype.icon = "indent", e.prototype._init = function () {
                return this.title = this._t(this.name) + " (Tab)", e.__super__._init.call(this)
            }, e.prototype._status = function () {}, e.prototype.command = function () {
                return this.editor.indentation.indent()
            }, e
    }(a), E.Toolbar.addButton(y), N = function (t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return W(e, t), e.prototype.name = "outdent", e.prototype.icon = "outdent", e.prototype._init = function () {
            return this.title = this._t(this.name) + " (Shift + Tab)", e.__super__._init.call(this)
        }, e.prototype._status = function () {}, e.prototype.command = function () {
            return this.editor.indentation.indent(!0)
        }, e
    }(a), E.Toolbar.addButton(N), f = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "hr", i.prototype.icon = "minus", i.prototype.htmlTag = "hr", i.prototype._status = function () {}, i.prototype.command = function () {
            var e, i, n, r;
            return r = this.editor.selection.rootNodes().first(), n = r.next(), n.length > 0 ? this.editor.selection.save() : i = t("<p/>").append(this.editor.util.phBr), e = t("<hr/>").insertAfter(r), i ? (i.insertAfter(e), this.editor.selection.setRangeAtStartOf(i)) : this.editor.selection.restore(), this.editor.trigger("valuechanged")
        }, i
    }(a), E.Toolbar.addButton(f), R = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "table", i.prototype.icon = "table", i.prototype.htmlTag = "table", i.prototype.disableTag = "pre, li, blockquote", i.prototype.menu = !0, i.prototype._init = function () {
            return i.__super__._init.call(this), t.merge(this.editor.formatter._allowedTags, ["thead", "th", "tbody", "tr", "td", "colgroup", "col"]), t.extend(this.editor.formatter._allowedAttributes, {
                td: ["rowspan", "colspan"],
                col: ["width"]
            }), t.extend(this.editor.formatter._allowedStyles, {
                td: ["text-align"],
                th: ["text-align"]
            }), this._initShortcuts(), this.editor.on("decorate", function (e) {
                return function (i, n) {
                    return n.find("table").each(function (i, n) {
                        return e.decorate(t(n))
                    })
                }
            }(this)), this.editor.on("undecorate", function (e) {
                return function (i, n) {
                    return n.find("table").each(function (i, n) {
                        return e.undecorate(t(n))
                    })
                }
            }(this)), this.editor.on("selectionchanged.table", function (t) {
                return function (e) {
                    var i, n;
                    if (t.editor.body.find(".simditor-table td, .simditor-table th").removeClass("active"), n = t.editor.selection.range()) return i = t.editor.selection.containerNode(), n.collapsed && i.is(".simditor-table") && (i = t.editor.selection.rangeAtStartOf(i) ? i.find("th:first") : i.find("td:last"), t.editor.selection.setRangeAtEndOf(i)), i.closest("td, th", t.editor.body).addClass("active")
                }
            }(this)), this.editor.on("blur.table", function (t) {
                return function (e) {
                    return t.editor.body.find(".simditor-table td, .simditor-table th").removeClass("active")
                }
            }(this)), this.editor.keystroke.add("up", "td", function (t) {
                return function (e, i) {
                    return t._tdNav(i, "up"), !0
                }
            }(this)), this.editor.keystroke.add("up", "th", function (t) {
                return function (e, i) {
                    return t._tdNav(i, "up"), !0
                }
            }(this)), this.editor.keystroke.add("down", "td", function (t) {
                return function (e, i) {
                    return t._tdNav(i, "down"), !0
                }
            }(this)), this.editor.keystroke.add("down", "th", function (t) {
                return function (e, i) {
                    return t._tdNav(i, "down"), !0
                }
            }(this))
        }, i.prototype._tdNav = function (t, e) {
            var i, n, r, o, s, a, l;
            return null == e && (e = "up"), r = "up" === e ? "prev" : "next", l = "up" === e ? ["tbody", "thead"] : ["thead", "tbody"], a = l[0], o = l[1], n = t.parent("tr"), i = this["_" + r + "Row"](n), !(i.length > 0) || (s = n.find("td, th").index(t), this.editor.selection.setRangeAtEndOf(i.find("td, th").eq(s)))
        }, i.prototype._nextRow = function (t) {
            var e;
            return e = t.next("tr"), e.length < 1 && t.parent("thead").length > 0 && (e = t.parent("thead").next("tbody").find("tr:first")), e
        }, i.prototype._prevRow = function (t) {
            var e;
            return e = t.prev("tr"), e.length < 1 && t.parent("tbody").length > 0 && (e = t.parent("tbody").prev("thead").find("tr")), e
        }, i.prototype.initResize = function (e) {
            var i, n, r;
            return r = e.parent(".simditor-table"), i = e.find("colgroup"), i.length < 1 && (i = t("<colgroup/>").prependTo(e), e.find("thead tr th").each(function (e, n) {
                var r;
                return r = t("<col/>").appendTo(i)
            }), this.refreshTableWidth(e)), n = t("<div />", {
                "class": "simditor-resize-handle",
                contenteditable: "false"
            }).appendTo(r), r.on("mousemove", "td, th", function (e) {
                var o, s, a, l, d, u;
                if (!r.hasClass("resizing")) return s = t(e.currentTarget), u = e.pageX - t(e.currentTarget).offset().left, u < 5 && s.prev().length > 0 && (s = s.prev()), s.next("td, th").length < 1 ? void n.hide() : (null != (l = n.data("td")) ? l.is(s) : void 0) ? void n.show() : (a = s.parent().find("td, th").index(s), o = i.find("col").eq(a), (null != (d = n.data("col")) ? d.is(o) : void 0) ? void n.show() : n.css("left", s.position().left + s.outerWidth() - 5).data("td", s).data("col", o).show())
            }), r.on("mouseleave", function (t) {
                return n.hide()
            }), r.on("mousedown", ".simditor-resize-handle", function (e) {
                var i, n, o, s, a, l, d, u, p, c, h;
                return i = t(e.currentTarget), o = i.data("td"), n = i.data("col"), a = o.next("td, th"), s = n.next("col"), c = e.pageX, u = 1 * o.outerWidth(), p = 1 * a.outerWidth(), d = parseFloat(i.css("left")), h = o.closest("table").width(), l = 50, t(document).on("mousemove.simditor-resize-table", function (t) {
                    var e, r, o;
                    return e = t.pageX - c, r = u + e, o = p - e, r < l ? (r = l, e = l - u, o = p - e) : o < l && (o = l, e = p - l, r = u + e), n.attr("width", r / h * 100 + "%"), s.attr("width", o / h * 100 + "%"), i.css("left", d + e)
                }), t(document).one("mouseup.simditor-resize-table", function (e) {
                    return t(document).off(".simditor-resize-table"), r.removeClass("resizing")
                }), r.addClass("resizing"), !1
            })
        }, i.prototype._initShortcuts = function () {
            return this.editor.hotkeys.add("ctrl+alt+up", function (t) {
                return function (e) {
                    return t.editMenu.find(".menu-item[data-param=insertRowAbove]").click(), !1
                }
            }(this)), this.editor.hotkeys.add("ctrl+alt+down", function (t) {
                return function (e) {
                    return t.editMenu.find(".menu-item[data-param=insertRowBelow]").click(), !1
                }
            }(this)), this.editor.hotkeys.add("ctrl+alt+left", function (t) {
                return function (e) {
                    return t.editMenu.find(".menu-item[data-param=insertColLeft]").click(), !1
                }
            }(this)), this.editor.hotkeys.add("ctrl+alt+right", function (t) {
                return function (e) {
                    return t.editMenu.find(".menu-item[data-param=insertColRight]").click(), !1
                }
            }(this))
        }, i.prototype.decorate = function (e) {
            var i, n, r;
            return e.parent(".simditor-table").length > 0 && this.undecorate(e), e.wrap('<div class="simditor-table"></div>'), e.find("thead").length < 1 && (r = t("<thead />"), i = e.find("tr").first(), r.append(i), this._changeCellTag(i, "th"), n = e.find("tbody"), n.length > 0 ? n.before(r) : e.prepend(r)), this.initResize(e), e.parent()
        }, i.prototype.undecorate = function (t) {
            if (t.parent(".simditor-table").length > 0) return t.parent().replaceWith(t)
        }, i.prototype.renderMenu = function () {
            var e;
            return t('<div class="menu-create-table">\n</div>\n<div class="menu-edit-table">\n  <ul>\n    <li>\n      <a tabindex="-1" unselectable="on" class="menu-item"\n        href="javascript:;" data-param="deleteRow">\n        <span>' + this._t("deleteRow") + '</span>\n      </a>\n    </li>\n    <li>\n      <a tabindex="-1" unselectable="on" class="menu-item"\n        href="javascript:;" data-param="insertRowAbove">\n        <span>' + this._t("insertRowAbove") + ' ( Ctrl + Alt + ↑ )</span>\n      </a>\n    </li>\n    <li>\n      <a tabindex="-1" unselectable="on" class="menu-item"\n        href="javascript:;" data-param="insertRowBelow">\n        <span>' + this._t("insertRowBelow") + ' ( Ctrl + Alt + ↓ )</span>\n      </a>\n    </li>\n    <li><span class="separator"></span></li>\n    <li>\n      <a tabindex="-1" unselectable="on" class="menu-item"\n        href="javascript:;" data-param="deleteCol">\n        <span>' + this._t("deleteColumn") + '</span>\n      </a>\n    </li>\n    <li>\n      <a tabindex="-1" unselectable="on" class="menu-item"\n        href="javascript:;" data-param="insertColLeft">\n        <span>' + this._t("insertColumnLeft") + ' ( Ctrl + Alt + ← )</span>\n      </a>\n    </li>\n    <li>\n      <a tabindex="-1" unselectable="on" class="menu-item"\n        href="javascript:;" data-param="insertColRight">\n        <span>' + this._t("insertColumnRight") + ' ( Ctrl + Alt + → )</span>\n      </a>\n    </li>\n    <li><span class="separator"></span></li>\n    <li>\n      <a tabindex="-1" unselectable="on" class="menu-item"\n        href="javascript:;" data-param="deleteTable">\n        <span>' + this._t("deleteTable") + "</span>\n      </a>\n    </li>\n  </ul>\n</div>").appendTo(this.menuWrapper), this.createMenu = this.menuWrapper.find(".menu-create-table"), this.editMenu = this.menuWrapper.find(".menu-edit-table"), e = this.createTable(6, 6).appendTo(this.createMenu), this.createMenu.on("mouseenter", "td, th", function (i) {
                return function (n) {
                    var r, o, s, a;
                    return i.createMenu.find("td, th").removeClass("selected"), r = t(n.currentTarget), o = r.parent(), a = o.find("td, th").index(r) + 1, s = o.prevAll("tr").addBack(), o.parent().is("tbody") && (s = s.add(e.find("thead tr"))), s.find("td:lt(" + a + "), th:lt(" + a + ")").addClass("selected")
                }
            }(this)), this.createMenu.on("mouseleave", function (e) {
                return t(e.currentTarget).find("td, th").removeClass("selected")
            }), this.createMenu.on("mousedown", "td, th", function (i) {
                return function (n) {
                    var r, o, s, a, l;
                    if (i.wrapper.removeClass("menu-on"), i.editor.inputManager.focused) return o = t(n.currentTarget), s = o.parent(), a = s.find("td").index(o) + 1, l = s.prevAll("tr").length + 1, s.parent().is("tbody") && (l += 1), e = i.createTable(l, a, !0), r = i.editor.selection.blockNodes().last(), i.editor.util.isEmptyNode(r) ? r.replaceWith(e) : r.after(e), i.decorate(e), i.editor.selection.setRangeAtStartOf(e.find("th:first")), i.editor.trigger("valuechanged"), !1
                }
            }(this))
        }, i.prototype.createTable = function (e, i, n) {
            var r, o, s, a, l, d, u, p, c, h, f;
            for (r = t("<table/>"), a = t("<thead/>").appendTo(r), o = t("<tbody/>").appendTo(r), c = u = 0, h = e; 0 <= h ? u < h : u > h; c = 0 <= h ? ++u : --u)
                for (l = t("<tr/>"), l.appendTo(0 === c ? a : o), d = p = 0, f = i; 0 <= f ? p < f : p > f; d = 0 <= f ? ++p : --p) s = t(0 === c ? "<th/>" : "<td/>").appendTo(l), n && s.append(this.editor.util.phBr);
            return r
        }, i.prototype.refreshTableWidth = function (e) {
            var i, n;
            return n = e.width(), i = e.find("col"), e.find("thead tr th").each(function (e, r) {
                var o;
                return o = i.eq(e), o.attr("width", t(r).outerWidth() / n * 100 + "%")
            })
        }, i.prototype.setActive = function (t) {
            return i.__super__.setActive.call(this, t), t ? (this.createMenu.hide(), this.editMenu.show()) : (this.createMenu.show(), this.editMenu.hide())
        }, i.prototype._changeCellTag = function (e, i) {
            return e.find("td, th").each(function (e, n) {
                var r;
                return r = t(n), r.replaceWith("<" + i + ">" + r.html() + "</" + i + ">")
            })
        }, i.prototype.deleteRow = function (t) {
            var e, i, n;
            return i = t.parent("tr"), i.closest("table").find("tr").length < 1 ? this.deleteTable(t) : (e = this._nextRow(i), e.length > 0 || (e = this._prevRow(i)), n = i.find("td, th").index(t), i.parent().is("thead") && (e.appendTo(i.parent()), this._changeCellTag(e, "th")), i.remove(), this.editor.selection.setRangeAtEndOf(e.find("td, th").eq(n)))
        }, i.prototype.insertRow = function (e, i) {
            var n, r, o, s, a, l, d, u, p;
            for (null == i && (i = "after"), o = e.parent("tr"), r = o.closest("table"), a = 0, r.find("tr").each(function (e, i) {
                    return a = Math.max(a, t(i).find("td").length)
                }), d = o.find("td, th").index(e), n = t("<tr/>"), s = "td", "after" === i && o.parent().is("thead") ? o.parent().next("tbody").prepend(n) : "before" === i && o.parent().is("thead") ? (o.before(n), o.parent().next("tbody").prepend(o), this._changeCellTag(o, "td"), s = "th") : o[i](n), l = u = 1, p = a; 1 <= p ? u <= p : u >= p; l = 1 <= p ? ++u : --u) t("<" + s + "/>").append(this.editor.util.phBr).appendTo(n);
            return this.editor.selection.setRangeAtStartOf(n.find("td, th").eq(d))
        }, i.prototype.deleteCol = function (e) {
            var i, n, r, o, s, a;
            return r = e.parent("tr"), a = r.closest("table").find("tr").length < 2, s = e.siblings("td, th").length < 1, a && s ? this.deleteTable(e) : (o = r.find("td, th").index(e), i = e.next("td, th"), i.length > 0 || (i = r.prev("td, th")), n = r.closest("table"), n.find("col").eq(o).remove(), n.find("tr").each(function (e, i) {
                return t(i).find("td, th").eq(o).remove()
            }), this.refreshTableWidth(n), this.editor.selection.setRangeAtEndOf(i))
        }, i.prototype.insertCol = function (e, i) {
            var n, r, o, s, a, l, d, u;
            return null == i && (i = "after"), a = e.parent("tr"), l = a.find("td, th").index(e), s = e.closest("table"), n = s.find("col").eq(l), s.find("tr").each(function (e) {
                return function (n, r) {
                    var o, s;
                    return s = t(r).parent().is("thead") ? "th" : "td", o = t("<" + s + "/>").append(e.editor.util.phBr), t(r).find("td, th").eq(l)[i](o)
                }
            }(this)), r = t("<col/>"), n[i](r), d = s.width(), u = Math.max(parseFloat(n.attr("width")) / 2, 50 / d * 100), n.attr("width", u + "%"), r.attr("width", u + "%"), this.refreshTableWidth(s), o = "after" === i ? e.next("td, th") : e.prev("td, th"), this.editor.selection.setRangeAtStartOf(o)
        }, i.prototype.deleteTable = function (t) {
            var e, i;
            if (i = t.closest(".simditor-table"), e = i.next("p"), i.remove(), e.length > 0) return this.editor.selection.setRangeAtStartOf(e)
        }, i.prototype.command = function (t) {
            var e;
            if (e = this.editor.selection.containerNode().closest("td, th"), e.length > 0) {
                if ("deleteRow" === t) this.deleteRow(e);
                else if ("insertRowAbove" === t) this.insertRow(e, "before");
                else if ("insertRowBelow" === t) this.insertRow(e);
                else if ("deleteCol" === t) this.deleteCol(e);
                else if ("insertColLeft" === t) this.insertCol(e, "before");
                else if ("insertColRight" === t) this.insertCol(e);
                else {
                    if ("deleteTable" !== t) return;
                    this.deleteTable(e)
                }
                return this.editor.trigger("valuechanged")
            }
        }, i
    }(a), E.Toolbar.addButton(R), B = function (e) {
        function i() {
            return i.__super__.constructor.apply(this, arguments)
        }
        return W(i, e), i.prototype.name = "strikethrough", i.prototype.icon = "strikethrough", i.prototype.htmlTag = "strike", i.prototype.disableTag = "pre", i.prototype._activeStatus = function () {
            var t;
            return t = document.queryCommandState("strikethrough") === !0, this.setActive(t), this.active
        }, i.prototype.command = function () {
            return document.execCommand("strikethrough"), this.editor.util.support.oninput || this.editor.trigger("valuechanged"), t(document).trigger("selectionchange")
        }, i
    }(a), E.Toolbar.addButton(B), r = function (t) {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return W(e, t), e.prototype.name = "alignment", e.prototype.icon = "align-left", e.prototype.htmlTag = "p, h1, h2, h3, h4, td, th", e.prototype._init = function () {
            return this.menu = [{
                name: "left",
                text: this._t("alignLeft"),
                icon: "align-left",
                param: "left"
            }, {
                name: "center",
                text: this._t("alignCenter"),
                icon: "align-center",
                param: "center"
            }, {
                name: "right",
                text: this._t("alignRight"),
                icon: "align-right",
                param: "right"
            }], e.__super__._init.call(this)
        }, e.prototype.setActive = function (t, i) {
            return null == i && (i = "left"), "left" !== i && "center" !== i && "right" !== i && (i = "left"), "left" === i ? e.__super__.setActive.call(this, !1) : e.__super__.setActive.call(this, t), this.el.removeClass("align-left align-center align-right"), t && this.el.addClass("align-" + i), this.setIcon("align-" + i), this.menuEl.find(".menu-item").show().end().find(".menu-item-" + i).hide()
        }, e.prototype._status = function () {
            return this.nodes = this.editor.selection.nodes().filter(this.htmlTag), this.nodes.length < 1 ? (this.setDisabled(!0), this.setActive(!1)) : (this.setDisabled(!1), this.setActive(!0, this.nodes.first().css("text-align")))
        }, e.prototype.command = function (t) {
            if ("left" !== t && "center" !== t && "right" !== t) throw new Error("simditor alignment button: invalid align " + t);
            return this.nodes.css({
                "text-align": "left" === t ? "" : t
            }), this.editor.trigger("valuechanged"), this.editor.inputManager.throttledSelectionChanged()
        }, e
    }(a), E.Toolbar.addButton(r), E
});
