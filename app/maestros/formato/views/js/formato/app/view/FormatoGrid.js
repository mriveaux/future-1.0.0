/* global Ext, futureLang, singleSelect, heredar */
Ext.define('Formato.view.FormatoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.formato_grid',
    title: futureLang.lbFormatos,
    singleSelect: this.singleSelect || true,
    heredar: this.heredar || false,
    initComponent: function () {
        var grid = this;
        this.reFormato = Ext.create('Ext.grid.plugin.RowEditing', {
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
        grid.plugins = [this.reFormato];
        grid.store = Ext.create('Formato.store.Formato', {
            proxy: {
                type: 'rest',
                url: grid.heredar ? 'loadDataHeredar' : 'getformatos',
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    root: 'data',
                    totalProperty: 'total',
                    idProperty: 'idformato',
                    successProperty: 'success',
                    messageProperty: 'mensaje'
                }
            }
        });
        if (grid.singleSelect) {
            grid.selModel = Ext.create('Ext.selection.RowModel');
        } else {
            grid.selModel = Ext.create('Ext.selection.CheckboxModel');
        }
        grid.tbar = [
            {
                text: futureLang.lbAdd,
                tooltip: futureLang.lbAdd2,
                iconCls: 'fa fa-plus bluedark-button',
                action: 'addFormato'
            },
            {
                text: futureLang.lbMod,
                tooltip: futureLang.lbMod2,
                iconCls: 'fa fa-edit bluedark-button',
                disabled: true,
                action: 'modFormato'
            },
            {
                text: futureLang.lbDel,
                tooltip: futureLang.lbDel2,
                iconCls: 'fa fa-trash bluedark-button',
                disabled: true,
                action: 'deleteFormato'
            },
            {
                text: futureLang.lbHeredar,
                tooltip: futureLang.lbHeredar2,
                iconCls: 'fa fa-download bluedark-button',
                disabled: true,
                hidden: true,
                action: 'heredarFormato'
            },
            '->', {
                xtype: 'searchfield', store: 'Formato', id: 'sfFormato',
                filterPropertysNames: ['formato', 'descripcion'],
                fnOnSearch: function () {
                    var store = Ext.data.StoreManager.lookup('Formato');
                    store.load({params: {criterio: Ext.getCmp('sfFormato').getValue()}});
                },
                fnOnClear: function () {
                    var store = Ext.data.StoreManager.lookup('Formato');
                    store.load({params: {criterio: Ext.getCmp('sfFormato').getValue()}});
                }
            }
        ];
        grid.columns = [{xtype: 'rownumberer'}, {
                header: futureLang.lbFormato,
                dataIndex: 'formato',
                flex: 1,
                field: {xtype: 'textfield', selectOnFocus: true}
            }, {
                header: futureLang.lbSeparador,
                dataIndex: 'separador',
                align: 'center',
                width: 60,
                field: {xtype: 'textfield'}
            }, {
                header: futureLang.lbModulo,
                dataIndex: 'modulo',
                width: 140,
                sortable: true,
                field: {
                    xtype: 'combobox', 
                    store: 'Formato.store.Modulo',
                    displayField: 'modulo', valueField: 'idmodulo', hiddenName: 'idmodulo', queryMode: 'local', anchor: '100%',
                    editable: true, typeAhead: true, forceSelection: true,
                    emptyText: futureLang.lbSeleccione, itemSelector: 'div.search-item',
                    tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item search-item"><div class="name-item">{modulo}</div><div class="desc-item">{descripcion}</div></div>',
                            '</tpl>'
                            ),
                    displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '{modulo}',
                            '</tpl>'
                            )}
            }, {
                header: futureLang.lbEstandar,
                dataIndex: 'estandar',
                align: 'center',
                width: 60,
                renderer: function (value, metadata, record, rowIdex, colIndex, store, view) {
                    return (record.data.estandar == '1') ? futureLang.lbSi : futureLang.lbNo;
                },
                field: {xtype: 'combobox', store: Ext.create('Ext.data.Store', {
                        fields: ['idestandar', 'estandar'],
                        data: [{idestandar: 1, "estandar": futureLang.lbSi}, {idestandar: 0, "estandar": futureLang.lbNo}]
                    }),
                    displayField: 'estandar', valueField: 'idestandar', hiddenName: 'idestandar', queryMode: 'local', anchor: '100%',
                    editable: true, typeAhead: true, forceSelection: true,
                    emptyText: futureLang.lbSeleccione, itemSelector: 'div.search-item',
                    tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item search-item"><div class="name-item">{estandar}</div></div>',
                            '</tpl>'
                            ),
                    displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '{estandar}',
                            '</tpl>'
                            )}
            }, {
                header: futureLang.lbDescripcion,
                dataIndex: 'descripcion',
                flex: 1,
                field: {xtype: 'textfield'}
            }, {
                header: futureLang.lbLongitud,
                dataIndex: 'longitud',
                align: 'right',
                width: 60
            }, {
                header: futureLang.lbEstructura,
                dataIndex: 'estructura',
                width: 150,
                sortable: true
            }, {
                header: futureLang.lbVistaPrevia,
                dataIndex: 'vistap',
                width: 130
            }, {
                header: futureLang.lbPropietario,
                hidden: (grid.heredar == false) ? false : true,
                dataIndex: 'propietario',
                align: 'center',
                width: 60,
                renderer: function (value, metadata, record) {
                    return (record.data.propietario) ? futureLang.lbSi : futureLang.lbNo;
                }
            }, {
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
                                grid.reSucursal.startEdit(selection, 0);
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
                                var nombFormato = selection.data.formato;
                                function confirmar(btn) {
                                    if (btn === 'ok') {
                                        if (selection) {
                                            grid.getStore().remove(selection);
                                        }
                                    }
                                }
                                MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombFormato), confirmar);
                            } else {
                                showMsg(0, futureLang.lbSelDel);
                            }
                        }
                    }]
            }];
        grid.bbar = Ext.create('Ext.toolbar.Paging', {
            displayInfo: true,
            store: grid.store
        });
        this.callParent(arguments);
    }
});