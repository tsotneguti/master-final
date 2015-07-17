Ext.Ajax.on({
    requestexception: function (conn, response, options, eOpts) {
        switch (response.status) {
            case -1:
                return;
            case 0:
                return Ext.Msg.alert('', 'სერვერთან დაკავშირება ვერ მოხერხდა!');
            case 401:
                return showLoginWindow(function () {
                    Ext.Ajax.request(options);
                });
            case 403:
                return Ext.Msg.alert('', 'არ გაქვთ ნახვის უფლება!');
            default:
                return Ext.create('Ext.window.Window', {
                    title: '<b style="color:rgb(214, 34, 0);">' + response.statusText + '  (Status code: ' + response.status + ')</b>',
                    html: response.responseText,
                    autoShow: true,
                    modal: true,
                    width: '80%',
                    height: '80%',
                    autoScroll: true,
                    constrain: true,
                    style: 'font-size:16px;'
                });
        }
    }
});


Ext.application({
    name: 'AA',
    appForlder: 'app',
    defaultToken: 'home',
    routes: {
        'problem/:id': {
            action: 'onProblem',
            conditions: {
                ':id': '([0-9]+)'
            }
        },
        'home': 'onHome',
        'problems': 'onProblems',
        'userInfo' : 'onUserInfo'
    },
    onProblem: function (id) {
        loadProblem(id);
    },
    onHome: function () {
        loadHome();
    },
    onProblems: function () {
        loadProblems();
    },
    onUserInfo: function () {
        loadUserInfo();
    },
    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onUnmatchedRoute'
            }
        }
    },
    onUnmatchedRoute : function(){
        loadErrorPage();
    },
    launch: function () {

        AA.mainPanel = Ext.create('AA.view.main.MainPanel');
        var viewport = Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [AA.mainPanel]
        });
    }
});