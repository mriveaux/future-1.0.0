Ext.define('Registropersona.store.RegVehiculo', {
    extend: 'Ext.data.Store',
    model: 'Registropersona.model.RegVehiculo',
    storeId: 'RegVehiculo',
    sorters: ['text'], autoLoad: true, autoSync: false, filterOnLoad: false, pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {read: 'POST'},
        extraParams: {restful: true},
        api: {read: '../vehiculo/getregistrovehiculos'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
        listeners: {
            exception: function (proxy, response, operation) {
                Ext.MessageBox.show({title: 'Excepci&oacute;n remota', msg: operation.getError(), icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
            }
        }
    },
    listeners: {
        'beforesync': function() {
            showMask('Cargando...');
        },
        'load': function(store, records, successful, eOpts) {
            hideMask();
        }
    }
});