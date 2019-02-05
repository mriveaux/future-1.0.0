Ext.define('Registropersona.controller.Vehiculo', {
    extend: 'Ext.app.Controller',
    views: ['vehiculo.List'],
    stores: ['Vehiculo', 'RegVehiculo'],
    models: ['Vehiculo', 'RegVehiculo'],
    refs: [{
            ref: 'list_vehiculo',
            selector: 'list_vehiculo'
        }],
    init: function() {
        this.control({
            'list_vehiculo': {
                itemdblclick: this.editVehiculo,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_vehiculo button[action=add]': {
                click: this.addVehiculo
            },
            'list_vehiculo button[action=mod]': {
                click: this.editVehiculo
            },
            'list_vehiculo button[action=del]': {
                click: this.delVehiculo
            }
        });
    },
    onRender: function() {
        this.getList_vehiculo().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_vehiculo().getStore().reload();
    },
    addVehiculo: function() {
        var Tp = this.getModel('Vehiculo');
        this.getList_vehiculo().getStore().insert(0, new Tp());
        this.getList_vehiculo().reVehiculo.startEdit(0, 0);
    },
    editVehiculo: function(grid, record) {
        var selection = this.getList_vehiculo().getSelectionModel().getSelection()[0];
        this.getList_vehiculo().reVehiculo.startEdit(selection, 0);
    },
    delVehiculo: function(grid, record) {
        var me = this;
        var selection = me.getList_vehiculo().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_vehiculo().getStore().remove(selection);
                    me.getList_vehiculo().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar datos del veh&iacute;culo', 'message': '&iquest;Est&aacute; seguro que desea eliminar el veh&iacute;culo seleccionado?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_vehiculo().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_vehiculo().down('#btnDel').setDisabled(selections.length === 0);
    }
});