/* global Ext */
Ext.define('Formato.store.Modulo', {
    extend: 'Ext.data.Store',
    model: 'Formato.model.Modulo',
    autoLoad: true,
    proxy: {
        type: 'rest',
        url: 'getmodulos',
        actionMethods: {
            read: 'POST'
        },
        reader: {
            root: 'datos',
            totalProperty: 'cantidad',
            successProperty: 'success'
        }
    }
});