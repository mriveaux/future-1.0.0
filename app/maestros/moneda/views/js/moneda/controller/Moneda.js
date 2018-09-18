/* global Ext */
Ext.define('Cubasoft.controller.Moneda', {
    extend: 'Ext.app.Controller',
    stores: ['Moneda', 'Pais'],
    models: ['Moneda', 'Pais'],
    views: ['List'],
    refs: [{ref: 'list', selector: 'grid'}],
    init: function () {
        var me = this;
        me.control({
            'monedalist': {
                selectionchange: this.toggleBtn
            },
            'monedalist button[action=add]': {
                click: this.addMoneda
            },
            'monedalist button[action=mod]': {
                click: this.editMoneda
            },
            'monedalist button[action=del]': {
                click: this.delMoneda
            }
        });
        me.getMonedaStore().on({
            beforeload: {fn: me.setExtraParams, scope: this}
        });
    },
    addMoneda: function () {
        var Terr = this.getModel('Moneda');
        this.getList().getStore().insert(0, new Terr());
        this.getList().reMoneda.startEdit(0, 0);
    },
    editMoneda: function (grid, record) {
        if (this.getList().getSelectionModel().hasSelection()) {
            var selection = this.getList().getSelectionModel().getSelection()[0];
            this.getList().reMoneda.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }
    },
    delMoneda: function (grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = this.getList().getSelectionModel().getSelection()[0];
            var nombMoneda = selection.data.moneda;
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        me.getList().getStore().remove(selection);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombMoneda), confirmar);
        } else {
            showMsg(0, futureLang.lbSelDel);
        }
    },
    toggleBtn: function (selModel, selections) {
        this.getList().down('#btnModificar').setDisabled(selections.length === 0);
        this.getList().down('#btnEliminar').setDisabled(selections.length === 0);
    },
    setExtraParams: function (store) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            me.getMonedaStore().getProxy().extraParams = {
                pais: me.getList().getSelectionModel().getLastSelected().get('pais')
            };
        }
    }
});