/* global Ext, futureLang */
Ext.define('Entidades.store.Dpa', {
    extend: 'Ext.data.TreeStore',
    model: 'Entidades.model.Dpa',
    autoLoad: false,
    folderSort: false, defaultRootProperty: 'text',
    defaultRootText: futureLang.lbAreas,
    defaultRootId: 0,
    proxy: {
        type: 'ajax',
        url: 'loaddatadpa',
        actionMethods: {read: 'POST'}
    },
    root: {expanded: false}
});