/* global Ext, lMask */
Ext.QuickTips.init();
var btnAdicionar = new Ext.Button({
    id: 'btnAdicionar',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar tipo de escala salarial',
    handler: function() {
        reTipoEscala.stopEditing();
        reTipoEscala.insertRow();
    }
});
var btnModificar = new Ext.Button({
    disabled: true,
    id: 'btnModificar',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar tipo de escala salarial',
    handler: function() {
        if (gpTipoEscala.getSelectionModel().getSelected()) {
            var indexRowSel = gpTipoEscala.getSelectionModel().getSelectedIndex();
            reTipoEscala.startEditing(indexRowSel);
        } else {
            MensajeInformacion("No se ha seleccionado ning&uacute;n tipo de escala salarial.");
        }
    }
});
var btnEliminar = new Ext.Button({
    disabled: true,
    id: 'btnbuscar',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar tipo de escala salarial',
    handler: function() {
        if (gpTipoEscala.getSelectionModel().getSelected()) {
            if (gpTipoEscala.getSelectionModel().getSelected().data.idtipoescala.toString().length > 0) {
                eliminarTipoEscala();
            }
        } else {
            MensajeInformacion("No se ha seleccionado ning&uacute;n tipo de escala salarial.");
        }
    }
});
var stTipoEscala = new Ext.data.Store({
    autoLoad: true,
    baseParams: {
        start: 0,
        limit: 20
    },
    sortInfo: {
        field: "nombre",
        direction: "ASC"
    },
    id: 'stTipoEscala',
    name: 'stTipoEscala',
    url: 'gettipoescala',
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total'
    }, [{
            name: 'idtipoescala'
        }, {
            name: 'nombre'
        }, {
            name: 'abreviatura'
        }]),
    listeners: {
        load: function(e) {
            lMask.hide();
            smTipoEscala.fireEvent('rowdeselect');
        }
    }
});
var sfBuscar = new Ext.form.SearchField({
    id: 'sfBuscar',
    width: 200,
    maxLength: 30,
    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
    store: stTipoEscala,
    fnOnSearch: function() {
        buscarTipoEscala(sfBuscar.getValue());
    },
    fnOnClear: function() {
        this.reset();
        buscarTipoEscala(sfBuscar.getValue());
    }
});
var smTipoEscala = new Ext.grid.RowSelectionModel({
    id: 'smTipoEscala',
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
var reTipoEscala = new Ext.grid.RowEditor({
    id: 'reTipoEscala',
    clicksToEdit: 2,
    saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
    cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
    listeners: {
        canceledit: function(editor, grid, changes, record, rowIndex) {
            btnAdicionar.setDisabled(false);
            sfBuscar.enable();
            Ext.getCmp('gpTipoEscala').getBottomToolbar().enable();
            if (gpTipoEscala.getSelectionModel().getSelected()) {
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
            Ext.getCmp('gpTipoEscala').getBottomToolbar().disable();
        },
        afteredit: function(editor, grid, changes, record, rowIndex) {
            btnAdicionar.setDisabled(false);
            btnModificar.setDisabled(false);
            btnEliminar.setDisabled(false);
            sfBuscar.enable();
            Ext.getCmp('gpTipoEscala').getBottomToolbar().enable();
            validateChanges(record, changes);
        }
    }
});
var gpTipoEscala = new Ext.grid.EditorGridPanel({
    title: 'Tipo de escala salarial',
    id: 'gpTipoEscala',
    store: stTipoEscala,
    sm: smTipoEscala,
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
            sortable: true,
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
            sortable: true,
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
            header: 'idtipoescala',
            hidden: true,
            hideable: false,
            dataIndex: 'idtipoescala'
        }],
    tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stTipoEscala,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    }),
    plugins: reTipoEscala
});
/******************************************************************************/
Ext.grid.RowSelectionModel.override({
    getSelectedIndex: function() {
        return this.grid.store.indexOf(this.selections.itemAt(0));
    }
});
function buscarTipoEscala(criterio) {
    var modified = Ext.getCmp('gpTipoEscala').getStore().getModifiedRecords();
    if (modified.length > 0) {
        MensajeInformacion("A&uacute;n existen cambios realizados que no han sido guardados o descartados");
    } else {
        Ext.getCmp('gpTipoEscala').getStore().baseParams.criterio = criterio;
        Ext.getCmp('gpTipoEscala').getStore().reload();
    }
}
function eliminarTipoEscala() {
    function confirmar(btn)
    {
        if (btn == 'ok') {
            eliminaOK();
        }
    }
    MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar tipo de escala salarial', '&iquest;Est&aacute; seguro que desea eliminar el tipo de escala salarial seleccionado?', confirmar);

    function eliminaOK() {
        MostrarBarraProgreso('Eliminando tipo de escala salarial...');
        Ext.Ajax.request({
            url: 'deletetipoescala',
            method: 'POST',
            callback: function(options, success, response) {
                var respuesta = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (respuesta == 1) {
                    MensajeInformacion('El tipo de escala salarial seleccionado fue eliminado correctamente.');
                    Ext.getCmp('gpTipoEscala').getStore().reload();
                } else if (respuesta == 2) {
                    MensajeError('El tipo de escala salarial tiene datos asociados y no puede ser eliminado.');
                } else {
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idtipoescala: Ext.getCmp('gpTipoEscala').getSelectionModel().getSelected().data.idtipoescala
            }
        });
    }
}

function validateChanges(record, changes) {
    if (record.data.idtipoescala == "")
        adicionarTipoEscala(record.data.nombre, record.data.abreviatura);
    else
        modificarTipoEscala(record.data.idtipoescala, record.data.nombre, record.data.abreviatura);
}

function adicionarTipoEscala(nombre, abreviatura) {
    MostrarBarraProgreso('Adicionando tipo de escala salarial...');
    Ext.Ajax.request({
        url: 'adicionartipoescala',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {// 1 significa que adiciono bien
                MensajeInformacion('El tipo de escala salarial fue adicionado correctamente.');
                stTipoEscala.reload();
            }
            else if (responseData == 2) {// 2 significa que ya existe esa tipoescala
                MensajeError('El tipo de escala salarial que intenta adicionar ya existe.<br>Cambie el nombre del tipo de escala salarial que desea adicionar.');
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

function modificarTipoEscala(idtipoescala, nombre, abreviatura) {
    MostrarBarraProgreso('Modificando tipo de escala salarial...');
    Ext.Ajax.request({
        url: 'modificartipoescala',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {// 1 significa que modifico bien
                MensajeInformacion('El tipo de escala salarial fue modificado correctamente.');
                stTipoEscala.reload();
            }
            else if (responseData == 2) {// 2 significa que ya existe esa tipoescala
                MensajeError('El tipo de escala salarial que intenta modificar ya existe.<br>Cambie el nombre del tipo de escala salarial que desea modificar.');
            }
            else {// 3 significa que dio error
                MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
            }
        },
        params: {
            idtipoescala: idtipoescala,
            nombre: nombre,
            abreviatura: abreviatura
        }
    });
}

Ext.onReady(function() {
    lMask.hide();
    new Ext.Viewport({
        layout: 'fit',
        items: gpTipoEscala
    });
});
