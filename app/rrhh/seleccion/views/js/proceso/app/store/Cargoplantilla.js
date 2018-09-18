Ext.define('Proceso.store.Cargoplantilla', {
    extend: 'Ext.data.Store',
    model: 'Proceso.model.Cargoplantilla',
    sorters: ['nombre'],
    autoLoad: true,
    autoSync: false,
    filterOnLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {read: 'POST'},
        extraParams: {restful: true},
        api: {
            read: '../proceso/getcargoplantilla'
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
        }
    }
});