/* global Ext */
Ext.define('Recursos.store.Acciones', {
    extend: 'Ext.data.Store', storeId: 'Acciones', model: 'Recursos.model.Acciones', autoLoad: false, autoSync: false, filterOnLoad: false,
    sorters: [{property: 'nombre', }],
    proxy: {
        type: 'ajax',
        actionMethods: {read: 'POST'},
        extraParams: {restful: true},
        api: {read: 'loaddataacciones'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
        listeners: {
            exception: function(proxy, response, operation) {
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