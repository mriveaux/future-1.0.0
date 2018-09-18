/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function() {
    var btnAdicionar = new Ext.Button({
        id: 'btnAdicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar tipo de veh&iacute;culo',
        disabled: false,
        handler: function() {
            reTipovehiculo.stopEditing();
            reTipovehiculo.insertRow();
        }
    });
    var btnModificar = new Ext.Button({
        id: 'btnModificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar tipo de veh&iacute;culo',
        disabled: true,
        handler: function() {
            if (gpTipovehiculo.getSelectionModel().getSelected()) {
                reTipovehiculo.startEditing(gpTipovehiculo.getSelectionModel().getSelected());
            } else {
                MensajeInformacion("No se ha seleccionado ning&uacute;n tipo de veh&iacute;culo.");
            }
        }
    });
    var btnEliminar = new Ext.Button({
        id: 'btnEliminar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar tipo de veh&iacute;culo',
        disabled: true,
        handler: function() {
            if (gpTipovehiculo.getSelectionModel().getSelected()) {
                if (gpTipovehiculo.getSelectionModel().getSelected().data.idtipovehiculo.toString().length > 0) {
                    eliminarTipovehiculo();
                }
            } else {
                MensajeInformacion("No se ha seleccionado ning&uacute;n tipo de veh&iacute;culo.");
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 200,
        store: stTipovehiculo,
        fnOnSearch: function() {
            Buscar(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            Buscar(sfBuscar.getValue());
        }
    });

    var stTipovehiculo = new Ext.data.Store({
        url: 'gettipovehiculo',
        reader: new Ext.data.JsonReader({
            root: 'data',
            totalProperty: 'total'
        }, [{
                name: 'idtipovehiculo'
            }, {
                name: 'nombre'
            }]),
        baseParams: {
            criterio: ''
        },
        listeners: {
            load: function(e)
            {
                if (stTipovehiculo.getCount() > 0) {
                    smTipovehiculo.selectFirstRow();
                }
                lMask.hide();
            }
        }
    });
    stTipovehiculo.load({
        params: {
            start: 0,
            limit: 20
        }
    });
    var smTipovehiculo = new Ext.grid.RowSelectionModel({
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
    var reTipovehiculo = new Ext.grid.RowEditor({
        id: 'reTipovehiculo',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpTipovehiculo').getBottomToolbar().enable();
                if (gpTipovehiculo.getSelectionModel().getSelected()) {
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
                Ext.getCmp('gpTipovehiculo').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                btnModificar.setDisabled(false);
                btnEliminar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpTipovehiculo').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gpTipovehiculo = new Ext.grid.EditorGridPanel({
        id: 'gpTipovehiculo',
        store: stTipovehiculo,
        autoExpandColumn: 'expanded',
        sm: smTipovehiculo,
        plugins: reTipovehiculo,
        border: false,
        loadMask: true,
        stripeRows: true,
        columns: [
            {
                id: 'expanded',
                header: 'Tipo veh&iacute;culo',
                sortable: true,
                width: 130,
                dataIndex: 'nombre',
                editor: new Ext.form.TextField({
                    tabIndex: 1,
                    id: 'tfNombre',
                    maxLength: 50,
                    selectOnFocus: true,
                    allowBlank: false,
                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regexText: "Este valor es incorrecto.",
                    invalidText: "No es valor v&aacute;lido."
                })
            }, {
                hidden: true,
                hideable: false,
                width: 120,
                dataIndex: 'idtipovehiculo'
            }],
        tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stTipovehiculo,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });
    new Ext.Viewport({
        layout: 'fit',
        items: gpTipovehiculo
    });
    function validateChanges(record, changes) {
        if (record.data.idtipovehiculo === "")
            adicionarTipovehiculo(record.data.nombre);
        else
            modificarTipovehiculo(record.data.idtipovehiculo, record.data.nombre);
    }
    function adicionarTipovehiculo(nombre) {
        MostrarBarraProgreso('Adicionando tipo de veh&iacute;culo...');
        Ext.Ajax.request({
            url: 'addtipovehiculo',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('El tipo de veh&iacute;culo fue adicionado correctamente.');
                    stTipovehiculo.reload();
                }
                else if (responseData == 2)
                    MensajeError('El tipo de veh&iacute;culo que intenta adicionar ya existe.<br>Verifique el nombre del tipo de veh&iacute;culo que desea adicionar.');
                else
                    MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
            },
            params: {
                nombre: nombre
            }
        });
    }

    function modificarTipovehiculo(idtipovehiculo, nombre) {
        MostrarBarraProgreso('Modificando tipo de veh&iacute;culo...');
        Ext.Ajax.request({
            url: 'modtipovehiculo',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('El tipo de veh&iacute;culo fue modificado correctamente.');
                    stTipovehiculo.reload();
                }
                else if (responseData == 2)
                    MensajeError('El tipo de veh&iacute;culo que intenta modificar ya existe.<br>Verifique el nombre del tipo de veh&iacute;culo que desea modificar.');
                else
                    MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
            },
            params: {
                idtipovehiculo: idtipovehiculo,
                nombre: nombre
            }
        });
    }

    function eliminarTipovehiculo() {
        function confirmar(btn) {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar tipo de veh&iacute;culo', '&iquest;Est&aacute; seguro que desea eliminar el tipo de veh&iacute;culo seleccionado?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando tipo de veh&iacute;culo...');
            Ext.Ajax.request({
                url: 'deltipovehiculo',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion('El tipo de veh&iacute;culo fue eliminado correctamente.');
                        stTipovehiculo.reload();
                    }
                    else if (responseData == 2)
                        MensajeError('El tipo de veh&iacute;culo tiene datos asociados y no puede ser eliminado.');
                    else
                        MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                },
                params: {
                    idtipovehiculo: smTipovehiculo.getSelected().data.idtipovehiculo
                }
            });
        }
    }
    function Buscar(criterio) {
        stTipovehiculo.baseParams.criterio = criterio;
        stTipovehiculo.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
});