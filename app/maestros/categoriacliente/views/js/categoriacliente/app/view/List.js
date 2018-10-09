/* global Ext, futureLang */
Ext.define('Categoriacliente.view.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.categoriaclientelist', selType: 'rowmodel', border: false, columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reCategoriacliente = Ext.create('Ext.grid.plugin.RowEditing', {
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
            id: 'gpList', store: 'Categoriacliente', plugins: [this.reCategoriacliente],
            dockedItems: [{xtype: 'toolbar', id: 'topbar',
                    items: [
                        {action: 'add', itemId: 'btnAdicionar', text: futureLang.lbAdd, tooltip: futureLang.lbAdd2, iconCls: 'fa fa-plus bluedark-button'},
                        {action: 'mod', itemId: 'btnModificar', text: futureLang.lbMod, tooltip: futureLang.lbMod2, iconCls: 'fa fa-edit bluedark-button', disabled: true},
                        {action: 'del', itemId: 'btnEliminar', text: futureLang.lbDel, tooltip: futureLang.lbDel2, iconCls: 'fa fa-trash bluedark-button', disabled: true},
                        '->', {
                            xtype: 'searchfield', store: 'Categoriacliente', id: 'sfCategoriacliente',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Categoriacliente');
                                store.clearFilter(true);
                                grid.down('#pagin-grid').moveFirst();
                                store.load({params: {start: 0, limit: 20, criterio: Ext.getCmp('sfCategoriacliente').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Categoriacliente');
                                store.load({params: {start: 0, limit: 20, criterio: Ext.getCmp('sfCategoriacliente').getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {xtype: 'rownumberer'},
                {header: futureLang.lbAbreviatura, dataIndex: 'abreviatura', width: 300, field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbCategoriacliente, dataIndex: 'nombre', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {
                    header: futureLang.lbTiposervicio,
                    dataIndex: 'idtiposervicio',
                    width: 150,
                    sortable: true,
                    field: {xtype: 'combobox', store: 'Tiposervicio', name: 'idtiposervicio',
                        displayField: 'nombre', valueField: 'idtiposervicio', hiddenName: 'idtiposervicio', queryMode: 'local', anchor: '100%',
                        editable: true, typeAhead: true, forceSelection: true, selectOnFocus: true,
                        emptyText: futureLang.lbSeleccione},
                    renderer: function(val, metadata, record) {
                        return record.data.tiposervicio;
                    }
                }, {
                    header: futureLang.lbSector,
                    dataIndex: 'idsector',
                    width: 150,
                    sortable: true,
                    field: {xtype: 'combobox', store: 'Sector', name: 'idsector',
                        displayField: 'nombre', valueField: 'idsector', hiddenName: 'idsector', queryMode: 'local', anchor: '100%',
                        editable: true, typeAhead: true, forceSelection: true, selectOnFocus: true,
                        emptyText: futureLang.lbSeleccione},
                    renderer: function(val, metadata, record) {
                        return record.data.sector;
                    }
                },
                {header: futureLang.lbAcciones, align: 'center', xtype: 'actioncolumn', width: 60, sortable: false, menuDisabled: true,
                    items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod2,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reCategoriacliente.startEdit(selection, 0);
                                } else {
                                    showMsg(0, futureLang.lbSelMod);
                                }
                            }
                        }, {
                            iconCls: 'fa fa-trash bluedark-button',
                            tooltip: futureLang.lbDel2,
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
                        }]},
                {name: 'idcategoriacliente', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false}
            ],
            bbar: {xtype: 'feetpagingtoolbar', id: 'pagin-grid', pageSize: 20, store: 'Categoriacliente', displayInfo: true, dock: 'bottom', plugins: new Ext.ux.ProgressBarPager()}
        });
        this.callParent(arguments);
    }
});
