/* global Ext */
Ext.define('Zona.view.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.zonalist', selType: 'rowmodel', columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reZona = Ext.create('Ext.grid.plugin.RowEditing', {
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
                edit: function(rowEditing, context) {
                    if (context.record.phantom && context.record.data.zona == '') {
                        grid.getStore().remove(context.record);
                    }
                    else {
                        context.record.data.identidad = grid.getStore().proxy.extraParams.identidad;
                        grid.getStore().sync();
                    }
                    grid.getDockedComponent('topbar').enable();
                }
            }
        });
        Ext.apply(grid, {
            store: 'Zona', plugins: [this.reZona], disabled: true,
            dockedItems: [{xtype: 'toolbar', id: 'topbar',
                    items: [
                        {action: 'add', itemId: 'btnAdicionar', text: futureLang.lbAdd, tooltip: futureLang.lbAdd2, iconCls: 'fa fa-plus bluedark-button'},
                        {action: 'mod', itemId: 'btnModificar', text: futureLang.lbMod, tooltip: futureLang.lbMod2, iconCls: 'fa fa-edit bluedark-button', disabled: true},
                        {action: 'del', itemId: 'btnEliminar', text: futureLang.lbDel, tooltip: futureLang.lbDel2, iconCls: 'fa fa-trash bluedark-button', disabled: true},
                        '->', {
                            xtype: 'searchfield',
                            store: 'Zona',
                            id: 'sfZona',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Zona');
                                store.clearFilter(true);
                                grid.down('#pagin-grid').moveFirst();
                                store.load({params: {start: 0, limit: 20, criterio: Ext.getCmp('sfZona').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Zona');
                                store.load({params: {start: 0, limit: 20, criterio: Ext.getCmp('sfZona').getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {xtype: 'rownumberer'},
                {header: 'Zona', dataIndex: 'zona', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {name: 'idzona', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {dataIndex: 'identidad', hideable: false, hidden: true, sortable: false},
                {header: futureLang.lbAcciones, align: 'center', xtype: 'actioncolumn', width: 60, sortable: false, menuDisabled: true, items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod2,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reZona.startEdit(selection, 0);
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
                                                grid.getStore().sync();
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], futureLang.lbMsgConfirmar, confirmar);
                                } else {
                                    showMsg(0, futureLang.lbSelDel);
                                }
                            }
                        }]}
            ],
            bbar: {xtype: 'feetpagingtoolbar', id: 'pagin-grid', pageSize: 20, store: 'Zona', displayInfo: true, dock: 'bottom', plugins: new Ext.ux.ProgressBarPager()}
        });
        this.callParent(arguments);
    }
});
