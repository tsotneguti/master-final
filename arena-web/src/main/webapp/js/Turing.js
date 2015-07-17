/**
 * Created by tsotne on 5/25/15.
 */

Turing = (function () {
    var turing = {
        state: "1000000",
        code: 'W1',
        run: function (state, code) {
            if (tape) this.state = state;
            if (code) this.code = code;
            return "get";
        },
        parseCommand: function (cmd) {
            cmd = cmd ? cmd.replace(/\s+/g, ' ').trim() : cmd;
            var tmpls = [/^$/, /^\d\d*$/, /^L$/, /^R$/, /^S$/, /^W.$/, /^G\d\d*$/, /^I.\d\d*$/, /^D\d\d*.$/];
            for (var i in tmpls) {
                if (cmd.match(tmpls[i])) return {cmd: cmd, result: "success"};
            }
            return {cmd: null, result: "error"};
        }
    };
    return turing;
}());