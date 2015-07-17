/**
 * Created by tsotne on 7/2/15.
 */
Ext.define('AA.view.problem.ProblemPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        me.text = Ext.create('Ext.panel.Panel', {
            html : "no data",
            flex: 1,
            bodyPadding: 10,
            autoScroll: true,
            border: false
        });

        me.inOut = Ext.create('Ext.grid.Panel', {
            store: {
                fields: ['in', 'out']
            },
            disableSelection: true,
            columns: [{
                text: 'შემავალის მაგალითი',
                dataIndex: 'in',
                flex: 1
            }, {
                text: 'გამომავალის მაგალითი',
                dataIndex: 'out',
                flex: 1
            }]
        });

        var info = Ext.create('Ext.panel.Panel', {
            bodyPadding: 10,
            border: false, split: true,
            style: 'border-top : 1px dashed',
            height: 200,
            items: [me.inOut],
            layout: 'fit'
        });

        me.items = [me.text, info];

        me.callParent(arguments);
    }
});