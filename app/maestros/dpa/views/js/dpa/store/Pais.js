/* global Ext */
Ext.define('Dpa.store.Pais', {
    extend: 'Ext.data.Store',
    model: 'Dpa.model.Pais',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'getpaises',
        reader: {type: 'json', root: 'data'}
    }
});