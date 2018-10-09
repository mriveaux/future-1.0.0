/* global Ext */
Ext.define('Noconformidad.view.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.noconformidadlist', selType: 'rowmodel',
    initComponent: function () {
        var grid = this;
        this.reNoconformidad = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                canceledit: function (rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                    grid.getDockedComponent('topbar').enable();
                },
                beforeedit: function(editor, context, eOpts) {
                    grid.getDockedComponent('topbar').disable();
                },
                edit: function (editor, context, eOpts) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                }
            }
        });
        Ext.apply(grid, {
            id: 'gpList', store: 'Noconformidad', plugins: [this.reNoconformidad],
            dockedItems: [{xtype: 'toolbar', id: 'topbar',
                    items: [{action: 'add', itemId: 'btnAdicionar', text: futureLang.lbAdd, tooltip: futureLang.lbAdd2, iconCls: 'fa fa-plus bluedark-button'},
                        {action: 'mod', itemId: 'btnModificar', text: futureLang.lbMod, tooltip: futureLang.lbMod2, iconCls: 'fa fa-edit bluedark-button', disabled: true},
                        {action: 'del', itemId: 'btnEliminar', text: futureLang.lbDel, tooltip: futureLang.lbDel2, iconCls: 'fa fa-trash bluedark-button', disabled: true},
                        '-', '->', {
                            xtype: 'searchfield', store: 'Noconformidad',
                            fnOnSearch: function () {
                                var store = Ext.data.StoreManager.lookup('Noconformidad');
                                store.clearFilter(true);
                                store.load({params: {criterio: Ext.getCmp('sfNoconformidad').getValue()}});
                            },
                            fnOnClear: function () {
                                var store = Ext.data.StoreManager.lookup('Noconformidad');
                                store.load({params: {criterio: Ext.getCmp('sfNoconformidad').getValue()}});
                            }
                        }
                    ]}],
            columns: [{xtype: 'rownumberer'},
                {name: 'idnoconformidad', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {header: futureLang.lbNoConformidad, dataIndex: 'noconformidad', sortable: true, flex: 1, field: {xtype: 'textfield'}},
                {header: futureLang.lbEstado, dataIndex: 'estado', sortable: false, field: {xtype: 'numberfield'}, renderer: grid.showStatus},
                {header: futureLang.lbPorciento, dataIndex: 'percent', sortable: false, align: 'right', width: 75, field: {xtype: 'numberfield'}},
                {header: futureLang.lbFecha, dataIndex: 'fecha', sortable: false, align: 'center', width: 75, field: {xtype: 'datefield', format: 'd/m/Y'}, renderer: format_Fecha},
                {header: futureLang.lbUsuario, dataIndex: 'usuario', sortable: false, width: 200, field: {xtype: 'combobox'}},
                {header: futureLang.lbRuta, dataIndex: 'ruta', sortable: false, flex: 1, field: {xtype: 'textfield'}},
                {header: futureLang.lbImagen, dataIndex: 'imagen', sortable: false, flex: 1, align: 'center', width: 200, renderer: grid.showImage},
                {header: 'idusuario', dataIndex: 'idusuario', hideable: false, hidden: true, sortable: false},
                {
                    header: futureLang.lbAcciones,
                    align: 'center',
                    xtype: 'actioncolumn',
                    width: 55,
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod2,
                            scope: this,
                            handler: function (grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reTipodpa.startEdit(selection, 0);
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
                                    var nombNoconformidad = selection.data.noconformidad;
                                    function confirmar(btn) {
                                        if (btn === 'ok') {
                                            if (selection) {
                                                grid.getStore().remove(selection);
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombNoconformidad), confirmar);
                                } else {
                                    showMsg(0, futureLang.lbSelDel);
                                }
                            }
                        }]
                }
            ],
            bbar: {xtype: 'pagingtoolbar', pageSize: 20, store: 'Noconformidad', displayInfo: true, dock: 'bottom'
            }
        });
        this.callParent(arguments);
    },
    showStatus: function (value, record) {
        var statusNc = '';
        switch (parseInt(value)) {
            case 1:
                statusNc = '<span class="label label-danger"> ' + futureLang.lbIdentificada + ' </span>';
                break;
            case 2:
                statusNc = '<span class="label label-warning"> ' + futureLang.lbAnalizada + ' </span>';
                break;
            case 3:
                statusNc = '<span class="label label-primary"> ' + futureLang.lbResuelta + ' </span>';
                break;
            default:
                statusNc = '<span class="label label-success"> ' + futureLang.lbTerminada + ' </span>';
                break;
        }
        return statusNc;
    },
    showImage: function (value, record) {
        var imgSrc = '"data:image/png;base64,' + value + '"';
        return '<img src=' + imgSrc + ' style="width:200px">';
    }
});
