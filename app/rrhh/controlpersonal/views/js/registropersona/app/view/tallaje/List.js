Ext.define('Registropersona.view.tallaje.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_tallaje',
    title: 'Datos del tallaje',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reTallaje = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                edit: function(editor, e) {
                    e.record.data.idpersona = grid.getStore().proxy.extraParams.idpersona;
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
            store: 'Tallaje',
            plugins: [this.reTallaje],
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
                            store: 'Tallaje',
                            fnOnSearch: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Tallaje');
                                store.clearFilter(true);
                                store.load({params: {criterio: sf.getValue()}});
                            },
                            fnOnClear: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Tallaje');
                                store.load({params: {criterio: sf.getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {name: 'idtallaje', dataIndex: 'idtallaje', type: 'int', useNull: true, hideable: false, hidden: true},
                {flex: 1, header: 'Prenda', dataIndex: 'prenda', width: 200, sortable: true,
                    field: {xtype: 'combobox', name: 'prenda', displayField: 'nombre',
                        valueField: 'idprenda', store: 'Prenda', queryMode: 'local'}},
                {flex: 1, header: 'Talla', dataIndex: 'talla', width: 200, sortable: true,
                    field: {xtype: 'textfield'}}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: 'Tallaje',
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    }
});