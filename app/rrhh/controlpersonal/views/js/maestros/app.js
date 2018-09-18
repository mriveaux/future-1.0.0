/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport',
        'Ext.grid.*', 'Ext.data.*',
        'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField',
        'Ext.ModelManager',
        'Ext.tip.QuickTipManager', 'Ext.form.*'],
    name: 'Maestros',
    paths: {
        'Maestros': '/app/rrhh/controlpersonal/views/js/maestros/app'
    },
    controllers: ['Maestros', 'Categoriadoc', 'Estratificacion', 'Tipopreparacion', 'Gruposanguineo', 'Mediocontacto', 'Niveleducacion', 'Prenda', 'Procedencia', 'Tipocontacto'],
    views: ['maestros.List'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    region: 'west',
                    xtype: 'list_maestros',
                    margin: '5 0 5 5',
                    width: 250,
                    collapsible: true,
                    split: true,
                    minWidth: 200,
                    maxWidth: 300
                },
                {
                    region: 'center',
                    xtype: 'tabpanel_maestros',
                    margin: '5 5 5 0'
                }
            ]
        });
    }
});