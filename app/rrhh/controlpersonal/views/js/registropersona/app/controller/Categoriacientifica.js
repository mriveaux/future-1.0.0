Ext.define('Registropersona.controller.Categoriacientifica', {
    extend: 'Ext.app.Controller',
    views: ['categoriacientifica.List'],
    stores: ['Categoriacientifica'],
    model: ['Categoriacientifica'],
    refs: [{
            ref: 'list_categoriacientifica',
            selector: 'list_categoriacientifica'
        }],
    init: function() {
        this.control({
            'list_categoriacientifica': {
                itemdblclick: this.editCategoriacientifica,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_categoriacientifica button[action=add]': {
                click: this.addCategoriacientifica
            },
            'list_categoriacientifica button[action=mod]': {
                click: this.editCategoriacientifica
            },
            'list_categoriacientifica button[action=del]': {
                click: this.delCategoriacientifica
            }
        });
    },
    onRender: function() {
        this.getList_categoriacientifica().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_categoriacientifica().getStore().load();
    },
    addCategoriacientifica: function() {
        var Tp = this.getModel('Categoriacientifica');
        this.getList_categoriacientifica().getStore().insert(0, new Tp());
        this.getList_categoriacientifica().reCategoriacientifica.startEdit(0, 0);
    },
    editCategoriacientifica: function(grid, record) {
        var selection = this.getList_categoriacientifica().getSelectionModel().getSelection()[0];
        this.getList_categoriacientifica().reCategoriacientifica.startEdit(selection, 0);
    },
    delCategoriacientifica: function(grid, record) {
        var me = this;
        var selection = me.getList_categoriacientifica().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_categoriacientifica().getStore().remove(selection);
                    me.getList_categoriacientifica().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar categor&iacute;a cient&iacute;fica', 'message': '&iquest;Est&aacute; seguro que desea eliminar la categor&iacute;a cient&iacute;fica seleccionada?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_categoriacientifica().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_categoriacientifica().down('#btnDel').setDisabled(selections.length === 0);
    }
});