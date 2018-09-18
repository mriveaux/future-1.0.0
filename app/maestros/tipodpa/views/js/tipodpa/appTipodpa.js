/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.grid.*', 'Ext.data.*', 'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField', 'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*'],
    name: 'Tipodpa',
    appFolder: '/app/maestros/tipodpa/views/js/tipodpa',
    controllers: ['Tipodpa'],
    views: ['List'],
    launch: function () {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{xtype: 'tipodpalist'}]
        });
    }
});
