Ext.application({
    name: 'Ejercicio',
    enableQuickTips: true,
    paths: {
        'Ejercicio': '../../views/js/ejercicio/app'
    },
    controllers: ['Ejercicio'],
    etiquetas: new Object(),
    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [{
                    xtype: 'ejercicio_grid',
                    region: 'center',
                    width: '40%',
                    margin: '5 0 5 5'

                }, {
                    xtype: 'periodo_grid',
                    region: 'east',
                    split: true,
                    width: '60%',
                    margin: '5 5 5 0'
                }]
        });
    }
});