Ext.define('Maestros.controller.Estratificacion', {
    extend: 'Ext.app.Controller',
    views: ['estratificacion.List'],
    stores: ['Estratificacion'],
    model: ['Estratificacion'],
    refs: [{
            ref: 'list_estratificacion',
            selector: 'list_estratificacion'
        }],
    init: function() {
        this.control({
            'list_estratificacion': {
                itemdblclick: this.editEstratificacion,
                selectionchange: this.toggleBtn
            },
            'list_estratificacion button[action=add]': {
                click: this.addEstratificacion
            },
            'list_estratificacion button[action=mod]': {
                click: this.editEstratificacion
            },
            'list_estratificacion button[action=del]': {
                click: this.delEstratificacion
            }
        });
    },
    addEstratificacion: function() {
        var Tp = this.getModel('Estratificacion');
        this.getList_estratificacion().getStore().insert(0, new Tp());
        this.getList_estratificacion().reEstratificacion.startEdit(0, 0);
    },
    editEstratificacion: function(grid, record) {
        var selection = this.getList_estratificacion().getSelectionModel().getSelection()[0];
        this.getList_estratificacion().reEstratificacion.startEdit(selection, 0);
    },
    delEstratificacion: function(grid, record) {
        var me = this;
        var selection = me.getList_estratificacion().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_estratificacion().getStore().remove(selection);
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar estratificaci&oacute;n social', 'message': '&iquest;Est&aacute; seguro que desea eliminar la estratificaci&oacute;n social seleccionada?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_estratificacion().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_estratificacion().down('#btnDel').setDisabled(selections.length === 0);
    }
});