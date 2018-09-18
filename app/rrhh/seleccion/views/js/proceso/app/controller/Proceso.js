Ext.define('Proceso.controller.Proceso', {
    extend: 'Ext.app.Controller',
    views: ['proceso.List', 'proceso.Edit'],
    stores: ['Proceso', 'Cargoplantilla'],
    model: ['Proceso', 'Cargoplantilla'],
    refs: [
        {ref: 'list_proceso', selector: 'list_proceso'},
        {ref: 'edit_proceso', selector: 'edit_proceso'}
    ],
    init: function() {
        this.control({
            'list_proceso': {
                itemdblclick: this.modProceso,
                selectionchange: this.onProcesoSelectionChange
            },
            'list_proceso button[action=add]': {
                click: this.addProceso
            },
            'list_proceso button[action=mod]': {
                click: this.modProceso
            },
            'list_proceso button[action=del]': {
                click: this.delProceso
            },
            'list_proceso button[action=plus]': {
                click: this.showPlusWindow
            },
            '#start_proceso': {
                click: this.startProceso
            },
            '#stop_proceso': {
                click: this.stopProceso
            },
            '#end_proceso': {
                click: this.endProceso
            },
            'edit_proceso button[action=aceptar]': {
                click: this.saveProceso
            },
            'edit_proceso button[action=aplicar]': {
                click: this.saveProceso
            },
            'edit_proceso combobox[name=cargoplantilla]': {
                select: this.onSelectCargo
            }
        });
    },
    onSelectCargo: function(cb, selection) {
        cb.up('window').down('numberfield[name=cantidad]').setMaxValue(selection[0].get('disponible'));
        cb.up('window').down('numberfield[name=cantidad]').setValue(selection[0].get('disponible'));
        cb.up('window').down('numberfield[name=cantidad]').focus(false, 100);
    },
    onProcesoSelectionChange: function(sm, selected) {
        var me = this;
        me.getList_proceso().down('button[action=mod]').disable();
        me.getList_proceso().down('button[action=del]').disable();
        me.getList_proceso().down('button[action=status]').disable();
        if (sm.hasSelection()) {
            me.validateAction(selected);
            me.validateActionsStatus(selected);
        }
    },
    validateAction: function(row) {
        if (row[0].data.status == '0') {
            this.getList_proceso().down('button[action=mod]').enable();
            this.getList_proceso().down('button[action=del]').enable();
        }
    },
    validateActionsStatus: function(row) {
        this.getList_proceso().down('button[action=status]').enable();
        Ext.getCmp('start_proceso').setDisabled(true);
        Ext.getCmp('stop_proceso').setDisabled(true);
        Ext.getCmp('end_proceso').setDisabled(true);
        if (row[0].data.status == '0') {
            Ext.getCmp('start_proceso').setDisabled(false);
        }
        else if (row[0].data.status == '1') {
            Ext.getCmp('stop_proceso').setDisabled(false);
            Ext.getCmp('end_proceso').setDisabled(false);
        }
        else if (row[0].data.status == '2') {
            Ext.getCmp('start_proceso').setDisabled(false);
            Ext.getCmp('end_proceso').setDisabled(false);
        }
        else {
            return;
        }
    },
    addProceso: function() {
        var me = this;
        if (!me.winEditProceso) {
            me.winEditProceso = Ext.widget('edit_proceso');
        }
        me.winEditProceso.show();
        me.winEditProceso.setTitle('<i class="fa fa-plus"></i> Adicionar proceso de selecci&oacute;n');
        me.winEditProceso.down('button[action=aplicar]').show();
        this._resetEditWindow();
    },
    modProceso: function() {
        var me = this,
                smProceso = me.getList_proceso().getSelectionModel();
        if (!me.getList_proceso().down('button[action=mod]').disable)
            if (smProceso.hasSelection()) {
                if (!me.winEditProceso) {
                    me.winEditProceso = Ext.widget('edit_proceso');
                }
                me.winEditProceso.show();
                me.winEditProceso.setTitle('<i class="fa fa-edit"></i> Modificar proceso de selecci&oacute;n');
                me.winEditProceso.down('button[action=aplicar]').hide();
                this._resetEditWindow();

                var form = me.winEditProceso.down('form[itemId=form_proceso]');
                var recProceso = this.getList_proceso().getSelectionModel().getLastSelected();
                form.loadRecord(recProceso);
                me.winEditProceso.down('numberfield[name=cantidad]').setMaxValue(recProceso.get('cantidad'));
            }
    },
    saveProceso: function(btn) {
        var me = this,
                win = btn.up('window'),
                formData = win.getComponent('form_proceso').getForm();

        if (formData.isValid()) {
            loadProgress('Guardando datos del proceso de selecci&oacute;n...');

            Ext.Ajax.request({
                url: 'saveproceso',
                method: 'POST',
                params: {
                    datos: Ext.encode(formData.getValues())
                },
                callback: function(options, success, response) {
                    Ext.MessageBox.hide();
                    var responseData = Ext.decode(response.responseText);
                    if (responseData.success) {
                        (win.header.title == 'Adicionar proceso de selecci&oacute;n') ? MensajeInformacion('Los datos del proceso de selecci&oacute;n fueron adicionados correctamente.') : MensajeInformacion('Los datos del proceso de selecci&oacute;n fueron modificados correctamente.');
                        if (btn.action == 'aplicar') {
                            formData.reset();
                        } else {
                            win.close();
                        }
                        me.getList_proceso().getStore().reload();
                    } else {

                    }
                }
            });
        }
    },
    delProceso: function(btn) {
        var me = this,
                grid = me.getList_proceso();
        if (grid.getSelectionModel().hasSelection()) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    var rec = grid.getSelectionModel().getLastSelected();
                    loadProgress('Eliminando datos del proceso de selecci&oacute;n...');
                    Ext.Ajax.request({
                        url: 'delproceso',
                        method: 'POST',
                        params: {
                            idprocesoseleccion: rec.get('idprocesoseleccion')
                        },
                        callback: function(options, success, response) {
                            Ext.MessageBox.hide();
                            grid.getStore().reload();
                        }
                    });
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar datos del proceso de seleci&oacute;n', 'message': '&iquest;Est&aacute; seguro que desea eliminar los datos del proceso de selecci&oacute;n seleccionado?'}, confirmar);
        }
    },
    startProceso: function() {
        this.setStatus(1, '&iquest;Est&aacute; seguro que desea iniciar el proceso de selecci&oacute;n seleccionado?');
    },
    stopProceso: function() {
        this.setStatus(2, '&iquest;Est&aacute; seguro que desea detener el proceso de selecci&oacute;n seleccionado?');
    },
    endProceso: function() {
        this.setStatus(3, '&iquest;Est&aacute; seguro que desea finalizar el proceso de selecci&oacute;n seleccionado?');
    },
    setStatus: function(status, msg) {
        var me = this;
        var grid = me.getList_proceso();
        if (grid.getSelectionModel().hasSelection()) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    var rec = grid.getSelectionModel().getLastSelected();
                    loadProgress('Cambiando status del proceso...');
                    Ext.Ajax.request({
                        url: 'changestatusproceso',
                        method: 'POST',
                        params: {
                            idprocesoseleccion: rec.get('idprocesoseleccion'),
                            status: status
                        },
                        callback: function(options, success, response) {
                            Ext.MessageBox.hide();
                            grid.getStore().reload();
                        }
                    });
                }
            }
            showMsg(2, {'title': 'Confirmaci&oacute;n', 'message': msg}, confirmar);
        }
    },
    _resetEditWindow: function() {
        var win = this.getEdit_proceso();
        win.getComponent('form_proceso').getForm().reset();
    }
});