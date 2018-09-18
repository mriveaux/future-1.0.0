/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.grid.*', 'Ext.data.*', 'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField', 'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*', 'Ext.layout.container.*'],
    name: 'Formato',
    appFolder: '/app/maestros/formato/views/js/formato/app',
    controllers: ['Formato'],
    views:['FormatoGrid', 'NivelFormatoGrid', 'FormatoEdit', 'FormatoNivelEdit', 'HeredarFormatoWin'],
    stores:['Formato', 'NivelFormato', 'Modulo'],
    models:['Formato', 'NivelFormato', 'Modulo'],
    enableQuickTips: true,
    launch: function () {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    xtype: 'formato_grid',
                    region: 'center',
                    margin: '5 5 0 5'
                }
                ,
                {
                    xtype: 'nivelformato_grid',
                    height: '60%',
                    collapsible: true,
                    split: true,
                    disabled: true,
                    margin: '0 5 5 5',
                    region: 'south'
                }
            ]
        });
    }
});
