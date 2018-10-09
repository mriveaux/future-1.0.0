/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.grid.*', 'Ext.data.*', 'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField', 'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*'],
    name: 'Ura',
    appFolder: '/app/maestros/ura/views/js/ura/app',
    controllers: ['Ura'],
    views: ['List', 'CentroatencionList'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    region: 'west',
                    xtype: 'centroatencionlist',
                    margin: '5 0 5 5',
                    width: 300,
                    collapsible: true,
                    split: true,
                    minWidth: 250,
                    maxWidth: 400
                },
                {
                    region: 'center',
                    xtype: 'uralist',
                    readOnly: false,
                    margin: '5 5 5 0'
                }
            ]
        });
    }
});
