Ext.define('Registropersona.controller.Docidentidad', {
    extend: 'Ext.app.Controller',
    views: ['docidentidad.List'],
    stores: ['Docidentidad', 'Categoriadoc'],
    model: ['Docidentidad', 'Categoriadoc'],
    refs: [{
            ref: 'list_docidentidad',
            selector: 'list_docidentidad'
        }],
    init: function() {
        this.control({
            'list_docidentidad': {
                itemdblclick: this.editDocidentidad,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_docidentidad button[action=add]': {
                click: this.addDocidentidad
            },
            'list_docidentidad button[action=mod]': {
                click: this.editDocidentidad
            },
            'list_docidentidad button[action=del]': {
                click: this.delDocidentidad
            }
        });
    },
    onRender: function() {
        this.getList_docidentidad().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_docidentidad().getStore().load();
    },
    addDocidentidad: function() {
        var Doc = this.getModel('Docidentidad');
        this.getList_docidentidad().getStore().insert(0, new Doc());
        this.getList_docidentidad().reDocidentidad.startEdit(0, 0);
    },
    editDocidentidad: function(grid, record) {
        var selection = this.getList_docidentidad().getSelectionModel().getSelection()[0];
        this.getList_docidentidad().reDocidentidad.startEdit(selection, 0);
    },
    delDocidentidad: function(grid, record) {
        var me = this;
        var selection = me.getList_docidentidad().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_docidentidad().getStore().remove(selection);
                    me.getList_docidentidad().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar documento de identidad', 'message': '&iquest;Est&aacute; seguro que desea eliminar el documento de identidad seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_docidentidad().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_docidentidad().down('#btnDel').setDisabled(selections.length === 0);
    }
});