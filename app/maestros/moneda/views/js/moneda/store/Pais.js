/* global Ext */
Ext.define('Cubasoft.store.Pais', {
    extend: 'Ext.data.Store',
    model: 'Cubasoft.model.Pais',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'getpaises',
        reader: {type: 'json', root: 'data'}
    },
    listeners: {
        'beforeload': function () {
            showMask();
        },
        'load': function (store, records, successful, eOpts) {
            hideMask();
        }
    }
});