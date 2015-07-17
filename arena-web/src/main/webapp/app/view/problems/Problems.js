/**
 * Created by tsotne on 7/12/15.
 */
Ext.define('AA.view.problems.Problems', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        var gridStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'difficulty', 'problemId']
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: gridStore,
            columns: [
                {text: 'ამოცანა', dataIndex: 'name', flex: 1},
                {text: 'სირთულე', dataIndex: 'difficulty', flex: 1}
            ],
            viewConfig: {
                getRowClass: function(rec, rowIdx, params, store) {
                    //log(rec.get('problemId') == 1 )
                    return "problems-grid-row";
                }
            },
            listeners : {
                itemdblclick : function(dv, record, item, index, e){
                    document.location.href = "#problem/"+ record.data.problemId;
                }
            }
        });

        me.items = [grid];

        me.tbar = [{
            text : 'reload',
            handler : loadProblems,
            iconCls : 'reload-image'
        }];

        me.callParent(arguments);

        function loadProblems(){
            springRequest({
                url: 'alan/problems',
                method: 'POST',
                data: null,
            }, function (data) {
                grid.store.loadData(data);
            }, function () {
                log("error")
            });
        }
    }
});