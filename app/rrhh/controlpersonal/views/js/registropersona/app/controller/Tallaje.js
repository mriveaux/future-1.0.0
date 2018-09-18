Ext.define('Registropersona.controller.Tallaje', {
    extend: 'Ext.app.Controller',
    views: ['tallaje.List'],
    stores: ['Tallaje', 'Prenda'],
    model: ['Tallaje', 'Prenda'],
    refs: [{
            ref: 'list_tallaje',
            selector: 'list_tallaje'
        }],
    init: function() {
        this.control({
            'list_tallaje': {
                itemdblclick: this.editTallaje,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_tallaje button[action=add]': {
                click: this.addTallaje
            },
            'list_tallaje button[action=mod]': {
                click: this.editTallaje
            },
            'list_tallaje button[action=del]': {
                click: this.delTallaje
            }
        });
    },
    onRender: function() {
        this.getList_tallaje().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_tallaje().getStore().load();
    },
    addTallaje: function() {
        var Tp = this.getModel('Tallaje');
        this.getList_tallaje().getStore().insert(0, new Tp());
        this.getList_tallaje().reTallaje.startEdit(0, 0);
    },
    editTallaje: function(grid, record) {
        var selection = this.getList_tallaje().getSelectionModel().getSelection()[0];
        this.getList_tallaje().reTallaje.startEdit(selection, 0);
    },
    delTallaje: function(grid, record) {
        var me = this;
        var selection = me.getList_tallaje().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_tallaje().getStore().remove(selection);
                    me.getList_tallaje().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar tallaje', 'message': '&iquest;Est&aacute; seguro que desea eliminar el tallaje seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_tallaje().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_tallaje().down('#btnDel').setDisabled(selections.length === 0);
    }
});