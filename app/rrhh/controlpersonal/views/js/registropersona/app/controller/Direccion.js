Ext.define('Registropersona.controller.Direccion', {
    extend: 'Ext.app.Controller',
    views: ['direccion.List'],
    stores: ['Direccion'],
    model: ['Direccion'],
    refs: [{
            ref: 'list_direccion',
            selector: 'list_direccion'
        }],
    init: function() {
        this.control({
            'list_direccion': {
                itemdblclick: this.editDireccion,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_direccion button[action=add]': {
                click: this.addDireccion
            },
            'list_direccion button[action=mod]': {
                click: this.editDireccion
            },
            'list_direccion button[action=del]': {
                click: this.delDireccion
            }
        });
    },
    onRender: function() {
        this.getList_direccion().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_direccion().getStore().load();
    },
    addDireccion: function() {
        var Tp = this.getModel('Direccion');
        this.getList_direccion().getStore().insert(0, new Tp());
        this.getList_direccion().reDireccion.startEdit(0, 0);
    },
    editDireccion: function(grid, record) {
        var selection = this.getList_direccion().getSelectionModel().getSelection()[0];
        this.getList_direccion().reDireccion.startEdit(selection, 0);
    },
    delDireccion: function(grid, record) {
        var me = this;
        var selection = me.getList_direccion().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_direccion().getStore().remove(selection);
                    me.getList_direccion().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar direcci&oacute;n de residencia', 'message': '&iquest;Est&aacute; seguro que desea eliminar la direcci&oacute;n de residencia seleccionada?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_direccion().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_direccion().down('#btnDel').setDisabled(selections.length === 0);
    }
});