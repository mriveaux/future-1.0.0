/* global Ext */
Ext.define('Pais.store.Tipodpa', {
    extend: 'Ext.data.Store', model: 'Pais.model.Tipodpa',
    autoLoad: true,
    proxy: {type: 'ajax', url: 'gettiposdpa', reader: {type: 'json', root: 'data'}}
});