/* global Ext, futureLang */
Ext.define('Cubasoft.controller.Territorio', {
    extend: 'Ext.app.Controller',
    stores: ['Territorio'],
    models: ['Territorio'],
    views: ['territorio.List'],
    refs: [{ref: 'list', selector: 'grid'}],
    init: function () {
        this.control({
            'territoriolist': {
                selectionchange: this.toggleBtn
            },
            'territoriolist button[action=add]': {
                click: this.addTerritorio
            },
            'territoriolist button[action=mod]': {
                click: this.editTerritorio
            },
            'territoriolist button[action=del]': {
                click: this.delTerritorio
            }
        });
    },
    toggleBtn: function (selModel, selections) {
        this.getList().down('#btnModificar').setDisabled(selections.length === 0);
        this.getList().down('#btnEliminar').setDisabled(selections.length === 0);
    },
    addTerritorio: function () {
        var Terr = this.getModel('Territorio');
        this.getList().getStore().insert(0, new Terr());
        this.getList().reTerritorio.startEdit(0, 0);
    },
    editTerritorio: function (grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            this.getList().reTerritorio.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }
    },
    delTerritorio: function (grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            var nombTerritorio = selection.data.nombre;
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        me.getList().getStore().remove(selection);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombTerritorio), confirmar);
        } else {
            showMsg(1, futureLang.lbSelDel);
        }
    }
});