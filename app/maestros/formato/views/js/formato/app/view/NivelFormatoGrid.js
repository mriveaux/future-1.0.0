/* global Ext, futureLang */
Ext.define('Formato.view.NivelFormatoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.nivelformato_grid',
    store: 'Formato.store.NivelFormato',
    title: futureLang.lbParteFormatos,
    disabled: true,
    initComponent: function () {
        var grid = this;
        this.reParteFormato = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                canceledit: function (editor, context, eOpts) {
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
        grid.plugins = [this.reParteFormato];
        grid.selModel = Ext.create('Ext.selection.RowModel');
        grid.tbar = [
            {
                text: futureLang.lbAdd, tooltip: futureLang.lbAdd3,
                iconCls: 'fa fa-plus bluedark-button',
                action: 'addNivelFormato'
            },
            {
                text: futureLang.lbMod, tooltip: futureLang.lbMod3,
                iconCls: 'fa fa-edit bluedark-button',
                disabled: true,
                action: 'modNivelFormato'
            },
            {
                text: futureLang.lbDel, tooltip: futureLang.lbDel3,
                iconCls: 'fa fa-trash bluedark-button',
                disabled: true,
                action: 'deleteNivelFormato'
            },
            '->', {
                xtype: 'searchfield', store: 'Formato', id: 'sfNivelFormato',
                filterPropertysNames: ['parteformato', 'abreviatura'],
                fnOnSearch: function () {
                    var store = Ext.data.StoreManager.lookup('NivelFormato');
                    store.load({params: {criterio: Ext.getCmp('sfNivelFormato').getValue()}});
                },
                fnOnClear: function () {
                    var store = Ext.data.StoreManager.lookup('NivelFormato');
                    store.load({params: {criterio: Ext.getCmp('sfNivelFormato').getValue()}});
                }
            }
        ];
        grid.columns = [
            {
                header: futureLang.lbParteFormato,
                dataIndex: 'parteformato',
                flex: 1,
                editor: {xtype: 'textfield'}
            },
            {
                header: futureLang.lbAbreviatura,
                dataIndex: 'abreviatura',
                width: 120,
                field: {xtype: 'textfield'}
            },
            {
                header: futureLang.lbNivel,
                dataIndex: 'nivel',
                width: 60,
                align: 'right',
                field: {xtype: 'numberfield'}
            },
            {
                header: futureLang.lbLongitud,
                dataIndex: 'longitud',
                width: 60,
                align: 'right',
                field: {xtype: 'numberfield'}
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
                        tooltip: futureLang.lbMod3,
                        scope: this,
                        handler: function (grid2, rowIndex) {
                            if (grid.getSelectionModel().hasSelection()) {
                                var selection = grid.getSelectionModel().getSelection()[0];
                                grid.reParteFormato.startEdit(selection, 0);
                            } else {
                                showMsg(0, futureLang.lbSelMod2);
                            }
                        }
                    }, {
                        iconCls: 'fa fa-trash bluedark-button',
                        tooltip: futureLang.lbDel3,
                        scope: this,
                        handler: function (grid2, rowIndex) {
                            if (grid.getSelectionModel().hasSelection()) {
                                var selection = grid.getSelectionModel().getSelection()[0];
                                var nombParteFormato = selection.data.parteformato;

                                function confirmar(btn) {
                                    if (btn === 'ok') {
                                        if (selection) {
                                            grid.getStore().remove(selection);
                                        }
                                    }
                                }
                                MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar2, nombParteFormato), confirmar);
                            } else {
                                showMsg(0, futureLang.lbSelDel2);
                            }
                        }
                    }]
            }
        ];
        grid.bbar = Ext.create('Ext.toolbar.Paging', {
            displayInfo: true,
            store: grid.store
        });
        this.callParent(arguments);
    }
});