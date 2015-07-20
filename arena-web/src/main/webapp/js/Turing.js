/**
 * Created by tsotne on 5/25/15.
 */

Turing = function () {
    var turing = {
            tape: [],
            position: 0,
            code: [],
            commands: [],
            notchs: {},
            stepId: 0,
            currentCmdLine: 0,
            lastMoved : 0,
            init: function (tape, position, code) {
                var me = this;
                if (tape) me.tape = tape;
                if (position) me.position = position;
                if (code) me.code = code;

                for (var i in code) {
                    if (code[i] == "") code.splice(i, 1);
                }

                for (var i in code) {
                    if (code[i].match(/^\d\d*$/)) me.notchs[code[i]] = me.commands.length;
                    else me.commands.push(me.parseCommand(code[i]));
                }

                return me;
            },
            nextStep: function () {
                var me = this;
                me.lastMoved = 0;
                if (me.currentCmdLine >= me.commands.length) return false;
                switch (me.commands[me.currentCmdLine].cmd) {
                    case "L" :
                        me.execL();
                        break;
                    case "R" :
                        me.execR();
                        break;
                    case "S" :
                        me.execS();
                        break;
                    case "W" :
                        me.execW();
                        break;
                    case "G" :
                        me.execG();
                        break;
                    case "I" :
                        me.execI();
                        break;
                }

                me.currentCmdLine++;
                me.stepId++;
                return true;
            },
            execL: function () {
                var me = this;
                if (!me.position) {
                    me.tape.splice(0, 0, " ");
                } else me.position--;
                me.lastMoved = -1;
            },
            execR: function () {
                var me = this;
                if (me.position >= me.tape.length) {
                    me.tape.push(" ");
                }
                me.position++;
                me.lastMoved = 1;
            },
            execS: function () {
                var me = this;
                me.currentCmdLine = me.commands.length;
            },
            execW: function () {
                var me = this;
                me.tape[me.position] = me.commands[me.currentCmdLine].params[0];
            },
            execG: function () {
                var me = this;
                me.currentCmdLine = me.commands[me.currentCmdLine].params[0];
            },
            execI: function () {
                var me = this;
                if (me.commands[me.currentCmdLine].params[0] === me.tape[me.position]) {
                    me.currentCmdLine = me.commands[me.currentCmdLine].params[1];
                }
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