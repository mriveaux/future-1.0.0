Ext.define('Registropersona.view.fenotipo.Edit', {
    extend: 'Ext.Panel',
    alias: 'widget.edit_fenotipo',
    title: 'Datos fenot&iacute;picos',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    autoHeight: true,
    initComponent: function() {
        var me = this;
        this.items = [
            {
                xtype: 'form',
                margins: '2 2 2 2',
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
                        name: 'idfenotipo'
                    }, {
                        xtype: 'hidden',
                        name: 'idpersona'
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
                                        defaultType: 'combobox',
                                        anchor: '100%',
                                        items: [
                                            {
                                                flex: 1,
                                                margins: '0 5 0 0',
                                                xtype: 'combobox',
                                                name: 'colorpiel',
                                                fieldLabel: 'Color de piel',
                                                displayField: 'denominacion',
                                                valueField: 'id',
                                                width: 100,
                                                allowBlank: false,
                                                typeAhead: true,
                                                queryMode: 'local',
                                                forceSelection: true,
                                                store: Ext.create('Ext.data.Store', {
                                                    fields: ['id', 'denominacion'],
                                                    sorters: ['denominacion'],
                                                    data: [
                                                        {id: 0, denominacion: 'Blanco'},
                                                        {id: 1, denominacion: 'Negro'},
                                                        {id: 2, denominacion: 'Mestizo'}
                                                    ]
                                                })
                                            },
                                            {
                                                flex: 1,
                                                margins: '0 5 0 0',
                                                xtype: 'combobox',
                                                name: 'colorojos',
                                                fieldLabel: 'Color de ojos',
                                                displayField: 'denominacion',
                                                valueField: 'id',
                                                width: 100,
                                                allowBlank: false,
                                                typeAhead: true,
                                                queryMode: 'local',
                                                forceSelection: true,
                                                store: Ext.create('Ext.data.Store', {
                                                    fields: ['id', 'denominacion'],
                                                    sorters: ['denominacion'],
                                                    data: [
                                                        {id: 0, denominacion: 'Negros'},
                                                        {id: 1, denominacion: 'Pardos'},
                                                        {id: 2, denominacion: 'Azules'},
                                                        {id: 3, denominacion: 'Verdes'}
                                                    ]
                                                })
                                            }, {
                                                flex: 1,
                                                xtype: 'combobox',
                                                name: 'colorpelo',
                                                fieldLabel: 'Color de pelo',
                                                displayField: 'denominacion',
                                                valueField: 'id',
                                                width: 100,
                                                allowBlank: false,
                                                typeAhead: true,
                                                queryMode: 'local',
                                                forceSelection: true,
                                                store: Ext.create('Ext.data.Store', {
                                                    fields: ['id', 'denominacion'],
                                                    sorters: ['denominacion'],
                                                    data: [
                                                        {id: 0, denominacion: 'Negro'},
                                                        {id: 1, denominacion: 'Casta&ntilde;o'},
                                                        {id: 2, denominacion: 'Rubio'},
                                                        {id: 3, denominacion: 'Rojo'}
                                                    ]
                                                })
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
                                                xtype: 'combobox',
                                                name: 'gruposanguineo',
                                                fieldLabel: 'Grupo sangu&iacute;neo',
                                                displayField: 'nombre',
                                                valueField: 'idgruposanguineo',
                                                margins: '0 5 0 0',
                                                allowBlank: false,
                                                typeAhead: true,
                                                queryMode: 'local',
                                                store: 'Gruposanguineo'
                                            },
                                            {
                                                flex: 1,
                                                name: 'estatura',
                                                fieldLabel: 'Estatura (cm)',
                                                maxLength: 50,
                                                margins: '0 5 0 0',
                                                allowBlank: false
                                            },
                                            {
                                                flex: 1,
                                                itemId: 'xxx',
                                                name: 'peso',
                                                value:'aaaaa',
                                                fieldLabel: 'Peso (Kg)',
                                                maxLength: 50,
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
                                                xtype: 'textarea',
                                                flex: 1,
                                                name: 'observacion',
                                                fieldLabel: 'Observaci&oacute;n',
                                                maxLength: 255
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        anchor: '100%',
                                        items: [
                                            {
                                                xtype: 'button',
                                                iconCls: 'fa fa-save green-button',
                                                text: '<b>Guardar</b>',
                                                action: 'save'
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
        this.callParent(arguments);
    }
});