/**
 * Created by tsotne on 7/12/15.
 */
Ext.define('AA.view.home.Home', {
    extend: 'Ext.panel.Panel',
    border: false,
    html : '<h1>HOME</h1>',
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        me.callParent(arguments);
    }
});