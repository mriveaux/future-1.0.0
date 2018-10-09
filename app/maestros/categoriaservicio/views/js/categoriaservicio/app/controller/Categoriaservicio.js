/* global Ext */
Ext.define('Categoriaservicio.controller.Categoriaservicio', {
    extend: 'Ext.app.Controller',
    stores: ['Categoriaservicio'],
    models: ['Categoriaservicio'],
    views: ['List'],
    refs: [{ref: 'list', selector: 'grid'}],
    init: function() {
        this.control({
            'categoriaserviciolist': {
                selectionchange: this.toggleBtn
            },
            'categoriaserviciolist button[action=add]': {
                click: this.addCategoriaservicio
            },
            'categoriaserviciolist button[action=mod]': {
                click: this.editCategoriaservicio
            },
            'categoriaserviciolist button[action=del]': {
                click: this.delCategoriaservicio
            }
        });
    },
    addCategoriaservicio: function() {
        var Categoriaservicio = this.getModel('Categoriaservicio');
        this.getList().getStore().insert(0, new Categoriaservicio());
        this.getList().reCategoriaservicio.startEdit(0, 0);
    },
    editCategoriaservicio: function(grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            this.getList().reCategoriaservicio.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }
    },
    delCategoriaservicio: function(grid, record) {
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
