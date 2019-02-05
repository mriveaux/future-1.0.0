Ext.define('Registropersona.store.Vehiculo', {
    extend: 'Ext.data.Store',
    storeId: 'Vehiculo',
    model: 'Registropersona.model.Vehiculo',
    autoLoad: false,
    autoSync: false,
    filterOnLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {
            read: '../vehiculo/getvehiculos',
            create: '../vehiculo/addvehiculo',
            update: '../vehiculo/modvehiculo',
            destroy: '../vehiculo/delvehiculo'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        writer: {
            type: 'json'
        },
        listeners: {
            exception: function(proxy, response, operation) {
                Ext.MessageBox.show({
                    title: 'Excepci&oacute;n remota',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        'beforesync': function() {
            showMask('Cargando...');
        },
        'load': function(store, records, successful, eOpts) {
            hideMask();
        },
        'write': function(proxy, operation) {
            operation.callback = function(records, operat, success) {
                var msg = '';
                if (success) {
                    switch (operation.action) {
                        case 'create':
                            msg = 'El veh&iacute;culo fue adicionado correctamente.';
                            break;
                        case 'update':
                            msg = 'El veh&iacute;culo fue modificado correctamente.';
                            break;
                        case 'destroy':
                            msg = 'El veh&iacute;culo fue eliminado correctamente.';
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