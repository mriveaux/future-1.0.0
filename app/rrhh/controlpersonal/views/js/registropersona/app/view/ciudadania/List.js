Ext.define('Registropersona.view.ciudadania.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_ciudadania',
    title: 'Cuidadan&iacute;a',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;

        this.reCiudadania = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                edit: function(editor, e) {
                    e.record.data.idpersona = grid.getStore().proxy.extraParams.idpersona;
                    e.record.data.idpais = e.record.data.cuidadania;
                    grid.getStore().sync();
                },
                cancelEdit: function(rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                }
            }
        });
        Ext.apply(grid, {
            store: 'Ciudadania',
            plugins: [this.reCiudadania],
            dockedItems: [{xtype: 'toolbar',
                    items: [{
                            action: 'add',
                            itemId: 'btnAdd',
                            text: 'Adicionar',
                            iconCls: 'fa fa-plus bluedark-button'
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
                        }, '->', {
                            xtype: 'searchfield',
                            store: 'Ciudadania',
                            fnOnSearch: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Ciudadania');
                                store.clearFilter(true);
                                store.load({params: {criterio: sf.getValue()}});
                            },
                            fnOnClear: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Ciudadania');
                                store.load({params: {criterio: sf.getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {name: 'idciudadania', dataIndex: 'idciudadania', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {flex: 1, header: 'Nombre', dataIndex: 'cuidadania', width: 200, sortable: true, field: {
                        xtype: 'combobox', name: 'cuidadania', displayField: 'nacionalidad',
                        valueField: 'idpais', store: 'Nacionalidad', queryMode: 'local'}},
                {flex: 1, header: 'Fecha', dataIndex: 'fecha', width: 200, sortable: true,
                    field: {xtype: 'datefield', format: 'd/m/Y'}}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: 'Ciudadania',
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    }
});