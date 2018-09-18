Ext.define('Maestros.controller.Tipocontacto', {
    extend: 'Ext.app.Controller',
    views: ['tipocontacto.List'],
    stores: ['Tipocontacto'],
    model: ['Tipocontacto'],
    refs: [{
            ref: 'list_tipocontacto',
            selector: 'list_tipocontacto'
        }],
    init: function() {
        this.control({
            'list_tipocontacto': {
                itemdblclick: this.editTipocontacto,
                selectionchange: this.toggleBtn
            },
            'list_tipocontacto button[action=add]': {
                click: this.addTipocontacto
            },
            'list_tipocontacto button[action=mod]': {
                click: this.editTipocontacto
            },
            'list_tipocontacto button[action=del]': {
                click: this.delTipocontacto
            }
        });
    },
    addTipocontacto: function() {
        var Tp = this.getModel('Tipocontacto');
        this.getList_tipocontacto().getStore().insert(0, new Tp());
        this.getList_tipocontacto().reTipocontacto.startEdit(0, 0);
    },
    editTipocontacto: function(grid, record) {
        var selection = this.getList_tipocontacto().getSelectionModel().getSelection()[0];
        this.getList_tipocontacto().reTipocontacto.startEdit(selection, 0);
    },
    delTipocontacto: function(grid, record) {
        var me = this;
        var selection = me.getList_tipocontacto().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_tipocontacto().getStore().remove(selection);
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar tipo de contacto', 'message': '&iquest;Est&aacute; seguro que desea eliminar el tipo de contacto seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_tipocontacto().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_tipocontacto().down('#btnDel').setDisabled(selections.length === 0);
    }
});