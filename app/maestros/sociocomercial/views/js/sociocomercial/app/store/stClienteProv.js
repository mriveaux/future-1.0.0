/* global Ext */
Ext.define('ClientesProveedores.store.stClienteProv', {
    extend: 'Ext.data.Store',
    model: 'ClientesProveedores.model.mdClienteProv',
    storeId: 'idStClienteProv',
    autoLoad: true,
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'getsociocomercial',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        }
    }
});