/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.grid.*', 'Ext.data.*', 'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField', 'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*'],
    name: 'Bloqueousuario',
    appFolder: '/app/seguridad/bloqueousuario/views/js/bloqueousuario/app',
    controllers: ['Bloqueousuario'],
    views: ['ListBloqueos'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{xtype: 'tabpanel',
                    activeTab: 0,
//                    frame: true,
                    border: false,
                    items: [
                        {
                            title: futureLang.ttUsuariosbloqueados,
                            iconCls: 'fa fa-user-times bluedark-button',
                            border: false,
                            layout: 'fit',
                            items: {xtype: 'listbloqueos'}
                        }, {
                            title: futureLang.ttHistBloqueos,
                            border: false,
                            iconCls: 'fa fa-lock bluedark-button',
                            layout: 'fit',
                            items: {xtype: 'listhisbloqueos'}
                        }
                    ]
                }]
        });
        Ext.UiValidations();
    }
});
