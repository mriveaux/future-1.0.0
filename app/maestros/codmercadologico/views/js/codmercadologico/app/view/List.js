/* global Ext */
Ext.define('Codmercadologico.view.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.codmercadologicolist', selType: 'rowmodel', border: false, columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reCodmercadologico = Ext.create('Ext.grid.plugin.RowEditing', {
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
                edit: function(editor, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                    else
                        context.record.data.idcategoria = context.record.data.categoriaservicio;
                    grid.getDockedComponent('topbar').enable();
                }
            }
        });
        Ext.apply(grid, {
            id: 'gpList', store: 'Codmercadologico', plugins: [this.reCodmercadologico],
            dockedItems: [{
                    xtype: 'toolbar', id: 'topbar',
                    items: [
                        {action: 'add', itemId: 'btnAdicionar', text: futureLang.lbAdd, tooltip: futureLang.lbAdd2, iconCls: 'fa fa-plus bluedark-button'},
                        {action: 'mod', itemId: 'btnModificar', text: futureLang.lbMod, tooltip: futureLang.lbMod2, iconCls: 'fa fa-edit bluedark-button', disabled: true},
                        {action: 'del', itemId: 'btnEliminar', text: futureLang.lbDel, tooltip: futureLang.lbDel2, iconCls: 'fa fa-trash bluedark-button', disabled: true}, '->',
                        {xtype: 'searchfield', store: 'Codmercadologico', id: 'sfCodmercadologico',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Codmercadologico');
                                store.clearFilter(true);
                                grid.down('#pagin-grid').moveFirst();
                                store.reload({params: {start: 0, limit: 20, criterio: Ext.getCmp('sfCodmercadologico').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Codmercadologico');
                                store.reload({params: {start: 0, limit: 20, criterio: Ext.getCmp('sfCodmercadologico').getValue()}});
                            }
                        }
                    ]
                }],
            columns: [{xtype: 'rownumberer'},
                {name: 'idcodmercadologico', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {header: futureLang.lbAbreviatura, dataIndex: 'abreviatura', width: 200, field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbNombre, dataIndex: 'nombre', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {
                    header: futureLang.lbCategoria,
                    dataIndex: 'idcategoria',
                    width: 150,
                    sortable: true,
                    field: {xtype: 'combobox', store: 'Categoriaservicio', name: 'idcategoria',
                        displayField: 'categoriaservicio', valueField: 'idcategoria', hiddenName: 'idcategoria', queryMode: 'local', anchor: '100%',
                        editable: true, typeAhead: true, forceSelection: true, selectOnFocus: true,
                        emptyText: futureLang.lbSeleccione},
                    renderer: function(val, metadata, record) {
                        return '<span class="label label-' + record.data.color + '"> ' + record.data.categoriaservicio + ' </span>';
                    }
                },
                {
                    header: futureLang.lbAcciones,
                    align: 'center',
                    xtype: 'actioncolumn',
                    width: 60,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reCodmercadologico.startEdit(selection, 0);
                                } else {
                                    showMsg(0, futureLang.lbSelMod);
                                }
                            }
                        }, {
                            iconCls: 'fa fa-trash bluedark-button',
                            tooltip: futureLang.lbDel,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    function confirmar(btn) {
                                        if (btn === 'ok') {
                                            if (selection) {
                                                grid.getStore().remove(selection);
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], futureLang.lbMsgConfirmar, confirmar);
                                } else {
                                    showMsg(0, futureLang.lbSelDel);
                                }
                            }
                        }]
                }
            ],
            bbar: {xtype: 'feetpagingtoolbar', id: 'pagin-grid', pageSize: 20, store: 'Codmercadologico', displayInfo: true, dock: 'bottom', plugins: new Ext.ux.ProgressBarPager()}
        });
        this.callParent(arguments);
    }
});
