/* global Ext, lMask */
Ext.QuickTips.init();
var btnAdicionar = new Ext.Button({
    id: 'btnAdicionar',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar nivel de preparaci&oacute;n',
    handler: function() {
        reNivelprep.stopEditing();
        reNivelprep.insertRow();
    }
});
var btnModificar = new Ext.Button({
    disabled: true,
    id: 'btnModificar',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar nivel de preparaci&oacute;n',
    handler: function() {
        if (gpNivelprep.getSelectionModel().getSelected()) {
            var indexRowSel = gpNivelprep.getSelectionModel().getSelectedIndex();
            reNivelprep.startEditing(indexRowSel);
        } else {
            MensajeInformacion("No se ha seleccionado ning&uacute;n nivel de preparaci&oacute;n.");
        }
    }
});
var btnEliminar = new Ext.Button({
    disabled: true,
    id: 'btnbuscar',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar nivel de preparaci&oacute;n',
    handler: function() {
        if (gpNivelprep.getSelectionModel().getSelected()) {
            if (gpNivelprep.getSelectionModel().getSelected().data.idnivelprep.toString().length > 0) {
                eliminarNivelprep();
            }
        } else {
            MensajeInformacion("No se ha seleccionado ning&uacute;n nivel de preparaci&oacute;n.");
        }
    }
});
var stNivelprep = new Ext.data.Store({
    autoLoad: true,
    baseParams: {
        start: 0,
        limit: 20
    },
    id: 'stNivelprep',
    name: 'stNivelprep',
    url: 'getnivelprep',
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total'
    }, [{
            name: 'idnivelprep'
        }, {
            name: 'nombre'
        }, {
            name: 'abreviatura'
        }]),
    listeners: {
        load: function(e) {
            lMask.hide();
            smNivelprep.fireEvent('rowdeselect');
        }
    }
});
var sfBuscar = new Ext.form.SearchField({
    id: 'sfBuscar',
    width: 200,
    maxLength: 30,
    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
    store: stNivelprep,
    fnOnSearch: function() {
        buscarNivelprep(sfBuscar.getValue());
    },
    fnOnClear: function() {
        this.reset();
        buscarNivelprep(sfBuscar.getValue());
    }
});
var smNivelprep = new Ext.grid.RowSelectionModel({
    id: 'smNivelprep',
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
var reNivelprep = new Ext.grid.RowEditor({
    id: 'reNivelprep',
    clicksToEdit: 2,
    saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
    cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
    listeners: {
        canceledit: function(editor, grid, changes, record, rowIndex) {
            btnAdicionar.setDisabled(false);
            sfBuscar.enable();
            Ext.getCmp('gpNivelprep').getBottomToolbar().enable();
            if (gpNivelprep.getSelectionModel().getSelected()) {
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
            Ext.getCmp('gpNivelprep').getBottomToolbar().disable();
        },
        afteredit: function(editor, grid, changes, record, rowIndex) {
            btnAdicionar.setDisabled(false);
            btnModificar.setDisabled(false);
            btnEliminar.setDisabled(false);
            sfBuscar.enable();
            Ext.getCmp('gpNivelprep').getBottomToolbar().enable();
            validateChanges(record, changes);
        }
    }
});
var gpNivelprep = new Ext.grid.EditorGridPanel({
    title: 'Nivel de preparaci&oacute;n',
    id: 'gpNivelprep',
    store: stNivelprep,
    sm: smNivelprep,
    border: false,
    loadMask: true,
    stripeRows: true,
    autoExpandColumn: 'expand',
    viewConfig: {
        forceFit: true,
        autoFill: true
    },
    columns: [{
            header: 'Nombre',
            dataIndex: 'nombre',
            width: 300,
            sortable: false,
            fixed: true,
            editor: new Ext.form.TextField({
                tabIndex: 1,
                id: 'tfNombre',
                maxLength: 255,
                selectOnFocus: true,
                allowBlank: false,
                maskRe: /^[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*$/,
                regex: /^[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*$/,
                regexText: "Este valor es incorrecto.",
                invalidText: "No es valor v&aacute;lido."
            })
        }, {
            id: 'expand',
            header: 'Abreviatura',
            width: 400,
            dataIndex: 'abreviatura',
            sortable: false,
            editor: new Ext.form.TextField({
                tabIndex: 2,
                id: 'tfAbreviatura',
                maxLength: 255,
                selectOnFocus: true,
                allowBlank: false,
                maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
                regexText: "Este valor es incorrecto.",
                invalidText: "No es valor v&aacute;lido."
            })
        }, {
            header: 'idnivelprep',
            hidden: true,
            hideable: false,
            dataIndex: 'idnivelprep'
        }],
    tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stNivelprep,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    }),
    plugins: reNivelprep
});
/******************************************************************************/
Ext.grid.RowSelectionModel.override({
    getSelectedIndex: function() {
        return this.grid.store.indexOf(this.selections.itemAt(0));
    }
});
function buscarNivelprep(criterio) {
    var modified = Ext.getCmp('gpNivelprep').getStore().getModifiedRecords();
    if (modified.length > 0) {
        MensajeInformacion("A&uacute;n existen cambios realizados que no han sido guardados o descartados");
    } else {
        Ext.getCmp('gpNivelprep').getStore().baseParams.criterio = criterio;
        Ext.getCmp('gpNivelprep').getStore().reload();
    }
}
function eliminarNivelprep() {
    function confirmar(btn)
    {
        if (btn == 'ok') {
            eliminaOK();
        }
    }
    MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar nivel de preparaci&oacute;n', '&iquest;Est&aacute; seguro que desea eliminar el nivel de preparaci&oacute;n seleccionado?', confirmar);

    function eliminaOK() {
        MostrarBarraProgreso('Eliminando nivel de preparaci&oacute;n...');
        Ext.Ajax.request({
            url: 'deletenivelprep',
            method: 'POST',
            callback: function(options, success, response) {
                var respuesta = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (respuesta == 1) {
                    MensajeInformacion('El nivel de preparaci&oacute;n seleccionado fue eliminado correctamente.');
                    Ext.getCmp('gpNivelprep').getStore().reload();
                } else if (respuesta == 2) {
                    MensajeError('El nivel de preparaci&oacute;n tiene datos asociados y no puede ser eliminado.');
                } else {
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idnivelprep: Ext.getCmp('gpNivelprep').getSelectionModel().getSelected().data.idnivelprep
            }
        });
    }
}

function validateChanges(record, changes) {
    if (record.data.idnivelprep == "")
        adicionarNivelprep(record.data.nombre, record.data.abreviatura);
    else
        modificarNivelprep(record.data.idnivelprep, record.data.nombre, record.data.abreviatura);
}

function adicionarNivelprep(nombre, abreviatura) {
    MostrarBarraProgreso('Adicionando nivel de preparaci&oacute;n...');
    Ext.Ajax.request({
        url: 'adicionarnivelprep',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {// 1 significa que adiciono bien
                MensajeInformacion('El nivel de preparaci&oacute;n fue adicionado correctamente.');
                stNivelprep.reload();
            }
            else if (responseData == 2) {// 2 significa que ya existe esa nivelprep
                MensajeError('El nivel de preparaci&oacute;n que intenta adicionar ya existe.<br>Cambie el nombre del nivel de preparaci&oacute;n que desea adicionar.');
            }
            else {// 3 significa que dio error
                MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
            }
        },
        params: {
            nombre: nombre,
            abreviatura: abreviatura
        }
    });
}

function modificarNivelprep(idnivelprep, nombre, abreviatura) {
    MostrarBarraProgreso('Modificando nivel de preparaci&oacute;n...');
    Ext.Ajax.request({
        url: 'modificarnivelprep',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {// 1 significa que modifico bien
                MensajeInformacion('El nivel de preparaci&oacute;n fue modificado correctamente.');
                stNivelprep.reload();
            }
            else if (responseData == 2) {// 2 significa que ya existe esa nivelprep
                MensajeError('El nivel de preparaci&oacute;n que intenta modificar ya existe.<br>Cambie el nombre del nivel de preparaci&oacute;n que desea modificar.');
            }
            else {// 3 significa que dio error
                MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
            }
        },
        params: {
            idnivelprep: idnivelprep,
            nombre: nombre,
            abreviatura: abreviatura
        }
    });
}

Ext.onReady(function() {
    lMask.hide();
    new Ext.Viewport({
        layout: 'fit',
        items: gpNivelprep
    });
});
