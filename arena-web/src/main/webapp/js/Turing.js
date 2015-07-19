/**
 * Created by tsotne on 5/25/15.
 */

Turing = function () {
    var turing = {
            state: "",
            code: "",
            commands : [],
            notchs : [],
            init: function (state, code) {
                var me = this;
                if (tape) me.state = state;
                if (code) me.code = code;

            },
            nextStep: function () {

            },
            parseCommand: function (cmd) {
                cmd = cmd ? cmd.replace(/\s+/g, ' ').trim() : cmd;
                if (cmd === "") return {
                    cmd: "",
                    result: "success"
                }
                var tmpls = [/^\d\d*$/, /^L$/, /^R$/, /^S$/, /^W.$/, /^G\d\d*$/, /^I.\d\d*$/];//, /^D\d\d*.$/];
                for (var i in tmpls) {
                    if (cmd.match(tmpls[i])) {
                        var res;
                        if (cmd.match(/^\d\d*$/))
                            res = {
                                cmd: "notch",
                                params: [cmd],
                                result: "success"
                            }
                        else {
                            res = {
                                cmd: cmd[0],
                                params: [],
                                result: "success"
                            }
                            switch (cmd[0]) {
                                case "L" :
                                case "R" :
                                case "S" :
                                    cmd.params = [];
                                    break;
                                case "W" :
                                    res.params = [cmd[1]];
                                    break;
                                case "G" :
                                    res.params = [cmd.substr(1)];
                                    break;
                                case "I" :
                                    res.params = [cmd[1], cmd.substr(2)];
                                    break;
                                //case "D" :
                                //    res.params = [cmd.substr(2, cmd.length - 2), cmd[cmd.length - 1]];
                                //    break;

                            }
                        }
                        return res;
                    }

                }
                return {result: "error"};
            }
        }
        ;
    return turing;
}
;