Ext.define('Registropersona.controller.Nacimiento', {
    extend: 'Ext.app.Controller',
    views: ['nacimiento.List'],
    stores: ['Nacimiento'],
    model: ['Nacimiento'],
    refs: [
        {ref: 'list_nacimiento', selector: 'list_nacimiento'}
    ],
    init: function() {
        this.control({
            'list_nacimiento': {
                itemdblclick: this.editNacimiento,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_nacimiento button[action=add]': {
                click: this.addNacimiento
            },
            'list_nacimiento button[action=mod]': {
                click: this.editNacimiento
            },
            'list_nacimiento button[action=del]': {
                click: this.delNacimiento
            }
        });
    },
    onRender: function() {
        this.getList_nacimiento().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_nacimiento().getStore().load();
    },
    addNacimiento: function() {
        var Tp = this.getModel('Nacimiento');
        this.getList_nacimiento().getStore().insert(0, new Tp());
        this.getList_nacimiento().reNacimiento.startEdit(0, 0);
    },
    editNacimiento: function(grid, record) {
        var selection = this.getList_nacimiento().getSelectionModel().getSelection()[0];
        this.getList_nacimiento().reNacimiento.startEdit(selection, 0);
    },
    delNacimiento: function(grid, record) {
        var me = this;
        var selection = me.getList_nacimiento().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_nacimiento().getStore().remove(selection);
                    me.getList_nacimiento().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar datos de nacimiento', 'message': '&iquest;Est&aacute; seguro que desea eliminar los datos de nacimiento seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_nacimiento().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_nacimiento().down('#btnDel').setDisabled(selections.length === 0);
    }
});