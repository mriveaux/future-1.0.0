Ext.define('Registropersona.controller.Chequeomedico', {
    extend: 'Ext.app.Controller',
    views: ['chequeomedico.List'],
    stores: ['Chequeomedico'],
    model: ['Chequeomedico'],
    refs: [{
            ref: 'list_chequeomedico',
            selector: 'list_chequeomedico'
        }],
    init: function() {
        this.control({
            'list_chequeomedico': {
                itemdblclick: this.editChequeomedico,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_chequeomedico button[action=add]': {
                click: this.addChequeomedico
            },
            'list_chequeomedico button[action=mod]': {
                click: this.editChequeomedico
            },
            'list_chequeomedico button[action=del]': {
                click: this.delChequeomedico
            }
        });
    },
    onRender: function() {
        this.getList_chequeomedico().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_chequeomedico().getStore().load();
    },
    addChequeomedico: function() {
        var Tp = this.getModel('Chequeomedico');
        this.getList_chequeomedico().getStore().insert(0, new Tp());
        this.getList_chequeomedico().reChequeomedico.startEdit(0, 0);
    },
    editChequeomedico: function(grid, record) {
        var selection = this.getList_chequeomedico().getSelectionModel().getSelection()[0];
        this.getList_chequeomedico().reChequeomedico.startEdit(selection, 0);
    },
    delChequeomedico: function(grid, record) {
        var me = this;
        var selection = me.getList_chequeomedico().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_chequeomedico().getStore().remove(selection);
                    me.getList_chequeomedico().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar chequeo m&eacute;dico', 'message': '&iquest;Est&aacute; seguro que desea eliminar el chequeo m&eacute;dico seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_chequeomedico().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_chequeomedico().down('#btnDel').setDisabled(selections.length === 0);
    }
});