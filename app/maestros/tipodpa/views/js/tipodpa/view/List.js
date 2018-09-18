/* global Ext */
Ext.define('Tipodpa.view.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.tipodpalist', selType: 'rowmodel', border: false,
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reTipodpa = Ext.create('Ext.grid.plugin.RowEditing', {
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
            id: 'gpList', store: 'Tipodpa', plugins: [this.reTipodpa],
            dockedItems: [{
                    xtype: 'toolbar', id: 'topbar',
                    items: [{
                            action: 'add',
                            itemId: 'btnAdicionar',
                            text: futureLang.lbAdd,
                            tooltip: futureLang.lbAdd2,
                            iconCls: 'fa fa-plus bluedark-button'
                        },
                        {
                            action: 'mod',
                            itemId: 'btnModificar',
                            text: futureLang.lbMod,
                            tooltip: futureLang.lbMod2,
                            iconCls: 'fa fa-edit bluedark-button',
                            disabled: true
                        },
                        {
                            action: 'del',
                            itemId: 'btnEliminar',
                            text: futureLang.lbDel,
                            tooltip: futureLang.lbDel2,
                            iconCls: 'fa fa-trash bluedark-button',
                            disabled: true
                        },
                        '-', '->', {
                            xtype: 'searchfield', store: 'Tipodpa', id: 'sfTipodpa',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Tipodpa');
                                store.clearFilter(true);
                                store.load({params: {criterio: Ext.getCmp('sfTipodpa').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Tipodpa');
                                store.load({params: {criterio: Ext.getCmp('sfTipodpa').getValue()}});
                            }
                        }
                    ]
                }],
            columns: [{xtype: 'rownumberer'},
                {name: 'denominacion', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {
                    header: futureLang.lbDenominacion,
                    dataIndex: 'denominacion',
                    flex: 1,
                    field: {xtype: 'textfield'},
                    sortable: true
                }, {
                    header: futureLang.lbEstado,
                    dataIndex: 'estado',
                    align: 'center',
                    width: 100,
                    field: {xtype: 'combobox', store: Ext.create('Ext.data.Store', {
                            fields: ['idestado', 'estado'],
                            data: [{"idestado": 1, "estado": futureLang.lbActivo}, {"idestado": 2, "estado": futureLang.lbInactivo}]
                        }),
                        displayField: 'tipo', valueField: 'idestado', hiddenName: 'idestado', queryMode: 'local', anchor: '100%',
                        editable: true, typeAhead: true, forceSelection: true, selectOnFocus: true,
                        emptyText: futureLang.lbSeleccione, itemSelector: 'div.search-item',
                        tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item search-item"><div class="name-item">{estado}</div></div>',
                                '</tpl>'
                                ),
                        displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{estado}',
                                '</tpl>'
                                )},
                    renderer: function(val, metadata, record) {
                        if (parseInt(record.data.estado) === 1) {
                            return '<span class="label label-success"> ' + futureLang.lbActivo + ' </span>';
                        } else {
                            return '<span class="label label-danger"> ' + futureLang.lbInactivo + ' </span>';
                        }
                    },
                    sortable: true
                },
                {
                    header: futureLang.lbInicio,
                    dataIndex: 'inicio',
                    align: 'center',
                    width: 100,
                    hidden: true,
                    sortable: true,
                    renderer: format_Fecha,
                    field: {xtype: 'datefield', format: 'd/m/Y'}
                },
                {
                    header: futureLang.lbFin,
                    dataIndex: 'fin',
                    align: 'center',
                    width: 100,
                    hidden: true,
                    sortable: true,
                    renderer: format_Fecha,
                    field: {xtype: 'datefield', format: 'd/m/Y'}
                },
                {
                    header: futureLang.lbAcciones,
                    align: 'center',
                    xtype: 'actioncolumn',
                    width: 55,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reTipodpa.startEdit(selection, 0);
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
                                    var denomDpa = selection.data.denominacion;
                                    function confirmar(btn) {
                                        if (btn === 'ok') {
                                            if (selection) {
                                                grid.getStore().remove(selection);
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, denomDpa), confirmar);
                                } else {
                                    showMsg(0, futureLang.lbSelDel);
                                }
                            }
                        }]
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar', pageSize: 20, store: 'Tipodpa', displayInfo: true, dock: 'bottom', plugins: new Ext.ux.ProgressBarPager()}
        });
        this.callParent(arguments);
    }
});
