Ext.define('Registropersona.controller.Competencias', {
    extend: 'Ext.app.Controller',
    views: ['competencias.List'],
    stores: ['Competencias'],
    model: ['Competencias'],
    refs: [{
            ref: 'list_competencias',
            selector: 'list_competencias'
        }],
    init: function() {
        this.control({
            'list_competencias': {
                itemdblclick: this.editCompetencias,
                selectionchange: this.toggleBtn,
                render: this.onRender
            },
            'list_competencias button[action=add]': {
                click: this.addCompetencias
            },
            'list_competencias button[action=mod]': {
                click: this.editCompetencias
            },
            'list_competencias button[action=del]': {
                click: this.delCompetencias
            }
        });
    },
    onRender: function() {
        this.getList_competencias().getStore().proxy.extraParams.idpersona = Ext.getCmp('list_persona').getSelectionModel().getLastSelected().data.idpersona;
        this.getList_competencias().getStore().load();
    },
    addCompetencias: function() {
        var Tp = this.getModel('Competencias');
        this.getList_competencias().getStore().insert(0, new Tp());
        this.getList_competencias().reCompetencias.startEdit(0, 0);
    },
    editCompetencias: function(grid, record) {
        var selection = this.getList_competencias().getSelectionModel().getSelection()[0];
        this.getList_competencias().reCompetencias.startEdit(selection, 0);
    },
    delCompetencias: function(grid, record) {
        var me = this;
        var selection = me.getList_competencias().getSelectionModel().getSelection()[0];
        if (selection) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    me.getList_competencias().getStore().remove(selection);
                    me.getList_competencias().getStore().sync();
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar datos de la competencia', 'message': '&iquest;Est&aacute; seguro que desea eliminar la competencia seleccionada?'}, confirmar);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getList_competencias().down('#btnMod').setDisabled(selections.length === 0);
        this.getList_competencias().down('#btnDel').setDisabled(selections.length === 0);
    }
});