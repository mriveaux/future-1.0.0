Ext.define('Registropersona.view.nacimiento.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_nacimiento',
    title: 'Datos de nacimiento',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reNacimiento = Ext.create('Ext.grid.plugin.RowEditing', {
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
            store: 'Nacimiento',
            plugins: [this.reNacimiento],
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
                {name: 'idnacimiento', dataIndex: 'idnacimiento', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {name: 'idpersona', dataIndex: 'idpersona', type: 'int', hideable: false, hidden: true, sortable: false},
                {flex: 1, header: 'Nombre madre', dataIndex: 'nombremadre', sortable: false, field: {xtype: 'textfield'}},
                {flex: 1, header: 'Nombre padre', dataIndex: 'nombrepadre', sortable: false, field: {xtype: 'textfield'}},
                {flex: 1, header: 'Registro civil', dataIndex: 'registrocivil', width: 200, sortable: true, field: {xtype: 'textfield'}},
                {flex: 1, header: 'Tomo', dataIndex: 'tomo', width: 200, sortable: true, field: {xtype: 'textfield'}},
                {flex: 1, header: 'Folio', dataIndex: 'folio', width: 200, sortable: true, field: {xtype: 'textfield'}},
                {flex: 1, header: 'Fecha de nacimiento', dataIndex: 'fechanacimiento', width: 200, sortable: true, field: {xtype: 'datefield'}}
            ]
        });
        this.callParent(arguments);
    }
});