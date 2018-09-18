/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.grid.*', 'Ext.data.*', 'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField', 'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*'],
    name: 'BancoSucursal', appFolder: '/app/maestros/banco/views/js/banco',
    controllers: ['BancoSucursal'], models: ['Banco', 'Sucursal'], stores: ['Banco', 'Sucursal'], views: ['GridBanco', 'GridSucursal'],
    enableQuickTips: true,
    launch: function () {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
                layout: 'border',
                items: [
                    {
                        xtype: 'grid_banco',
                        title: futureLang.lbBancos,
                        region: 'center',
                        margin: '5 5 0 5',
                        width: '50%'
                    },
                    {
                        xtype: 'grid_sucursal',
                        title: futureLang.lbSucursales,
                        region: 'south',
                        height: '60%',
                        collapsible: true, 
                        split: true,
                        disabled: true,
                        margin: '0 5 5 5'
                    }
                ]
            });
    }
});
