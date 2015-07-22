/**
 * Created by tsotne on 5/25/15.
 */
Ext.define('AA.view.coding.CodePanel', {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;
        cp = me;
        me.errorLines = [];

        var codeArea = Ext.create('Ext.Component', {
            autoEl: {
                tag: 'div',
                contenteditable: true
            },
            flex: 1,
            cls: 'codearea'
        });

        var linesContainer = Ext.create('Ext.Component', {
            autoEl: {
                tag: 'div'
            },
            cls: 'container',
            width: 45
        });

        var linesDiv = document.createElement("div");
        linesDiv.setAttribute('class', 'line-numberer');

        var code = new Ext.container.Container({
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            cls: 'coding',
            items: [linesContainer, codeArea]
        });

        var themeBtn = Ext.create('AA.view.main.Theme', {
            textarea: code
        });

        var visualisation = Ext.create('AA.view.coding.VisualisationPanel', {
            region: 'north',
            collapsible: true,
            title: 'შესრულების ვიზუალიზაცია',
            codePanel: me
        });

        var runBtn = Ext.create('Ext.button.Button', {
            scale: 'small',
            text: 'გაშვება',
            iconCls: 'execute-icon',
            scale: 'medium',
            handler: run
        });
        var runTestBtn = Ext.create('Ext.button.Button', {
            scale: 'small',
            text: 'ტესტირება',
            iconCls: 'testing-icon',
            scale: 'medium',
            handler: runTesting
        });

        var prev = Ext.create('Ext.button.Button', {
            text: '&#10096; წინა',
            handler: goToPrev,
            cls: 'blue-button'
        });
        var next = Ext.create('Ext.button.Button', {
            text: 'შემდეგი &#10097;',
            handler: goToNext,
            cls: 'blue-button'
        });

        var problemPanel = Ext.create('AA.view.problem.ProblemPanel', {
            region: 'center',
            bbar: [prev, '->', next]
        });

        var codePanel = Ext.create('Ext.panel.Panel', {
            region: 'west',
            layout: 'fit',
            items: [code],
            tbar: [
                //themeBtn,
                runBtn, '->', runTestBtn],
            minWidth: 400,
            //border : false
        });

        me.items = [codePanel, visualisation, problemPanel];

        me.callParent(arguments);

        function goToPrev() {
            window.location.href = "#problem/" + (me.problemId - 1);

        }

        function goToNext() {
            window.location.href = "#problem/" + (+me.problemId + 1);
        }

        function updateState() {
            visualisation.tape.move(me.machine.lastMoved);
            visualisation.tape.tape.current.setValue(me.machine.tape[me.machine.position]);
        }

        me.on('afterrender', function () {
            linesContainer.el.dom.appendChild(linesDiv);
            codeArea.el.dom.focus();

            checkCodeAreaDivEmpty();
            refreshlines();
            var txtArea = codeArea.el.dom;
            var lines = linesDiv;

            txtArea.onscroll = function () {
                lines.style.top = -(txtArea.scrollTop) + "px";
                return true;
            }

            txtArea.onkeyup = onKeyListener;
            txtArea.onkeydown = onKeyListener;
        });

        function run() {
            var values = visualisation.tape.getValues();
            var data = [], tape = [];
            var i, j;

            for (i in values) {
                data.push(values[i]);
            }

            for (i = 0; i < data.length; i++) if (data[i]) break;
            for (j = data.length - 1; j >= 0; j--) if (data[j]) break;
            for (; i <= j; i++) tape.push(data[i] ? data[i] : " ");

            var c = codeArea.el.dom.innerText.split("\n");

            var correctCode = [];
            for (var i in c) {
                if (Turing().parseCommand(c[i]).result == "success" && Turing().parseCommand(c[i]).cmd)
                    correctCode.push(c[i].trim());
            }

            log(correctCode,me.problemId)

            springRequest({
                url: 'machine/eval',
                method: 'POST',
                data: {
                    code: correctCode,
                    problemId: me.problemId
                }
            }, function (data) {
                Ext.MessageBox.alert("შედეგი", data);
                log(data)
            }, function () {
                log("error")
            });
        }

        function runTesting() {
            me.machine = getMachine();
            me.play();
            visualisation.setReadOnly(true);
            runTestBtn.disable();
        }

        function checkCodeAreaDivEmpty() {
            if (!codeArea.el.dom.childElementCount) {
                me.codeDiv = document.createElement("div");
                var br = document.createElement("br");
                me.codeDiv.appendChild(br);
                codeArea.el.dom.appendChild(me.codeDiv);
            }
        }

        // checking codearea

        codeArea.on('afterrender', function () {
            codeArea.el.on({
                keydown: function () {
                    setTimeout(highlightCurrentLine, 1)
                },
                mouseup: function () {
                    highlightCurrentLine();
                }
            });
        });

        me.stop = function () {
            clearInterval(me.runningId);
            me.machine = null;
            runTestBtn.enable();
        }

        me.pause = function () {
            clearInterval(me.runningId);
        }

        me.play = function (t) {
            t = t ? t : visualisation.speedSlider.getValue();
            if (!me.machine) return;

            visualisation.pauseBtn.enable();
            visualisation.stopBtn.enable();

            me.runningId = setInterval(function () {
                if (!me.machine.nextStep()) {
                    clearInterval(me.runningId);
                }
                me.currentLine = codeArea.el.dom.childNodes[me.machine.lineNumberTotal[me.machine.currentCmdLine]];
                highlightCurrentLine();
                updateState();
            }, t);
        }

        function getMachine() {
            var values = visualisation.tape.getValues();
            var data = [], tape = [];
            var i, j;

            for (i in values) {
                data.push(values[i]);
            }

            for (i = 0; i < data.length; i++) if (data[i]) break;

            var posInTapeArray = visualisation.tape.tape.currentPos - visualisation.tape.totalPos;
            posInTapeArray -= i;

            for (j = data.length - 1; j >= 0; j--) if (data[j]) break;
            for (; i <= j; i++) tape.push(data[i] ? data[i] : " ");

            var code = codeArea.el.dom.innerText.split("\n");

            if (me.errorLines.length) {
                Ext.MessageBox.show({
                    title: 'სინტაქსური შეცდომა',
                    msg: me.errorLines,
                    buttons: Ext.MessageBox.OK,
                    //fn: log,
                    icon: Ext.MessageBox.ERROR
                });
                return;
            }

            // full tapeArray
            while (posInTapeArray < 0) {
                tape.splice(0, 0, " ");
                posInTapeArray++;
            }

            var diff = posInTapeArray - tape.length + 1;
            if (diff > 0) {
                while (diff > 0) {
                    tape.push(" ");
                    diff--;
                }
            }
            return Turing().init(tape, posInTapeArray, code);
        }

        function onKeyListener() {
            checkCodeAreaDivEmpty();
            refreshlines();
            return true;
        }

        function refreshlines() {
            var nLines = codeArea.el.dom.childElementCount;
            var lines = linesDiv;
            lines.innerHTML = "";
            for (var i = 1; i <= nLines; i++) {
                lines.innerHTML = lines.innerHTML + "<div class='line'>" + i + ":</div>";
            }
            lines.style.top = -(codeArea.el.dom.scrollTop) + "px";
            highlightCurrentLine();
            codeArea.el.dom.classList.remove('code-current-line');
        }

        function highlightCurrentLine() {
            var sel = document.getSelection(),
                nd = sel.anchorNode;
            var currentLine = nd.tagName == 'DIV' ? nd : nd.parentNode;
            if (me.currentLine)
                currentLine = me.currentLine;
            // clear all
            var ind = 0;
            me.errorLines = [];
            codeArea.el.query('div').forEach(function (line) {
                if (linesDiv.childNodes[ind]) {
                    var text = line.innerText;
                    if (Turing().parseCommand(text).result === "error") {
                        linesDiv.childNodes[ind].classList.add("line-error-sign");
                        me.errorLines.push(ind);
                    } else {
                        linesDiv.childNodes[ind].classList.remove("line-error-sign");
                        if (me.errorLines.indexOf(ind) != -1)
                            me.errorLines.splice(me.errorLines.indexOf(ind), 1);
                    }
                }
                //linesDiv.childNodes[ind].classList.remove("code-current-line");
                line.classList.remove('code-current-line');

                ind++;
            });
            // highlight current
            currentLine.classList.add('code-current-line');
        }

        me.loadProblem = function (problemId) {
            me.setLoading("იტვირთება...");
            prev.disable();
            next.disable();

            springRequest({
                url: 'alan/problems',
                method: 'POST',
                data: problemId,
            }, function (data) {
                if (!data.length) {
                    goToErrorPage();
                }
                problemPanel.text.setHtml(data[0].text);
                problemPanel.inOut.store.loadData(data[0].examples);

                me.problemId = problemId;

                springRequest({
                    url: 'alan/problems',
                    method: 'POST',
                    data: (me.problemId - 1) + "",
                }, function (data) {
                    if (data && data.length) {
                        prev.setText("&#10096; წინა (" + data[0].name + ")");
                        prev.enable();
                    } else {
                        prev.setText("&#10096; წინა");
                    }
                }, function () {
                    log("error");
                });

                springRequest({
                    url: 'alan/problems',
                    method: 'POST',
                    data: +me.problemId + 1,
                }, function (data) {
                    if (data && data.length) {
                        next.setText("შემდეგი &#10097; (" + data[0].name + ")");
                        next.enable();
                    } else {
                        next.setText("შემდეგი &#10097;");
                    }
                }, function () {
                    log("error");
                });

                me.setLoading(false);

            }, function () {
                log("error");
            });
        }

        hcl = highlightCurrentLine;
        vis = visualisation;
        lc = linesContainer;
        ld = linesDiv;
        ca = codeArea;
        el = me.errorLines;
    }
});

/*

 ორობითის შეცვლა
 R
 L
 I 2
 G1
 2
 R
 I 4
 I13
 W1
 G2
 3
 W0
 G2
 4
 L
 S

 */