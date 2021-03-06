/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport',
        'Ext.grid.*', 'Ext.data.*', 'Ext.layout.container.Border',
        'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField',
        'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*'],
    name: 'Seleccion',
    paths: {
        'Seleccion': '/app/rrhh/seleccion/views/js/seleccion/app'
    },
    controllers: ['Seleccion'],
    views: ['seleccion.ListProceso', 'seleccion.TabPanelMain'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    region: 'west',
                    xtype: 'list_proceso',
                    margin: '5 0 5 5',
                    width: 300,
                    collapsible: true,
                    split: true,
                    minWidth: 250,
                    maxWidth: 300
                },
                {
                    region: 'center',
                    xtype: 'tabpanel_main',
                    readOnly: false,
                    margin: '5 5 5 0'
                }
            ]
        });
    }
});