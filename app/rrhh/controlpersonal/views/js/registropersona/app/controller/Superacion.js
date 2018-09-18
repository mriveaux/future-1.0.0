Ext.define('Registropersona.controller.Superacion', {
    extend: 'Ext.app.Controller',
    views: ['superacion.List'],
    stores: ['Superacion'],
    model: ['Superacion'],
    refs: [{
            ref: 'list_superacion',
            selector: 'list_superacion'
        }],
    init: function() {
        this.control({
            'list_superacion': {
                itemdblclick: this.editSuperacion,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_superacion button[action=add]': {
                click: this.addSuperacion
            },
            'list_superacion button[action=mod]': {
                click: this.editSuperacion
            },
            'list_superacion button[action=del]': {
                click: this.delSuperacion
            }
        });
    },
    onRender: function() {
        this.getList_superacion().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_superacion().getStore().load();
    },
    addSuperacion: function() {
        var Tp = this.getModel('Superacion');
        this.getList_superacion().getStore().insert(0, new Tp());
        this.getList_superacion().reSuperacion.startEdit(0, 0);
    },
    editSuperacion: function(grid, record) {
        var selection = this.getList_superacion().getSelectionModel().getSelection()[0];
        this.getList_superacion().reSuperacion.startEdit(selection, 0);
    },
    delSuperacion: function(grid, record) {
        var me = this;
        var selection = me.getList_superacion().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_superacion().getStore().remove(selection);
                    me.getList_superacion().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar curso de superaci&oacute;n', 'message': '&iquest;Est&aacute; seguro que desea eliminar el curso de superaci&oacute;n seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_superacion().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_superacion().down('#btnDel').setDisabled(selections.length === 0);
    }
});