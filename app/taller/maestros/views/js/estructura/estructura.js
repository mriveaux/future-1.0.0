/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function() {

    var btnAdicionar = new Ext.Button({
        id: 'btnAdicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar estructura',
        disabled: false,
        handler: function() {
            reEstructura.stopEditing();
            reEstructura.insertRow();
        }
    });
    var btnModificar = new Ext.Button({
        id: 'btnModificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar estructura',
        disabled: true,
        handler: function() {
            if (gpEstructura.getSelectionModel().getSelected()) {
                reEstructura.startEditing(gpEstructura.getSelectionModel().getSelected());
            } else {
                MensajeInformacion("No se ha seleccionado ninguna estructura.");
            }
        }
    });
    var btnEliminar = new Ext.Button({
        id: 'btnEliminar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar estructura',
        disabled: true,
        handler: function() {
            if (gpEstructura.getSelectionModel().getSelected()) {
                if (gpEstructura.getSelectionModel().getSelected().data.idestructura.toString().length > 0) {
                    eliminarEstructura();
                }
            } else {
                MensajeInformacion("No se ha seleccionado ninguna estructura.");
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 200,
        store: stEstructura,
        fnOnSearch: function() {
            Buscar(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            Buscar(sfBuscar.getValue());
        }
    });

    var stEstructura = new Ext.data.Store({
        id: 'stEstructura',
        url: 'cargarestructura',
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idRecord',
            totalProperty: 'totalrecords'
        }, [{
                name: 'idestructura'
            }, {
                name: 'abreviatura'
            }, {
                name: 'nombre'
            }, {
                name: 'descripcion'
            }]),
        baseParams: {
            cadena: ''
        },
        listeners: {
            load: function(e)
            {
                if (stEstructura.getCount() > 0) {
                    smEstructura.selectFirstRow();
                }
                lMask.hide();
                smEstructura.fireEvent('rowdeselect');
            }
        }
    });
    stEstructura.load({
        params: {
            start: 0,
            limit: 20
        }
    });
    var smEstructura = new Ext.grid.RowSelectionModel({
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
    var reEstructura = new Ext.grid.RowEditor({
        id: 'reEstructura',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpEstructura').getBottomToolbar().enable();
                if (gpEstructura.getSelectionModel().getSelected()) {
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
                Ext.getCmp('gpEstructura').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                btnModificar.setDisabled(false);
                btnEliminar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpEstructura').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gpEstructura = new Ext.grid.EditorGridPanel({
        id: 'gpEstructura',
        store: stEstructura,
        autoExpandColumn: 'descripcion',
        sm: smEstructura,
        plugins: reEstructura,
        border: false,
        loadMask: true,
        stripeRows: true,
        columns: [
            {
                header: 'Nombre',
                width: 200,
                sortable: true,
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
                id: 'abreviatura',
                header: 'Abreviatura',
                width: 150,
                sortable: true,
                dataIndex: 'abreviatura',
                editor: new Ext.form.TextField({
                    tabIndex: 2,
                    id: 'tfAbreviatura',
                    maxLength: 20,
                    selectOnFocus: true,
                    allowBlank: false,
                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regexText: "Este valor es incorrecto.",
                    invalidText: "No es valor v&aacute;lido."
                })
            },
            {
                id: 'descripcion',
                header: 'Descripci&oacute;n',
                width: 110,
                sortable: true,
                dataIndex: 'descripcion',
                editor: new Ext.form.TextField({
                    tabIndex: 3,
                    id: 'tfDescripcion',
                    maxLength: 255,
                    selectOnFocus: true,
                    allowBlank: false,
                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regexText: "Este valor es incorrecto.",
                    invalidText: "No es valor v&aacute;lido."
                })
            }, {
                id: 'idestructura',
                hidden: true,
                sortable: false,
                dataIndex: 'idestructura'
            }],
        tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stEstructura,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });
    new Ext.Viewport({
        layout: 'fit',
        items: gpEstructura
    });

    function validateChanges(record, changes) {
        if (record.data.idestructura === "")
            adicionarEstructura(record.data.nombre, record.data.abreviatura, record.data.descripcion);
        else
            modificarEstructura(record.data.idestructura, record.data.nombre, record.data.abreviatura, record.data.descripcion);
    }
    function adicionarEstructura(nombre, abreviatura, descripcion) {
        MostrarBarraProgreso('Adicionando estructura...');
        Ext.Ajax.request({
            url: 'adicionarestructura',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('La estructura fue adicionada correctamente.');
                    stEstructura.reload();
                }
                else if (responseData == 2)
                    MensajeError('La estructura que intenta adicionar ya existe.<br>Verifique el nombre y la abreviatura de la estructura que desea adicionar.');
                else {
                    MensajeError('No fue posible adicionar la nueva estructura.');
                }
            },
            params: {
                nombre: nombre,
                abreviatura: abreviatura,
                descripcion: descripcion
            }
        });
    }
    function modificarEstructura(idestructura, nombre, abreviatura, descripcion) {
        MostrarBarraProgreso('Modificando estructura...');
        Ext.Ajax.request({
            url: 'modificarestructura',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('La estructura fue modificada correctamente.');
                    stEstructura.reload();
                }
                else if (responseData == 2)
                    MensajeError('La estructura que intenta modificar ya existe.<br>Verifique el nombre y la abreviatura de la estructura que desea modificar.');
                else {
                    MensajeError('No fue posible modificar la estructura.');
                }
            },
            params: {
                idestructura: idestructura,
                nombre: nombre,
                abreviatura: abreviatura,
                descripcion: descripcion
            }
        });
    }
    function eliminarEstructura() {
        function confirmar(btn) {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar estructura', '&iquest;Est&aacute; seguro que desea eliminar la estructura seleccionada?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando estructura...');
            Ext.Ajax.request({
                url: 'eliminarestructura',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion('La estructura fue eliminada correctamente.');
                        stEstructura.reload();
                    }
                    else if (responseData == 2) {
                        MensajeError('La estructura tiene datos asociados y no puede ser eliminada.');
                    }
                    else {
                        MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                    }
                },
                params: {
                    idestructura: smEstructura.getSelected().data.idestructura
                }
            });
        }
    }
    function Buscar(cadena) {
        stEstructura.baseParams.cadena = cadena;
        stEstructura.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
});