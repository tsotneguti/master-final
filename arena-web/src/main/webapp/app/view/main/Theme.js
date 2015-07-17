/**
 * Created by tsotne on 5/25/15.
 */
Ext.define('AA.view.main.Theme', {
    extend: 'Ext.button.Button',
    scale: 'small',
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;
        me.menu = [
            {text: 'chrome', handler: changeT},
            {text: 'cobalt', handler: changeT},
            //{text: 'crimson_editor', handler: changeT},
            //{text: 'eclipse', handler: changeT},
            {text: 'idle_fingers', handler: changeT},
            //{text: 'github', handler: changeT},
            //{text: 'mono_industrial', handler: changeT},
            //{text: 'xcode', handler: changeT}
        ];

        me.text = "მენიუ";

        AA.themeMenu = me;
        me.callParent(arguments);

        function changeT(item) {
            changeTheme(item);
        }
    }

});