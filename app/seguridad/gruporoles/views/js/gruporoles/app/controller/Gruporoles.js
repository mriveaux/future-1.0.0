/* global Ext */
Ext.define('Gruporoles.controller.Gruporoles', {
    extend: 'Ext.app.Controller',
    stores: ['Gruporoles', 'Roles'],
    models: ['Gruporoles', 'Roles'],
    views: ['Listgrupos', 'Listroles'],
    refs: [{ref: 'gruposlist', selector: 'gruposlist'}, {ref: 'roleslist', selector: 'roleslist'}],
    init: function() {
        this.control({
            'gruposlist': {
                selectionchange: this.toggleBtn
            },
            'gruposlist button[action=add]': {
                click: this.addGruporoles
            },
            'gruposlist button[action=mod]': {
                click: this.editGruporoles
            },
            'gruposlist button[action=del]': {
                click: this.delGruporoles
            },
            'roleslist button[action=save]': {
                click: this.saveRolesAsociation
            },
            'roleslist button[action=refresh]': {
                click: this.reloadRoles
            }
        });
        this.listen({
            store: {
                '#Gruporoles': {
                    load: this.toggleDockedBar
                },
                '#Roles': {
                    load: this.toggleRoleSelection
                }
            }
        });
    },
    addGruporoles: function() {
        var objGrupo = this.getModel('Gruporoles');
        this.getGruposlist().getStore().insert(0, new objGrupo());
        this.getGruposlist().reGruporoles.startEdit(0, 0);
    },
    editGruporoles: function(grid, record) {
        var selection = this.getGruposlist().getSelectionModel().getSelection()[0];
        this.getGruposlist().reGruporoles.startEdit(selection, 0);
    },
    delGruporoles: function(grid, record) {
        var me = this;
        if (me.getGruposlist().getSelectionModel().hasSelection()) {
            var selection = me.getGruposlist().getSelectionModel().getSelection()[0];
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        me.getGruposlist().getStore().remove(selection);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], futureLang.msgConfEliminarGrupo, confirmar);
        } else {
            showMsg(1, futureLang.msgSelectToDelete);
        }
    },
    toggleBtn: function(selModel, selections) {
        this.getGruposlist().down('#btnModificar').setDisabled(selections.length === 0);
        this.getGruposlist().down('#btnEliminar').setDisabled(selections.length === 0);
        var me = this;
        if (selModel.hasSelection()) {
            me.getRoleslist().setDisabled(true);
            if (selections[0].data.idgruporoles) {
                me.getRoleslist().getStore().proxy.extraParams.idgruporoles = selections[0].data.idgruporoles;
                me.getRoleslist().getStore().load({
                    callback: function() {
                        me.getRoleslist().setDisabled(false);
                    }
                });
            }
        }

    },
    toggleDockedBar: function(store, records, successful, eOpts) {
        this.getGruposlist().getDockedComponent('topbar').enable();
        if (!this.getGruposlist().getSelectionModel().hasSelection()) {
            this.getRoleslist().getStore().removeAll();
            this.getRoleslist().setDisabled(true);
        }
    },
    toggleRoleSelection: function(store, records, successful, eOpts) {
        var arrSelected = new Array();
        for (var i in records) {
            if (records[i].data.asociado != null)
                arrSelected.push(records[i]);
        }
        this.getRoleslist().getSelectionModel().select(arrSelected);
    },
    reloadRoles: function() {
        var me = this;
        me.getRoleslist().getStore().load();
    },
    saveRolesAsociation: function() {
        var me = this, arrIdRoles = new Array();
        loadProgress(futureLang.lbGuardandoGrupo);
        var records = this.getRoleslist().getSelectionModel().getSelection();
        for (var i in records) {
            arrIdRoles.push(records[i].data.idroles);
        }
        Ext.Ajax.request({
            url: 'saverolesassociation',
            method: 'POST',
            params: {
                idgruporoles: me.getGruposlist().getSelectionModel().getSelection()[0].data.idgruporoles,
                arridroles: Ext.encode(arrIdRoles)
            },
            callback: function(options, success, response) {
                Ext.MessageBox.hide();
                var responseData = Ext.decode(response.responseText);
                if (responseData.success) {
                    MensajeInformacion(futureLang.msgAsociarGrupo)
                    me.getRoleslist().getStore().load();
                } else {
                    showMsg(3, futureLang.lbRolesDatosAsociados);
                }
            }
        });
    }
});
