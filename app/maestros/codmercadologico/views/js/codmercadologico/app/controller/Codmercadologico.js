/* global Ext */
Ext.define('Codmercadologico.controller.Codmercadologico', {
    extend: 'Ext.app.Controller',
    stores: ['Codmercadologico', 'Categoriaservicio'],
    models: ['Codmercadologico', 'Categoriaservicio'],
    views: ['List'],
    refs: [{ref: 'list', selector: 'grid'}],
    init: function() {
        this.control({
            'codmercadologicolist': {
                selectionchange: this.toggleBtn
            },
            'codmercadologicolist button[action=add]': {
                click: this.addCodmercadologico
            },
            'codmercadologicolist button[action=mod]': {
                click: this.editCodmercadologico
            },
            'codmercadologicolist button[action=del]': {
                click: this.delCodmercadologico
            }
        });
    },
    addCodmercadologico: function() {
        var Codmercadologico = this.getModel('Codmercadologico');
        this.getList().getStore().insert(0, new Codmercadologico());
        this.getList().reCodmercadologico.startEdit(0, 0);
    },
    editCodmercadologico: function(grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            me.getList().reCodmercadologico.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }

    },
    delCodmercadologico: function(grid, record) {
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
            showMsg(0, futureLang.lbSelDel);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList().down('#btnModificar').setDisabled(selections.length === 0);
        this.getList().down('#btnEliminar').setDisabled(selections.length === 0);
    }
});
