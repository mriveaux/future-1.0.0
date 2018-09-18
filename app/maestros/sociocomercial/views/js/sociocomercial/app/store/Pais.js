/* global Ext */
Ext.define('ClientesProveedores.store.Pais', {
    extend: 'Ext.data.Store',
    model: 'ClientesProveedores.model.Pais',
    autoLoad: true,
//    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'getpaises',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'mensaje'
        }
    }
});