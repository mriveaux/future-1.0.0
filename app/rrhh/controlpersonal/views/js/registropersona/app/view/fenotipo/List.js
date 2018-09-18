Ext.define('Registropersona.view.fenotipo.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_fenotipo',
    title: 'Datos fenot&iacute;picos',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reFenotipo = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                edit: function(editor, e) {
                    e.record.data.idpersona = grid.getStore().proxy.extraParams.idpersona;
                    grid.getStore().sync();
                }, cancelEdit: function(rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                }
            }
        });
        Ext.apply(grid, {
            store: 'Fenotipo',
            plugins: [this.reFenotipo],
            dockedItems: [{xtype: 'toolbar',
                    items: [{
                            action: 'add',
                            itemId: 'btnAdd',
                            text: 'Adicionar',
                            iconCls: 'fa fa-plus bluedark-button',
//                            disabled: true
                        }, {
                            action: 'mod',
                            itemId: 'btnMod',
                            text: 'Modificar',
                            iconCls: 'fa fa-edit bluedark-button',
                            disabled: true
                        }, {
                            action: 'del',
                            itemId: 'btnDel',
                            text: 'Eliminar',
                            iconCls: 'fa fa-trash bluedark-button',
                            disabled: true
                        }
                    ]}],
            columns: [
                {name: 'idfenotipo', dataIndex: 'idfenotipo', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {name: 'idpersona', dataIndex: 'idpersona', type: 'int', hideable: false, hidden: true, sortable: false},
                {flex: 1, header: 'Color de piel', dataIndex: 'colorpiel', sortable: false,
                    field: {xtype: 'combobox', name: 'colorpiel', displayField: 'nombre',
                        valueField: 'idcolorpiel', store: 'Colorpiel', queryMode: 'local'}},
                {flex: 1, header: 'Color de ojos', dataIndex: 'colorojos', sortable: true,
                    field: {xtype: 'combobox', name: 'colorojos', displayField: 'nombre',
                        valueField: 'idcolorojos', store: 'Colorojos', queryMode: 'local'}},
                {flex: 1, header: 'Color de pelo', dataIndex: 'colorpelo', sortable: true,
                    field: {xtype: 'combobox', name: 'colorpelo', displayField: 'nombre',
                        valueField: 'idcolorpelo', store: 'Colorpelo', queryMode: 'local'}},
                {flex: 1, header: 'Grupo sangu&iacute;neo', dataIndex: 'gruposanguineo', sortable: true,
                    field: {xtype: 'combobox', name: 'gruposanguineo', displayField: 'nombre',
                        valueField: 'idgruposanguineo', store: 'Gruposanguineo', queryMode: 'local'}},
                {flex: 1, header: 'Estatura (cm)', dataIndex: 'estatura', sortable: true,
                    field: {xtype: 'numberfield'}},
                {flex: 1, header: 'Peso (Kg)', dataIndex: 'peso', sortable: true,
                    field: {xtype: 'numberfield'}},
                {flex: 1, header: 'Observaci&oacute;n', dataIndex: 'observacion', sortable: true,
                    field: {xtype: 'textfield'}}
            ]
        });
        this.callParent(arguments);
    }
});