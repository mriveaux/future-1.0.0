/* global Ext */
Ext.define('Gruporoles.store.Roles', {
    extend: 'Ext.data.Store', storeId: 'Roles', model: 'Gruporoles.model.Roles', autoLoad: false, autoSync: false, filterOnLoad: false,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {read: 'loaddataroles'},
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