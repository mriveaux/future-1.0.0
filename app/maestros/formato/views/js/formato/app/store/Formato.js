/* global Ext */
Ext.define('Formato.store.Formato', {
    extend: 'Ext.data.Store',
    model: 'Formato.model.Formato',
    sorters: ['formato'],
    storeId: 'idStoreFormato',
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'rest',
        url:'',
        api: {
           read: this.urlRead,
           //create: 'addFormato',
           //update: 'updateFormato',
           //destroy: 'deleteFormato'
        },
        actionMethods: {
            read: 'POST'
        },
        reader: {
            root: 'datos',
            totalProperty: 'cantidad',
            idProperty: 'idformato',
            successProperty: 'success',
            messageProperty: 'mensaje'
        }
    }
});