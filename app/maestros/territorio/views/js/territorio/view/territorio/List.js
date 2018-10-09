/* global Ext, futureLang */
Ext.define('Cubasoft.view.territorio.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.territoriolist',
    selType: 'rowmodel',
    initComponent: function () {
        var grid = this;
        this.reTerritorio = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                canceledit: function (rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                },
                edit: function (editor, context, eOpts) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                }
            }
        });
        Ext.apply(grid, {
            id: 'gpList',
            store: 'Territorio',
            plugins: [this.reTerritorio],
            dockedItems: [{xtype: 'toolbar',
                    items: [{
                            action: 'add',
                            itemId: 'btnAdicionar',
                            text: futureLang.lbAdd, tooltip: futureLang.lbAdd2,
                            iconCls: 'fa fa-plus bluedark-button'
                        }, {
                            action: 'mod',
                            itemId: 'btnModificar',
                            text: futureLang.lbMod, tooltip: futureLang.lbMod2,
                            iconCls: 'fa fa-edit bluedark-button',
                            disabled: true
                        }, {
                            action: 'del',
                            itemId: 'btnEliminar',
                            text: futureLang.lbDel, tooltip: futureLang.lbDel2,
                            iconCls: 'fa fa-trash bluedark-button',
                            disabled: true
                        }, '-', '->', {
                            xtype: 'searchfield',
                            store: 'Territorio',
                            id: 'sfTerritorio',
                            fnOnSearch: function () {
                                var store = Ext.data.StoreManager.lookup('Territorio');
                                store.clearFilter(true);
                                store.load({params: {criterio: Ext.getCmp('sfTerritorio').getValue()}});
                            },
                            fnOnClear: function () {
                                var store = Ext.data.StoreManager.lookup('Territorio');
                                store.load({params: {criterio: Ext.getCmp('sfTerritorio').getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {xtype: 'rownumberer'},
                {header: futureLang.lbNombre, dataIndex: 'nombre', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {name: 'id', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {header: futureLang.lbAbreviatura, dataIndex: 'abreviatura', field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbCodigo, dataIndex: 'codigo', field: {xtype: 'numberfield', step: 1, minValue: 1}, sortable: true},
                {header: futureLang.lbAcciones, align: 'center', xtype: 'actioncolumn', width: 55, sortable: false, menuDisabled: true, items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod2,
                            scope: this,
                            handler: function (grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reTerritorio.startEdit(selection, 0);
                                } else {
                                    showMsg(0, futureLang.lbSelMod);
                                }
                            }
                        }, {
                            iconCls: 'fa fa-trash bluedark-button',
                            tooltip: futureLang.lbDel2,
                            scope: this,
                            handler: function (grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    var nombTerritorio = selection.data.nombre;
                                    function confirmar(btn) {
                                        if (btn === 'ok') {
                                            if (selection) {
                                                grid.getStore().remove(rowIndex);
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombTerritorio), confirmar);
                                } else {
                                    showMsg(0, futureLang.lbSelDel);
                                }
                            }
                        }]}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: 'Territorio',
                displayInfo: true,
                dock: 'bottom',
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    }
});