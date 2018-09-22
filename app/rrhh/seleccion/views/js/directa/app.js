/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport',
        'Ext.grid.*', 'Ext.data.*', 'Ext.layout.container.Border',
        'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField',
        'Ext.ModelManager',
        'Ext.tip.QuickTipManager', 'Ext.form.*', 'Ext.tab.*'],
    name: 'Directa',
    paths: {
        'Directa': '/app/rrhh/seleccion/views/js/directa/app'
    },
    controllers: ['Directa'],
    views: ['directa.Ficha', 'directa.TabPanelDirecta'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    region: 'west',
                    xtype: 'ficha_persona',
                    margin: '5 0 5 5',
                    width: 250,
                    collapsible: true,
                    split: true,
                    minWidth: 200,
                    maxWidth: 300
                },
                {
                    region: 'center',
                    xtype: 'tabpanel_directa',
                    margin: '5 5 5 0'
                }
            ]
        });
    }
});