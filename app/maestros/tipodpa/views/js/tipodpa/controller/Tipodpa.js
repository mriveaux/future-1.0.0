/* global Ext */
Ext.define('Tipodpa.controller.Tipodpa', {
    extend: 'Ext.app.Controller',
    stores: ['Tipodpa'],
    models: ['Tipodpa'],
    views: ['List'],
    refs: [{ref: 'list', selector: 'grid'}],
    init: function () {
        this.control({
            'tipodpalist': {
                selectionchange: this.toggleBtn
            },
            'tipodpalist button[action=add]': {
                click: this.addTipodpa
            },
            'tipodpalist button[action=mod]': {
                click: this.editTipodpa
            },
            'tipodpalist button[action=del]': {
                click: this.delTipodpa
            },
            'territorioedit button[action=save]': {
                click: this.updateTipodpa
            }
        });
    },
    addTipodpa: function () {
        var Tipodpa = this.getModel('Tipodpa');
        this.getList().getStore().insert(0, new Tipodpa());
        this.getList().reTipodpa.startEdit(0, 0);
    },
    editTipodpa: function (grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            me.getList().reTipodpa.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }

    },
    delTipodpa: function (grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            var nombTipodpa = selection.data.denominacion;
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        me.getList().getStore().remove(selection);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, denomDpa), confirmar);
        } else {
            showMsg(0, futureLang.lbSelDel);
        }
    },
    updateTipodpa: function (button) {
        var win = button.up('window'),
                form = win.down('form'),
                record = form.getRecord(),
                values = form.getValues();

        record.set(values);
        win.close();
        this.getTipodpaStore().sync();
    },
    toggleBtn: function (selModel, selections) {
        this.getList().down('#btnModificar').setDisabled(selections.length === 0);
        this.getList().down('#btnEliminar').setDisabled(selections.length === 0);
    }
});
