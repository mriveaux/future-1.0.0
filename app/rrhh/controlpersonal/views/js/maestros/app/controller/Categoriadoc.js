Ext.define('Maestros.controller.Categoriadoc', {
    extend: 'Ext.app.Controller',
    views: ['categoriadoc.List'],
    stores: ['Categoriadoc'],
    model: ['Categoriadoc'],
    refs: [{
            ref: 'list_categoriadoc',
            selector: 'list_categoriadoc'
        }],
    init: function() {
        this.control({
            'list_categoriadoc': {
                itemdblclick: this.editCategoriadoc,
                selectionchange: this.toggleBtn
            },
            'list_categoriadoc button[action=add]': {
                click: this.addCategoriadoc
            },
            'list_categoriadoc button[action=mod]': {
                click: this.editCategoriadoc
            },
            'list_categoriadoc button[action=del]': {
                click: this.delCategoriadoc
            }
        });
    },
    addCategoriadoc: function() {
        var cat = this.getModel('Categoriadoc');
        this.getList_categoriadoc().getStore().insert(0, new cat());
        this.getList_categoriadoc().reCategoriadoc.startEdit(0, 0);
//        this.getList_categoriadoc().down('#nombre').focus(false,100);
    },
    editCategoriadoc: function(grid, record) {
        var selection = this.getList_categoriadoc().getSelectionModel().getSelection()[0];
        this.getList_categoriadoc().reCategoriadoc.startEdit(selection, 0);
//        this.getList_categoriadoc().down('#nombre').focus(false,100);
    },
    delCategoriadoc: function(grid, record) {
        var me = this;
        var selection = me.getList_categoriadoc().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_categoriadoc().getStore().remove(selection);
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar categor&iacute;a de documento de identidad', 'message': '&iquest;Est&aacute; seguro que desea eliminar la categor&iacute;a de documento de identidad seleccionada?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_categoriadoc().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_categoriadoc().down('#btnDel').setDisabled(selections.length === 0);
    }
});