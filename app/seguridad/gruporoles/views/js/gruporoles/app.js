/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.grid.*', 'Ext.data.*', 'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField', 'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*'],
    name: 'Gruporoles',
    appFolder: '/app/seguridad/gruporoles/views/js/gruporoles/app',
    controllers: ['Gruporoles'],
    views: ['Listgrupos', 'Listroles'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    region: 'west',
                    title: futureLang.lbGrupoRoles,
                    xtype: 'gruposlist',
                    margin: '5 0 5 5',
                    width: (window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() != 0) ? window.parent.Ext.get('ifContent').getWidth() / 2 : ((window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() == 0) ? window.parent.Ext.get('tabview').getWidth() / 2 : window.parent.innerWidth / 2),
                    split: true,
                    minWidth: 400
                },
                {
                    title: futureLang.lbRoles,
                    region: 'center',
                    xtype: 'roleslist',
                    readOnly: false,
                    margin: '5 5 5 0'
                }
            ]
        });
        Ext.UiValidations();
    }
});
