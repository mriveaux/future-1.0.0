/* global Ext, lMask */
Ext.QuickTips.init();
var btnAdicionar = new Ext.Button({
    id: 'btnAdicionar',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar grupo de escala salarial',
    handler: function() {
        reGrupoEscala.stopEditing();
        reGrupoEscala.insertRow();
    }
});
var btnModificar = new Ext.Button({
    disabled: true,
    id: 'btnModificar',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar grupo de escala salarial',
    handler: function() {
        if (gpGrupoEscala.getSelectionModel().getSelected()) {
            var indexRowSel = gpGrupoEscala.getSelectionModel().getSelectedIndex();
            reGrupoEscala.startEditing(indexRowSel);
        } else {
            MensajeInformacion("No se ha seleccionado ning&uacute;n grupo de escala salarial.");
        }
    }
});
var btnEliminar = new Ext.Button({
    disabled: true,
    id: 'btnbuscar',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar grupo de escala salarial',
    handler: function() {
        if (gpGrupoEscala.getSelectionModel().getSelected()) {
            if (gpGrupoEscala.getSelectionModel().getSelected().data.idgrupoescala.toString().length > 0) {
                eliminarGrupoEscala();
            }
        } else {
            MensajeInformacion("No se ha seleccionado ning&uacute;n grupo de escala salarial.");
        }
    }
});
var stGrupoEscala = new Ext.data.Store({
    autoLoad: true,
    baseParams: {
        start: 0,
        limit: 20
    },
    id: 'stGrupoEscala',
    name: 'stGrupoEscala',
    url: 'getgrupoescala',
    reader: new Ext.data.JsonReader({
        root: 'data',
        totalProperty: 'total'
    }, [{
            name: 'idgrupoescala'
        }, {
            name: 'nombre'
        }, {
            name: 'abreviatura'
        }]),
    listeners: {
        load: function(e) {
            lMask.hide();
            smGrupoEscala.fireEvent('rowdeselect');
        }
    }
});
var sfBuscar = new Ext.form.SearchField({
    id: 'sfBuscar',
    width: 200,
    maxLength: 30,
    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
    store: stGrupoEscala,
    fnOnSearch: function() {
        buscarGrupoEscala(sfBuscar.getValue());
    },
    fnOnClear: function() {
        this.reset();
        buscarGrupoEscala(sfBuscar.getValue());
    }
});
var smGrupoEscala = new Ext.grid.RowSelectionModel({
    id: 'smGrupoEscala',
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
var reGrupoEscala = new Ext.grid.RowEditor({
    id: 'reGrupoEscala',
    clicksToEdit: 2,
    saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
    cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
    listeners: {
        canceledit: function(editor, grid, changes, record, rowIndex) {
            btnAdicionar.setDisabled(false);
            sfBuscar.enable();
            Ext.getCmp('gpGrupoEscala').getBottomToolbar().enable();
            if (gpGrupoEscala.getSelectionModel().getSelected()) {
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
            Ext.getCmp('gpGrupoEscala').getBottomToolbar().disable();
        },
        afteredit: function(editor, grid, changes, record, rowIndex) {
            btnAdicionar.setDisabled(false);
            btnModificar.setDisabled(false);
            btnEliminar.setDisabled(false);
            sfBuscar.enable();
            Ext.getCmp('gpGrupoEscala').getBottomToolbar().enable();
            validateChanges(record, changes);
        }
    }
});
var gpGrupoEscala = new Ext.grid.EditorGridPanel({
    title: 'Grupo de escala salarial',
    id: 'gpGrupoEscala',
    store: stGrupoEscala,
    sm: smGrupoEscala,
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
            header: 'idgrupoescala',
            hidden: true,
            hideable: false,
            dataIndex: 'idgrupoescala'
        }],
    tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stGrupoEscala,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    }),
    plugins: reGrupoEscala
});
/******************************************************************************/
Ext.grid.RowSelectionModel.override({
    getSelectedIndex: function() {
        return this.grid.store.indexOf(this.selections.itemAt(0));
    }
});
function buscarGrupoEscala(criterio) {
    var modified = Ext.getCmp('gpGrupoEscala').getStore().getModifiedRecords();
    if (modified.length > 0) {
        MensajeInformacion("A&uacute;n existen cambios realizados que no han sido guardados o descartados");
    } else {
        Ext.getCmp('gpGrupoEscala').getStore().baseParams.criterio = criterio;
        Ext.getCmp('gpGrupoEscala').getStore().reload();
    }
}
function eliminarGrupoEscala() {
    function confirmar(btn)
    {
        if (btn == 'ok') {
            eliminaOK();
        }
    }
    MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar grupo de escala salarial', '&iquest;Est&aacute; seguro que desea eliminar el grupo de escala salarial seleccionado?', confirmar);

    function eliminaOK() {
        MostrarBarraProgreso('Eliminando grupo de escala salarial...');
        Ext.Ajax.request({
            url: 'deletegrupoescala',
            method: 'POST',
            callback: function(options, success, response) {
                var respuesta = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (respuesta == 1) {
                    MensajeInformacion('El grupo de escala salarial seleccionado fue eliminado correctamente.');
                    Ext.getCmp('gpGrupoEscala').getStore().reload();
                } else if (respuesta == 2) {
                    MensajeError('El grupo de escala salarial tiene datos asociados y no puede ser eliminado.');
                } else {
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idgrupoescala: Ext.getCmp('gpGrupoEscala').getSelectionModel().getSelected().data.idgrupoescala
            }
        });
    }
}

function validateChanges(record, changes) {
    if (record.data.idgrupoescala == "")
        adicionarGrupoEscala(record.data.nombre, record.data.abreviatura);
    else
        modificarGrupoEscala(record.data.idgrupoescala, record.data.nombre, record.data.abreviatura);
}

function adicionarGrupoEscala(nombre, abreviatura) {
    MostrarBarraProgreso('Adicionando grupo de escala salarial...');
    Ext.Ajax.request({
        url: 'adicionargrupoescala',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {// 1 significa que adiciono bien
                MensajeInformacion('El grupo de escala salarial fue adicionado correctamente.');
                stGrupoEscala.reload();
            }
            else if (responseData == 2) {// 2 significa que ya existe esa grupoescala
                MensajeError('El grupo de escala salarial que intenta adicionar ya existe.<br>Cambie el nombre del grupo de escala salarial que desea adicionar.');
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

function modificarGrupoEscala(idgrupoescala, nombre, abreviatura) {
    MostrarBarraProgreso('Modificando grupo de escala salarial...');
    Ext.Ajax.request({
        url: 'modificargrupoescala',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {// 1 significa que modifico bien
                MensajeInformacion('El grupo de escala salarial fue modificado correctamente.');
                stGrupoEscala.reload();
            }
            else if (responseData == 2) {// 2 significa que ya existe esa grupoescala
                MensajeError('El grupo de escala salarial que intenta modificar ya existe.<br>Cambie el nombre del grupo de escala salarial que desea modificar.');
            }
            else {// 3 significa que dio error
                MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
            }
        },
        params: {
            idgrupoescala: idgrupoescala,
            nombre: nombre,
            abreviatura: abreviatura
        }
    });
}

Ext.onReady(function() {
    lMask.hide();
    new Ext.Viewport({
        layout: 'fit',
        items: gpGrupoEscala
    });
});
