Ext.define('Registropersona.view.competencias.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_competencias',
    title: 'Competencias',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reCompetencias = Ext.create('Ext.grid.plugin.RowEditing', {
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
           store: Ext.data.StoreManager.lookup('Competencias'),
            plugins: [this.reCompetencias],
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
                    store: Ext.data.StoreManager.lookup('Competencias'),
                    fnOnSearch: function() {
                        var sf = this, store = Ext.data.StoreManager.lookup('Competencias');
                        store.clearFilter(true);
                        store.load({params: {criterio: sf.getValue()}});
                    },
                    fnOnClear: function() {
                        var sf = this, store = Ext.data.StoreManager.lookup('Competencias');
                        store.load({params: {criterio: sf.getValue()}});
                    }
                }
                ]}],
            columns: [
                {name: 'id', dataIndex: 'id', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {flex: 1, header: 'Nombre', dataIndex: 'nombre', width: 200, sortable: true,
                    field: {xtype: 'textfield', allowBlank: false}},
                {flex: 1, header: 'Descripci&oacute;n', dataIndex: 'descripcion', width: 200, sortable: true,
                    field: {xtype: 'textfield'}},
                {flex: 1, header: 'Fecha expedido', dataIndex: 'fechaexpedido', width: 200, sortable: true, xtype: 'datecolumn', format: 'd/m/Y', renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    field: {xtype: 'datefield', format: 'd/m/Y', allowBlank: false}},
                {flex: 1, header: 'Fecha vencimiento', dataIndex: 'fechavencimiento', width: 200, sortable: true, xtype: 'datecolumn', format: 'd/m/Y', renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    field: {xtype: 'datefield', format: 'd/m/Y'}}
            ],
            bbar: {
                xtype: 'feetpagingtoolbar',
                pageSize: 20,
                store: Ext.data.StoreManager.lookup('Competencias'),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    }
});