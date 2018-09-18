Ext.define('Registropersona.controller.Registropersona', {
    extend: 'Ext.app.Controller',
    views: ['registropersona.Ficha', 'registropersona.List', 'registropersona.Edit', 'registropersona.WinAditionalData', 'registropersona.ListAditionalData', 'registropersona.TabPanelAditionalData'],
    stores: ['Registropersona', 'Nacionalidad', 'Categoriadoc', 'AditionalData'],
    model: ['Registropersona', 'Nacionalidad', 'Categoriadoc', 'AditionalData'],
    refs: [
        {ref: 'ficha_persona', selector: 'ficha_persona'},
        {ref: 'list_persona', selector: 'list_persona'},
        {ref: 'edit_persona', selector: 'edit_persona'},
        {ref: 'aditional_data', selector: 'aditional_data'},
        {ref: 'list_aditional_data', selector: 'list_aditional_data'},
        {ref: 'tabpanel_aditionaldata', selector: 'tabpanel_aditionaldata'}
    ],
    init: function() {
        this.control({
            'list_persona': {
                itemdblclick: this.editRegistropersona,
                selectionchange: this.onPersonaSelectionChange
            },
            'list_persona button[action=add]': {
                click: this.addRegistropersona
            },
            'list_persona button[action=mod]': {
                click: this.modRegistropersona
            },
            'list_persona button[action=del]': {
                click: this.delRegistropersona
            },
            'list_persona button[action=plus]': {
                click: this.showPlusWindow
            },
            'edit_persona button[action=aceptar]': {
                click: this.saveRegistropersona
            },
            'edit_persona button[action=aplicar]': {
                click: this.saveRegistropersona
            },
            'list_aditional_data': {
                selectionchange: this.loadItem
            },
            'aditional_data': {
                close: this.closeTabPanel
            }
        });
    },
    loadItem: function(sm, selected) {
        var me = this;
        if (sm.hasSelection()) {
            var tabPanel = me.getTabpanel_aditionaldata(),
                    p = tabPanel.down(selected[0].data.alias);
            if (p === null) {
                p = Ext.create(selected[0].data.clsname, {
                    closable: true
                });
                tabPanel.add(p);
            }
            tabPanel.setActiveTab(p);
        }
    },
    onPersonaSelectionChange: function(sm, selected) {
        var me = this,
                pFicha = me.getFicha_persona(),
                formFicha = pFicha.down('form').getForm(),
                foto = pFicha.down('image[name=foto]');

        me.getList_persona().down('button[action=mod]').disable();
        me.getList_persona().down('button[action=del]').disable();
        me.getList_persona().down('button[action=plus]').disable();

        if (sm.hasSelection()) {
            me.getList_persona().down('button[action=mod]').enable();
            me.getList_persona().down('button[action=del]').enable();
            me.getList_persona().down('button[action=plus]').enable();
            var recPersona = sm.getLastSelected();
            formFicha.loadRecord(recPersona);
            me.setLocalList(pFicha.down('textfield[name=sexo]'), pFicha.down('textfield[name=estadocivil]'), pFicha.down('textfield[name=status]'));
            if (recPersona.get('foto')) {
                foto.setSrc(recPersona.get('foto'));
            } else {
                foto.setSrc(pFicha.DEFAULT_IMAGE);
            }
        } else {
            formFicha.reset();
            foto.setSrc(pFicha.DEFAULT_IMAGE);
        }
    },
    addRegistropersona: function() {
        var me = this;
        if (!me.winEditPersona) {
            me.winEditPersona = Ext.widget('edit_persona');
        }
        me.winEditPersona.show();
        me.winEditPersona.setTitle('<i class="fa fa-plus"></i> Adicionar datos de la persona');
        me.winEditPersona.down('button[action=aplicar]').show();
        this._resetEditWindow();
    },
    modRegistropersona: function() {
        var me = this,
                smPersona = me.getList_persona().getSelectionModel();

        if (smPersona.hasSelection()) {
            if (!me.winEditPersona) {
                me.winEditPersona = Ext.widget('edit_persona');
            }
            me.winEditPersona.show();
            me.winEditPersona.setTitle('<i class="fa fa-edit"></i> Modificar datos de la persona');
            me.winEditPersona.down('button[action=aplicar]').hide();
            this._resetEditWindow();

            var form = me.winEditPersona.down('form[itemId=basic_data]');
            var recPersona = this.getList_persona().getSelectionModel().getLastSelected();
            form.loadRecord(recPersona);
            if (recPersona.get('foto')) {
                me.winEditPersona.down('image[name=foto]').setSrc(recPersona.get('foto'));
            }
        }
    },
    saveRegistropersona: function(btn) {
        var me = this,
                win = btn.up('window'),
                formBasicData = win.getComponent('basic_data').getForm(),
                foto = null,
                datosBasicos = {},
                datosGenerales = {};

        if (formBasicData.isValid()) {
            loadProgress('Guardando datos de la persona...');
            datosBasicos = formBasicData.getValues();

            //Solo guarda la foto si esta fue modificada
            if (me.getFicha_persona().DEFAULT_IMAGE != win.down('image[name=foto]').src) {
                foto = win.down('image[name=foto]').src;
            }

            Ext.Ajax.request({
                url: 'saveregistropersona',
                method: 'POST',
                params: {
                    foto: foto,
                    datosBasicos: Ext.encode(datosBasicos),
                    datosGenerales: Ext.encode(datosGenerales)
                },
                callback: function(options, success, response) {
                    Ext.MessageBox.hide();
                    var responseData = Ext.decode(response.responseText);
                    if (responseData.success) {
                        (win.header.title == 'Adicionar datos de la persona') ? MensajeInformacion('Los datos de la persona fueron adicionados correctamente.') : MensajeInformacion('Los datos de la persona fueron modificados correctamente.');
                        if (btn.action == 'aplicar') {
                            formBasicData.reset();
                            win.down('image[name=foto]').setSrc(me.getFicha_persona().DEFAULT_IMAGE);
                        } else {
                            win.close();
                        }
                        me.getList_persona().getStore().reload();
                    } else {

                    }
                }
            });
        }
    },
    delRegistropersona: function(btn) {
        var me = this,
                grid = me.getList_persona();
        if (grid.getSelectionModel().hasSelection()) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    var rec = grid.getSelectionModel().getLastSelected();
                    loadProgress('Eliminando datos de la persona...');
                    Ext.Ajax.request({
                        url: 'delregistropersona',
                        method: 'POST',
                        params: {
                            idpersona: rec.get('idpersona')
                        },
                        callback: function(options, success, response) {
                            Ext.MessageBox.hide();
                            grid.getStore().reload();
                        }
                    });
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> Eliminar datos de la persona', 'message': '&iquest;Est&aacute; seguro que desea eliminar los datos de la persona seleccionada?'}, confirmar);
        }
    },
    showPlusWindow: function() {
        var me = this;
        me.winAditionalData = Ext.widget('aditional_data');
        me.winAditionalData.show();
    },
    setLocalList: function(el1, el2, el3) {
        var me = this;
        me.setSexo(el1);
        me.setEstadoCivil(el2);
        me.setStatus(el3);
    },
    setSexo: function(field) {
        field.setValue((field.getValue() == 0) ? "Femenino" : "Masculino");
    },
    setEstadoCivil: function(field) {
        field.setValue((field.getValue() == 0) ? "Soltero" : ((field.getValue() == 1) ? "Casado" : "Viudo"));
    },
    setStatus: function(field) {
        field.setValue((field.getValue() == 0) ? "Bolsa" : ((field.getValue() == 1) ? "Contratado" : ((field.getValue() == 2) ? "Reserva" : "Baja")));
    },
    _resetEditWindow: function() {
        var win = this.getEdit_persona();
        win.down('image[name=foto]').setSrc(this.getFicha_persona().DEFAULT_IMAGE);
        win.getComponent('basic_data').getForm().reset();
    },
    closeTabPanel: function() {
        var me = this;
        me.getTabpanel_aditionaldata().close();
    }
});