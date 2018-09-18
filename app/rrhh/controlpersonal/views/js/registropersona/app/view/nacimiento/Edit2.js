Ext.define('Registropersona.view.nacimiento.Edit2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.edit2_nacimiento',
    bodyPadding: 5,
    collapsible: true,
    autoHeight: true,
    region: 'north',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    fieldDefaults: {
        labelAlign: 'top'
    },
    initComponent: function() {
        var me = this;
        this.items = [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                fieldDefaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                        name: 'tomo',
                        fieldLabel: 'Ejercicio',
                        width: 100
                    }, {
                        name: 'folio',
                        fieldLabel: 'Periodo',
                        width: 125,
                        margins: '0 0 0 5'
                    }, {
                        name: 'desde',
                        fieldLabel: 'Desde',
                        width: 125,
                        margins: '0 0 0 5'
                    }, {
                        name: 'hasta',
                        fieldLabel: 'Hasta',
                        width: 125,
                        allowBlank: false,
                        margins: '0 0 0 5'
                    }, {
                        name: 'iddimension',
                        fieldLabel: 'Saldos',
                        width: 200,
                        editable: false,
                        margins: '0 0 0 5',
                        allowBlank: false
                    }
                ]
            }];

        this.callParent(arguments);
    }
});