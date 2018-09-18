Ext.define('Maestros.controller.Gruposanguineo', {
    extend: 'Ext.app.Controller',
    views: ['gruposanguineo.List'],
    stores: ['Gruposanguineo'],
    model: ['Gruposanguineo'],
    refs: [{
            ref: 'list_gruposanguineo',
            selector: 'list_gruposanguineo'
        }],
    init: function() {
        this.control({
            'list_gruposanguineo': {
                itemdblclick: this.editGruposanguineo,
                selectionchange: this.toggleBtn
            },
            'list_gruposanguineo button[action=add]': {
                click: this.addGruposanguineo
            },
            'list_gruposanguineo button[action=mod]': {
                click: this.editGruposanguineo
            },
            'list_gruposanguineo button[action=del]': {
                click: this.delGruposanguineo
            }
        });
    },
    addGruposanguineo: function() {
        var Tp = this.getModel('Gruposanguineo');
        this.getList_gruposanguineo().getStore().insert(0, new Tp());
        this.getList_gruposanguineo().reGruposanguineo.startEdit(0, 0);
    },
    editGruposanguineo: function(grid, record) {
        var selection = this.getList_gruposanguineo().getSelectionModel().getSelection()[0];
        this.getList_gruposanguineo().reGruposanguineo.startEdit(selection, 0);
    },
    delGruposanguineo: function(grid, record) {
        var me = this;
        var selection = me.getList_gruposanguineo().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_gruposanguineo().getStore().remove(selection);
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar grupo sangu&iacute;neo', 'message': '&iquest;Est&aacute; seguro que desea eliminar el grupo sangu&iacute;neo seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_gruposanguineo().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_gruposanguineo().down('#btnDel').setDisabled(selections.length === 0);
    }
});