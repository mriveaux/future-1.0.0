/* global Ext, lMask */
Ext.QuickTips.init();
var btnAdicionar = new Ext.Button({
    id: 'btnAdicionar',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar categor&iacute;a ocupacional',
    handler: function() {
        reCategoriaocup.stopEditing();
        reCategoriaocup.insertRow();
    }
});
var btnModificar = new Ext.Button({
    disabled: true,
    id: 'btnModificar',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar categor&iacute;a ocupacional',
    handler: function() {
        if (gpCategoriaocup.getSelectionModel().getSelected()) {
            var indexRowSel = gpCategoriaocup.getSelectionModel().getSelectedIndex();
            reCategoriaocup.startEditing(indexRowSel);
        } else {
            MensajeInformacion("No se ha seleccionado ninguna categor&iacute;a ocupacional.");
        }
    }
});
var btnEliminar = new Ext.Button({
    disabled: true,
    id: 'btnbuscar',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar categor&iacute;a ocupacional',
    handler: function() {
        if (gpCategoriaocup.getSelectionModel().getSelected()) {
            if (gpCategoriaocup.getSelectionModel().getSelected().data.idcategoriaocup.toString().length > 0) {
                eliminarCategoriaocup();
            }
        } else {
            MensajeInformacion("No se ha seleccionado ninguna categor&iacute;a ocupacional.");
        }
    }
});
var stCategoriaocup = new Ext.data.Store({
    autoLoad: true,
    baseParams: {
        start: 0,
        limit: 20
    },
    id: 'stCategoriaocup',
    name: 'stCategoriaocup',
    url: 'getcategoriaocup',
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total'
    }, [{
            name: 'idcategoriaocup'
        }, {
            name: 'nombre'
        }, {
            name: 'abreviatura'
        }]),
    listeners: {
        load: function(e) {
            lMask.hide();
            smCategoriaocup.fireEvent('rowdeselect');
        }
    }
});
var sfBuscar = new Ext.form.SearchField({
    id: 'sfBuscar',
    width: 200,
    maxLength: 30,
    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
    store: stCategoriaocup,
    fnOnSearch: function() {
        buscarCategoriaocup(sfBuscar.getValue());
    },
    fnOnClear: function() {
        this.reset();
        buscarCategoriaocup(sfBuscar.getValue());
    }
});
var smCategoriaocup = new Ext.grid.RowSelectionModel({
    id: 'smCategoriaocup',
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
var reCategoriaocup = new Ext.grid.RowEditor({
    id: 'reCategoriaocup',
    clicksToEdit: 2,
    saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
    cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
    listeners: {
        canceledit: function(editor, grid, changes, record, rowIndex) {
            btnAdicionar.setDisabled(false);
            sfBuscar.enable();
            Ext.getCmp('gpCategoriaocup').getBottomToolbar().enable();
            if (gpCategoriaocup.getSelectionModel().getSelected()) {
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
            Ext.getCmp('gpCategoriaocup').getBottomToolbar().disable();
        },
        afteredit: function(editor, grid, changes, record, rowIndex) {
            btnAdicionar.setDisabled(false);
            btnModificar.setDisabled(false);
            btnEliminar.setDisabled(false);
            sfBuscar.enable();
            Ext.getCmp('gpCategoriaocup').getBottomToolbar().enable();
            validateChanges(record, changes);
        }
    }
});
var gpCategoriaocup = new Ext.grid.EditorGridPanel({
    title: 'Categor&iacute;a ocupacional',
    id: 'gpCategoriaocup',
    store: stCategoriaocup,
    sm: smCategoriaocup,
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
            header: 'idcategoriaocup',
            hidden: true,
            hideable: false,
            dataIndex: 'idcategoriaocup'
        }],
    tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stCategoriaocup,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    }),
    plugins: reCategoriaocup
});
/******************************************************************************/
Ext.grid.RowSelectionModel.override({
    getSelectedIndex: function() {
        return this.grid.store.indexOf(this.selections.itemAt(0));
    }
});
function buscarCategoriaocup(criterio) {
    var modified = Ext.getCmp('gpCategoriaocup').getStore().getModifiedRecords();
    if (modified.length > 0) {
        MensajeInformacion("A&uacute;n existen cambios realizados que no han sido guardados o descartados");
    } else {
        Ext.getCmp('gpCategoriaocup').getStore().baseParams.criterio = criterio;
        Ext.getCmp('gpCategoriaocup').getStore().reload();
    }
}
function eliminarCategoriaocup() {
    function confirmar(btn)
    {
        if (btn == 'ok') {
            eliminaOK();
        }
    }
    MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar categor&iacute;a ocupacional', '&iquest;Est&aacute; seguro que desea eliminar la categor&iacute;a ocupacional seleccionada?', confirmar);

    function eliminaOK() {
        MostrarBarraProgreso('Eliminando categor&iacute;a ocupacional...');
        Ext.Ajax.request({
            url: 'deletecategoriaocup',
            method: 'POST',
            callback: function(options, success, response) {
                var respuesta = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (respuesta == 1) {
                    MensajeInformacion('La categor&iacute;a ocupacional seleccionada fue eliminada correctamente.');
                    Ext.getCmp('gpCategoriaocup').getStore().reload();
                } else if (respuesta == 2) {
                    MensajeError('La categor&iacute;a ocupacional tiene datos asociados y no puede ser eliminada.');
                } else {
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idcategoriaocup: Ext.getCmp('gpCategoriaocup').getSelectionModel().getSelected().data.idcategoriaocup
            }
        });
    }
}

function validateChanges(record, changes) {
    if (record.data.idcategoriaocup == "")
        adicionarCategoriaocup(record.data.nombre, record.data.abreviatura);
    else
        modificarCategoriaocup(record.data.idcategoriaocup, record.data.nombre, record.data.abreviatura);
}

function adicionarCategoriaocup(nombre, abreviatura) {
    MostrarBarraProgreso('Adicionando categor&iacute;a ocupacional...');
    Ext.Ajax.request({
        url: 'adicionarcategoriaocup',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {// 1 significa que adiciono bien
                MensajeInformacion('La categor&iacute;a ocupacional fue adicionada correctamente.');
                stCategoriaocup.reload();
            }
            else if (responseData == 2) {// 2 significa que ya existe esa categoriaocup
                MensajeError('La categor&iacute;a ocupacional que intenta adicionar ya existe.<br>Cambie el nombre de la categor&iacute;a ocupacional que desea adicionar.');
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

function modificarCategoriaocup(idcategoriaocup, nombre, abreviatura) {
    MostrarBarraProgreso('Modificando categor&iacute;a ocupacional...');
    Ext.Ajax.request({
        url: 'modificarcategoriaocup',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {// 1 significa que modifico bien
                MensajeInformacion('La categor&iacute;a ocupacional fue modificada correctamente.');
                stCategoriaocup.reload();
            }
            else if (responseData == 2) {// 2 significa que ya existe esa categoriaocup
                MensajeError('La categor&iacute;a ocupacional que intenta modificar ya existe.<br>Cambie el nombre de la categor&iacute;a ocupacional que desea modificar.');
            }
            else {// 3 significa que dio error
                MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
            }
        },
        params: {
            idcategoriaocup: idcategoriaocup,
            nombre: nombre,
            abreviatura: abreviatura
        }
    });
}

Ext.onReady(function() {
    lMask.hide();
    new Ext.Viewport({
        layout: 'fit',
        items: gpCategoriaocup
    });
});
