Ext.define('Directa.controller.Directa', {
    extend: 'Ext.app.Controller',
    views: ['directa.Ficha', 'directa.TabPanelDirecta', 'directa.List', 'directa.ListSeleccion', 'directa.Edit'],
    stores: ['Directa', 'Cargoplantilla', 'Selecciondirecta'],
    model: ['Directa', 'Cargoplantilla', 'Selecciondirecta'],
    refs: [
        {ref: 'ficha_persona', selector: 'ficha_persona'},
        {ref: 'tabpanel_directa', selector: 'tabpanel_directa'},
        {ref: 'list_persona', selector: 'list_persona'},
        {ref: 'list_seleccion', selector: 'list_seleccion'},
        {ref: 'edit_persona', selector: 'edit_persona'}
    ],
    init: function() {
        this.control({
            'tabpanel_directa': {
                render: this.loadTabsElements
            },
            'list_persona': {
                itemdblclick: this.addDirecta,
                selectionchange: this.onPersonaSelectionChange
            },
            'list_persona button[action=add]': {
                click: this.addDirecta
            },
            'edit_persona': {
                show: this.onShow
            },
            'edit_persona button[action=aceptar]': {
                click: this.saveDirecta
            },
            'edit_persona combobox[name=tipocontrato]': {
                select: this.onSelectContrato
            },
            'list_seleccion': {
                selectionchange: this.onSelectSelectionChange
            },
        });
    },
    loadTabsElements: function() {
        var me = this;
        var tabPanel = me.getTabpanel_directa();
        var list = Ext.create('Directa.view.directa.List', {
            closable: false
        });
        var listSeleccion = Ext.create('Directa.view.directa.ListSeleccion', {
            closable: false
        });
        tabPanel.add(list);
        tabPanel.add(listSeleccion);
        tabPanel.setActiveTab(0);
    },
    onSelectContrato: function(cb, selection) {
        cb.up('window').down('datefield[name=fechafin]').setDisabled((selection[0].get('id') == 0) ? true : false);
    },
    onShow: function() {
        var me = this;
        var edit = me.getEdit_persona();
        var combo = edit.down('combo[name=cargoplantilla]');
        combo.getStore().load();
    },
    onPersonaSelectionChange: function(sm, selected) {
        var me = this,
                pFicha = me.getFicha_persona(),
                formFicha = pFicha.down('form').getForm(),
                foto = pFicha.down('image[name=foto]');

        me.getList_persona().down('button[action=add]').disable();

        if (sm.hasSelection()) {
            me.getList_persona().down('button[action=add]').enable();
            var recPersona = sm.getLastSelected();
            recPersona.data.nombre = recPersona.data.nombre + ' ' + recPersona.data.apellidos;
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
    addDirecta: function() {
        var me = this;
        if (!me.winEditPersona) {
            me.winEditPersona = Ext.widget('edit_persona');
        }
        me.winEditPersona.show();
        me.winEditPersona.setTitle('<i class="fa fa-check-square-o"></i> Seleccionar persona para cargo');
        this._resetEditWindow();

        var form = me.winEditPersona.down('form[itemId=basic_data]');
        var recPersona = this.getList_persona().getSelectionModel().getLastSelected();
        form.loadRecord(recPersona);
        if (recPersona.get('foto')) {
            me.winEditPersona.down('image[name=foto]').setSrc(recPersona.get('foto'));
        }
    },
    saveDirecta: function(btn) {
        var me = this,
                win = btn.up('window'),
                formBasicData = win.getComponent('basic_data').getForm(),
                params = formBasicData.getValues();

        if (formBasicData.isValid()) {
            if (params.tipocontrato == 1 && !params.fechafin) {//validar que seleccione fecha fin
                MensajeAdvertencia('El contrato es de tipo \"Determinado\", por favor seleccione la fecha \"Hasta¨\".');
                return;
            }
            loadProgress('Guardando datos de la selecci&oacute;n...');
            Ext.Ajax.request({
                url: 'savedirecta',
                method: 'POST',
                params: params,
                callback: function(options, success, response) {
                    Ext.MessageBox.hide();
                    var responseData = Ext.decode(response.responseText);
                    if (responseData) {
                        MensajeInformacion('Los datos de la selecci&oacute;n fueron guardados correctamente.');
                        win.close();
                        me.getList_persona().getStore().reload();
                    }
                }
            });
        }
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
    onSelectSelectionChange: function(sm, selected) {
        var me = this,
                pFicha = me.getFicha_persona(),
                formFicha = pFicha.down('form').getForm(),
                foto = pFicha.down('image[name=foto]');

        me.getList_persona().down('button[action=add]').disable();

        if (sm.hasSelection()) {
            var recSeleccion = sm.getLastSelected();
            console.info(recSeleccion)
            formFicha.loadRecord(recSeleccion);
            me.setLocalList(pFicha.down('textfield[name=sexo]'), pFicha.down('textfield[name=estadocivil]'), pFicha.down('textfield[name=status]'));
            if (recSeleccion.get('foto')) {
                foto.setSrc(recSeleccion.get('foto'));
            } else {
                foto.setSrc(pFicha.DEFAULT_IMAGE);
            }
        } else {
            formFicha.reset();
            foto.setSrc(pFicha.DEFAULT_IMAGE);
        }
    }
});