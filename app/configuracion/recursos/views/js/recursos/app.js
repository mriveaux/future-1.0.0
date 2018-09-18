/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.tree.*', 'Ext.ux.form.SearchField', 'Ext.ModelManager',
        'Ext.tip.QuickTipManager', 'Ext.form.*', 'Ext.layout.container.*', 'Ext.grid.*', 'Ext.data.*'],
    name: 'Recursos',
    appFolder: '/app/configuracion/recursos/views/js/recursos/app',
    controllers: ['Recursos'],
    views: ['ListRecursos', 'TreeFuncionalidades', 'ListAcciones'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    region: 'west',
                    title: futureLang.lbTitleFuncionalidades,
                    xtype: 'tree_funcionalidades',
                    margin: '5 0 5 5',
                    width: (window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() != 0) ? window.parent.Ext.get('ifContent').getWidth() / 6 : ((window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() == 0) ? window.parent.Ext.get('tabview').getWidth() / 6 : window.parent.innerWidth / 6),
                    split: true,
                    minWidth: 280
                },
                {
                    title: futureLang.lbTitleRecursosCliente,
                    region: 'center',
                    xtype: 'list_recursos',
                    readOnly: false,
                    margin: '5 0 5 0',
                    width: (window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() != 0) ? window.parent.Ext.get('ifContent').getWidth() / 3 : ((window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() == 0) ? window.parent.Ext.get('tabview').getWidth() / 3 : window.parent.innerWidth / 3)
                },
                {
                    title: futureLang.lbTitleAccionesServer,
                    region: 'east',
                    xtype: 'list_acciones',
                    readOnly: false,
                    split: true,
                    margin: '5 5 5 0',
                    width: (window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() != 0) ? window.parent.Ext.get('ifContent').getWidth() / 3 : ((window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() == 0) ? window.parent.Ext.get('tabview').getWidth() / 3 : window.parent.innerWidth / 3)
                }
            ]
        });
        new Ext.UiValidations();
    }
});
