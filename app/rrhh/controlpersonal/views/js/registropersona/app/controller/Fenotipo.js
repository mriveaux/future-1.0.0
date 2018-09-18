Ext.define('Registropersona.controller.Fenotipo', {
    extend: 'Ext.app.Controller',
    views: ['fenotipo.List'],
    stores: ['Fenotipo', 'Gruposanguineo', 'Colorojos', 'Colorpiel', 'Colorpelo'],
    model: ['Fenotipo', 'Gruposanguineo', 'Colorojos', 'Colorpiel', 'Colorpelo'],
    refs: [
        {ref: 'list_fenotipo', selector: 'list_fenotipo'}
    ],
    init: function() {
        this.control({
            'list_fenotipo': {
                itemdblclick: this.editFenotipo,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_fenotipo button[action=add]': {
                click: this.addFenotipo
            },
            'list_fenotipo button[action=mod]': {
                click: this.editFenotipo
            },
            'list_fenotipo button[action=del]': {
                click: this.delFenotipo
            }
        });
    },
    onRender: function() {
        this.getList_fenotipo().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_fenotipo().getStore().load();
    },
    addFenotipo: function() {
        var Tp = this.getModel('Fenotipo');
        this.getList_fenotipo().getStore().insert(0, new Tp());
        this.getList_fenotipo().reFenotipo.startEdit(0, 0);
    },
    editFenotipo: function(grid, record) {
        var selection = this.getList_fenotipo().getSelectionModel().getSelection()[0];
        this.getList_fenotipo().reFenotipo.startEdit(selection, 0);
    },
    delFenotipo: function(grid, record) {
        var me = this;
        var selection = me.getList_fenotipo().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_fenotipo().getStore().remove(selection);
                    me.getList_fenotipo().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar datos fenot&iacute;picos', 'message': '&iquest;Est&aacute; seguro que desea eliminar los datos fenot&iacute;picos seleccionados?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_fenotipo().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_fenotipo().down('#btnDel').setDisabled(selections.length === 0);
    }
});