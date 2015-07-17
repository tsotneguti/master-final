ace.define("ace/mode/turing", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/turing_highlight_rules", "ace/mode/matching_brace_outdent", "ace/range", "ace/mode/folding/coffee"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("../tokenizer").Tokenizer, o = e("./turing_highlight_rules").RubyHighlightRules, u = e("./matching_brace_outdent").MatchingBraceOutdent, a = e("../range").Range, f = e("./folding/coffee").FoldMode, l = function () {
        this.$tokenizer = new s((new o).getRules()), this.$outdent = new u, this.foldingRules = new f
    };
    r.inherits(l, i), function () {
        this.toggleCommentLines = function (e, t, n, r) {

        }, this.getNextLineIndent = function (e, t, n) {
            var r = this.$getIndent(t), i = this.$tokenizer.getLineTokens(t, e), s = i.tokens;
            if (s.length && s[s.length - 1].type == "comment")return r;
            if (e == "start") {
                var o = t.match(/^.*[\{\(\[]\s*$/);
                o && (r += n)
            }
            return r
        }, this.checkOutdent = function (e, t, n) {
            return this.$outdent.checkOutdent(t, n)
        }, this.autoOutdent = function (e, t, n) {
            this.$outdent.autoOutdent(t, n)
        }
    }.call(l.prototype), t.Mode = l;
})
ace.define("ace/mode/turing_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules,
        s = t.constantOtherSymbol = {
            token: "constant.other.symbol.turing",
            regex: "[:](?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?"
        }, o = t.qString = {
            token: "string",
            regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
        }, u = t.qqString = {
            token: "string",
            regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
        }, a = t.tString = {
            token: "string",
            regex: "[`](?:(?:\\\\.)|(?:[^'\\\\]))*?[`]"
        }, f = t.constantNumericHex = {
            token: "constant.numeric",
            regex: "0[xX][0-9a-fA-F](?:[0-9a-fA-F]|_(?=[0-9a-fA-F]))*\\b"
        }, l = t.constantNumericFloat = {
            token: "constant.numeric",
            regex: "[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, c = function () {
            var t = "L|R|S|W|G|I",
                i = this.$keywords = this.createKeywordMapper({
                    keyword: t,
                    "constant.language": "",
                    "variable.language": "",
                    "support.function": "",
                    "invalid.deprecated": "debugger"
                }, "identifier");
            this.$rules = {
                start: [{
                    token: "comment",
                    regex: "#.*$"
                }, o, u, a, s, f, l, {
                    token: i,
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }, {
                    token: "text",
                    regex: "\\s+"
                }]
            }
        };
    r.inherits(c, i), t.RubyHighlightRules = c
})
ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    var r = e("../range").Range, i = function () {
    };
    (function () {
        this.checkOutdent = function (e, t) {
            return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
        }, this.autoOutdent = function (e, t) {
            var n = e.getLine(t), i = n.match(/^(\s*\})/);
            if (!i)return 0;
            var s = i[1].length, o = e.findMatchingBracket({row: t, column: s});
            if (!o || o.row == t)return 0;
            var u = this.$getIndent(e.getLine(o.row));
            e.replace(new r(t, 0, t, s - 1), u)
        }, this.$getIndent = function (e) {
            var t = e.match(/^(\s+)/);
            return t ? t[1] : ""
        }
    }).call(i.prototype), t.MatchingBraceOutdent = i
})

ace.define("ace/mode/folding/coffee", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode", "ace/range"], function (e, t, n) {
    var r = e("../../lib/oop"), i = e("./fold_mode").FoldMode, s = e("../../range").Range, o = t.FoldMode = function () {
    };
    r.inherits(o, i), function () {
        this.getFoldWidgetRange = function (e, t, n) {
            var r = this.indentationBlock(e, n);
            if (r)return r;
            var i = /\S/, o = e.getLine(n), u = o.search(i);
            if (u == -1 || o[u] != "#")return;
            var a = o.length, f = e.getLength(), l = n, c = n;
            while (++n < f) {
                o = e.getLine(n);
                var h = o.search(i);
                if (h == -1)continue;
                if (o[h] != "#")break;
                c = n
            }
            if (c > l) {
                var p = e.getLine(c).length;
                return new s(l, a, c, p)
            }
        }, this.getFoldWidget = function (e, t, n) {
            var r = e.getLine(n), i = r.search(/\S/), s = e.getLine(n + 1), o = e.getLine(n - 1), u = o.search(/\S/), a = s.search(/\S/);
            if (i == -1)return e.foldWidgets[n - 1] = u != -1 && u < a ? "start" : "", "";
            if (u == -1) {
                if (i == a && r[i] == "#" && s[i] == "#")return e.foldWidgets[n - 1] = "", e.foldWidgets[n + 1] = "", "start"
            } else if (u == i && r[i] == "#" && o[i] == "#" && e.getLine(n - 2).search(/\S/) == -1)return e.foldWidgets[n - 1] = "start", e.foldWidgets[n + 1] = "", "";
            return u != -1 && u < i ? e.foldWidgets[n - 1] = "start" : e.foldWidgets[n - 1] = "", i < a ? "start" : ""
        }
    }.call(o.prototype)
})