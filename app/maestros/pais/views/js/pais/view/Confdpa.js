/* global Ext */
Ext.define('Pais.view.Confdpa', {
    extend: 'Ext.window.Window', alias: 'widget.confdpa', layout: 'fit', autoShow: true,
    initComponent: function () {
        var me = this;
        me.tbar = [Ext.create('Ext.form.ComboBox', {
                displayField: 'denominacion', valueField: 'idtipodpa', hiddenName: 'idtipodpa', queryMode: 'local', anchor: '100%', width: '200',
                id: 'cbTipoDpa', emptyText: futureLang.lbSelect, editable: true, typeAhead: true, forceSelection: true, selectOnFocus: true, allowBlank: false,
                store: 'Tipodpa',
                listeners: {
                    'select': function (cmb) {
                        Ext.getCmp('btnAddTipoDpaPais').setDisabled(!(cmb.isValid() && Ext.getCmp('tpDpa').getSelectionModel().hasSelection()));
                    }
                }
            }), {
                xtype: 'button', id: 'btnAddTipoDpaPais', action: 'addtipodpapais',
                text: futureLang.lbAdd, tooltip: futureLang.lbAdicionarDpa, iconCls: 'fa fa-plus bluedark-button',
                disabled: true
            }, {
                xtype: 'button', id: 'btnDelTipoDpaPais', action: 'deltipodpapais',
                text: futureLang.lbDel, tooltip: futureLang.lbEliminarDpa, iconCls: 'fa fa-trash bluedark-button',
                disabled: true
            }];
        me.items = Ext.create('Ext.tree.Panel', {
            id: 'tpDpa',
            height: 400, width: 350, useArrows: true,
            store: Ext.create('Ext.data.TreeStore', {
                proxy: {type: 'ajax', url: 'getpaisdpa', reader: {type: 'json', root: 'data'}},
                root: {text: futureLang.lbDpa, id: 0, expanded: true}, autoSync: true,
                folderSort: true, sorters: [{property: 'text', direction: 'ASC'}],
                listeners: {
                    'beforeload': function (st, op) {
                        if (Ext.getCmp('gpList').getSelectionModel().hasSelection()) {
                            st.getProxy().extraParams = {
                                idpais: Ext.getCmp('gpList').getSelectionModel().getLastSelected().get('idpais')
                            };
                        }
                    },
                    'beforesync': function (st, op) {
                        if (Ext.getCmp('gpList').getSelectionModel().hasSelection()) {
                            st.getProxy().extraParams = {
                                idpais: Ext.getCmp('gpList').getSelectionModel().getLastSelected().get('idpais')
                            };
                        }
                    }
                }
            }),
            listeners: {
                'itemclick': function (tree, record, item, index, e, eOpts) {
                    Ext.getCmp('btnAddTipoDpaPais').setDisabled(!(item != null && Ext.getCmp('cbTipoDpa').isValid()));
                    Ext.getCmp('btnDelTipoDpaPais').setDisabled(!(item != null && record.data.id != 0 && record.data.leaf));
                }
            }
        });
        me.buttons = [{text: Ext.lang.btnCancel, scope: me, handler: me.close}];
        me.callParent(arguments);
    }
});