/* global Ext */
Ext.define('BancoSucursal.store.Banco', {
    extend: 'Ext.data.Store', storeId: 'Banco', model: 'BancoSucursal.model.Banco', sorters: ['banco'],
    autoLoad: true, autoSync: true,
    filterOnLoad: false, pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {read: 'getbancos', create: 'addbanco', update: 'modbanco', destroy: 'delbanco'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success', messageProperty: 'mensaje'},
        writer: {type: 'json'},
        listeners: {
            exception: function (proxy, response, operation) {
                Ext.MessageBox.show({title: 'Excepci&oacute;n remota', msg: operation.getError(), icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
            }
        }
    },
    listeners: {
        'beforesync': function () {
            showMask('Cargando...');
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