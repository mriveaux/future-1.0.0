Ext.define('Registropersona.controller.Ciudadania', {
    extend: 'Ext.app.Controller',
    views: ['ciudadania.List'],
    stores: ['Ciudadania', 'Nacionalidad'],
    model: ['Ciudadania', 'Nacionalidad'],
    refs: [{
            ref: 'list_ciudadania',
            selector: 'list_ciudadania'
        }],
    init: function() {
        this.control({
            'list_ciudadania': {
                itemdblclick: this.editCiudadania,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_ciudadania button[action=add]': {
                click: this.addCiudadania
            },
            'list_ciudadania button[action=mod]': {
                click: this.editCiudadania
            },
            'list_ciudadania button[action=del]': {
                click: this.delCiudadania
            }
        });
    },
    onRender: function() {
        this.getList_ciudadania().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_ciudadania().getStore().load();
    },
    addCiudadania: function() {
        var Tp = this.getModel('Ciudadania');
        this.getList_ciudadania().getStore().insert(0, new Tp());
        this.getList_ciudadania().reCiudadania.startEdit(0, 0);
    },
    editCiudadania: function(grid, record) {
        var selection = this.getList_ciudadania().getSelectionModel().getSelection()[0];
        this.getList_ciudadania().reCiudadania.startEdit(selection, 0);
    },
    delCiudadania: function(grid, record) {
        var me = this;
        var selection = me.getList_ciudadania().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_ciudadania().getStore().remove(selection);
                    me.getList_ciudadania().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar cuidadan&iacute;a', 'message': '&iquest;Est&aacute; seguro que desea eliminar la ciudadan&iacute;a seleccionada?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_ciudadania().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_ciudadania().down('#btnDel').setDisabled(selections.length === 0);
    }
});