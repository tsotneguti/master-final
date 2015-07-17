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

        me.bbar = Ext.create('Ext.toolbar.Toolbar', {
            style: 'background-color: rgb(21, 127, 204);',
            items: ['->', {
                text: 'გასუფთავება',
                handler: function () {
                    me.tape.tape.form.reset();
                }
            }]
        });

        me.items = [me.tape];

        me.callParent(arguments);
    }
});