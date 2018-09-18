/* global Ext */
Ext.define('Entidades.store.Entidad', {
    extend: 'Ext.data.TreeStore', storeId: 'tsEntidad', model: 'Entidades.model.Entidad', /*sorters: ['text'],*/ autoLoad: false, autoSync: true, filterOnLoad: false, pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {read: 'POST'},
        extraParams: {restful: false},
        api: {read: 'cargarentidades'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
        writer: {type: 'json'},
        listeners: {
            exception: function(proxy, response, operation) {
                Ext.MessageBox.show({title: 'Excepci&oacute;n remota', msg: operation.getError(), icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
            }
        }
    }
});