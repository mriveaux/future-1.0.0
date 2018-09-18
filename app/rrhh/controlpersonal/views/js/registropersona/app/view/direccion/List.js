Ext.define('Registropersona.view.direccion.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_direccion',
    title: 'Residencia',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;

        this.reDireccion = Ext.create('Ext.grid.plugin.RowEditing', {
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
            store: 'Direccion',
            plugins: [this.reDireccion],
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
                            store: 'Direccion',
                            fnOnSearch: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Direccion');
                                store.clearFilter(true);
                                store.load({params: {criterio: sf.getValue()}});
                            },
                            fnOnClear: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Direccion');
                                store.load({params: {criterio: sf.getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {name: 'iddireccion', dataIndex: 'iddireccion', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {flex: 1, header: 'Provincia-municipio', dataIndex: 'idlocalidad', width: 200, field: {xtype: 'textfield'}, sortable: true},
                {flex: 1, header: 'Direcci&oacute;n', dataIndex: 'direccion', width: 200, field: {xtype: 'textfield'}, sortable: true},
                {flex: 1, header: 'Fecha desde', dataIndex: 'fdesde', width: 200, field: {xtype: 'datefield'}, sortable: true},
                {flex: 1, header: 'Fecha hasta', dataIndex: 'fhasta', width: 200, field: {xtype: 'datefield'}, sortable: true},
                {header: 'Principal', flex: 1, dataIndex: 'rector', field: {xtype: 'checkbox'}, sortable: true, renderer: this.showPrincipal}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: 'Direccion',
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    },
    showPrincipal: function(val) {
        if (val === 0) {
            return '<span class="label label-danger">No</span>';
        } else {
            return '<span class="label label-success">Si</span>';
        }
    }
});