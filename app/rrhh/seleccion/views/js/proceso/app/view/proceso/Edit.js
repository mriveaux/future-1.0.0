Ext.define('Proceso.view.proceso.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.edit_proceso',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    modal: true,
    resizable: false,
    closeAction: 'hide',
    width: 750,
    initComponent: function() {
        var me = this;
        this.items = [
            {
                xtype: 'form',
                itemId: 'form_proceso',
                margins: '5 5 5 5',
                fieldDefaults: {
                    labelAlign: 'top',
                    msgTarget: 'side',
                    anchor: '100%',
                    labelWidth: 70
                },
                frame: true,
                border: false,
                bodyPadding: '5 5 0',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'hidden',
                        name: 'idprocesoseleccion'
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'anchor',
                                items: [
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        anchor: '100%',
                                        items: [
                                            {
                                                flex: 1,
                                                xtype: 'textfield',
                                                name: 'nombre',
                                                fieldLabel: 'Nombre',
                                                maxLength: 255,
                                                margins: '0 5 0 0',
                                                allowBlank: false
                                            },
                                            {
                                                flex: 1,
                                                xtype: 'combobox',
                                                name: 'cargoplantilla',
                                                fieldLabel: 'Cargo',
                                                displayField: 'nombre',
                                                valueField: 'idcargoplantilla',
                                                margins: '0 5 0 0',
                                                width: 200,
                                                allowBlank: false,
                                                typeAhead: true,
                                                queryMode: 'local',
                                                store: 'Cargoplantilla'
                                            },
                                            {
                                                xtype: 'numberfield',
                                                name: 'cantidad',
                                                fieldLabel: 'Plazas disponibles',
                                                width: 120,
                                                minValue: 1,
                                                allowBlank: false
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        anchor: '100%',
                                        items: [
                                            {
                                                xtype: 'datefield',
                                                name: 'fechainicio',
                                                fieldLabel: 'Fecha inicio',
                                                margins: '0 5 0 0',
                                                width: 142,
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'datefield',
                                                name: 'fechafin',
                                                fieldLabel: 'Fecha fin',
                                                margins: '0 5 0 0',
                                                width: 142,
                                                allowBlank: false
                                            },
                                            {
                                                flex: 1,
                                                xtype: 'textfield',
                                                name: 'comite',
                                                fieldLabel: 'Comit&eacute; de selecci&oacute;n',
                                                allowBlank: false
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        anchor: '100%',
                                        items: [
                                            {
                                                flex: 1,
                                                xtype: 'textarea',
                                                name: 'observacion',
                                                fieldLabel: 'Observaci&oacute;n',
                                                allowBlank: false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        this.buttons = [
            {
                iconCls: 'fa fa-hand-o-right blue-button',
                text: '<b>Aplicar</b>',
                action: 'aplicar'
            }, {
                iconCls: 'fa fa-check-circle green-button',
                text: '<b>Aceptar</b>',
                action: 'aceptar'
            }, {
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