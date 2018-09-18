/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function() {

    var btnAdicionar = new Ext.Button({
        id: 'btnAdicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar color',
        disabled: false,
        handler: function() {
            reColor.stopEditing();
            reColor.insertRow();
        }
    });
    var btnModificar = new Ext.Button({
        id: 'btnModificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar color',
        disabled: true,
        handler: function() {
            if (gpColor.getSelectionModel().getSelected()) {
                reColor.startEditing(gpColor.getSelectionModel().getSelected());
            } else {
                MensajeInformacion("No se ha seleccionado ninguna color.");
            }
        }
    });
    var btnEliminar = new Ext.Button({
        id: 'btnEliminar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar color',
        disabled: true,
        handler: function() {
            if (gpColor.getSelectionModel().getSelected()) {
                if (gpColor.getSelectionModel().getSelected().data.idcolor.toString().length > 0) {
                    eliminarColor();
                }
            } else {
                MensajeInformacion("No se ha seleccionado ninguna color.");
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 200,
        store: stColor,
        fnOnSearch: function() {
            Buscar(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            Buscar(sfBuscar.getValue());
        }
    });
    var stColor = new Ext.data.Store({
        id: 'stColor',
        url: 'getcolor',
        reader: new Ext.data.JsonReader({
            root: 'data',
            id: 'idRecord',
            totalProperty: 'total'
        }, [{
                name: 'idcolor'
            }, {
                name: 'nombre'
            }]),
        baseParams: {
            criterio: ''
        },
        listeners: {
            load: function(e)
            {
                if (stColor.getCount() > 0) {
                    smColor.selectFirstRow();
                }
                lMask.hide();
            }
        }
    });
    stColor.load({
        params: {
            start: 0,
            limit: 20
        }});
    var smColor = new Ext.grid.RowSelectionModel({
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
    var reColor = new Ext.grid.RowEditor({
        id: 'reColor',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpColor').getBottomToolbar().enable();
                if (gpColor.getSelectionModel().getSelected()) {
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
                Ext.getCmp('gpColor').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                btnModificar.setDisabled(false);
                btnEliminar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpColor').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gpColor = new Ext.grid.EditorGridPanel({
        id: 'gpColor',
        store: stColor,
        autoExpandColumn: 'expand',
        sm: smColor,
        plugins: reColor,
        border: false,
        loadMask: true,
        stripeRows: true,
        columns: [
            {
                id: 'expand',
                header: 'Nombre color',
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
                header: 'idcolor',
                width: 200,
                hidden: true,
                dataIndex: 'idcolor'
            }],
        tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stColor,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });
    new Ext.Viewport({
        layout: 'fit',
        items: gpColor
    });
    function validateChanges(record, changes) {
        if (record.data.idcolor === "")
            adicionarColor(record.data.nombre);
        else
            modificarColor(record.data.idcolor, record.data.nombre);
    }
    function adicionarColor(nombre) {
        MostrarBarraProgreso('Adicionando color...');
        Ext.Ajax.request({
            url: 'addcolor',
            method: 'POST',
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 0) {
                    MensajeInformacion('El color fue adicionado correctamente.');
                    stColor.reload();
                }
                else if (responseData == 1)
                    MensajeError('El color que intenta adicionar ya existe.<br>Verifique el nombre del color que desea adicionar.');
                else
                    MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                lMask.hide();
            },
            params: {
                nombre: nombre
            }
        });
    }
    function modificarColor(idcolor, nombre) {
        MostrarBarraProgreso('Modificando color...');
        Ext.Ajax.request({
            url: 'modcolor',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 0) {
                    MensajeInformacion('El color fue modificado correctamente.');
                    stColor.reload();
                }
                else if (responseData == 1)
                    MensajeError('El color que intenta modificar ya existe.<br>Verifique el nombre del color que desea adicionar.');
                else
                    MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
            },
            params: {
                idcolor: idcolor,
                nombre: nombre
            }
        });
    }
    function eliminarColor() {
        function confirmar(btn) {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar color', '&iquest;Est&aacute; seguro que desea eliminar el color seleccionado?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando color...');
            Ext.Ajax.request({
                url: 'delcolor',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion('El color fue eliminado correctamente.');
                        stColor.reload();
                    }
                    else if (responseData == 2)
                        MensajeError('El color tiene datos asociados y no puede ser eliminado.');
                    else
                        MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                },
                params: {
                    idcolor: smColor.getSelected().data.idcolor
                }
            });
        }
    }
    function Buscar(criterio) {
        stColor.baseParams.criterio = criterio;
        stColor.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
});