/* global Ext, futureLang */
Ext.define('Categoriaservicio.view.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.categoriaserviciolist', selType: 'rowmodel', border: false, columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reCategoriaservicio = Ext.create('Ext.grid.plugin.RowEditing', {
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
            id: 'gpList', store: 'Categoriaservicio', plugins: [this.reCategoriaservicio],
            dockedItems: [{xtype: 'toolbar', id: 'topbar',
                    items: [
                        {action: 'add', itemId: 'btnAdicionar', text: futureLang.lbAdd, tooltip: futureLang.lbAdd2, iconCls: 'fa fa-plus bluedark-button'},
                        {action: 'mod', itemId: 'btnModificar', text: futureLang.lbMod, tooltip: futureLang.lbMod2, iconCls: 'fa fa-edit bluedark-button', disabled: true},
                        {action: 'del', itemId: 'btnEliminar', text: futureLang.lbDel, tooltip: futureLang.lbDel2, iconCls: 'fa fa-trash bluedark-button', disabled: true},
                        '->', {
                            xtype: 'searchfield', store: 'Categoriaservicio', id: 'sfCategoriaservicio',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Categoriaservicio');
                                store.clearFilter(true);
                                grid.down('#pagin-grid').moveFirst();
                                store.load({params: {start: 0, limit: 20, criterio: Ext.getCmp('sfCategoriaservicio').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Categoriaservicio');
                                store.load({params: {start: 0, limit: 20, criterio: Ext.getCmp('sfCategoriaservicio').getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {xtype: 'rownumberer'},
                {header: futureLang.lbPrioridad, dataIndex: 'prioridad', width: 150, field: {xtype: 'numberfield', minValue: 1, maxValue: 99}, sortable: true},
                {header: futureLang.lbAbreviatura, dataIndex: 'abreviatura', width: 300, field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbCategoriaservicio, dataIndex: 'nombre', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {
                    header: futureLang.lbColor,
                    dataIndex: 'color',
                    width: 100,
                    sortable: true,
                    field: {xtype: 'combobox', store: Ext.create('Ext.data.Store', {
                            fields: ['color', 'descripcion'],
                            data: [
                                {id: "default", color: futureLang.lbDefault, descripcion: futureLang.lbStyleDefault},
                                {id: 'primary', color: futureLang.lbPrimary, descripcion: futureLang.lbStylePrimary},
                                {id: 'success', color: futureLang.lbSuccess, descripcion: futureLang.lbStyleSuccess},
                                {id: 'info', color: futureLang.lbInfo, descripcion: futureLang.lbStyleInfo},
                                {id: 'warning', color: futureLang.lbWarning, descripcion: futureLang.lbStyleWarning},
                                {id: 'danger', color: futureLang.lbDanger, descripcion: futureLang.lbStyleDanger}
                            ]
                        }),
                        displayField: 'color', valueField: 'id', hiddenName: 'color', queryMode: 'local', anchor: '100%',
                        forceSelection: true, selectOnFocus: true,
                        emptyText: futureLang.lbSeleccione,
                        itemSelector: 'div.search-item',
                        tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item search-item"><div class="name-item">{descripcion}</div></div>',
                                '</tpl>'
                                )},
                    renderer: function(val, metadata, record) {
                        if (record.data.color == 'default') {
                            return futureLang.lbStyleRowDefault;
                        } else if (record.data.color == 'primary') {
                            return futureLang.lbStyleRowPrimary;
                        } else if (record.data.color == 'success') {
                            return futureLang.lbStyleRowSuccess;
                        } else if (record.data.color == 'info') {
                            return futureLang.lbStyleRowInfo;
                        } else if (record.data.color == 'warning') {
                            return futureLang.lbStyleRowWarning;
                        } else {
                            return futureLang.lbStyleRowDanger;
                        }
                    }
                },
                {header: futureLang.lbAcciones, align: 'center', xtype: 'actioncolumn', width: 60, sortable: false, menuDisabled: true, items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod2,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reCategoriaservicio.startEdit(selection, 0);
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
                {name: 'idcategoriaservicio', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false}
            ],
            bbar: {xtype: 'feetpagingtoolbar', id: 'pagin-grid', pageSize: 20, store: 'Categoriaservicio', displayInfo: true, dock: 'bottom', plugins: new Ext.ux.ProgressBarPager()}
        });
        this.callParent(arguments);
    }
});
