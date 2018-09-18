/* global Ext */
Ext.define('Recursos.controller.Recursos', {
    extend: 'Ext.app.Controller',
    stores: ['Recursos', 'Funcionalidades', 'Acciones'],
    models: ['Recursos', 'Funcionalidades', 'Acciones'],
    views: ['ListRecursos', 'TreeFuncionalidades', 'ListAcciones'],
    refs: [{ref: 'list_recursos', selector: 'list_recursos'}, {ref: 'tree_funcionalidades', selector: 'tree_funcionalidades'}, {ref: 'list_acciones', selector: 'list_acciones'}],
    init: function() {
        this.control({
            'tree_funcionalidades': {
                select: this.onSelectNode
            },
            'list_recursos': {
                selectionchange: this.toggleBtn
            },
            'list_recursos button[action=add]': {
                click: this.addResource
            },
            'list_recursos button[action=mod]': {
                click: this.editResource
            },
            'list_recursos button[action=del]': {
                click: this.delResource
            },
            'list_acciones button[action=save]': {
                click: this.saveActionsAssociation
            },
            'list_acciones button[action=refresh]': {
                click: this.reloadActions
            }
        });
        this.listen({
            store: {
                '#Funcionalidades': {
                    beforeexpand: this.beforeLoadFunctionality
                },
                '#Acciones': {
                    load: this.toggleActionsSelection
                }
            }
        });
    },
    addResource: function() {
        var Rec = this.getModel('Recursos');
        this.getList_recursos().getStore().insert(0, new Rec());
        this.getList_recursos().reRecursos.startEdit(0, 0);
    },
    editResource: function(grid, record) {
        var selection = this.getList_recursos().getSelectionModel().getSelection()[0];
        this.getList_recursos().reRecursos.startEdit(selection, 0);
    },
    delResource: function(grid, record) {
        var me = this;
        var selection = this.getList_recursos().getSelectionModel().getSelection()[0];
        function confirmar(btn) {
            if (btn === 'ok') {
                if (selection) {
                    me.getList_recursos().getStore().remove(selection);
                }
            }
        }
        MensajeInterrogacion(Ext.lang.titles[2], futureLang.msgConfEliminarRecurso, confirmar);
    },
    toggleBtn: function(selModel, selections) {
        this.getList_recursos().down('#btnModificarRecurso').setDisabled(selections.length === 0);
        this.getList_recursos().down('#btnEliminarRecurso').setDisabled(selections.length === 0);
        if (selections.length === 0) {
            this.getList_acciones().getStore().removeAll();
        } else if (!selections[0].phantom) {
            this.getList_acciones().getStore().proxy.extraParams.src = this.getTree_funcionalidades().getSelectionModel().getSelection()[0].data.src;
            this.getList_acciones().getStore().proxy.extraParams.idrecurso = selections[0].data.idrecurso;
            this.getList_acciones().getStore().load();
        }
    },
    toggleActionsSelection: function(store, records, successful, eOpts) {
        var arrSelected = new Array();
        Ext.each(records, function(r) {
            if (r.data.asociado == true)
                arrSelected.push(r);
        });
        this.getList_acciones().getSelectionModel().select(arrSelected);
    },
    reloadActions: function() {
        var me = this;
        me.getList_acciones().getStore().load();
    },
    beforeLoadFunctionality: function(node, eOpts) {
        var me = this;
        me.getTree_funcionalidades().getStore().proxy.extraParams.idmodulo = node.data.idmodulo;
    },
    onSelectNode: function(tree, record, index, eOpts) {
        var me = this;
        if (record.data.leaf) {
            me.getList_recursos().getStore().resumeAutoSync();
            me.getList_recursos().setDisabled(false);
            me.getList_acciones().setDisabled(false);
            me.getList_recursos().getStore().proxy.extraParams.idfuncionalidad = record.data.id;
            me.getList_recursos().getStore().load();
        } else {
            me.getList_recursos().getStore().suspendAutoSync();
            me.getList_recursos().getStore().removeAll();
            me.getList_recursos().setDisabled(true);
            me.getList_acciones().getStore().removeAll();
            me.getList_acciones().setDisabled(true);
        }
    },
    saveActionsAssociation: function() {
        var me = this, arrActions = new Array();
        loadProgress(futureLang.lbGuardando);
        var records = me.getList_acciones().getSelectionModel().getSelection();
        for (var i in records) {
            arrActions.push(records[i].data.nombre);
        }
        Ext.Ajax.request({
            url: 'saveactionsassociation',
            method: 'POST',
            params: {
                idrecurso: me.getList_recursos().getSelectionModel().getSelection()[0].data.idrecurso,
                arracciones: Ext.encode(arrActions)
            },
            callback: function(options, success, response) {
                Ext.MessageBox.hide();
                var responseData = Ext.decode(response.responseText);
                if (responseData.success) {
                    MensajeInformacion(futureLang.msgAsociarAccion)
                    me.getList_acciones().getStore().load();
                } else {
                    showMsg(3, futureLang.lbMsgError);
                }
            }
        });
    }
});
