/* global Ext */
Ext.define('BancoSucursal.view.GridBanco', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.grid_banco',
    store: 'Banco',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reBanco = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                canceledit: function(editor, context) {
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
            id: 'gpBanco', store: 'Banco', plugins: [this.reBanco],
            dockedItems: [{xtype: 'toolbar', id: 'topbar',
                    items: [{action: 'adicionar', itemId: 'btnAdicionar', text: futureLang.lbAdd, tooltip: futureLang.lbAdd2, iconCls: 'fa fa-plus bluedark-button'},
                        {action: 'modificar', itemId: 'btnModificar', text: futureLang.lbMod, tooltip: futureLang.lbMod2, iconCls: 'fa fa-edit bluedark-button', disabled: true},
                        {action: 'eliminar', itemId: 'btnEliminar', text: futureLang.lbDel, tooltip: futureLang.lbDel2, iconCls: 'fa fa-trash bluedark-button', disabled: true},
                        '->', {
                            xtype: 'searchfield', store: 'Banco', id: 'sfBanco',
                            filterPropertysNames: ['codigo', 'abreviatura', 'banco'],
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Banco');
                                store.load({params: {criterio: Ext.getCmp('sfBanco').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Banco');
                                store.load({params: {criterio: Ext.getCmp('sfBanco').getValue()}});
                            }
                        }
                    ]}],
            columns: [{dataIndex: 'idbanco', name: 'idbanco', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false}, {header: futureLang.lbCodigo, dataIndex: 'codigo', field: {xtype: 'textfield'}, sortable: true}, {header: futureLang.lbAbreviatura, dataIndex: 'abreviatura', field: {xtype: 'textfield'}, sortable: true}, {header: futureLang.lbBanco, dataIndex: 'banco', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbAcciones, align: 'center', xtype: 'actioncolumn', width: 55, sortable: false, menuDisabled: true, items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod2,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reBanco.startEdit(selection, 0);
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
                                    var nombBanco = selection.data.banco;
                                    function confirmar(btn) {
                                        if (btn === 'ok') {
                                            if (selection) {
                                                grid.getStore().remove(selection);
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombBanco), confirmar);
                                } else {
                                    showMsg(0, futureLang.lbSelDel);
                                }
                            }
                        }]}],
            bbar: {xtype: 'pagingtoolbar', pageSize: 20, store: 'Banco', displayInfo: true, dock: 'bottom', plugins: new Ext.ux.ProgressBarPager()}
        });
        this.callParent(arguments);
    }
});