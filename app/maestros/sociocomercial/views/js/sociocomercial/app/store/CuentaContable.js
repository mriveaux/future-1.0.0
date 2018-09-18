/* global Ext */
Ext.define('ClientesProveedores.store.CuentaContable', {
    extend: 'Ext.data.Store',
    model: 'ClientesProveedores.model.CuentaContable',
//    autoLoad: true,
    autoLoad: false,
    folderSort: false,
    proxy: {
        type: 'ajax',
        url: 'getAccounts',
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