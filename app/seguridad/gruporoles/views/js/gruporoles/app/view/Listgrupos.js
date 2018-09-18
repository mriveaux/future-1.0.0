/* global Ext */
Ext.define('Gruporoles.view.Listgrupos', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gruposlist', title: 'Gruporoles', selType: 'rowmodel', columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reGruporoles = Ext.create('Ext.grid.plugin.RowEditing', {
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
                }
            }
        });
        Ext.apply(grid, {
            id: 'gpList', store: 'Gruporoles', plugins: [this.reGruporoles],
            dockedItems: [{xtype: 'toolbar', id: 'topbar',
                    items: [{action: 'add', itemId: 'btnAdicionar', id: 'btnAdicionar', text: futureLang.lbAdicionar, tooltip: futureLang.lbAdicionarGrupo, iconCls: 'fa fa-plus bluedark-button', hidden: true},
                        {action: 'mod', itemId: 'btnModificar', id: 'btnModificar', text: futureLang.lbModificar, tooltip: futureLang.lbModificarGrupo, iconCls: 'fa fa-edit bluedark-button', disabled: true, hidden: true},
                        {action: 'del', itemId: 'btnEliminar', id: 'btnEliminar', text: futureLang.lbEliminar, tooltip: futureLang.lbEliminarGrupo, iconCls: 'fa fa-trash bluedark-button', disabled: true, hidden: true},
                        '->', {
                            xtype: 'searchfield', id: 'sfGrupos', store: 'Gruporoles',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Gruporoles');
                                store.clearFilter(true);
                                store.load({params: {criterio: Ext.getCmp('sfGrupos').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Gruporoles');
                                store.load({params: {criterio: Ext.getCmp('sfGrupos').getValue()}});
                            }
                        }
                    ]}],
            columns: [{xtype: 'rownumberer'},
                {header: futureLang.lbNombre, dataIndex: 'nombre', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbDescripcion, dataIndex: 'descripcion', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {name: 'idgruporoles', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {header: futureLang.lbAcciones, align: 'center', xtype: 'actioncolumn', width: 60, sortable: false, menuDisabled: true,
                    items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbModificarGrupo,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reGruporoles.startEdit(selection, 0);
                                } else {
                                    showMsg(0, futureLang.msgSelectToModify);
                                }
                            }
                        }, {
                            iconCls: 'fa fa-trash bluedark-button',
                            tooltip: futureLang.lbEliminarGrupo,
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
                                    MensajeInterrogacion(Ext.lang.titles[2], futureLang.msgConfEliminarGrupo, confirmar);
                                } else {
                                    showMsg(0, futureLang.msgSelectToDelete);
                                }
                            }
                        }]}
            ]
        });
        this.callParent(arguments);
    }
});
