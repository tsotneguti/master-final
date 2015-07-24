/**
 * Created by tsotne on 7/12/15.
 */
Ext.define('AA.view.home.Home', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        var gridStore = Ext.create('Ext.data.Store', {
            fields: ['username', 'solvedProblems', "firstName", "LastName", "points"]
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: gridStore,
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 40
                },
                {text: 'მომხმარებელი', dataIndex: 'username', flex: 1},
                {text: 'სახელი', dataIndex: 'firstName', flex: 1},
                {text: 'გვარი', dataIndex: 'lastName', flex: 1},
                {text: 'ამოხსნილების რაოდენობა', dataIndex: 'solvedProblems', flex: 1},
                {text: 'ქულები', dataIndex: 'points', flex: 1}
            ],
            viewConfig: {
                getRowClass: function (rec, rowIdx, params, store) {
                    //log(rec.get('problemId') == 1 )
                    return "problems-grid-row";
                }
            },
            listeners: {
                itemdblclick: function (dv, record, item, index, e) {
                    document.location.href = "#problem/" + record.data.problemId;
                }
            }
        });

        me.items = [grid];

        //me.tbar = [{
        //    text: 'ახლიდან ჩატვირთვა',
        //    handler: loadProblems,
        //    iconCls: 'reload-image'
        //}];

        me.callParent(arguments);

        me.on('afterrender', function () {
            loadProblems();
        })

        function loadProblems() {
            springRequest({
                url: 'alan/get-users',
                method: 'POST',
                data: null,
            }, function (data) {
                log(data)
                for (var i in data) {
                    var points = 0;
                    data[i].solvedProblems = data[i].solvedProblems.length;
                    for (var j in data[i]["points"]) {
                        points += data[i]["points"][j]["points"];
                    }
                    data[i]["points"] = points;
                }

                grid.store.loadData(data);
            }, function () {
                log("error")
            });
        }
    }
});