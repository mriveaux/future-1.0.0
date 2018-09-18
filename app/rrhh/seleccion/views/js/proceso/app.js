/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport',
        'Ext.grid.*', 'Ext.data.*',
        'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField',
        'Ext.ModelManager', 'Ext.menu.*',
        'Ext.tip.QuickTipManager', 'Ext.form.*'],
    name: 'Proceso',
    paths: {
        'Proceso': '/app/rrhh/seleccion/views/js/proceso/app'
    },
    controllers: ['Proceso'],
    views: ['proceso.List'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{xtype: 'list_proceso'}
            ]
        });
    }
});