/* global Ext */
Ext.define('Cubasoft.view.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.monedalist',
    selType: 'rowmodel',
    columnLines: true,
    forceFit: true,
    viewConfig: {stripeRows: true},
    initComponent: function() {
        var grid = this;
        this.reMoneda = Ext.create('Ext.grid.plugin.RowEditing', {
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
            id: 'gpList',
            store: 'Moneda',
            plugins: [this.reMoneda],
            dockedItems: [{xtype: 'toolbar', id: 'topbar',
                    items: [{
                            action: 'add',
                            itemId: 'btnAdicionar',
                            text: futureLang.lbAdd,
                            tooltip: futureLang.lbAdd2,
                            iconCls: 'fa fa-plus bluedark-button'
                        }, {
                            action: 'mod',
                            itemId: 'btnModificar',
                            text: futureLang.lbMod,
                            tooltip: futureLang.lbMod2,
                            iconCls: 'fa fa-edit bluedark-button',
                            disabled: true
                        }, {
                            action: 'del',
                            itemId: 'btnEliminar',
                            text: futureLang.lbDel,
                            tooltip: futureLang.lbDel2,
                            iconCls: 'fa fa-trash bluedark-button',
                            disabled: true
                        }, '-', '->', {
                            xtype: 'searchfield',
                            store: 'Moneda',
                            id: 'sfMoneda',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Moneda');
                                store.clearFilter(true);
                                store.load({params: {criterio: Ext.getCmp('sfMoneda').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Moneda');
                                store.load({params: {criterio: Ext.getCmp('sfMoneda').getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {xtype: 'rownumberer'},
                {name: 'id', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {header: futureLang.lbCodNum, dataIndex: 'codigonum', align: 'right', field: {xtype: 'textfield', maskRe: /[\d\.]/i, regex: /^[\d\.]{3}$/, regexText: 'La cantidad m&aacute;xima son 3 d&iacute;gitos'}, sortable: true},
                {header: futureLang.lbCodISO, dataIndex: 'codigoiso', field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbMoneda, dataIndex: 'moneda', field: {xtype: 'textfield'}, sortable: true},
                {flex: 1, header: futureLang.lbPais, dataIndex: 'pais', field: {
                        xtype: 'combobox',
                        queryMode: 'local',
                        store: 'Pais',
                        valueField: 'pais',
                        hiddenName: 'idpais',
                        displayField: 'pais',
                        typeAhead: true,
                        forceSelection: true,
                        tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div data-qtip="{siglas} - {nacionalidad}" class="x-boundlist-item">{pais}</div>',
                                '</tpl>'
                                ),
                        displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{pais}',
                                '</tpl>'
                                ),
                        listeners: {
                            select: function(cb, rc, op) {
                                var stMoneda = Cubasoft.getApplication().getController('Moneda').getMonedaStore();
                                stMoneda.on({
                                    beforesync: function() {
                                        stMoneda.getProxy().extraParams.idpais = cb.findRecordByValue(cb.getValue()).get('idpais');
                                    }
                                });
                            }
                        }
                    }, sortable: true},
                {header: futureLang.lbSimbolo, dataIndex: 'simbolo', field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbPresicion, dataIndex: 'presicion', align: 'right', field: {xtype: 'numberfield', allowDecimals: true, step: 1}, sortable: true},
                {xtype: 'numbercolumn', format: '0.000000', header: futureLang.lbFactorRedondeo, dataIndex: 'factorredondeo', align: 'right', field: {xtype: 'numberfield', allowDecimals: true}, sortable: true},
                {header: futureLang.lbAcciones, align: 'center', xtype: 'actioncolumn', width: 55, sortable: false, menuDisabled: true, items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod2,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reMoneda.startEdit(selection, 0);
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
                                    var nombMoneda = selection.data.moneda;
                                    function confirmar(btn) {
                                        if (btn === 'ok') {
                                            if (selection) {
                                                grid.getStore().remove(rowIndex);
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombMoneda), confirmar);
                                } else {
                                    showMsg(0, futureLang.lbSelDel);
                                }
                            }
                        }]}
            ],
            bbar: {xtype: 'pagingtoolbar', pageSize: 20, store: 'Moneda', displayInfo: true, dock: 'bottom', plugins: new Ext.ux.ProgressBarPager()}
        });
        this.callParent(arguments);
    }
});