Ext.define('Maestros.controller.Tipopreparacion', {
    extend: 'Ext.app.Controller',
    views: ['tipopreparacion.List'],
    stores: ['Tipopreparacion'],
    model: ['Tipopreparacion'],
    refs: [{
            ref: 'list_tipopreparacion',
            selector: 'list_tipopreparacion'
        }],
    init: function() {
        this.control({
            'list_tipopreparacion': {
                itemdblclick: this.editTipopreparacion,
                selectionchange: this.toggleBtn
            },
            'list_tipopreparacion button[action=add]': {
                click: this.addTipopreparacion
            },
            'list_tipopreparacion button[action=mod]': {
                click: this.editTipopreparacion
            },
            'list_tipopreparacion button[action=del]': {
                click: this.delTipopreparacion
            }
        });
    },
    addTipopreparacion: function() {
        var Tp = this.getModel('Tipopreparacion');
        this.getList_tipopreparacion().getStore().insert(0, new Tp());
        this.getList_tipopreparacion().reTipopreparacion.startEdit(0, 0);
    },
    editTipopreparacion: function(grid, record) {
        var selection = this.getList_tipopreparacion().getSelectionModel().getSelection()[0];
        this.getList_tipopreparacion().reTipopreparacion.startEdit(selection, 0);
    },
    delTipopreparacion: function(grid, record) {
        var me = this;
        var selection = me.getList_tipopreparacion().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_tipopreparacion().getStore().remove(selection);
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar tipo de preparaci&oacute;n', 'message': '&iquest;Est&aacute; seguro que desea eliminar el tipo de preparaci&oacute;n seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_tipopreparacion().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_tipopreparacion().down('#btnDel').setDisabled(selections.length === 0);
    }
});