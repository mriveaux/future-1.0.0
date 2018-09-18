Ext.define('Maestros.view.prenda.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_prenda',
    title: 'Prenda de vestir',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;

        this.rePrenda = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                cancelEdit: function(rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                }
            }
        });
        Ext.apply(grid, {
            store: 'Prenda',
            plugins: [this.rePrenda],
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
                            store: 'Prenda',
                            fnOnSearch: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Prenda');
                                store.clearFilter(true);
                                store.load({params: {criterio: sf.getValue()}});
                            },
                            fnOnClear: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Prenda');
                                store.load({params: {criterio: sf.getValue()}});
                            }
                        }
                    ]}],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {name: 'idprenda', dataIndex: 'idprenda', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {flex: 1, header: 'Nombre', dataIndex: 'nombre', width: 200, field: {xtype: 'textfield'}, sortable: true}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: 'Prenda',
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    }
});