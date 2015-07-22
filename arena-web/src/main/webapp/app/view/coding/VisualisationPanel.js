/**
 * Created by tsotne on 5/28/15.
 */
Ext.define('AA.view.coding.VisualisationPanel', {
    extend: 'Ext.panel.Panel',
    minHeight: 85,
    scrolable: false,
    bodyCls: 'visualisation',
    bodyPadding: 15,
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        me.tape = Ext.create('AA.view.coding.Tape');

        me.stopBtn = Ext.create('Ext.button.Button', {
            iconCls: 'stop-btn',
            scale: 'medium',
            handler: function () {
                me.playBtn.disable();
                me.pauseBtn.disable();
                me.stopBtn.disable();
                cfg.codePanel.stop();
                me.setReadOnly(false);
                clearTape();
            }
        });
        me.pauseBtn = Ext.create('Ext.button.Button', {
            iconCls: 'pause-btn',
            scale: 'medium',
            handler: function () {
                me.playBtn.enable();
                cfg.codePanel.pause();
            }
        });
        me.playBtn = Ext.create('Ext.button.Button', {
            iconCls: 'play-btn',
            scale: 'medium',
            disabled: true,
            handler: function () {
                me.playBtn.disable();
                cfg.codePanel.play();
            }
        });

        me.bbar = Ext.create('Ext.toolbar.Toolbar', {
            style: 'background-color: rgb(21, 127, 204);',
            items: [ me.stopBtn, me.pauseBtn, me.playBtn, '->', {
                text: 'გასუფთავება',
                iconCls: 'clear-btn',
                scale: 'medium',
                handler: clearTape
            }]
        });

        me.items = [me.tape];

        me.callParent(arguments);

        me.setReadOnly = function (v) {
            for (var i in me.tape.tape.items.items) {
                me.tape.tape.items.items[i].setReadOnly(v);
            }

            if (v) {
                me.tape.ll.disable();
                me.tape.l.disable();
                me.tape.r.disable();
                me.tape.rr.disable();
            } else {
                me.tape.ll.enable();
                me.tape.l.enable();
                me.tape.r.enable();
                me.tape.rr.enable();
            }
        }

        function clearTape() {
            me.tape.tape.form.reset();
        }
    }
});