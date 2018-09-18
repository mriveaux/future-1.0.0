Ext.define('Registropersona.view.nacimiento.Edit1', {
    extend: 'Ext.form.Panel',
    alias: 'widget.edit1_nacimiento',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    autoHeight: true,
    region: 'north',
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
    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'textfield',
                            anchor: '100%',
                            items: [
                                {
                                    flex: 1,
                                    name: 'nombremadre',
                                    fieldLabel: 'Nombre de la madre',
                                    maxLength: 255,
                                    margins: '0 5 0 0',
                                    allowBlank: false
                                },
                                {
                                    flex: 1,
                                    name: 'registrocivil',
                                    fieldLabel: 'Registro civil',
                                    maxLength: 255,
                                    margins: '0 5 0 0',
                                    allowBlank: false
                                },
                                {
                                    flex: 1,
                                    name: 'nombrepadre',
                                    fieldLabel: 'Nombre del padre',
                                    maxLength: 255,
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
                                    name: 'tomo',
                                    fieldLabel: 'Tomo',
                                    maxLength: 255,
                                    margins: '0 5 0 0',
                                    allowBlank: false
                                },
                                {
                                    flex: 1,
                                    name: 'folio',
                                    fieldLabel: 'Folio',
                                    maxLength: 255,
                                    margins: '0 5 0 0',
                                    allowBlank: false
                                },
                                {
                                    flex: 1,
                                    xtype: 'datefield',
                                    name: 'fechanacimiento',
                                    fieldLabel: 'Fecha de nacimiento',
                                    maxLength: 255,
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
        });
        this.callParent(arguments);
    }
});