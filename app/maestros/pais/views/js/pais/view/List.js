/* global Ext, futureLang */
Ext.define('Pais.view.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.paislist',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.rePais = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                'canceledit': function(rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                    grid.getDockedComponent('topbar').enable();
                },
                beforeedit: function(editor, context, eOpts) {
                    grid.getDockedComponent('topbar').disable();
                },
                'edit': function(rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                    grid.getDockedComponent('topbar').enable();
                }
            }
        });
        Ext.apply(grid, {
            id: 'gpList',
            store: 'Pais',
            plugins: this.rePais,
            dockedItems: [{xtype: 'toolbar',
                    id: 'topbar',
                    items: [{
                            action: 'add',
                            itemId: 'btnAdd',
                            text: futureLang.lbAdd,
                            tooltip: futureLang.lbAdd2,
                            iconCls: 'fa fa-plus bluedark-button'
                        }, {
                            action: 'mod',
                            itemId: 'btnMod',
                            text: futureLang.lbMod,
                            tooltip: futureLang.lbMod2,
                            iconCls: 'fa fa-edit bluedark-button',
                            disabled: true
                        }, {
                            action: 'del',
                            itemId: 'btnDel',
                            text: futureLang.lbDel,
                            tooltip: futureLang.lbDel2,
                            iconCls: 'fa fa-trash bluedark-button',
                            disabled: true
                        }, {
                            action: 'print',
                            itemId: 'btnPrint',
                            text: futureLang.lbPrint,
                            tooltip: futureLang.lbPrint2,
                            iconCls: 'fa fa-print bluedark-button',
                            disabled: false
                        }, '-', {
                            action: 'set',
                            itemId: 'btnSet',
                            text: futureLang.lbConfDpa,
                            tooltip: futureLang.lbDpa2,
                            iconCls: 'fa fa-cog bluedark-button',
                            disabled: true
                        }, '->', {
                            xtype: 'searchfield',
                            id: 'sfPais',
                            store: 'Pais',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Pais');
                                store.clearFilter(true);
                                store.load({params: {criterio: Ext.getCmp('sfPais').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Pais');
                                store.load({params: {criterio: Ext.getCmp('sfPais').getValue()}});
                            }
                        }]}],
            columns: [
                {name: 'idpais', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {header: futureLang.lbCodigo, dataIndex: 'codigo', field: {xtype: 'numberfield', maxLength: 3, minValue: 0, value: 1}, sortable: true},
                {header: futureLang.lbSiglas, dataIndex: 'siglas', field: {xtype: 'textfield', maxLength: 3}, sortable: true},
                {header: futureLang.lbPais, dataIndex: 'pais', flex: 1, field: {xtype: 'textfield', maxLength: 100}, sortable: true},
                {header: futureLang.lbNacionalidad, width: 200, dataIndex: 'nacionalidad', field: {xtype: 'textfield', maxLength: 100}, sortable: true},
                {header: futureLang.lbActions, align: 'center', xtype: 'actioncolumn', width: 55, sortable: false, menuDisabled: true,
                    items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.rePais.startEdit(selection, 0);
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
                                    var nombPais = selection.data.pais;
                                    function confirmar(btn) {
                                        if (btn === 'ok') {
                                            if (selection) {
                                                grid.getStore().remove(selection);
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbConfirmDel, nombPais), confirmar);
                                } else {
                                    showMsg(0, futureLang.lbSelDel);
                                }
                            }
                        }]
                }
            ],
            bbar: {xtype: 'pagingtoolbar', pageSize: 20, store: 'Pais', displayInfo: true, dock: 'bottom', plugins: new Ext.ux.ProgressBarPager()}
        });
        this.callParent(arguments);
    }
});