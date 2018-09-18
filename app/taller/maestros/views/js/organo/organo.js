/* global Ext, lMask */
Ext.QuickTips.init();

Ext.onReady(function() {

    var btnAdicionar = new Ext.Button({
        id: 'btnAdicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar &oacute;rgano',
        disabled: false,
        handler: function() {
            reOrgano.stopEditing();
            reOrgano.insertRow();
        }
    });
    var btnModificar = new Ext.Button({
        id: 'btnModificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar &oacute;rgano',
        disabled: true,
        handler: function() {
            if (gpOrgano.getSelectionModel().getSelected()) {
                reOrgano.startEditing(gpOrgano.getSelectionModel().getSelected());
            } else {
                MensajeInformacion("No se ha seleccionado ning&uacute;n &oacute;rgano.");
            }
        }
    });
    var btnEliminar = new Ext.Button({
        id: 'btnEliminar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar &oacute;rgano',
        disabled: true,
        handler: function() {
            if (gpOrgano.getSelectionModel().getSelected()) {
                if (gpOrgano.getSelectionModel().getSelected().data.idorgano.toString().length > 0) {
                    eliminarOrgano();
                }
            } else {
                MensajeInformacion("No se ha seleccionado ning&uacute;n &oacute;rgano.");
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 200,
        store: stOrgano,
        fnOnSearch: function() {
            Buscar(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            Buscar(sfBuscar.getValue());
        }
    });

    var stOrgano = new Ext.data.Store({
        id: 'stOrgano',
        url: 'cargarorgano',
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idRecord',
            totalProperty: 'totalrecords'
        }, [{
                name: 'idorgano'
            }, {
                name: 'nombre'
            }, {
                name: 'descripcion'
            }, {
                name: 'identidad'
            }]),
        baseParams: {
            cadena: ''
        },
        listeners: {
            load: function(e)
            {
                if (stOrgano.getCount() > 0) {
                    smOrgano.selectFirstRow();
                }
                lMask.hide();
            }
        }
    });
    stOrgano.load({
        params: {
            start: 0,
            limit: 20
        }
    });
    var smOrgano = new Ext.grid.RowSelectionModel({
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
    var reOrgano = new Ext.grid.RowEditor({
        id: 'reOrgano',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpOrgano').getBottomToolbar().enable();
                if (gpOrgano.getSelectionModel().getSelected()) {
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
                Ext.getCmp('gpOrgano').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                btnModificar.setDisabled(false);
                btnEliminar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpOrgano').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gpOrgano = new Ext.grid.EditorGridPanel({
        id: 'gpOrgano',
        store: stOrgano,
        autoExpandColumn: 'descripcion',
        sm: smOrgano,
        plugins: reOrgano,
        border: false,
        loadMask: true,
        stripeRows: true,
        columns: [
            {
                sortable: true,
                header: 'Nombre',
                width: 250,
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
                id: 'descripcion',
                sortable: true,
                header: 'Descripci&oacute;n',
                dataIndex: 'descripcion',
                editor: new Ext.form.TextField({
                    tabIndex: 2,
                    id: 'taDescripcion',
                    maxLength: 255,
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
                sortable: false,
                dataIndex: 'idorgano'
            }, {
                hidden: true,
                hideable: false,
                sortable: false,
                dataIndex: 'identidad'
            }],
        tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stOrgano,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });
    new Ext.Viewport({
        layout: 'fit',
        items: gpOrgano
    });

    function validateChanges(record, changes) {
        if (record.data.idorgano == "")
            adicionarOrgano(record.data.nombre, record.data.descripcion);
        else
            modificarOrgano(record.data.idorgano, record.data.nombre, record.data.descripcion);
    }
    function adicionarOrgano(nombre, descripcion) {
        MostrarBarraProgreso('Adicionando &oacute;rgano...');
        Ext.Ajax.request({
            url: 'adicionarorgano',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('El &oacute;rgano fue adicionado correctamente.');
                    stOrgano.reload();
                }
                else if (responseData == 2)
                    MensajeError('El &oacute;rgano que intenta adicionar ya existe.<br>Cambie el nombre del &oacute;rgano que desea adicionar.');
                else {
                    MensajeError('No fue posible adicionar el nuevo &oacute;rgano.');
                }
            },
            params: {
                nombre: nombre,
                descripcion: descripcion
            }
        });
    }
    function modificarOrgano(idorgano, nombre, descripcion) {
        MostrarBarraProgreso('Modificando &oacute;rgano...');
        Ext.Ajax.request({
            url: 'modificarorgano',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('El &oacute;rgano fue modificado correctamente.');
                    stOrgano.reload();
                }
                else if (responseData == 2)
                    MensajeError('El &oacute;rgano que intenta modificar ya existe.<br>\Cambie el nombre del &oacute;rgano que desea modificar.');
                else {
                    MensajeError('No fue posible modificar el nuevo &oacute;rgano.');
                }
            },
            params: {
                idorgano: idorgano,
                nombre: nombre,
                descripcion: descripcion
            }
        });
    }
    function eliminarOrgano() {
        function confirmar(btn) {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar &oacute;rgano', '&iquest;Est&aacute; seguro que desea eliminar el &oacute;rgano seleccionado?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando &oacute;rgano...');
            Ext.Ajax.request({
                url: 'eliminarorgano',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion('El &oacute;rgano fue eliminado correctamente.');
                        stOrgano.reload();
                    }
                    else if (responseData == 2) {
                        MensajeError('El &oacute;rgano tiene datos asociados y no puede ser eliminado.');
                    }
                    else {
                        MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                    }
                },
                params: {
                    idorgano: smOrgano.getSelected().data.idorgano
                }
            });
        }
    }
    function Buscar(cadena) {
        stOrgano.baseParams.cadena = cadena;
        stOrgano.reload({
            params: {
                start: 0,
                limit: 20
            }
        });


    }
});
