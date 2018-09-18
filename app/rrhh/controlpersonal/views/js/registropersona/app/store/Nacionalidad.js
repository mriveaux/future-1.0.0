Ext.define('Registropersona.store.Nacionalidad', {
    extend: 'Ext.data.Store',
    model: 'Registropersona.model.Nacionalidad',
    //sorters: ['codigo', 'abreviatura', 'nombre'],
    autoLoad: true,
    filterOnLoad: false,
    pageSize: 25,
    proxy: {
        type: 'ajax',
        actionMethods: {read: 'POST'},
        extraParams: {restful: true},
        api: {
            read: 'getnacionalidad'
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