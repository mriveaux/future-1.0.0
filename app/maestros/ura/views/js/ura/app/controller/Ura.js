/* global Ext */
Ext.define('Ura.controller.Ura', {
    extend: 'Ext.app.Controller',
    stores: ['Ura', 'Centroatencion'],
    models: ['Ura', 'Centroatencion'],
    views: ['List', 'CentroatencionList'],
    refs: [{ref: 'uralist', selector: 'uralist'}, {ref: 'centroatencionList', selector: 'centroatencionList'}],
    init: function() {
        this.control({
            'uralist': {
                selectionchange: this.toggleBtn
            },
            'uralist button[action=add]': {
                click: this.addUra
            },
            'uralist button[action=mod]': {
                click: this.editUra
            },
            'uralist button[action=del]': {
                click: this.delUra
            },
            'centroatencionlist': {
                selectionchange: this.loadItem
            }
        });
    },
    addUra: function() {
        var Ura = this.getModel('Ura');
        this.getUralist().getStore().insert(0, new Ura());
        this.getUralist().reUra.startEdit(0, 0);
    },
    editUra: function(grid, record) {
        var selection = this.getUralist().getSelectionModel().getSelection()[0];
        this.getUralist().reUra.startEdit(selection, 0);
    },
    delUra: function(grid, record) {
        var me = this;
        var selection = this.getUralist().getSelectionModel().getSelection()[0];
        function confirmar(btn) {
            if (btn === 'ok') {
                if (selection) {
                    me.getUralist().getStore().remove(selection);
                    me.getUralist().getStore().sync();
                }
            }
        }
        MensajeInterrogacion(Ext.lang.titles[2], futureLang.lbMsgConfirmar, confirmar);
    },
    toggleBtn: function(selModel, selections) {
        this.getUralist().down('#btnModificar').setDisabled(selections.length === 0);
        this.getUralist().down('#btnEliminar').setDisabled(selections.length === 0);
    },
    loadItem: function(sm, selected) {
        var me = this;
        if (sm.hasSelection()) {
            me.getUralist().setDisabled(true);
            me.getUralist().getStore().proxy.extraParams.identidad = selected[0].data.identidad;
            me.getUralist().getStore().load({
                callback: function() {
                    me.getUralist().setDisabled(false);
                }
            });
        }
    }
});
