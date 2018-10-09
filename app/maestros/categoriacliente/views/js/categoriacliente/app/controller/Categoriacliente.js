/* global Ext */
Ext.define('Categoriacliente.controller.Categoriacliente', {
    extend: 'Ext.app.Controller',
    stores: ['Categoriacliente', 'Sector', 'Tiposervicio'],
    models: ['Categoriacliente', 'Sector', 'Tiposervicio'],
    views: ['List'],
    refs: [{ref: 'list', selector: 'grid'}],
    init: function() {
        this.control({
            'categoriaclientelist': {
                selectionchange: this.toggleBtn
            },
            'categoriaclientelist button[action=add]': {
                click: this.addCategoriacliente
            },
            'categoriaclientelist button[action=mod]': {
                click: this.editCategoriacliente
            },
            'categoriaclientelist button[action=del]': {
                click: this.delCategoriacliente
            }
        });
    },
    addCategoriacliente: function() {
        var Categoriacliente = this.getModel('Categoriacliente');
        this.getList().getStore().insert(0, new Categoriacliente());
        this.getList().reCategoriacliente.startEdit(0, 0);
    },
    editCategoriacliente: function(grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            this.getList().reCategoriacliente.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }
    },
    delCategoriacliente: function(grid, record) {
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
