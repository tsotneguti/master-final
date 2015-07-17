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
            text: '&laquo; წინა',
            handler: goToPrev,
            cls: 'blue-button'
        });
        var next = Ext.create('Ext.button.Button', {
            text: 'შემდეგი &raquo;',
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

            var c = code.getValue().split("\n")

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

            var c = code.getValue().split("\n")
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
                        prev.setText("&laquo; წინა (" + data[0].name + ")");
                        prev.enable();
                    } else {
                        prev.setText("&laquo; წინა");
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
                        next.setText("შემდეგი &raquo; (" + data[0].name + ")");
                        next.enable();
                    } else {
                        next.setText("შემდეგი &raquo;");
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
                var div = document.createElement("div");
                var br = document.createElement("br");
                div.appendChild(br);
                codeArea.el.dom.appendChild(div);
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
        }
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