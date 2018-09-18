/* global Ext, futureLang */
Ext.define('Dpa.controller.Dpa', {
    extend: 'Ext.app.Controller',
    models: ['Pais', 'Tipodpa', 'Treedpa'],
    stores: ['Pais', 'Tipodpa'],
    views: ['TreeDpa', 'PanelDpa'],
    refs: [{ref: 'treedpa', selector: 'tree_dpa'}, {ref: 'paneldpa', selector: 'panel_dpa'}],
    urlSave: '',
    init: function () {
        var me = this;
        me.control({
            'tree_dpa': {
                selectionchange: me.toggleBtn
            },
            'tree_dpa button[action=add]': {
                click: me.addDpa
            },
            'tree_dpa button[action=mod]': {
                click: me.modDpa
            },
            'tree_dpa button[action=del]': {
                click: me.delDpa
            },
            'tree_dpa button[action=up]': {
                click: me.upDpa
            },
            'panel_dpa button[action=save]': {
                click: me.saveDpa
            },
            'panel_dpa button[action=cancel]': {
                click: me.resetAll
            }
        });
        me.getPaisStore().on({
            'beforeload': function () {
                showMask();
            },
            'load': function (store, records, successful, eOpts) {
                hideMask();
                me.getTreedpa().down('#cbPais').expand();
                me.getTreedpa().down('#cbPais').focus();
            }});
        me.getTipodpaStore().on({
            'beforeload': function (st) {
                if (me.getTreedpa().down('#cbPais') && me.getTreedpa().down('#cbPais').getValue())
                    showMask(Ext.String.format(futureLang.lbCargarConfDpa, me.getTreedpa().down('#cbPais').getRawValue()));
            },
            'load': function (store, records, successful, eOpts) {
                hideMask();
            }
        });
    },
    toggleBtn: function (selModel, selections) {
        var me = this;
        var valueRecord = selections[0];
        me.getTreedpa().down('#btnModificar').setDisabled(selections.length > 0 && valueRecord.data.id === 0);
        me.getTreedpa().down('#btnEliminar').setDisabled(selections.length > 0 && valueRecord.data.id === 0);
        me.getTreedpa().down('#btnActualizar').setDisabled(selections.length > 0 && valueRecord.data.id === 0);
        if (valueRecord && valueRecord.data.id !== 0)
            me.getPaneldpa().getForm().loadRecord(valueRecord);
    },
    addDpa: function () {
        var me = this, fpData = me.getPaneldpa();
        fpData.enable();
        fpData.expand();
        fpData.getForm().url = 'adddpa';
        fpData.getForm().reset();
        fpData.getForm().findField('estado').setValue(true);
        fpData.getForm().findField('text').focus(true, true);
        fpData.getForm().findField('idpais').setValue(me.getTreedpa().down('#cbPais').getValue());
        var selection = me.getTreedpa().getSelectionModel().getSelection()[0];
        fpData.getForm().findField('idpadre').setValue((selection) ? selection.data.id : null);
        me.getTreedpa().getSelectionModel().setLocked(true);
    },
    modDpa: function (grid, record) {
        var me = this, fpData = me.getPaneldpa();
        fpData.enable();
        fpData.expand();
        fpData.getForm().url = 'moddpa';
        var selection = me.getTreedpa().getSelectionModel().getSelection()[0];
        if (selection && selection.data.id !== 0) {
            fpData.loadRecord(selection);
            me.getTreedpa().getSelectionModel().setLocked(true);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }
    },
    saveDpa: function (button) {
        var me = this, fpData = me.getPaneldpa().getForm();
        if (fpData.isValid()) {
            var data = me.getPaneldpa().getForm().getValues();
            var selection = me.getTreedpa().getSelectionModel().getSelection()[0];
            data.idpadre = (selection) ? selection.data.id : null;
            data.idpais = me.getTreedpa().down('#cbPais').getValue();
            fpData.submit({
                waitMsg: futureLang.lbSaving,
                waitTitle: futureLang.lbPlease,
                method: 'POST',
                reset: true,
                params: Ext.encode(data),
                success: function (form, action) {
                    showMsg(1, futureLang.lbSaveOk);
                    me.resetAll();
                    me.upDpa();
                },
                failure: function (form, action) {
                    showMsg(3, futureLang.lbServerError);
                }
            });
        }

    },
    delDpa: function (grid, record) {
        var me = this;
        var selection = me.getTreedpa().getSelectionModel().getSelection()[0];
        if (selection) {
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
                                    me.resetAll();
                                    me.upDpa();
                                }
                            }
                        });
                    } else {
                        showMsg(0, futureLang.lbSelDel);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], String.fromCharCode(191) + Ext.String.format(futureLang.lbMsgConfirmar, nombDpa), confirmar);
        } else {
            showMsg(0, futureLang.lbSelDel);
        }
    },
    upDpa: function () {
        var me = this;
        me.getTreedpa().getStore().sync();
        me.getTreedpa().getStore().load({
            params: {idpais: me.getTreedpa().down('#cbPais').getValue(), node: 0}
        });
    },
    resetAll: function () {
        var me = this;
        me.getTreedpa().getSelectionModel().setLocked(false);
        me.getPaneldpa().getForm().reset();
        me.getPaneldpa().disable();
        me.getPaneldpa().collapse();
    }
});
