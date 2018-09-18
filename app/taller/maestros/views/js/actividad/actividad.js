/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function() {
    var btnAdicionar = new Ext.Button({
        id: 'btnAdicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar actividad',
        disabled: false,
        handler: function() {
            reActividad.stopEditing();
            reActividad.insertRow();
        }
    });
    var btnModificar = new Ext.Button({
        id: 'btnModificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar actividad',
        disabled: true,
        handler: function() {
            if (gpActividad.getSelectionModel().getSelected()) {
                reActividad.startEditing(gpActividad.getSelectionModel().getSelected());
            } else {
                MensajeInformacion("No se ha seleccionado ninguna actividad..");
            }
        }
    });
    var btnEliminar = new Ext.Button({
        id: 'btnEliminar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar actividad',
        disabled: true,
        handler: function() {
            if (gpActividad.getSelectionModel().getSelected()) {
                if (gpActividad.getSelectionModel().getSelected().data.idactividad.toString().length > 0) {
                    eliminarActividad();
                }
            } else {
                MensajeInformacion("No se ha seleccionado ninguna actividad.");
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 200,
        store: stActividad,
        fnOnSearch: function() {
            Buscar(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            Buscar(sfBuscar.getValue());
        }
    });

    var stActividad = new Ext.data.Store({
        id: 'stActividad',
        url: 'getactividad',
        reader: new Ext.data.JsonReader({
            root: 'data',
            id: 'idRecord',
            totalProperty: 'total'
        }, [{
                name: 'idactividad'
            }, {
                name: 'nombre'
            }, {
                name: 'abreviatura'
            }, {
                name: 'descripcion'
            }]),
        baseParams: {
            criterio: ''
        },
        listeners: {
            load: function(e) {
                if (stActividad.getCount() > 0) {
                    smActividad.selectFirstRow();
                }
                lMask.hide();
            }
        }
    });
    stActividad.load({params: {start: 0, limit: 20}});
    var smActividad = new Ext.grid.RowSelectionModel({
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
    var reActividad = new Ext.grid.RowEditor({
        id: 'reActividad',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpActividad').getBottomToolbar().enable();
                if (gpActividad.getSelectionModel().getSelected()) {
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
                Ext.getCmp('gpActividad').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                btnModificar.setDisabled(false);
                btnEliminar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpActividad').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gpActividad = new Ext.grid.EditorGridPanel({
        id: 'gpActividad',
        autoExpandColumn: 'expanded',
        store: stActividad,
        sm: smActividad,
        plugins: reActividad,
        border: false,
        loadMask: true,
        stripeRows: true,
        columns: [
            {
                id: 'expanded',
                header: 'Nombre',
                width: 200,
                dataIndex: 'nombre',
                editor: new Ext.form.TextField({
                    tabIndex: 1,
                    id: 'tfNombre',
                    maxLength: 100,
                    selectOnFocus: true,
                    allowBlank: false,
                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regexText: "Este valor es incorrecto.",
                    invalidText: "No es valor v&aacute;lido."
                })
            }, {
                header: 'Abreviatura',
                width: 150,
                dataIndex: 'abreviatura',
                editor: new Ext.form.TextField({
                    tabIndex: 2,
                    id: 'tfabreviatura',
                    maxLength: 50,
                    selectOnFocus: true,
                    allowBlank: false,
                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regexText: "Este valor es incorrecto.",
                    invalidText: "No es valor v&aacute;lido."
                })
            }, {
                header: 'Descripci&oacute;n',
                width: 250,
                dataIndex: 'descripcion',
                editor: new Ext.form.TextField({
                    tabIndex: 2,
                    id: 'tfdescripcion',
                    maxLength: 255,
                    selectOnFocus: true,
                    allowBlank: false,
                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                    regexText: "Este valor es incorrecto.",
                    invalidText: "No es valor v&aacute;lido."
                })
            }, {
                id: 'idactividad',
                header: 'idactividad',
                width: 100,
                hidden: true,
                dataIndex: 'idactividad'
            }],
        tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stActividad,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });

    new Ext.Viewport({
        layout: 'fit',
        items: gpActividad
    });
    function validateChanges(record, changes) {
        if (record.data.idactividad === "")
            adicionarActividad(record.data.nombre, record.data.abreviatura, record.data.descripcion);
        else
            modificarActividad(record.data.idactividad, record.data.nombre, record.data.abreviatura, record.data.descripcion);
    }
    function adicionarActividad(nombre, abreviatura, descripcion) {
        MostrarBarraProgreso('Adicionando actividad...');
        Ext.Ajax.request({
            url: 'addactividad',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('La actividad fue adicionada correctamente.');
                    stActividad.reload();
                }
                else if (responseData == 2)
                    MensajeError('La actividad que intenta adicionar ya existe.<br>Verifique el nombre de la actividad que desea adicionar.');
                else
                    MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
            },
            params: {
                nombre: nombre,
                abreviatura: abreviatura,
                descripcion: descripcion
            }
        });
    }
    function modificarActividad(idactividad, nombre, abreviatura, descripcion) {
        MostrarBarraProgreso('Modificando actividad...');
        Ext.Ajax.request({
            url: 'modactividad',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('La actividad fue modificada correctamente.');
                    stActividad.reload();
                }
                else if (responseData == 2)
                    MensajeError('La actividad que intenta modificar ya existe.<br>Verifique el nombre de la actividad que desea modificar.');
                else
                    MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                lMask.hide();
            },
            params: {
                idactividad: idactividad,
                nombre: nombre,
                abreviatura: abreviatura,
                descripcion: descripcion
            }
        });
    }
    function eliminarActividad() {
        function confirmar(btn) {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar actividad', '&iquest;Est&aacute; seguro que desea eliminar la actividad seleccionada?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando actividad...');
            Ext.Ajax.request({
                url: 'delactividad',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion('La actividad fue eliminada correctamente.');
                        stActividad.reload();
                    }
                    else if (responseData == 2)
                        MensajeError('La actividad tiene datos asociados y no puede ser eliminada.');
                    else
                        MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                },
                params: {
                    idactividad: smActividad.getSelected().data.idactividad
                }
            });
        }
    }
    function Buscar(cadena) {
        stActividad.baseParams.criterio = cadena;
        stActividad.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
});