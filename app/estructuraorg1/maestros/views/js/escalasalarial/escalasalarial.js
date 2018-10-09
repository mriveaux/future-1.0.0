/* global Ext, lMask */
Ext.onReady(function() {
    lMask.hide();
    Ext.QuickTips.init();
    var btnAdicionar = new Ext.Button({
        id: 'btnAdicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar escala salarial',
        handler: function() {
            reEscalasalarial.stopEditing();
            reEscalasalarial.insertRow();
        }
    });
    var btnModificar = new Ext.Button({
        disabled: true,
        id: 'btnModificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar escala salarial',
        handler: function() {
            if (gpEscalasalarial.getSelectionModel().getSelected()) {
                var indexRowSel = gpEscalasalarial.getSelectionModel().getSelectedIndex();
                reEscalasalarial.startEditing(indexRowSel);
            } else {
                MensajeInformacion("No se ha seleccionado ning&uacute;n escala salarial.");
            }
        }
    });
    var btnEliminar = new Ext.Button({
        disabled: true,
        id: 'btnbuscar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar escala salarial',
        handler: function() {
            if (gpEscalasalarial.getSelectionModel().getSelected()) {
                if (gpEscalasalarial.getSelectionModel().getSelected().data.idescalasalarial.toString().length > 0) {
                    eliminarEscalasalarial();
                }
            } else {
                MensajeInformacion("No se ha seleccionado ning&uacute;n escala salarial.");
            }
        }
    });
    var stTipoescala = new Ext.data.Store({
        url: 'cargartipoescala',
        reader: new Ext.data.JsonReader({
            id: 'idRecord'
        }, [{
                name: 'idtipoescala',
                type: 'float'
            }, {
                name: 'nombre'
            }, {
                name: 'abreviatura'
            }])
    });
    stTipoescala.load();
    var cbTipoescala = new Ext.form.ComboBox({
        mode: 'local',
        id: 'cbTipoescala',
        store: stTipoescala,
        valueField: 'idtipoescala',
        displayField: 'nombre',
        resizable: true,
        typeAhead: true,
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        maskRe: /^[a-zA-Z]+$/,
        editable: true,
        allowBlank: false,
        anchor: '100%'
    });
    var stGrupoescala = new Ext.data.Store({
        url: 'cargargrupoescala',
        reader: new Ext.data.JsonReader({
            id: 'idRecord'
        }, [{
                name: 'idgrupoescala',
                type: 'float'
            }, {
                name: 'nombre'
            }, {
                name: 'abreviatura'
            }])
    });
    stGrupoescala.load();
    var cbGrupoescala = new Ext.form.ComboBox({
        mode: 'local',
        id: 'cbGrupoescala',
        store: stGrupoescala,
        valueField: 'idgrupoescala',
        displayField: 'nombre',
        resizable: true,
        typeAhead: true,
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        maskRe: /^[a-zA-Z]+$/,
        editable: true,
        allowBlank: false,
        anchor: '100%'
    });
    var stSalario = new Ext.data.Store({
        url: 'cargarsalario',
        reader: new Ext.data.JsonReader({
            id: 'idRecord'
        }, [{
                name: 'idsalario',
                type: 'float'
            }, {
                name: 'salario'
            }, {
                name: 'idgrupoescala'
            }])
    });
    var cbSalario = new Ext.form.ComboBox({
        mode: 'local',
        id: 'cbSalario',
        store: stSalario,
        valueField: 'idsalario',
        displayField: 'salario',
        resizable: true,
        typeAhead: true,
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        maskRe: /^[a-zA-Z]+$/,
        editable: true,
        allowBlank: false,
        anchor: '100%'
    });
    cbGrupoescala.on('select', function(combo, record, index) {
        cbSalario.setValue('');
        stSalario.reload({params: {idgrupoescala: record.data.idgrupoescala}});
    });
    var stEscalasalarial = new Ext.data.Store({
        autoLoad: true,
        baseParams: {
            start: 0,
            limit: 20
        },
        id: 'stEscalasalarial',
        name: 'stEscalasalarial',
        url: 'getescalasalarial',
        reader: new Ext.data.JsonReader({
            root: 'data',
            totalProperty: 'total'
        }, [{
                name: 'idescalasalarial'
            }, {
                name: 'idtipoescala'
            }, {
                name: 'tipoescala',
                mapping: 'Tipoescala.nombre'
            }, {
                name: 'idgrupoescala'
            }, {
                name: 'grupoescala',
                mapping: 'Grupoescala.nombre'
            }, {
                name: 'idsalario'
            }, {
                name: 'salario',
                mapping: 'Salario.salario'
            }]),
        listeners: {
            load: function(e) {
                lMask.hide();
                smEscalasalarial.fireEvent('rowdeselect');
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        id: 'sfBuscar',
        width: 200,
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
        store: stEscalasalarial,
        fnOnSearch: function() {
            buscarEscalasalarial(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            buscarEscalasalarial(sfBuscar.getValue());
        }
    });
    var smEscalasalarial = new Ext.grid.RowSelectionModel({
        id: 'smEscalasalarial',
        singleSelect: true,
        listeners: {
            rowselect: function() {
                btnModificar.enable();
                btnEliminar.enable();
            },
            rowdeselect: function() {
                btnModificar.disable();
                btnEliminar.disable();
            }

        }
    });
    var reEscalasalarial = new Ext.grid.RowEditor({
        id: 'reEscalasalarial',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpEscalasalarial').getBottomToolbar().enable();
                if (gpEscalasalarial.getSelectionModel().getSelected()) {
                    btnModificar.setDisabled(false);
                    btnEliminar.setDisabled(false);
                } else {
                    btnModificar.setDisabled(true);
                    btnEliminar.setDisabled(true);
                }
            },
            beforeedit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(true);
                btnModificar.setDisabled(true);
                btnEliminar.setDisabled(true);
                sfBuscar.disable();
                Ext.getCmp('gpEscalasalarial').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                btnModificar.setDisabled(false);
                btnEliminar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpEscalasalarial').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gpEscalasalarial = new Ext.grid.EditorGridPanel({
        title: 'Escala salarial',
        id: 'gpEscalasalarial',
        store: stEscalasalarial,
        sm: smEscalasalarial,
        border: false,
        loadMask: true,
        stripeRows: true,
        autoExpandColumn: 'expand',
        columns: [{
                id: 'expand',
                header: 'Tipo de escala salarial',
                dataIndex: 'tipoescala',
                width: 200,
                sortable: false,
                fixed: true,
                editor: cbTipoescala,
                renderer: function(value, metaData, record, rowIndex, colIndex) {
                    if (!Ext.isEmpty(value) && typeof value == 'number') {
                        return stTipoescala.getAt(stTipoescala.find('idtipoescala', value)).data.nombre;
                    } else
                        return value;
                }
            }, {
                header: 'Grupo de escala salarial',
                dataIndex: 'grupoescala',
                width: 300,
                sortable: false,
                fixed: true,
                editor: cbGrupoescala,
                renderer: function(value, metaData, record, rowIndex, colIndex) {
                    if (!Ext.isEmpty(value) && typeof value == 'number') {
                        return stGrupoescala.getAt(stGrupoescala.find('idgrupoescala', value)).data.nombre;
                    } else
                        return value;
                }
            }, {
                header: 'Salario',
                width: 120,
                dataIndex: 'salario',
                sortable: false,
                align: 'right',
                fixed: true,
                editor: cbSalario,
                renderer: function(value, metaData, record, rowIndex, colIndex) {
                    if (!Ext.isEmpty(value) && typeof value == 'number') {
                        return formatoMonedaNopeso(stSalario.getAt(stSalario.find('idsalario', value)).data.salario);
                    } else
                        return formatoMonedaNopeso(value);
                }
            }, {
                header: 'idescalasalarial',
                hidden: true,
                hideable: false,
                dataIndex: 'idescalasalarial'
            }],
        tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stEscalasalarial,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        }),
        plugins: reEscalasalarial
    });
    /******************************************************************************/
    Ext.grid.RowSelectionModel.override({
        getSelectedIndex: function() {
            return this.grid.store.indexOf(this.selections.itemAt(0));
        }
    });
    function buscarEscalasalarial(criterio) {
        var modified = Ext.getCmp('gpEscalasalarial').getStore().getModifiedRecords();
        if (modified.length > 0) {
            MensajeInformacion("A&uacute;n existen cambios realizados que no han sido guardados o descartados");
        } else {
            Ext.getCmp('gpEscalasalarial').getStore().baseParams.criterio = criterio;
            Ext.getCmp('gpEscalasalarial').getStore().reload();
        }
    }
    function eliminarEscalasalarial() {
        function confirmar(btn)
        {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar escala salarial', '&iquest;Est&aacute; seguro que desea eliminar la escala salarial seleccionada?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando escala salarial...');
            Ext.Ajax.request({
                url: 'deleteescalasalarial',
                method: 'POST',
                callback: function(options, success, response) {
                    var respuesta = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (respuesta == 1) {
                        MensajeInformacion('La escala salarial fue eliminada correctamente.');
                        Ext.getCmp('gpEscalasalarial').getStore().reload();
                    } else if (respuesta == 2) {
                        MensajeError('La escala salarial tiene datos asociados y no puede ser eliminada.');
                    } else {
                        MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                    }
                },
                params: {
                    idescalasalarial: Ext.getCmp('gpEscalasalarial').getSelectionModel().getSelected().data.idescalasalarial
                }
            });
        }
    }

    function validateChanges(record, changes) {
        if (record.data.idescalasalarial == "")
            adicionarEscalasalarial(changes.idtipoescala, changes.idgrupoescala, changes.idsalario);
        else
            modificarEscalasalarial(record.data.idescalasalarial, changes.idtipoescala, changes.idgrupoescala, changes.idsalario);
    }

    function adicionarEscalasalarial(argIdtipoescala, argIdgrupoescala, argIdsalario) {
        MostrarBarraProgreso('Adicionando escala salarial...');
        Ext.Ajax.request({
            url: 'adicionarescalasalarial',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {// 1 significa que adiciono bien
                    MensajeInformacion('La escala salarial fue adicionada correctamente.');
                    stEscalasalarial.reload();
                }
                else if (responseData == 2) {// 2 significa que ya existe esa escalasalarial
                    MensajeError('La escala salarial que intenta adicionar ya existe.<br>Cambie los datos "Tipo de escala salarial - Grupo de escala salarial - Salario" que desea adicionar.');
                }
                else {// 3 significa que dio error
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idtipoescala: argIdtipoescala,
                idgrupoescala: argIdgrupoescala,
                idsalario: argIdsalario
            }
        });
    }

    function modificarEscalasalarial(argIdescalasalarial, argIdtipoescala, argIdgrupoescala, argIdsalario) {
        MostrarBarraProgreso('Modificando escala salarial...');
        Ext.Ajax.request({
            url: 'modificarescalasalarial',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {// 1 significa que modifico bien
                    MensajeInformacion('La escala salarial fue modificada correctamente.');
                    stEscalasalarial.reload();
                }
                else if (responseData == 2) {// 2 significa que ya existe esa escalasalarial
                    MensajeError('La escala salarial que intenta modificar ya existe.<br>Cambie los datos "Tipo de escala salarial - Grupo de escala salarial - Salario" que desea modificar.');
                }
                else {// 3 significa que dio error
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idescalasalarial: argIdescalasalarial,
                idtipoescala: argIdtipoescala,
                idgrupoescala: argIdgrupoescala,
                idsalario: argIdsalario
            }
        });
    }

    new Ext.Viewport({
        layout: 'fit',
        items: gpEscalasalarial
    });
});
