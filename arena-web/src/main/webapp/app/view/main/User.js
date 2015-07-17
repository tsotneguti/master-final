Ext.define('AA.view.main.User', {
    extend: 'Ext.button.Button',
    scale: 'medium',
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;
        me.menu = [
            {
                text: 'გამოსვლა',
                handler: logout
            },
            {
                text: 'მომხმარებლის ინფორმაცია',
                handler: function(){
                    window.location.href = "/#userInfo"
                }
            }
        ];

        me.callParent(arguments);

        getUser(function (user) {
            if (user) {
                AA.user = user;
                me.setText(AA.user.firstName + ' ' + AA.user.lastName);
            }
        });
    }
});