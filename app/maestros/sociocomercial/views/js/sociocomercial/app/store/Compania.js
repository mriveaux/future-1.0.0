/* global Ext */
Ext.define('ClientesProveedores.store.Compania', {
    extend: 'Ext.data.Store',
    model: 'ClientesProveedores.model.Compania',
//    autoLoad: true,
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'getCompanies',
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