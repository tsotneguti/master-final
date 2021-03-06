/**
 * Created by tsotne on 5/22/15.
 */

Ext.define('AA.view.main.Header', {
    extend: 'Ext.panel.Panel',
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};

        var userBtn = Ext.create('AA.view.main.User', {
            iconCls: 'user-icon'
        });

        //var logo = Ext.create('Ext.Img', {
        //    src: '/images/alan-arena.png',
        //    height: 25,
        //    width: 80
        //});

        var home = Ext.create('Ext.button.Button', {
            text: 'HOME',
            scale: 'large',
            iconCls: 'home-icon',
            handler: function () {
                window.location.href = "#home"
            }
        });

        var problems = Ext.create('Ext.button.Button', {
            text: 'ამოცანები',
            scale: 'large',
            iconCls: 'problems-icon',
            handler: function () {
                window.location.href = "#problems"
            }
        });

        var logo = Ext.create('Ext.form.Label', {
            text: 'Alan Arena',
            cls: 'header-logo',
            font: 'normal 12px courier !important;'
        });


        me.tbar = [logo, '-', home, '-', problems, '->', userBtn];

        me.callParent(arguments);
        logo.on('itemclick', function () {
            log(12312)
        });
    }
});