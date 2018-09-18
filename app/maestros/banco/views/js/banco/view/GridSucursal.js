/* global Ext */
Ext.define('BancoSucursal.view.GridSucursal', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.grid_sucursal',
    store: 'Sucursal',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reSucursal = Ext.create('Ext.grid.plugin.RowEditing', {
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
            id: 'gpSucursal', store: 'Sucursal', plugins: [this.reSucursal],
            dockedItems: [{xtype: 'toolbar', id: 'topbar',
                    items: [{action: 'adicionar', itemId: 'btnAddSucursal', text: futureLang.lbAdd, tooltip: futureLang.lbAdd3, iconCls: 'fa fa-plus bluedark-button'},
                        {action: 'modificar', itemId: 'btnModSucursal', text: futureLang.lbMod, tooltip: futureLang.lbMod3, iconCls: 'fa fa-edit bluedark-button', disabled: true},
                        {action: 'eliminar', itemId: 'btnDelSucursal', text: futureLang.lbDel, tooltip: futureLang.lbDel3, iconCls: 'fa fa-trash bluedark-button', disabled: true},
                        '->', {
                            xtype: 'searchfield', store: 'Sucursal', id: 'sfSucursal',
                            filterPropertysNames: ['numero', 'direccion'],
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Sucursal');
                                store.load({params: {criterio: Ext.getCmp('sfSucursal').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Sucursal');
                                store.load({params: {criterio: Ext.getCmp('sfSucursal').getValue()}});
                            }
                        }
                    ]}],
            columns: [{name: 'idbanco', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false}, {name: 'idsucursal', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false}, {header: futureLang.lbNumero, dataIndex: 'numero', field: {xtype: 'numberfield'}, sortable: true}, {header: futureLang.lbDireccion, dataIndex: 'direccion', field: {xtype: 'textfield'}, sortable: true, flex: 1},
                {header: futureLang.lbAcciones, align: 'center', xtype: 'actioncolumn', width: 55, sortable: false, menuDisabled: true, items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: 'Modificar',
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reSucursal.startEdit(selection, 0);
                                } else {
                                    showMsg(0, futureLang.lbSelMod2);
                                }
                            }
                        }, {
                            iconCls: 'fa fa-trash bluedark-button',
                            tooltip: 'Eliminar',
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    var numSucursal = selection.data.numero;
                                    function confirmar(btn) {
                                        if (btn === 'ok') {
                                            if (selection) {
                                                grid.getStore().remove(selection);
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar2, numSucursal), confirmar);
                                } else {
                                    showMsg(0, futureLang.lbSelDel2);
                                }
                            }
                        }]}],
            bbar: {xtype: 'pagingtoolbar', pageSize: 20, store: 'Sucursal', displayInfo: true, dock: 'bottom', plugins: new Ext.ux.ProgressBarPager()}
        });
        this.callParent(arguments);
    }
});