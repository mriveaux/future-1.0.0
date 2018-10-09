/* global Ext */
Ext.define('Sector.controller.Sector', {
    extend: 'Ext.app.Controller',
    stores: ['Sector'],
    models: ['Sector'],
    views: ['List'],
    refs: [{ref: 'list', selector: 'grid'}],
    init: function() {
        this.control({
            'sectorlist': {
                selectionchange: this.toggleBtn
            },
            'sectorlist button[action=add]': {
                click: this.addSector
            },
            'sectorlist button[action=mod]': {
                click: this.editSector
            },
            'sectorlist button[action=del]': {
                click: this.delSector
            }
        });
    },
    addSector: function() {
        var Sector = this.getModel('Sector');
        this.getList().getStore().insert(0, new Sector());
        this.getList().reSector.startEdit(0, 0);
    },
    editSector: function(grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            this.getList().reSector.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }
    },
    delSector: function(grid, record) {
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
