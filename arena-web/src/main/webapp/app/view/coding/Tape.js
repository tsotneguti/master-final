/**
 * Created by tsotne on 5/29/15.
 */
Ext.define('AA.view.coding.Tape', {
    extend: 'Ext.panel.Panel',
    layout: 'hbox',
    border: false,
    constructor: function (cfg) {
        cfg = cfg || {};
        me = this;

        var _ = {xtype: 'splitter', width: 2};

        var tape = Ext.create('Ext.form.Panel', {
            flex: 1,
            layout: 'hbox',
            border: false,
            //style: 'border-top : 0px; border-right : 1px solid black; border-bottom: 0px; border-left : 1px solid black;',
            margin: '0 5 0 5'
        });

        var l = Ext.create('Ext.Button', {
            text: '<',
            handler: function () {
                move(-1);
            }
        });
        var ll = Ext.create('Ext.Button', {
            text: '<<',
            handler: function () {
                move(-10);
            }
        });
        var r = Ext.create('Ext.Button', {
            text: '>',
            handler: function () {
                move(1);
            }
        });
        var rr = Ext.create('Ext.Button', {
            text: '>>',
            handler: function () {
                move(10);
            }
        });

        me.items = [ll, _, l, _, tape, _, r, _, rr];

        me.tape = tape;

        me.callParent(arguments);


        function addItem(id, v) {
            var item = Ext.create('Ext.form.field.Text', {
                cls: 'tape-item',
                fieldStyle: 'background-color: rgb(232, 232, 232);',
                value: v,
                name: "id" + id,
                id: id,
                emptyText: '_',
                maxLength: 1,
                enforceMaxLength: true,
                enableKeyEvents: true,
                listeners: {
                    keydown: function (t, e) {
                        if (e.keyCode == 37) moveCursor(-1);
                        if (e.keyCode == 39) moveCursor(1)
                    },
                    focus: function () {
                        tape.focusedPos = id;
                    },
                    blur: function () {
                        tape.focusedPos = null;
                    }
                }
            });
            tape.add(item);
        }

        function moveCursor(v) {
            var dest = tape.focusedPos + v;
            if (dest === undefined || dest < 0 || dest >= tape.totalItems) return;
            tape.items.getRange()[dest].focus();
        }

        me.on('afterrender', function () {
            addItem(0);
            me.values = [];
            setTimeout(function () {
                tape.totalItems = Math.round(($(tape.el.dom).width() ) / $(tape.items.items[0].el.dom).width());

                for (var i = 1; i < tape.totalItems; i++) {
                    addItem(i);
                }

                tape.tapeDiv = $(tape.el.dom).find("[data-ref=targetEl]");
                tape.currentPos = Math.round(tape.totalItems / 2) - 1;
                me.totalPos = 0;
                tape.current = tape.items.items[tape.currentPos];
                tape.current.addCls("tape-center-item");
                tape.halfSize = tape.currentPos;
            }, 0);


        });

        function move(v) {
            log("move " + v);

            if (tape.currentPos + v >= tape.totalItems - 1 || tape.currentPos + v <= 0)
                slideValues(v);

            tape.items.items[tape.currentPos].removeCls("tape-center-item");
            tape.currentPos += v;
            tape.current = tape.items.items[tape.currentPos];
            tape.current.addCls("tape-center-item");

        }

        function slideValues(v) {

            var values = tape.getForm().getValues();
            tape.getForm().reset();
            for (var i = me.totalPos, j = 0; j < tape.totalItems; i++, j++) {
                me.values[i] = values["id" + j]
            }

            me.totalPos += v;

            values = {};
            for (var i = me.totalPos, j = 0; j < tape.totalItems; i++, j++) {
                values["id" + j] = me.values[i];
            }
            tape.getForm().setValues(values);

            move(-v);
        }
    }
});

/*
 tape.items.items[tape.currentPos].removeCls("tape-center-item");
 tape.currentPos += v;
 tape.current = tape.items.items[tape.currentPos];
 tape.current.addCls("tape-center-item");
 var itemWidth = $(tape.items.items[0].el.dom).width();
 $(tape.tapeDiv).animate({left: '+=' + itemWidth * (-v) + 'px'}, 10);



 */