Ext.define('Registropersona.controller.Formacion', {
    extend: 'Ext.app.Controller',
    views: ['formacion.List'],
    stores: ['Formacion'],
    model: ['Formacion'],
    refs: [{
            ref: 'list_formacion',
            selector: 'list_formacion'
        }],
    init: function() {
        this.control({
            'list_formacion': {
                itemdblclick: this.editFormacion,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_formacion button[action=add]': {
                click: this.addFormacion
            },
            'list_formacion button[action=mod]': {
                click: this.editFormacion
            },
            'list_formacion button[action=del]': {
                click: this.delFormacion
            }
        });
    },
    onRender: function() {
        this.getList_formacion().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_formacion().getStore().load();
    },
    addFormacion: function() {
        var Tp = this.getModel('Formacion');
        this.getList_formacion().getStore().insert(0, new Tp());
        this.getList_formacion().reFormacion.startEdit(0, 0);
    },
    editFormacion: function(grid, record) {
        var selection = this.getList_formacion().getSelectionModel().getSelection()[0];
        this.getList_formacion().reFormacion.startEdit(selection, 0);
    },
    delFormacion: function(grid, record) {
        var me = this;
        var selection = me.getList_formacion().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_formacion().getStore().remove(selection);
                    me.getList_formacion().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar datos de la formaci&oacute;n regular', 'message': '&iquest;Est&aacute; seguro que desea eliminar los datos de la formaci&oacute;n regular seleccionada?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_formacion().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_formacion().down('#btnDel').setDisabled(selections.length === 0);
    }
});