/* global Ext */
Ext.define('BancoSucursal.store.Sucursal', {
    extend: 'Ext.data.Store', storeId: 'Sucursal', model: 'BancoSucursal.model.Sucursal', sorters: ['sucursal'],
    autoLoad: true, autoSync: true,
    filterOnLoad: false, pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {read: 'getsucursales', create: 'addsucursal', update: 'modsucursal', destroy: 'delsucursal'},
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
                            msg = futureLang.lbAdd2Ok;
                            break;
                        case 'update':
                            msg = futureLang.lbMod2Ok;
                            break;
                        case 'destroy':
                            msg = futureLang.lbDel2Ok;
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