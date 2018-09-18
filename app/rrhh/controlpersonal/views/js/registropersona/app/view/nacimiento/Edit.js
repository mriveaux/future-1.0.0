Ext.define('Registropersona.view.nacimiento.Edit', {
    extend: 'Ext.Panel',
    alias: 'widget.edit_nacimiento',
    title: 'Ficha de la persona',
    region:'north',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    initComponent: function() {
        var me = this;

        this.items = [
            {
                xtype: 'form',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,
                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    readOnly: true
                },
                defaultType: 'textfield',
                items: [
                    {
                        name: 'tomo',
                        fieldLabel: 'No. identidad'
                    }, {
                        name: 'folio',
                        fieldLabel: 'Nombre'
                    }, {
                        name: 'apellidos',
                        fieldLabel: 'Apellidos'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});