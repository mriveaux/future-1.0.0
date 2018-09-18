/* global Ext */
Ext.define('Dpa.view.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dpalist', title: 'Dpa', selType: 'rowmodel',
    initComponent: function() {
        var grid = this;
        var stPagingToolBar = Ext.create('Ext.data.Store', {
            storeId: 'stPagingToolBar', fields: ['page'], data: [{"page": "5"}, {"page": "10"}, {"page": "15"}, {"page": "20"}, {"page": "30"}, {"page": "40"}, {"page": "50"}, {"page": "60"}, {"page": "70"}, {"page": "80"}, {"page": "90"}, {"page": "100"}, {"page": "250"}, {"page": "500"}, {"page": "1000"}]
        });
        this.reDpa = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                canceledit: function(rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                    grid.getDockedComponent('topbar').enable();
                },
                beforeedit: function(editor, context, eOpts) {
                    grid.getDockedComponent('topbar').disable();
                },
                edit: function(editor, context, eOpts) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                    grid.getDockedComponent('topbar').enable();
                }
            }
        });
        Ext.apply(grid, {
            id: 'gpList', store: 'Dpa', plugins: [this.reDpa],
            dockedItems: [{xtype: 'toolbar', id: 'topbar',
                    items: [{action: 'add', itemId: 'btnAdicionar', text: 'Adicionar', iconCls: 'fa fa-plus bluedark-button'},
                        {action: 'mod', itemId: 'btnModificar', text: 'Modificar', iconCls: 'fa fa-edit bluedark-button', disabled: true},
                        {action: 'del', itemId: 'btnEliminar', text: 'Eliminar', iconCls: 'fa fa-trash bluedark-button', disabled: true},
                        '-', '->', {xtype: 'searchfield', store: 'Dpa',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Dpa');
                                store.clearFilter(true);
                                store.load({params: {criterio: Ext.getCmp('sfDpa').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Dpa');
                                store.load({params: {criterio: Ext.getCmp('sfDpa').getValue()}});
                            }
                        }
                    ]}],
            columns: [{xtype: 'rownumberer'},
                {header: 'Dpa', dataIndex: 'dpa', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {name: 'iddpa', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false}
            ],
            bbar: {xtype: 'pagingtoolbar', pageSize: 20, store: 'Dpa', displayInfo: true, dock: 'bottom'}
        });
        this.callParent(arguments);
    }
});
