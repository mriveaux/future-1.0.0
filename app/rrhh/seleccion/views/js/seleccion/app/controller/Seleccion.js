Ext.define('Seleccion.controller.Seleccion', {
    extend: 'Ext.app.Controller',
    views: ['seleccion.ListProceso', 'seleccion.ListCandidatos', 'seleccion.ListSeleccion', 'seleccion.ListPreseleccion', 'seleccion.TabPanelMain',
        'seleccion.WinCandidatos'],
    stores: ['Proceso', 'Candidatos', 'Seleccion', 'Preseleccion'],
    model: ['Proceso', 'Candidatos', 'Seleccion', 'Preseleccion'],
    refs: [
        {ref: 'list_proceso', selector: 'list_proceso'},
        {ref: 'tabpanel_main', selector: 'tabpanel_main'},
        {ref: 'list_candidatos', selector: 'list_candidatos'},
        {ref: 'list_seleccion', selector: 'list_seleccion'},
        {ref: 'list_preseleccion', selector: 'list_preseleccion'},
        {ref: 'win_candidatos', selector: 'win_candidatos'}
    ],
    init: function() {
        this.control({
            'list_proceso': {
                selectionchange: this.onSelectionChange
            },
            'tabpanel_main': {
                render: this.loadTabsElements
            },
            'list_candidatos button[action=add]': {
                click: this.addCandidatos
            },
            '#action_candidato': {
                click: this.actionAddCandidato
            },
            'list_seleccion button[action=add]': {
                click: this.addSeleccion
            },
            'list_seleccion button[action=mod]': {
                click: this.modSeleccion
            },
            'list_seleccion button[action=del]': {
                click: this.delSeleccion
            },
            'edit_seleccion button[action=aceptar]': {
                click: this.saveSeleccion
            },
            'edit_seleccion button[action=aplicar]': {
                click: this.saveSeleccion
            }
        });
    },
    onSelectionChange: function(sm, selected) {
        var me = this;
        me.getList_seleccion().down('button[action=mod]').disable();
        me.getList_seleccion().down('button[action=del]').disable();
        // me.getList_seleccion().down('button[action=status]').disable();
        if (sm.hasSelection()) {
            me.validateAction(selected);
            // me.validateActionsStatus(selected);
        }
    },
    loadTabsElements: function() {
        var me = this;
        var tabPanel = me.getTabpanel_main();
        var candidatos = Ext.create('Seleccion.view.seleccion.ListCandidatos', {
            closable: false,
            // disabled: true
        });
        var preseleccion = Ext.create('Seleccion.view.seleccion.ListPreseleccion', {
            closable: false,
            disabled: true
        });
        var seleccion = Ext.create('Seleccion.view.seleccion.ListSeleccion', {
            closable: false,
            disabled: true
        });
        tabPanel.add(candidatos);
        tabPanel.add(preseleccion);
        tabPanel.add(seleccion);
    },
    validateAction: function(row) {
        if (row[0].data.status == '0') {
            this.getList_seleccion().down('button[action=mod]').enable();
            this.getList_seleccion().down('button[action=del]').enable();
        }
    },
    validateActionsStatus: function(row) {
        // this.getList_seleccion().down('button[action=status]').enable();
        Ext.getCmp('start_seleccion').setDisabled(true);
        Ext.getCmp('stop_seleccion').setDisabled(true);
        Ext.getCmp('end_seleccion').setDisabled(true);
        if (row[0].data.status == '0') {
            Ext.getCmp('start_seleccion').setDisabled(false);
        }
        else if (row[0].data.status == '1') {
            Ext.getCmp('stop_seleccion').setDisabled(false);
            Ext.getCmp('end_seleccion').setDisabled(false);
        }
        else if (row[0].data.status == '2') {
            Ext.getCmp('start_seleccion').setDisabled(false);
            Ext.getCmp('end_seleccion').setDisabled(false);
        }
        else {
            return;
        }
    },
    addCandidatos: function() {
        var me = this;
        if (!me.winCandidatos) {
            me.winCandidatos = Ext.widget('win_candidatos');
        }
        me.winCandidatos.show();
//        me.winEditSeleccion.setTitle('Adicionar seleccion de selecci&oacute;n');
//        me.winEditSeleccion.down('button[action=aplicar]').show();
//        this._resetEditWindow();
    },
    actionAddCandidato: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(colIndex);
        alert("Edit " + rec.get('nombre'));
    },
    addSeleccion: function() {
        var me = this;
        if (!me.winEditSeleccion) {
            me.winEditSeleccion = Ext.widget('edit_seleccion');
        }
        me.winEditSeleccion.show();
        me.winEditSeleccion.setTitle('Adicionar seleccion de selecci&oacute;n');
        me.winEditSeleccion.down('button[action=aplicar]').show();
        this._resetEditWindow();
    },
    modSeleccion: function() {
        var me = this,
                smSeleccion = me.getList_seleccion().getSelectionModel();

        if (smSeleccion.hasSelection()) {
            if (!me.winEditSeleccion) {
                me.winEditSeleccion = Ext.widget('edit_seleccion');
            }
            me.winEditSeleccion.show();
            me.winEditSeleccion.setTitle('Modificar seleccion de selecci&oacute;n');
            me.winEditSeleccion.down('button[action=aplicar]').hide();
            this._resetEditWindow();

            var form = me.winEditSeleccion.down('form[itemId=form_seleccion]');
            var recSeleccion = this.getList_seleccion().getSelectionModel().getLastSelected();
            form.loadRecord(recSeleccion);
            me.winEditSeleccion.down('numberfield[name=cantidad]').setMaxValue(recSeleccion.get('cantidad'));
        }
    },
    saveSeleccion: function(btn) {
        var me = this,
                win = btn.up('window'),
                formData = win.getComponent('form_seleccion').getForm();

        if (formData.isValid()) {
            loadProgress('Guardando datos del seleccion de selecci&oacute;n...');

            Ext.Ajax.request({
                url: 'saveseleccion',
                method: 'POST',
                params: {
                    datos: Ext.encode(formData.getValues())
                },
                callback: function(options, success, response) {
                    Ext.MessageBox.hide();
                    var responseData = Ext.decode(response.responseText);
                    if (responseData.success) {
                        (win.header.title == 'Adicionar seleccion de selecci&oacute;n') ? MensajeInformacion('Los datos del seleccion de selecci&oacute;n fueron adicionados correctamente.') : MensajeInformacion('Los datos del seleccion de selecci&oacute;n fueron modificados correctamente.');
                        if (btn.action == 'aplicar') {
                            formData.reset();
                        } else {
                            win.close();
                        }
                        me.getList_seleccion().getStore().reload();
                    } else {

                    }
                }
            });
        }
    },
    delSeleccion: function(btn) {
        var me = this,
                grid = me.getList_seleccion();
        if (grid.getSelectionModel().hasSelection()) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    var rec = grid.getSelectionModel().getLastSelected();
                    loadProgress('Eliminando datos del seleccion de selecci&oacute;n...');
                    Ext.Ajax.request({
                        url: 'delseleccion',
                        method: 'POST',
                        params: {
                            idseleccionseleccion: rec.get('idseleccionseleccion')
                        },
                        callback: function(options, success, response) {
                            Ext.MessageBox.hide();
                            grid.getStore().reload();
                        }
                    });
                }
            }
            showMsg(2, {'title': 'Confirmaci&oacute;n', 'message': '&iquest;Est&aacute; seguro que desea eliminar los datos del seleccion de selecci&oacute;n seleccionado?'}, confirmar);
        }
    },
    startSeleccion: function() {
        this.setStatus(1, '&iquest;Est&aacute; seguro que desea iniciar el seleccion de selecci&oacute;n seleccionado?');
    },
    stopSeleccion: function() {
        this.setStatus(2, '&iquest;Est&aacute; seguro que desea detener el seleccion de selecci&oacute;n seleccionado?');
    },
    endSeleccion: function() {
        this.setStatus(3, '&iquest;Est&aacute; seguro que desea finalizar el seleccion de selecci&oacute;n seleccionado?');
    },
    setStatus: function(status, msg) {
        var me = this;
        var grid = me.getList_seleccion();
        if (grid.getSelectionModel().hasSelection()) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    var rec = grid.getSelectionModel().getLastSelected();
                    loadProgress('Cambiando status del seleccion...');
                    Ext.Ajax.request({
                        url: 'changestatusseleccion',
                        method: 'POST',
                        params: {
                            idseleccionseleccion: rec.get('idseleccionseleccion'),
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
        var win = this.getEdit_seleccion();
        win.getComponent('form_seleccion').getForm().reset();
    }
});