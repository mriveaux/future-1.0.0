/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function() {
    lMask.hide();
    var btnadicionar = new Ext.Button({
        disabled: false,
        id: 'btnadicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar unidad de medida',
        handler: function() {
            reUnidadMedida.stopEditing();
            reUnidadMedida.insertRow();
        }
    });
    var btnmodificar = new Ext.Button({
        id: 'btnmodificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar unidad de medida',
        disabled: true,
        handler: function() {
            if (Ext.getCmp('gpunidadmedida').getSelectionModel().getSelected()) {
                var indexRowSel = Ext.getCmp('gpunidadmedida').getSelectionModel().getSelectedIndex();
                reUnidadMedida.startEditing(indexRowSel);
            } else {
                MensajeInformacion(futureLang.msgselectunidadmedida);
            }
        }
    });
    var btneliminar = new Ext.Button({
        id: 'btneliminar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar unidad de medida',
        disabled: true,
        handler: function() {
            if (Ext.getCmp('gpunidadmedida').getSelectionModel().getSelected()) {
                if (Ext.getCmp('gpunidadmedida').getSelectionModel().getSelected().data.idunidadmedida.toString().length > 0) {
                    eliminarUnidadMedida();
                }
            } else {
                MensajeInformacion(futureLang.msgselectunidadmedida);
            }
        }
    });
    var stunidadmedida = new Ext.data.Store({
        id: 'stunidadmedida',
        url: 'loadunidadmedida',
        autoLoad: true,
        reader: new Ext.data.JsonReader({
            root: 'data',
            id: 'idRecord',
            totalProperty: 'total'
        }, [{
                name: 'idunidadmedida'
            }, {
                name: 'nombre'
            }, {
                name: 'abreviatura'
            }]),
        baseParams: {
            criterio: '',
            start: 0,
            limit: 20
        },
        listeners: {
            load: function(e)
            {
                lMask.hide();
                smunidadmedida.fireEvent('rowdeselect');
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        id: 'sfBuscar',
        lbTtlElement: 'unidad de medida',
        enableKeyEvents: true,
        selectOnFocus: true,
        maskRe: /^[ A-Za-z0-9\-\.]+$/,
        regex: /^[ A-Za-z0-9\-\.]+$/,
        maxLength: 30,
        store: stunidadmedida,
        fnOnSearch: function() {
            buscar(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            buscar(sfBuscar.getValue());
        }
    });
    var smunidadmedida = new Ext.grid.RowSelectionModel({
        singleSelect: true
    });
    smunidadmedida.on({
        rowselect: function() {
            btnmodificar.enable();
            btneliminar.enable();
        },
        rowdeselect: function() {
            btnmodificar.disable();
            btneliminar.disable();
        }
    });
    var reUnidadMedida = new Ext.grid.RowEditor({
        id: 'reUnidadMedida',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnadicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpunidadmedida').getBottomToolbar().enable();
                if (Ext.getCmp('gpunidadmedida').getSelectionModel().getSelected()) {
                    btnmodificar.setDisabled(false);
                    btneliminar.setDisabled(false);
                } else {
                    btnmodificar.setDisabled(true);
                    btneliminar.setDisabled(true);
                }
            },
            beforeedit: function(editor, grid, changes, record, rowIndex) {
                btnadicionar.setDisabled(true);
                btnmodificar.setDisabled(true);
                btneliminar.setDisabled(true);
                sfBuscar.disable();
                Ext.getCmp('gpunidadmedida').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnadicionar.setDisabled(false);
                btnmodificar.setDisabled(false);
                btneliminar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpunidadmedida').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gpunidadmedida = new Ext.grid.EditorGridPanel({
        id: 'gpunidadmedida',
        store: stunidadmedida,
        autoExpandColumn: 'expand',
        sm: smunidadmedida,
        border: false,
        stripeRows: true,
        loadMask: true,
        plugins: reUnidadMedida,
        viewConfig: {
            forceFit: true,
            autoFill: true
        },
        columns: [{
                id: 'expand',
                header: 'Nombre',
                tooltip: 'Denominaci&oacute;n de la unidad de medida',
                minWidth: 200,
                sortable: true,
                dataIndex: 'nombre',
                editor: new Ext.form.TextField({
                    id: 'tfnombre',
                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
                    allowBlank: false,
                    selectOnFocus: true,
                    maxLength: 255
                })
            }, {
                header: 'Abreviatura',
                tooltip: 'Abreviatura de la unidad de medida',
                minWidth: 150,
                sortable: true,
                dataIndex: 'abreviatura',
                editor: new Ext.form.TextField({
                    id: 'tfAbreviatura',
                    maskRe: /^[ A-Za-z0-9\-\.]+$/,
                    regex: /^[ A-Za-z0-9\-\.]+$/,
                    allowBlank: false,
                    selectOnFocus: true,
                    width: 100,
                    maxLength: 30
                })
            }, {
                hidden: true,
                hideable: false,
                sortable: false,
                dataIndex: 'idunidadmedida'
            }],
        tbar: [btnadicionar, btnmodificar, btneliminar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stunidadmedida,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });
    new Ext.Viewport({
        layout: 'fit',
        items: gpunidadmedida
    });
    Ext.grid.RowSelectionModel.override({
        getSelectedIndex: function() {
            return this.grid.store.indexOf(this.selections.itemAt(0));
        }
    });
    function buscar(criterio) {
        var modified = Ext.getCmp('gpunidadmedida').getStore().getModifiedRecords();
        if (modified.length > 0) {
            MensajeInformacion("A&uacute;n existen cambios realizados que no han sido guardados o descartados");
        } else {
            Ext.getCmp('gpunidadmedida').getStore().baseParams.criterio = criterio;
            Ext.getCmp('gpunidadmedida').getStore().reload();
        }
    }

    function validateChanges(record, changes) {
        if (record.data.idunidadmedida == "")
            adicionarUnidadMedida(record.data.nombre, record.data.abreviatura);
        else
            modificarUnidadMedida(record.data.idunidadmedida, record.data.nombre, record.data.abreviatura);
    }

    function adicionarUnidadMedida(argNombre, argAbreviatura) {
        MostrarBarraProgreso(futureLang.msgaddunidadmedida);
        Ext.Ajax.request({
            url: 'addunidadmedida',
            method: 'POST',
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 0) {// 0 significa que adiciono bien
                    MensajeInformacion(futureLang.msgconfirmaddunidadmedida);
                    stunidadmedida.reload();
                    stunidadmedida.fireEvent('rowdeselect');
                }
                else if (responseData == 1) {// 1 significa que ya existe ese nombre de unidadmedida
                    MensajeError(futureLang.msgchangenameunidadmedida);
                }
                else {// 2 significa que dio error
                    MensajeError(futureLang.msgajaxerror);
                }
            },
            params: {
                nombre: argNombre,
                abreviatura: argAbreviatura
            }
        });
    }
    function modificarUnidadMedida(agIdUnidadMedida, argNombre, argAbreviatura) {
        MostrarBarraProgreso(futureLang.msgmodunidadmedida);
        Ext.Ajax.request({
            url: 'modunidadmedida',
            method: 'POST',
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 0) {
                    MensajeInformacion(futureLang.msgconfirmmodunidadmedida);
                    stunidadmedida.reload();
                    stunidadmedida.fireEvent('rowdeselect');
                }
                else if (responseData == 1) {// 1 significa que ya existe ese nombre de unidadmedida
                    MensajeError(futureLang.msgchangenameunidadmedida);
                }
                else {// 2 significa que dio error
                    MensajeError(futureLang.msgajaxerror);
                }
            },
            params: {
                idunidadmedida: agIdUnidadMedida,
                nombre: argNombre,
                abreviatura: argAbreviatura
            }
        });
    }
    function eliminarUnidadMedida() {
        function confirmar(btn) {
            if (btn === 'ok')
                deleteUnidadMedida();
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> ' + futureLang.lbdelunidadmedida, futureLang.questdeleteunidadmedida, confirmar);

        function deleteUnidadMedida() {
            MostrarBarraProgreso(futureLang.msgdelunidadmedida);
            Ext.Ajax.request({
                url: 'delunidadmedida',
                method: 'POST',
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 0) {
                        MensajeInformacion(futureLang.msgconfirmdelunidadmedida);
                        stunidadmedida.reload();
                    }
                    else if (responseData == 1) {
                        MensajeError(futureLang.msgdelunidadmedidaasocied);
                    }
                    else {
                        MensajeError(futureLang.msgajaxerror);
                    }
                },
                params: {
                    idunidadmedida: smunidadmedida.getSelected().data.idunidadmedida
                }
            });
        }
    }


});