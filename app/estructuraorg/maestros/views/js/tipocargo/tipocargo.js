/* global Ext, lMask */
Ext.QuickTips.init();
var btnAdicionar = new Ext.Button({
    id: 'btnAdicionar',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar tipo de cargo',
    handler: function() {
        reTipocargo.stopEditing();
        reTipocargo.insertRow();
    }
});
var btnModificar = new Ext.Button({
    disabled: true,
    id: 'btnModificar',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar tipo de cargo',
    handler: function() {
        if (gpTipocargo.getSelectionModel().getSelected()) {
            var indexRowSel = gpTipocargo.getSelectionModel().getSelectedIndex();
            reTipocargo.startEditing(indexRowSel);
        } else {
            MensajeInformacion("No se ha seleccionado ning&uacute;n tipo de cargo.");
        }
    }
});
var btnEliminar = new Ext.Button({
    disabled: true,
    id: 'btnbuscar',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar tipo de cargo',
    handler: function() {
        if (gpTipocargo.getSelectionModel().getSelected()) {
            if (gpTipocargo.getSelectionModel().getSelected().data.idtipocargo.toString().length > 0) {
                eliminarTipocargo();
            }
        } else {
            MensajeInformacion("No se ha seleccionado ning&uacute;n tipo de cargo.");
        }
    }
});
var stTipocargo = new Ext.data.Store({
    autoLoad: true,
    baseParams: {
        start: 0,
        limit: 20
    },
    id: 'stTipocargo',
    name: 'stTipocargo',
    url: 'gettipocargo',
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total'
    }, [{
            name: 'idtipocargo'
        }, {
            name: 'nombre'
        }, {
            name: 'abreviatura'
        }]),
    listeners: {
        load: function(e) {
            lMask.hide();
            smTipocargo.fireEvent('rowdeselect');
        }
    }
});
var sfBuscar = new Ext.form.SearchField({
    id: 'sfBuscar',
    width: 200,
    maxLength: 30,
    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
    store: stTipocargo,
    fnOnSearch: function() {
        buscarTipocargo(sfBuscar.getValue());
    },
    fnOnClear: function() {
        this.reset();
        buscarTipocargo(sfBuscar.getValue());
    }
});
var smTipocargo = new Ext.grid.RowSelectionModel({
    id: 'smTipocargo',
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
var reTipocargo = new Ext.grid.RowEditor({
    id: 'reTipocargo',
    clicksToEdit: 2,
    saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
    cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
    listeners: {
        canceledit: function(editor, grid, changes, record, rowIndex) {
            btnAdicionar.setDisabled(false);
            sfBuscar.enable();
            Ext.getCmp('gpTipocargo').getBottomToolbar().enable();
            if (gpTipocargo.getSelectionModel().getSelected()) {
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
            Ext.getCmp('gpTipocargo').getBottomToolbar().disable();
        },
        afteredit: function(editor, grid, changes, record, rowIndex) {
            btnAdicionar.setDisabled(false);
            btnModificar.setDisabled(false);
            btnEliminar.setDisabled(false);
            sfBuscar.enable();
            Ext.getCmp('gpTipocargo').getBottomToolbar().enable();
            validateChanges(record, changes);
        }
    }
});
var gpTipocargo = new Ext.grid.EditorGridPanel({
    title: 'Tipo de cargo',
    id: 'gpTipocargo',
    store: stTipocargo,
    sm: smTipocargo,
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
            header: 'idtipocargo',
            hidden: true,
            hideable: false,
            dataIndex: 'idtipocargo'
        }],
    tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stTipocargo,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    }),
    plugins: reTipocargo
});
/******************************************************************************/
Ext.grid.RowSelectionModel.override({
    getSelectedIndex: function() {
        return this.grid.store.indexOf(this.selections.itemAt(0));
    }
});
function buscarTipocargo(criterio) {
    var modified = Ext.getCmp('gpTipocargo').getStore().getModifiedRecords();
    if (modified.length > 0) {
        MensajeInformacion("A&uacute;n existen cambios realizados que no han sido guardados o descartados");
    } else {
        Ext.getCmp('gpTipocargo').getStore().baseParams.criterio = criterio;
        Ext.getCmp('gpTipocargo').getStore().reload();
    }
}
function eliminarTipocargo() {
    function confirmar(btn)
    {
        if (btn == 'ok') {
            eliminaOK();
        }
    }
    MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar tipo de cargo', '&iquest;Est&aacute; seguro que desea eliminar el tipo de cargo seleccionado?', confirmar);

    function eliminaOK() {
        MostrarBarraProgreso('Eliminando tipo de cargo...');
        Ext.Ajax.request({
            url: 'deletetipocargo',
            method: 'POST',
            callback: function(options, success, response) {
                var respuesta = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (respuesta == 1) {
                    MensajeInformacion('El tipo de cargo seleccionado fue eliminado correctamente.');
                    Ext.getCmp('gpTipocargo').getStore().reload();
                } else if (respuesta == 2) {
                    MensajeError('El tipo de cargo tiene datos asociados y no puede ser eliminado.');
                } else {
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idtipocargo: Ext.getCmp('gpTipocargo').getSelectionModel().getSelected().data.idtipocargo
            }
        });
    }
}

function validateChanges(record, changes) {
    if (record.data.idtipocargo == "")
        adicionarTipocargo(record.data.nombre, record.data.abreviatura);
    else
        modificarTipocargo(record.data.idtipocargo, record.data.nombre, record.data.abreviatura);
}

function adicionarTipocargo(nombre, abreviatura) {
    MostrarBarraProgreso('Adicionando tipo de cargo...');
    Ext.Ajax.request({
        url: 'adicionartipocargo',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {// 1 significa que adiciono bien
                MensajeInformacion('El tipo de cargo fue adicionado correctamente.');
                stTipocargo.reload();
            }
            else if (responseData == 2) {// 2 significa que ya existe esa tipocargo
                MensajeError('El tipo de cargo que intenta adicionar ya existe.<br>Cambie el nombre del tipo de cargo que desea adicionar.');
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

function modificarTipocargo(idtipocargo, nombre, abreviatura) {
    MostrarBarraProgreso('Modificando tipo de cargo...');
    Ext.Ajax.request({
        url: 'modificartipocargo',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {// 1 significa que modifico bien
                MensajeInformacion('El tipo de cargo fue modificado correctamente.');
                stTipocargo.reload();
            }
            else if (responseData == 2) {// 2 significa que ya existe esa tipocargo
                MensajeError('El tipo de cargo que intenta modificar ya existe.<br>Cambie el nombre del tipo de cargo que desea modificar.');
            }
            else {// 3 significa que dio error
                MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
            }
        },
        params: {
            idtipocargo: idtipocargo,
            nombre: nombre,
            abreviatura: abreviatura
        }
    });
}

Ext.onReady(function() {
    lMask.hide();
    new Ext.Viewport({
        layout: 'fit',
        items: gpTipocargo
    });
});
