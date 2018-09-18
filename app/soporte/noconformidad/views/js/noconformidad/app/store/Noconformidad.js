/* global Ext */
Ext.define('Noconformidad.store.Noconformidad', {
    extend: 'Ext.data.Store', storeId: 'Noconformidad', model: 'Noconformidad.model.Noconformidad', sorters: ['noconformidad'], autoLoad: true, autoSync: true, filterOnLoad: false, pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {read: 'getnoconformidades', create: 'addnoconformidad', update: 'modnoconformidad', destroy: 'delnoconformidad'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
        writer: {type: 'json'},
        listeners: {
            exception: function (proxy, response, operation) {
                Ext.MessageBox.show({title: Ext.lang.ttlExc, msg: operation.getError(), icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
            }
        }
    },
    listeners: {
        'beforesync': function () {
            showMask();
        },
        'load': function (store, records, successful, eOpts) {
            hideMask();
        },
        'write': function (proxy, operation) {
            operation.callback = function (records, operat, success) {
                var msg = '';
                if (success) {
                    switch (operation.action) {
                        case 'create':
                            msg = futureLang.lbAddOk;
                            break;
                        case 'update':
                            msg = futureLang.lbModOk;
                            break;
                        case 'destroy':
                            msg = futureLang.lbDelOk;
                            break;
                    }
                    this.reload();
                }
                showMsg(1, msg);
            };
            hideMask();
        }
    }
});