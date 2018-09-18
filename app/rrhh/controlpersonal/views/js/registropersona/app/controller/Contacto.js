Ext.define('Registropersona.controller.Contacto', {
    extend: 'Ext.app.Controller',
    views: ['contacto.List'],
    stores: ['Contacto', 'Tipocontacto', 'Mediocontacto'],
    model: ['Contacto', 'Tipocontacto', 'Mediocontacto'],
    refs: [{
            ref: 'list_contacto',
            selector: 'list_contacto'
        }],
    init: function() {
        this.control({
            'list_contacto': {
                itemdblclick: this.editContacto,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_contacto button[action=add]': {
                click: this.addContacto
            },
            'list_contacto button[action=mod]': {
                click: this.editContacto
            },
            'list_contacto button[action=del]': {
                click: this.delContacto
            }
        });
    },
    onRender: function() {
        this.getList_contacto().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_contacto().getStore().load();
    },
    addContacto: function() {
        var Tp = this.getModel('Contacto');
        this.getList_contacto().getStore().insert(0, new Tp());
        this.getList_contacto().reContacto.startEdit(0, 0);
    },
    editContacto: function(grid, record) {
        var selection = this.getList_contacto().getSelectionModel().getSelection()[0];
        this.getList_contacto().reContacto.startEdit(selection, 0);
    },
    delContacto: function(grid, record) {
        var me = this;
        var selection = me.getList_contacto().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_contacto().getStore().remove(selection);
                    me.getList_contacto().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar contacto', 'message': '&iquest;Est&aacute; seguro que desea eliminar el contacto seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_contacto().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_contacto().down('#btnDel').setDisabled(selections.length === 0);
    }
});