Ext.define('Registropersona.view.chequeomedico.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_chequeomedico',
    title: 'Chequeos m&eacute;dicos',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reChequeomedico = Ext.create('Ext.grid.plugin.RowEditing', {
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
            store: Ext.data.StoreManager.lookup('Chequeomedico'),
            plugins: [this.reChequeomedico],
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
                    store: Ext.data.StoreManager.lookup('Chequeomedico'),
                    fnOnSearch: function() {
                        var sf = this, store = Ext.data.StoreManager.lookup('Chequeomedico');
                        store.clearFilter(true);
                        store.load({params: {criterio: sf.getValue()}});
                    },
                    fnOnClear: function() {
                        var sf = this, store = Ext.data.StoreManager.lookup('Chequeomedico');
                        store.load({params: {criterio: sf.getValue()}});
                    }
                }
                ]}],
            columns: [
                {name: 'id', dataIndex: 'id', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {flex: 1, header: 'Fecha expedido', dataIndex: 'fechaexpedido', width: 200, sortable: true, xtype: 'datecolumn', format: 'd/m/Y', renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    field: {xtype: 'datefield', format: 'd/m/Y', allowBlank: false}},
                {flex: 1, header: 'Fecha vencimiento', dataIndex: 'fechavencimiento', width: 200, sortable: true, xtype: 'datecolumn', format: 'd/m/Y', renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    field: {xtype: 'datefield', format: 'd/m/Y'}},
                {flex: 1, header: 'Lugar', dataIndex: 'lugar', width: 200, sortable: true,
                    field: {xtype: 'textfield', allowBlank: false}}
            ],
            bbar: {
                xtype: 'feetpagingtoolbar',
                pageSize: 20,
                store: Ext.data.StoreManager.lookup('Chequeomedico'),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    }
});