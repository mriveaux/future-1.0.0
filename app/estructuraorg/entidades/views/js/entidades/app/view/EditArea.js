/* global Ext, futureLang */
Ext.define('Entidades.view.EditArea', {
    extend: 'Ext.window.Window',
    alias: 'widget.edit_area',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    modal: true,
    resizable: false,
    closeAction: 'hide',
    width: 450,
    initComponent: function() {
        var me = this;
        this.items = [
            {
                xtype: 'form',
                itemId: 'basic_data',
                region: 'center',
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
                        name: 'identidad'
                    },
                    {
                        xtype: 'hidden',
                        name: 'idareaentidad'
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
                                margins: '-7 0 0 0',
                                items: [
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        anchor: '100%',
                                        items: [
                                            {
                                                margins: '0 5 0 0',
                                                name: 'codigo',
                                                fieldLabel: futureLang.lbCodigo,
                                                maskRe: /^[0-9]+$/,
                                                maxLength: 11,
                                                allowBlank: true
                                            },
                                            {
                                                flex: 1,
                                                name: 'abreviatura',
                                                fieldLabel: futureLang.lbAbreviatura,
                                                maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                                                regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                                                maxLength: 50,
                                                allowBlank: false
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        defaultType: 'textfield',
                                        anchor: '100%',
                                        items: [
                                            {
                                                flex: 1,
                                                name: 'nombre',
                                                fieldLabel: futureLang.lbNombre,
                                                maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                                                regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                                                maxLength: 255,
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
                text: Ext.lang.btnAcept,
                action: 'aceptar'
            }, {
                text: Ext.lang.btnCancel,
                action: 'cancelar',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});