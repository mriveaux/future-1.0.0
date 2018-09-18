/* global Ext */
Ext.define('Recursos.store.Funcionalidades', {
    extend: 'Ext.data.TreeStore', storeId: 'Funcionalidades', model: 'Recursos.model.Funcionalidades', autoLoad: false, autoSync: false, filterOnLoad: false, nodeParam: 'node',
    proxy: {type: 'ajax', url: 'loadtreefuncionalidades'},
    root: {id: 'hidden-root', expanded: true, text: futureLang.lbFuncionalidades},
    folderSort: false,
    listeners: {
        'beforeexpand': function(store, eOpts) {

        }
    }
});