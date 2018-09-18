/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.grid.*', 'Ext.data.*', 'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField', 'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*', 'Ext.layout.container.*', 'Ext.tab.Panel'],
    name: 'ClientesProveedores',
    appFolder: '/app/maestros/sociocomercial/views/js/sociocomercial/app',
    controllers: ['ClientesProveedores'],
    views: [
        'ClientesProveedores.view.Grid',
        'ClientesProveedores.view.GridCuentaBancaria',
        'ClientesProveedores.view.Edit',
        'ClientesProveedores.view.ViewContacto',
        'ClientesProveedores.view.EditContacto'
    ],
    stores: [
        'ClientesProveedores.store.stClienteProv',
        'ClientesProveedores.store.Compania',
        'ClientesProveedores.store.Pais',
        'ClientesProveedores.store.CuentaContable',
        'ClientesProveedores.store.CuentaBancaria'
    ],
    models: [
        'ClientesProveedores.model.mdClienteProv',
        'ClientesProveedores.model.Compania',
        'ClientesProveedores.model.Pais',
        'ClientesProveedores.model.CuentaContable',
        'ClientesProveedores.model.CuentaBancaria'
    ],
    launch: function () {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [{
                        xtype: 'clienteprov_grid',
                        region: 'center',
                        margin: '5 5 0 5'
                    }]
        });
    }
});
