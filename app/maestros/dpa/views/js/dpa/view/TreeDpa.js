/* global Ext, futureLang */
Ext.define('Dpa.view.TreeDpa', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.tree_dpa',
    id: 'tpDpa',
    autoHeight: true,
    useArrows: true,
    rootVisible: true,
    initComponent: function () {
        var tree = this;
        var treeStore = Ext.create('Ext.data.TreeStore', {
            storeId: 'tsDpaPais',
            model: 'Dpa.model.Treedpa',
            defaultRootProperty: 'text',
            defaultRootText: futureLang.lbDpa,
            defaultRootId: 0,
            autoLoad: false,
            autoSync: true,
//            nodeParam:'id',
            proxy: {type: 'ajax', url: 'getdpapais', reader: {type: 'json', root: 'data'}},
            root: {expanded: true},
            folderSort: false, sorters: [{property: 'codigo', direction: 'ASC'}],
            listeners: {
                'beforeload': function (st, op, eOpts) {
                    if (Ext.getCmp('cbPais') && Ext.getCmp('cbPais').getValue()) {
                        st.getProxy().extraParams = {
                            idpais: Ext.getCmp('cbPais').getValue()
                        };
                    }
                },
                'load': function (st, node, records, successful, eOpts) {
                    if (node.hasChildNodes()) {
                        Ext.getCmp('btnActualizar').setDisabled(false);
                    }
                }
            }
        });
        Ext.apply(tree, {
            dockedItems: [{xtype: 'toolbar',
                    items: [
                        {
                            itemId: 'cbPais',
                            xtype: 'combobox',
                            queryMode: 'local',
                            width: 300,
                            store: 'Pais',
                            id: 'cbPais',
                            valueField: 'idpais',
                            hiddenName: 'idpais',
                            displayField: 'pais',
                            emptyText: futureLang.lbSeleccione,
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
                                select: function (cb, rc, op) {
                                    Ext.getCmp('tpDpa').enable();
                                    Ext.getCmp('tpDpa').getStore().reload();
                                    Ext.getCmp('tpDpa').getRootNode().expand();
                                    Ext.getCmp('btnAdicionar').enable();
                                    if (cb.getValue()) {
                                        var stTipodpa = Ext.data.StoreManager.lookup('Tipodpa');
                                        stTipodpa.getProxy().extraParams.idpais = cb.getValue();
                                        stTipodpa.load();
                                    }
                                }
                            }
                        }, '-', {action: 'add', itemId: 'btnAdicionar', id: 'btnAdicionar', text: futureLang.lbAdd, tooltip: futureLang.lbAdd2, iconCls: 'fa fa-plus bluedark-button', disabled: true}, {action: 'mod', itemId: 'btnModificar', text: futureLang.lbMod, tooltip: futureLang.lbMod2, iconCls: 'fa fa-edit bluedark-button', disabled: true}, {action: 'del', itemId: 'btnEliminar', text: futureLang.lbDel, tooltip: futureLang.lbDel2, iconCls: 'fa fa-trash bluedark-button', disabled: true}, '->', {action: 'up', itemId: 'btnActualizar', id: 'btnActualizar', tooltip: futureLang.lbUpdate2, iconCls: 'fa fa-refresh bluedark-button', disabled: true}, '-', {xtype: 'searchfield', id: 'sfDpa', store: treeStore,
                            fnOnSearch: function () {
                                var store = Ext.data.StoreManager.lookup('tsDpaPais');
                                store.clearFilter(true);
                                store.load({params: {criterio: Ext.getCmp('sfDpa').getValue()}});
                            },
                            fnOnClear: function () {
                                var store = Ext.data.StoreManager.lookup('tsDpaPais');
                                store.load({params: {criterio: Ext.getCmp('sfDpa').getValue()}});
                            }
                        }
                    ]}],
            store: treeStore,
            columns: [{
                    text: 'idpadre',
                    dataIndex: 'idpadre',
                    hidden: true
                }, {
                    text: 'id',
                    dataIndex: 'id',
                    hidden: true
                }, {
                    text: 'idtipodpa',
                    dataIndex: 'idtipodpa',
                    hidden: true
                }, {
                    text: 'idpais',
                    dataIndex: 'idpais',
                    hidden: true
                }, {
                    text: 'iddpapais',
                    dataIndex: 'iddpapais',
                    hidden: true
                }, {
                    xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: futureLang.lbDenominacion,
                    flex: 1,
                    sortable: true,
                    dataIndex: 'text'
                }, {
                    text: futureLang.lbCodigo,
                    flex: 1,
                    dataIndex: 'codigo',
                    sortable: true
                }, {
                    text: futureLang.lbTipoDpa,
                    flex: 1,
                    dataIndex: 'tipodpa',
                    sortable: true
                }, {
                    text: futureLang.lbEstado,
                    flex: 1,
                    align: 'center',
                    dataIndex: 'estado',
                    sortable: true,
//                    xtype: 'booleancolumn',
//                    trueText: '<span class="label label-success"> ' + futureLang.lbActivo + ' </span>',
//                    falseText: '<span class="label label-danger"> ' + futureLang.lbInactivo + ' </span>',
                    xtype: 'templatecolumn',
                    tpl: Ext.create('Ext.XTemplate', "<tpl if='id &gt; 0'>{estado:this.formatStatus}</tpl>", {
                        formatStatus: function (v) {
                            if (v == true) {
                                return '<span class="label label-success"> ' + futureLang.lbActivo + ' </span>';
                            } else {
                                return '<span class="label label-danger"> ' + futureLang.lbInactivo + ' </span>';
                            }
                        }
                    })
                }, {
                    text: futureLang.lbAcciones,
                    width: 100,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    align: 'center',
                    items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbMod2,
                            scope: this,
                            handler: function (treeSel, rowIndex, colIndex, actionItem, event, record, row) {
                                var fpData = Ext.getCmp('pnlDataDpa');
                                fpData.enable();
                                fpData.expand();
                                fpData.getForm().url = 'moddpa';
                                if (treeSel.getSelectionModel().hasSelection()) {
                                    treeSel.getSelectionModel().setLocked(true);
                                    var selection = treeSel.getSelectionModel().getSelection()[0];
                                    fpData.loadRecord(selection);
                                } else {
                                    showMsg(0, futureLang.lbSelMod);
                                }
                            },
                            isDisabled: function (view, rowIdx, colIdx, item, record) {
                                return parseInt(record.data.id) === 0;
                            }
                        }, {
                            iconCls: 'fa fa-trash bluedark-button',
                            tooltip: futureLang.lbDel2,
                            scope: this,
                            handler: function (treeSel, rowIndex, colIndex, actionItem, event, record, row) {
                                if (treeSel.getSelectionModel().hasSelection()) {
                                    var selection = treeSel.getSelectionModel().getSelection()[0];
                                    var nombDpa = selection.data.text;
                                    var idDpa = selection.data.id;
                                    function confirmar(btn) {
                                        if (btn === 'ok') {
                                            if (selection) {
                                                Ext.Msg.wait(futureLang.lbDeleting, futureLang.lbPlease);
                                                Ext.Ajax.request({
                                                    url: 'deldpa',
                                                    method: 'POST',
                                                    params: {id: idDpa},
                                                    callback: function (options, success, response) {
                                                        Ext.Msg.hide();
                                                        var responseData = Ext.decode(response.responseText);
                                                        if (parseInt(responseData) === 1) {
                                                            showMsg(1, futureLang.lbDelOk);
                                                            treeSel.getStore().reload();
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombDpa), confirmar);
                                } else {
                                    showMsg(0, futureLang.lbSelDel);
                                }
                            },
                            isDisabled: function (view, rowIdx, colIdx, item, record) {
                                return !record.data.leaf;
                            }
                        }]
                }]
        });
        this.callParent(arguments);
    }
});