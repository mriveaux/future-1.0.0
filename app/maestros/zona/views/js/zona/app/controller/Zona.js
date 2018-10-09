/* global Ext */
Ext.define('Zona.controller.Zona', {
    extend: 'Ext.app.Controller',
    stores: ['Zona', 'Centroatencion'],
    models: ['Zona', 'Centroatencion'],
    views: ['List', 'CentroatencionList'],
    refs: [{ref: 'zonalist', selector: 'zonalist'}, {ref: 'centroatencionList', selector: 'centroatencionList'}],
    init: function() {
        this.control({
            'zonalist': {
                selectionchange: this.toggleBtn
            },
            'zonalist button[action=add]': {
                click: this.addZona
            },
            'zonalist button[action=mod]': {
                click: this.editZona
            },
            'zonalist button[action=del]': {
                click: this.delZona
            },
            'centroatencionlist': {
                selectionchange: this.loadItem
            }
        });
    },
    addZona: function() {
        var Zona = this.getModel('Zona');
        this.getZonalist().getStore().insert(0, new Zona());
        this.getZonalist().reZona.startEdit(0, 0);
    },
    editZona: function(grid, record) {
        var selection = this.getZonalist().getSelectionModel().getSelection()[0];
        this.getZonalist().reZona.startEdit(selection, 0);
    },
    delZona: function(grid, record) {
        var me = this;
        var selection = this.getZonalist().getSelectionModel().getSelection()[0];
        function confirmar(btn) {
            if (btn === 'ok') {
                if (selection) {
                    me.getZonalist().getStore().remove(selection);
                    me.getZonalist().getStore().sync();
                }
            }
        }
        MensajeInterrogacion(Ext.lang.titles[2], futureLang.lbMsgConfirmar, confirmar);
    },
    toggleBtn: function(selModel, selections) {
        this.getZonalist().down('#btnModificar').setDisabled(selections.length === 0);
        this.getZonalist().down('#btnEliminar').setDisabled(selections.length === 0);
    },
    loadItem: function(sm, selected) {
        var me = this;
        if (sm.hasSelection()) {
            me.getZonalist().setDisabled(true);
            me.getZonalist().getStore().proxy.extraParams.identidad = selected[0].data.identidad;
            me.getZonalist().getStore().load({
                callback: function() {
                    me.getZonalist().setDisabled(false);
                }
            });
        }
    }
});
