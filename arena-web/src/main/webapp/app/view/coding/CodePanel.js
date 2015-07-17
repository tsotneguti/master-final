/**
 * Created by tsotne on 5/25/15.
 */
Ext.define('AA.view.coding.CodePanel', {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

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

        lc = linesContainer;
        ld = linesDiv;
        ca = codeArea;
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
            title: 'შესრულების ვიზუალიზაცია'
        });

        log(vv = visualisation)

        var runBtn = Ext.create('Ext.button.Button', {
            scale: 'small',
            text: 'გაშვება ( run )',
            handler: run
        });
        var runTestBtn = Ext.create('Ext.button.Button', {
            scale: 'small',
            text: 'ტესტირება ( testing )',
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
            tbar: [themeBtn, runBtn, runTestBtn],
            minWidth: 400,
            //border : false
        });

        me.items = [codePanel, visualisation, problemPanel];

        me.callParent(arguments);

        function run() {
            var values = visualisation.tape.tape.form.getValues();
            var data = [], tape = [];
            var i, j;

            for (i in values) {
                data.push(values[i]);
            }

            for (i = 0; i < data.length; i++) if (data[i]) break;
            for (j = data.length - 1; j >= 0; j--) if (data[j]) break;
            for (; i <= j; i++) tape.push(data[i] ? data[i] : " ");

            var c = me.codeDiv.innerText.split("\n");

            //for (i in c) c[i] = c[i].replace(/ /g, '');

            springRequest({
                url: 'machine/eval',
                method: 'POST',
                data: {
                    tape: tape,
                    code: c
                }
            }, function (data) {
                Ext.MessageBox.alert("შედეგი", data.result);
                log(data)
            }, function () {
                log("error")
            });
        }

        function runTesting() {
            var values = visualisation.tape.tape.form.getValues();
            var data = [], tape = [];
            var i, j;

            for (i in values) {
                data.push(values[i]);
            }

            for (i = 0; i < data.length; i++) if (data[i]) break;
            for (j = data.length - 1; j >= 0; j--) if (data[j]) break;
            for (; i <= j; i++) tape.push(data[i] ? data[i] : " ");

            var c = me.codeDiv.innerText.split("\n");
            log(ff = me.codeDiv)
            Ext.MessageBox.alert("code", c);
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

        function goToPrev() {
            window.location.href = "#problem/" + (me.problemId - 1);

        }

        function goToNext() {
            window.location.href = "#problem/" + (+me.problemId + 1);
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

        function onKeyListener() {
            checkCodeAreaDivEmpty();
            refreshlines();
            return true;
        }

        function checkCodeAreaDivEmpty() {
            if (!codeArea.el.dom.childElementCount) {
                me.codeDiv = document.createElement("div");
                var br = document.createElement("br");
                me.codeDiv.appendChild(br);
                codeArea.el.dom.appendChild(me.codeDiv);
            }
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

        function highlightCurrentLine() {
            var sel = document.getSelection(),
                nd = sel.anchorNode;
            var currentLine = nd.tagName == 'DIV' ? nd : nd.parentNode;
            // clear all
            var ind = 0;
            codeArea.el.query('div').forEach(function (line) {
                log(ind)
                if (linesDiv.childNodes[ind]) {
                    var text = line.innerText;
                    if (Turing.parseCommand(text).result === "error") {
                        linesDiv.childNodes[ind].classList.add("line-error-sign");
                    } else {
                        linesDiv.childNodes[ind].classList.remove("line-error-sign");
                    }
                }

                line.classList.remove('code-current-line');

                ind++;
            });
            // highlight current
            currentLine.classList.add('code-current-line');
        }

        hcl = highlightCurrentLine;


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