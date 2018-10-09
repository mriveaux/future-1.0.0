/* global Ext */
Ext.define('Tiposervicio.controller.Tiposervicio', {
    extend: 'Ext.app.Controller',
    stores: ['Tiposervicio'],
    models: ['Tiposervicio'],
    views: ['List'],
    refs: [{ref: 'list', selector: 'grid'}],
    init: function() {
        this.control({
            'tiposerviciolist': {
                selectionchange: this.toggleBtn
            },
            'tiposerviciolist button[action=add]': {
                click: this.addTiposervicio
            },
            'tiposerviciolist button[action=mod]': {
                click: this.editTiposervicio
            },
            'tiposerviciolist button[action=del]': {
                click: this.delTiposervicio
            }
        });
    },
    addTiposervicio: function() {
        var Tiposervicio = this.getModel('Tiposervicio');
        this.getList().getStore().insert(0, new Tiposervicio());
        this.getList().reTiposervicio.startEdit(0, 0);
    },
    editTiposervicio: function(grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            this.getList().reTiposervicio.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }
    },
    delTiposervicio: function(grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        me.getList().getStore().remove(selection);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], futureLang.lbMsgConfirmar, confirmar);
        } else {
            showMsg(1, futureLang.lbSelDel);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList().down('#btnModificar').setDisabled(selections.length === 0);
        this.getList().down('#btnEliminar').setDisabled(selections.length === 0);
    }
});
