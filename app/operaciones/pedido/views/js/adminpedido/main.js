Ext.QuickTips.init();
Ext.Ajax.timeout = 9000000;
new Ext.Viewport({
    layout: 'fit',
    items: new Ext.TabPanel({
        title: 'Pedidos',
        activeTab: 0,
        frame: true,
        border: false,
        items: [{
                title: '9019 Mtto. Correctivo',
                id: '0',
                layout: 'fit',
                items: gppedidoCorrectivo
            }, {
                title: '6067 Mtto. Preventivo',
                id: '1',
                layout: 'fit',
                items: gppedidoPreventivo
            }, {
                title: '1190 Herramientas',
                id: '2',
                layout: 'fit',
                items: gppedidoHerramienta
            }, {
                title: '2012 Sist de Prot. Integral',
                id: '3',
                layout: 'fit',
                items: gppedidoProteccion
            }]
    })
});