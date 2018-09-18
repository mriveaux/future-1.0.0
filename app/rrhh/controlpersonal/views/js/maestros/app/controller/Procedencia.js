Ext.define('Maestros.controller.Procedencia', {
    extend: 'Ext.app.Controller',
    views: ['procedencia.List'],
    stores: ['Procedencia'],
    model: ['Procedencia'],
    refs: [{
            ref: 'list_procedencia',
            selector: 'list_procedencia'
        }],
    init: function() {
        this.control({
            'list_procedencia': {
                itemdblclick: this.editProcedencia,
                selectionchange: this.toggleBtn
            },
            'list_procedencia button[action=add]': {
                click: this.addProcedencia
            },
            'list_procedencia button[action=mod]': {
                click: this.editProcedencia
            },
            'list_procedencia button[action=del]': {
                click: this.delProcedencia
            }
        });
    },
    addProcedencia: function() {
        var Tp = this.getModel('Procedencia');
        this.getList_procedencia().getStore().insert(0, new Tp());
        this.getList_procedencia().reProcedencia.startEdit(0, 0);
    },
    editProcedencia: function(grid, record) {
        var selection = this.getList_procedencia().getSelectionModel().getSelection()[0];
        this.getList_procedencia().reProcedencia.startEdit(selection, 0);
    },
    delProcedencia: function(grid, record) {
        var me = this;
        var selection = me.getList_procedencia().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_procedencia().getStore().remove(selection);
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar procedencia social', 'message': '&iquest;Est&aacute; seguro que desea eliminar la procedencia social seleccionada?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_procedencia().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_procedencia().down('#btnDel').setDisabled(selections.length === 0);
    }
});