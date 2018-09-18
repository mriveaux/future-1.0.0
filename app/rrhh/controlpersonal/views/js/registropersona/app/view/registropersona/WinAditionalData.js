Ext.define('Registropersona.view.registropersona.WinAditionalData', {
    extend: 'Ext.window.Window',
    alias: 'widget.aditional_data',
    title: '<i class="fa fa-th-large"></i> Datos adicionales de la persona',
    layout: 'border',
    modal: true,
    maximized: true,
    closeAction: 'close',
    width: 500,
    height: 400,
    initComponent: function() {
        this.items = [
            {
                region: 'west',
                xtype: 'list_aditional_data',
                margin: '5 0 5 5',
                width: 250,
                collapsible: true,
                split: true,
                minWidth: 200,
                maxWidth: 300
            },
            {
                region: 'center',
                xtype: 'tabpanel_aditionaldata',
                readOnly: false,
                margin: '5 5 5 0'
            }
        ];
        this.buttons = [
            {
                iconCls: 'fa fa-times-circle red-button',
                text: '<b>Cancelar</b>',
                action: 'cancelar',
                scope: this,
                handler: this.close
            }
        ];
        this.callParent(arguments);
    }
});