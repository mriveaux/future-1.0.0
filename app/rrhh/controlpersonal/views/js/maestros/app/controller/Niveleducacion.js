Ext.define('Maestros.controller.Niveleducacion', {
    extend: 'Ext.app.Controller',
    views: ['niveleducacion.List'],
    stores: ['Niveleducacion'],
    model: ['Niveleducacion'],
    refs: [{
            ref: 'list_niveleducacion',
            selector: 'list_niveleducacion'
        }],
    init: function() {
        this.control({
            'list_niveleducacion': {
                itemdblclick: this.editNiveleducacion,
                selectionchange: this.toggleBtn
            },
            'list_niveleducacion button[action=add]': {
                click: this.addNiveleducacion
            },
            'list_niveleducacion button[action=mod]': {
                click: this.editNiveleducacion
            },
            'list_niveleducacion button[action=del]': {
                click: this.delNiveleducacion
            }
        });
    },
    addNiveleducacion: function() {
        var Tp = this.getModel('Niveleducacion');
        this.getList_niveleducacion().getStore().insert(0, new Tp());
        this.getList_niveleducacion().reNiveleducacion.startEdit(0, 0);
    },
    editNiveleducacion: function(grid, record) {
        var selection = this.getList_niveleducacion().getSelectionModel().getSelection()[0];
        this.getList_niveleducacion().reNiveleducacion.startEdit(selection, 0);
    },
    delNiveleducacion: function(grid, record) {
        var me = this;
        var selection = me.getList_niveleducacion().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_niveleducacion().getStore().remove(selection);
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar nivel de educaci&oacute;n', 'message': '&iquest;Est&aacute; seguro que desea eliminar el nivel de educaci&oacute;n seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_niveleducacion().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_niveleducacion().down('#btnDel').setDisabled(selections.length === 0);
    }
});