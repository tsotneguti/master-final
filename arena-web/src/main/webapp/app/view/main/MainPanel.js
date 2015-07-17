/**
 * Created by vako on 5/15/15.
 */
Ext.define('AA.view.main.MainPanel', {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    border: false,
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        me.defaults = {
            split: true
        };

        var header = Ext.create('AA.view.main.Header', {
            region: 'north'
        });

        me.home = Ext.create('AA.view.home.Home', {itemId: "home"});

        me.problems = Ext.create('AA.view.problems.Problems', {itemId: "problems"});

        me.codePanel = Ext.create('AA.view.coding.CodePanel', {itemId: "coding"});

        me.userInfo = Ext.create('AA.view.user.UserInfo', {itemId: "userInfo"});

        me.mainCardPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'card',
            items: []
        });

        me.items = [me.mainCardPanel,header];

        me.callParent(arguments);

    }
});