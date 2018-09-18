/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.grid.*', 'Ext.data.*', 'Ext.tree.*', 'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField', 'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*', 'Ext.layout.container.*'],
    name: 'Pais', appFolder: '/app/maestros/pais/views/js/pais',
    controllers: ['Pais'], stores: ['Pais', 'Tipodpa'], models: ['Pais', 'Tipodpa'], views: ['List', 'Confdpa'],
    launch: function () {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {layout: 'fit', items: [{xtype: 'paislist'}]});
    }
});