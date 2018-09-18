Ext.define('Maestros.controller.Prenda', {
    extend: 'Ext.app.Controller',
    views: ['prenda.List'],
    stores: ['Prenda'],
    model: ['Prenda'],
    refs: [{
            ref: 'list_prenda',
            selector: 'list_prenda'
        }],
    init: function() {
        this.control({
            'list_prenda': {
                itemdblclick: this.editPrenda,
                selectionchange: this.toggleBtn
            },
            'list_prenda button[action=add]': {
                click: this.addPrenda
            },
            'list_prenda button[action=mod]': {
                click: this.editPrenda
            },
            'list_prenda button[action=del]': {
                click: this.delPrenda
            }
        });
    },
    addPrenda: function() {
        var Tp = this.getModel('Prenda');
        this.getList_prenda().getStore().insert(0, new Tp());
        this.getList_prenda().rePrenda.startEdit(0, 0);
    },
    editPrenda: function(grid, record) {
        var selection = this.getList_prenda().getSelectionModel().getSelection()[0];
        this.getList_prenda().rePrenda.startEdit(selection, 0);
    },
    delPrenda: function(grid, record) {
        var me = this;
        var selection = me.getList_prenda().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_prenda().getStore().remove(selection);
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar prenda', 'message': '&iquest;Est&aacute; seguro que desea eliminar la prenda seleccionada?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_prenda().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_prenda().down('#btnDel').setDisabled(selections.length === 0);
    }
});