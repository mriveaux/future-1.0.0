/* global Ext, futureLang */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.grid.*', 'Ext.data.*', 'Ext.tree.*', 
        'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 
        'Ext.ux.form.SearchField', 'Ext.ModelManager', 
        'Ext.tip.QuickTipManager', 'Ext.form.*', 'Ext.layout.container.*'],
    name: 'Dpa',
    appFolder: '/app/maestros/dpa/views/js/dpa',
    controllers: ['Dpa'],
    views: ['TreeDpa', 'PanelDpa'],
    stores: ['Pais', 'Tipodpa'],
    models: ['Pais', 'Tipodpa', 'Treedpa'],
    launch: function () {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            bodyBorder: false,
            items: [{
                    xtype: 'tree_dpa',
                    region: 'center',
                    width: '70%'
                }, {
                    xtype: 'panel_dpa',
                    title: futureLang.lbDatosDpa,
                    region: 'east',
                    width: '30%',
                    disabled: true
                }
            ]
        });
    }
});
