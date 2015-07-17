/**
 * Created by tsotne on 5/22/15.
 */

Ext.define('AA.view.main.Header', {
    extend: 'Ext.panel.Panel',
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};

        var userBtn = Ext.create('AA.view.main.User');

        var logo = Ext.create('Ext.Img', {
            src: '/images/alan-arena.png',
            height: 25,
            width: 80
        });

        var home = Ext.create('Ext.button.Button', {
            text: 'HOME',
            scale: 'large',
            handler: function () {
                window.location.href = "#home"
            }
        });

        var problems = Ext.create('Ext.button.Button', {
            text: 'ამოცანები',
            scale: 'large',
            handler: function () {
                window.location.href = "#problems"
            }
        });

        me.tbar = [logo, '-', home, '-', problems, '->', userBtn];

        me.callParent(arguments);
    }
});