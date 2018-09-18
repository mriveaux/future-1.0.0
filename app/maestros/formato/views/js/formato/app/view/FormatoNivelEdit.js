Ext.define('Formato.view.FormatoNivelEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.formatonivel_edit',

    layout: 'fit',
    modal: true,
    resizable: false,
    autoShow: true,
    width: 500,

    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                fieldDefaults: {
                    labelAlign: 'top',
                    msgTarget: 'side',
                    anchor: '100%',
                    labelWidth: 60
                },
                frame: true,
                border: false,
                bodyPadding: '5 5 0',

                items: [
                    {
                        xtype: 'hidden',
                        name: 'idformato'
                    },
                    {
                        xtype: 'hidden',
                        name: 'idparteformato'
                    },
                    {
                        xtype: 'textfield',
                        name: 'parteformato',
                        fieldLabel: 'Parte del formato',
                        allowBlank: false,
                        maxLength: 255,
                        regex: /^([a-zA-Z\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\/\(\)\.\#\+]+ ?[a-zA-Z\s]*)+$/,
                        maskRe: /^([a-zA-Z\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\/\(\)\.\#\+]+ ?[a-zA-Z\s]*)+$/,
                        anchor: '100%'
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'abreviatura',
                                fieldLabel: 'Abreviatura',
                                margin: '0 5 0 0',
                                allowBlank: false,
                                maxLength: 50,
                                regex: /^([a-zA-Z\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc \"\-\_\/\(\)\.\#\+]+ ?[a-zA-Z]*)+$/,
                                maskRe: /^([a-zA-Z\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc \"\-\_\/\(\)\.\#\+]+ ?[a-zA-Z]*)+$/,
                                anchor: '100%'
                            },
                            {
                                xtype: 'numberfield',
                                name: 'nivel',
                                fieldLabel: 'Nivel',
                                margin: '0 5 0 0',
                                allowBlank: false,
                                maxLength: 3,
                                allowDecimals: false,
                                regex: /^[0-9]+$/,
                                anchor: '100%'
                            },
                            {
                                xtype: 'numberfield',
                                name: 'longitud',
                                fieldLabel: 'Longitud',
                                allowBlank: false,
                                maxLength: 3,
                                allowDecimals: false,
                                regex: /^[0-9]+$/,
                                anchor: '100%'
                            }
                        ]
                    },
                ]
            }
        ];

        this.buttons = [
            {
                text: '<i class="fa fa-hand-o-right blue-button"></i> <b>Aplicar</b>',
                action: 'aplicar'
            },
            {
                text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                action: 'aceptar'
            },
            {
                text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                action: 'cancelar',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});