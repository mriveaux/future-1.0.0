Ext.define('Registropersona.view.superacion.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_superacion',
    title: 'Cursos de superaci&oacute;n',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reSuperacion = Ext.create('Ext.grid.plugin.RowEditing', {
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
            store: 'Superacion',
            plugins: [this.reSuperacion],
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
                            store: 'Superacion',
                            fnOnSearch: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Superacion');
                                store.clearFilter(true);
                                store.load({params: {criterio: sf.getValue()}});
                            },
                            fnOnClear: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Superacion');
                                store.load({params: {criterio: sf.getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {name: 'idsuperacion', dataIndex: 'idsuperacion', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {flex: 1, header: 'Tipo de curso', dataIndex: 'tipocurso', sortable: true,
                    field: {xtype: 'textfield'}},
                {flex: 1, header: 'Nombre del curso', dataIndex: 'nombrecurso', sortable: true,
                    field: {xtype: 'textfield'}},
                {flex: 1, header: 'Centro de estudio', dataIndex: 'centroestudio', sortable: true,
                    field: {xtype: 'textfield'}},
                {flex: 1, header: 'Fecha desde', dataIndex: 'desde', sortable: true, 
                    field: {xtype: 'datefield'}},
                {flex: 1, header: 'Fecha hasta', dataIndex: 'hasta', sortable: true, 
                    field: {xtype: 'datefield'}},
                {flex: 1, header: 'Evaluaci&oacute;n', dataIndex: 'evaluacion', sortable: true,
                    field: {xtype: 'numberfield'}}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: 'Superacion',
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    }
});