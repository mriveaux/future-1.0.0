Ext.define('Maestros.controller.Mediocontacto', {
    extend: 'Ext.app.Controller',
    views: ['mediocontacto.List'],
    stores: ['Mediocontacto'],
    model: ['Mediocontacto'],
    refs: [{
            ref: 'list_mediocontacto',
            selector: 'list_mediocontacto'
        }],
    init: function() {
        this.control({
            'list_mediocontacto': {
                itemdblclick: this.editMediocontacto,
                selectionchange: this.toggleBtn
            },
            'list_mediocontacto button[action=add]': {
                click: this.addMediocontacto
            },
            'list_mediocontacto button[action=mod]': {
                click: this.editMediocontacto
            },
            'list_mediocontacto button[action=del]': {
                click: this.delMediocontacto
            }
        });
    },
    addMediocontacto: function() {
        var Tp = this.getModel('Mediocontacto');
        this.getList_mediocontacto().getStore().insert(0, new Tp());
        this.getList_mediocontacto().reMediocontacto.startEdit(0, 0);
    },
    editMediocontacto: function(grid, record) {
        var selection = this.getList_mediocontacto().getSelectionModel().getSelection()[0];
        this.getList_mediocontacto().reMediocontacto.startEdit(selection, 0);
    },
    delMediocontacto: function(grid, record) {
        var me = this;
        var selection = me.getList_mediocontacto().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_mediocontacto().getStore().remove(selection);
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar medio de contacto', 'message': '&iquest;Est&aacute; seguro que desea eliminar el medio de contacto seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_mediocontacto().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_mediocontacto().down('#btnDel').setDisabled(selections.length === 0);
    }
});