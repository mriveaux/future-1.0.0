Ext.define('Formato.view.HeredarFormatoWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.heredarformato_win',

    layout: 'fit',
    modal: true,
    resizable: false,
    autoShow: true,
    width: 900,
    height: 500,
    maximizable: true,
    title:'Heredar formato',

    initComponent: function () {

        var grid = Ext.create('Formato.view.FormatoGrid', {
            title:'Listado de formatos padres',
            singleSelect: false,
            heredar: true
        });
        grid.down('toolbar').hide();

        this.items = grid;

        this.buttons = [
            {
                icon: perfil.dirImg + 'cancelar.png',
                iconCls: 'btn',
                text: 'Cancelar',
                action: 'cancelar',
                scope: this,
                handler: this.close
            },
            {
                icon: perfil.dirImg + 'aceptar.png',
                iconCls: 'btn',
                text: 'Aceptar',
                action: 'aceptar'
            }
        ];

        this.callParent(arguments);
    }
});