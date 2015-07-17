/**
 * Created by tsotne on 7/13/15.
 */
Ext.define('AA.view.user.UserInfo', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout : 'border',
    bodyCls: 'user-info',
    padding: 20,
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        var problemsStore = Ext.create('Ext.data.Store', {
            fields: ['class'],
            data: [
                {class : 'problems-item',problemId:1,status : 'solved'},
                {class : 'problems-item',problemId:2,status : 'unsolved'},
                {class : 'problems-item',problemId:3,status : 'solved'},
                {class : 'problems-item',problemId:4,status : 'unsolved'},
                {class : 'problems-item',problemId:5,status : 'unsolved'},
                {class : 'problems-item',problemId:6,status : 'unsolved'},
                {class : 'problems-item',problemId:7,status : 'unsolved'},
                {class : 'problems-item',problemId:8,status : 'unsolved'},
                {class : 'problems-item',problemId:9,status : 'unsolved'},
                {class : 'problems-item',problemId:10,status : 'unsolved'},
                {class : 'problems-item',problemId:11,status : 'unsolved'}
            ]
        });

        var problemTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<a class="problems-item {status}" href="/#problem/{problemId}">{problemId}</a>',
            '</div>',
            '</tpl>'
        );

        var view = Ext.create('Ext.view.View', {
            store: problemsStore,
            tpl: problemTpl,
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images available',
        });

        var solvedProblems = Ext.create('Ext.panel.Panel', {
            region : 'center',
            tbar : ['->',{
                xtype : 'label',
                text : "ამოცანები"
            },'->'],
            layout : 'fit',
            items : [view]
        });

        var userData = Ext.create('Ext.form.FieldSet',{
            style : 'border : 0',
            items : [{
                xtype: 'displayfield',
                fieldLabel: 'username',
                name: 'username'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'სახელი',
                name: 'firstName'

            }, {
                xtype: 'displayfield',
                fieldLabel: 'გვარი',
                name: 'lastName'

            }, {
                xtype: 'displayfield',
                fieldLabel: 'e-mail',
                name: 'email'

            }]
        })

        var form = Ext.create('Ext.form.Panel', {
            border : false,
            layout : 'hbox',
            region : 'north',
            height : '300',
            split : true,
            defaults : {
                flex : 1
            },
            items : [userData, {
                xtype : 'fieldset',
                items : [{
                    xtype: 'displayfield',
                    fieldLabel: 'ქულა',
                    name: 'pointsTotal'
                }]
            }]
        });

        me.items = [form, solvedProblems];


        me.callParent(arguments);

        me.loadUserInfo = function () {
            getUser(function (user) {
                log(user)

                user.pointsTotal = 0;
                for(var i in user.points) {
                    user.pointsTotal += user.points[i].points;
                }

                form.form.setValues(user);
            });
        }
    }
});