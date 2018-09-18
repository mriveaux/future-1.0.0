/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.tree.*', 'Ext.ux.form.SearchField', 'Ext.ModelManager',
        'Ext.tip.QuickTipManager', 'Ext.form.*', 'Ext.layout.container.*', 'Ext.grid.*', 'Ext.data.*'],
    name: 'Entidades',
    paths: {
        'Entidades': '/app/estructuraorg/entidades/views/js/entidades/app'
    },
    controllers: ['Entidad'],
    views: ['TreeEntidad', 'TreeArea'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    region: 'west',
                    title: futureLang.lbEntidades,
                    xtype: 'tree_entidad',
                    margin: '5 0 5 5',
                    width: (window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() != 0) ? window.parent.Ext.get('ifContent').getWidth() / 2 : ((window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() == 0) ? window.parent.Ext.get('tabview').getWidth() / 2 : window.parent.innerWidth / 2),
                    collapsible: true,
                    split: true,
                    minWidth: 400
                },
                {
                    title: futureLang.lbAreasEntidad,
                    region: 'center',
                    xtype: 'tree_area',
                    readOnly: false,
                    margin: '5 5 5 0'
                }
            ]
        });
    }
});