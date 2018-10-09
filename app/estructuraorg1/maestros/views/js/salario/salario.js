/* global Ext, lMask */
Ext.onReady(function() {
    lMask.hide();
    Ext.QuickTips.init();
    var btnAdicionar = new Ext.Button({
        id: 'btnAdicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar salario',
        handler: function() {
            reSalario.stopEditing();
            reSalario.insertRow();
        }
    });
    var btnModificar = new Ext.Button({
        disabled: true,
        id: 'btnModificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar salario',
        handler: function() {
            if (gpSalario.getSelectionModel().getSelected()) {
                var indexRowSel = gpSalario.getSelectionModel().getSelectedIndex();
                reSalario.startEditing(indexRowSel);
            } else {
                MensajeInformacion("No se ha seleccionado ning&uacute;n salario.");
            }
        }
    });
    var btnEliminar = new Ext.Button({
        disabled: true,
        id: 'btnbuscar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar salario',
        handler: function() {
            if (gpSalario.getSelectionModel().getSelected()) {
                if (gpSalario.getSelectionModel().getSelected().data.idsalario.toString().length > 0) {
                    eliminarSalario();
                }
            } else {
                MensajeInformacion("No se ha seleccionado ning&uacute;n salario.");
            }
        }
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
    cbGrupoescala.on('select', function(combo, record, index) {
        Ext.getCmp('tfsalario').focus(false, 100);
    });
    var stSalario = new Ext.data.Store({
        autoLoad: true,
        baseParams: {
            start: 0,
            limit: 20
        },
        id: 'stSalario',
        name: 'stSalario',
        url: 'getsalario',
        reader: new Ext.data.JsonReader({
            root: 'data',
            totalProperty: 'total'
        }, [{
                name: 'idsalario'
            }, {
                name: 'salario'
            }, {
                name: 'idgrupoescala'
            }, {
                name: 'grupoescala',
                mapping: 'Grupoescala.nombre'
            }]),
        listeners: {
            load: function(e) {
                lMask.hide();
                smSalario.fireEvent('rowdeselect');
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        id: 'sfBuscar',
        width: 200,
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
        store: stSalario,
        fnOnSearch: function() {
            buscarSalario(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            buscarSalario(sfBuscar.getValue());
        }
    });
    var smSalario = new Ext.grid.RowSelectionModel({
        id: 'smSalario',
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
    var reSalario = new Ext.grid.RowEditor({
        id: 'reSalario',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpSalario').getBottomToolbar().enable();
                if (gpSalario.getSelectionModel().getSelected()) {
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
                Ext.getCmp('gpSalario').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                btnModificar.setDisabled(false);
                btnEliminar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpSalario').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gpSalario = new Ext.grid.EditorGridPanel({
        title: 'Salario',
        id: 'gpSalario',
        store: stSalario,
        sm: smSalario,
        border: false,
        loadMask: true,
        stripeRows: true,
        autoExpandColumn: 'expand',
        columns: [{
                id: 'expand',
                header: 'Grupo de escala salarial',
                dataIndex: 'grupoescala',
                width: 2300,
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
                renderer: formatoMonedaNopeso,
                editor: new Ext.form.TextField({
                    id: 'tfsalario',
                    tabIndex: 2,
                    maxLength: 19,
                    selectOnFocus: true,
                    allowBlank: false,
                    maskRe: /^([0-9\.]+?)+$/,
                    regex: /^([0-9\.]+?)+$/,
                    regexText: "Este valor es incorrecto.",
                    invalidText: "No es valor v&aacute;lido."
                })
            }, {
                header: 'idsalario',
                hidden: true,
                hideable: false,
                dataIndex: 'idsalario'
            }],
        tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stSalario,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        }),
        plugins: reSalario
    });
    /******************************************************************************/
    Ext.grid.RowSelectionModel.override({
        getSelectedIndex: function() {
            return this.grid.store.indexOf(this.selections.itemAt(0));
        }
    });
    function buscarSalario(criterio) {
        var modified = Ext.getCmp('gpSalario').getStore().getModifiedRecords();
        if (modified.length > 0) {
            MensajeInformacion("A&uacute;n existen cambios realizados que no han sido guardados o descartados");
        } else {
            Ext.getCmp('gpSalario').getStore().baseParams.criterio = criterio;
            Ext.getCmp('gpSalario').getStore().reload();
        }
    }
    function eliminarSalario() {
        function confirmar(btn)
        {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar salario', '&iquest;Est&aacute; seguro que desea eliminar el salario seleccionado?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando salario...');
            Ext.Ajax.request({
                url: 'deletesalario',
                method: 'POST',
                callback: function(options, success, response) {
                    var respuesta = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (respuesta == 1) {
                        MensajeInformacion('El salario seleccionado fue eliminado correctamente.');
                        Ext.getCmp('gpSalario').getStore().reload();
                    } else if (respuesta == 2) {
                        MensajeError('El salario tiene datos asociados y no puede ser eliminado.');
                    } else {
                        MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                    }
                },
                params: {
                    idsalario: Ext.getCmp('gpSalario').getSelectionModel().getSelected().data.idsalario
                }
            });
        }
    }

    function validateChanges(record, changes) {
        if (record.data.idsalario == "")
            adicionarSalario(record.data.salario, record.data.idgrupoescala);
        else
            modificarSalario(record.data.idsalario, record.data.salario, record.data.idgrupoescala);
    }

    function adicionarSalario(argsalario, argidgrupoescala) {
        MostrarBarraProgreso('Adicionando salario...');
        Ext.Ajax.request({
            url: 'adicionarsalario',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {// 1 significa que adiciono bien
                    MensajeInformacion('El salario fue adicionado correctamente.');
                    stSalario.reload();
                }
                else if (responseData == 2) {// 2 significa que ya existe esa salario
                    MensajeError('El salario que intenta adicionar ya existe.<br>Cambie el nombre del salario que desea adicionar.');
                }
                else {// 3 significa que dio error
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                salario: argsalario,
                idgrupoescala: argidgrupoescala
            }
        });
    }

    function modificarSalario(argidsalario, argsalario, argidgrupoescala) {
        MostrarBarraProgreso('Modificando salario...');
        Ext.Ajax.request({
            url: 'modificarsalario',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {// 1 significa que modifico bien
                    MensajeInformacion('El salario fue modificado correctamente.');
                    stSalario.reload();
                }
                else if (responseData == 2) {// 2 significa que ya existe esa salario
                    MensajeError('El salario que intenta modificar ya existe.<br>Cambie el nombre del salario que desea modificar.');
                }
                else {// 3 significa que dio error
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idsalario: argidsalario,
                salario: argsalario,
                idgrupoescala: argidgrupoescala
            }
        });
    }

    new Ext.Viewport({
        layout: 'fit',
        items: gpSalario
    });
});
