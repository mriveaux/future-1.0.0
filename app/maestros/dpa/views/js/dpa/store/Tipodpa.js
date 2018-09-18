/* global Ext */
Ext.define('Dpa.store.Tipodpa', {
    extend: 'Ext.data.Store', storeId: 'Tipodpa', model: 'Dpa.model.Tipodpa', autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'gettipodpa',
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'}
    }
});