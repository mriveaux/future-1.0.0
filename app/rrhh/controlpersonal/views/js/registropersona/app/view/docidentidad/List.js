Ext.define('Registropersona.view.docidentidad.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_docidentidad',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        grid.title = 'Documentos de identificaci&oacute;n';
        this.reDocidentidad = Ext.create('Ext.grid.plugin.RowEditing', {
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
            store: 'Docidentidad',
            plugins: [this.reDocidentidad],
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
                            store: 'Docidentidad',
                            fnOnSearch: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Docidentidad');
                                store.clearFilter(true);
                                store.load({params: {criterio: sf.getValue()}});
                            },
                            fnOnClear: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Docidentidad');
                                store.load({params: {criterio: sf.getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {name: 'iddocidentidad', dataIndex: 'iddocidentidad', useNull: true, hideable: false, hidden: true},
                {name: 'idcategoriadocidentidad', dataIndex: 'iddocidentidadidentidad', hideable: false, hidden: true},
                {name: 'idpersona', dataIndex: 'idpersona', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {header: 'Categor&iacute;a documento', dataIndex: 'categoriadoc', width: 200, sortable: true,
                    field: {xtype: 'combobox', name: 'categoriadoc', displayField: 'nombre',
                        valueField: 'idcategoriadocidentidad', store: 'Categoriadoc', queryMode: 'local'}},
                {header: 'N&uacute;mero', dataIndex: 'numero', width: 200, sortable: true,
                    field: {xtype: 'textfield'}},
                {header: 'Fecha expedici&oacute;n', flex: 1, dataIndex: 'fechaexpedicion', sortable: true, 
                    field: {xtype: 'datefield'}},
                {header: 'Fecha vencimiento', flex: 1, dataIndex: 'fechavencimiento', sortable: true,
                    field: {xtype: 'datefield'}},
                {header: 'Principal', flex: 1, dataIndex: 'rector', sortable: true, renderer: this.showPrincipal,
                    field: {xtype: 'checkbox'}}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: 'Docidentidad',
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    },
    showPrincipal: function(val) {
        if (val == '0') {
            return '<span class="label label-danger">No</span>';
        } else {
            return '<span class="label label-success">Si</span>';
        }
    }
});