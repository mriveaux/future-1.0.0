Ext.define('Registropersona.view.categoriacientifica.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_categoriacientifica',
    title: 'Categor&iacute;as cient&iacute;ficas',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reCategoriacientifica = Ext.create('Ext.grid.plugin.RowEditing', {
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
            store: 'Categoriacientifica',
            plugins: [this.reCategoriacientifica],
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
                            store: 'Categoriacientifica',
                            fnOnSearch: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Categoriacientifica');
                                store.clearFilter(true);
                                store.load({params: {criterio: sf.getValue()}});
                            },
                            fnOnClear: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Categoriacientifica');
                                store.load({params: {criterio: sf.getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {name: 'idcategoriacientifica', dataIndex: 'idcategoriacientifica', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {flex: 1, header: 'Categor&iacute;a cient&iacute;fica', dataIndex: 'nombre', width: 200, sortable: true,
                    field: {xtype: 'textfield'}},
                {flex: 1, header: 'Fecha', dataIndex: 'fecha', width: 200, sortable: true,
                    field: {xtype: 'datefield'}}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: 'Categoriacientifica',
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    }
});