/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function() {
    var btnAdicionar = new Ext.Button({
        id: 'btnAdicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar grupo de explotaci&oacute;n',
        disabled: false,
        handler: function() {
            reGrupoexp.stopEditing();
            reGrupoexp.insertRow();
        }
    });
    var btnModificar = new Ext.Button({
        id: 'btnModificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar grupo de explotaci&oacute;n',
        disabled: true,
        handler: function() {
            if (gpGrupoexp.getSelectionModel().getSelected()) {
                reGrupoexp.startEditing(gpGrupoexp.getSelectionModel().getSelected());
            } else {
                MensajeInformacion("No se ha seleccionado ning&uacute;n grupo de explotaci&oacute;n..");
            }
        }
    });
    var btnEliminar = new Ext.Button({
        id: 'btnEliminar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar grupo de explotaci&oacute;n',
        disabled: true,
        handler: function() {
            if (gpGrupoexp.getSelectionModel().getSelected()) {
                if (gpGrupoexp.getSelectionModel().getSelected().data.idgrupoexplotacion.toString().length > 0) {
                    eliminarGrupoexp();
                }
            } else {
                MensajeInformacion("No se ha seleccionado ning&uacute;n grupo de explotaci&oacute;n.");
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 200,
        store: stGrupoexp,
        fnOnSearch: function() {
            Buscar(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            Buscar(sfBuscar.getValue());
        }
    });

    var stGrupoexp = new Ext.data.Store({
        id: 'stGrupoexp',
        url: 'getgrupoexplotacion',
        reader: new Ext.data.JsonReader({
            root: 'data',
            id: 'idRecord',
            totalProperty: 'total'
        }, [{
                name: 'idgrupoexplotacion'
            }, {
                name: 'nombre'
            }, {
                name: 'km'
            }]),
        baseParams: {
            criterio: ''
        },
        listeners: {
            load: function(e) {
                if (stGrupoexp.getCount() > 0) {
                    smGrupoexp.selectFirstRow();
                }
                lMask.hide();
            }
        }
    });
    stGrupoexp.load({params: {start: 0, limit: 20}});
    var smGrupoexp = new Ext.grid.RowSelectionModel({
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
    var reGrupoexp = new Ext.grid.RowEditor({
        id: 'reGrupoexp',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpGrupoexp').getBottomToolbar().enable();
                if (gpGrupoexp.getSelectionModel().getSelected()) {
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
                Ext.getCmp('gpGrupoexp').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                btnModificar.setDisabled(false);
                btnEliminar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpGrupoexp').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gpGrupoexp = new Ext.grid.EditorGridPanel({
        id: 'gpGrupoexp',
        autoExpandColumn: 'expanded',
        store: stGrupoexp,
        sm: smGrupoexp,
        plugins: reGrupoexp,
        border: false,
        loadMask: true,
        stripeRows: true,
        columns: [
            {
                id: 'expanded',
                header: 'Grupo de explotaci&oacute;n',
                width: 200,
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
                id: 'km',
                header: 'Kil&oacute;metros',
                width: 100,
                dataIndex: 'km',
                editor: new Ext.form.TextField({
                    tabIndex: 2,
                    id: 'tfKm',
                    maxLength: 20,
                    selectOnFocus: true,
                    allowBlank: false,
                    maskRe: /^([0-9]+ ?[0-9]*)+$/,
                    regex: /^([0-9]+ ?[0-9]*)+$/,
                    regexText: "Este valor es incorrecto.",
                    invalidText: "No es valor v&aacute;lido."
                })
            }, {
                id: 'idgrupoexplotacion',
                header: 'idgrupoexplotacion',
                width: 100,
                hidden: true,
                dataIndex: 'idgrupoexplotacion'
            }],
        tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stGrupoexp,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });

    new Ext.Viewport({
        layout: 'fit',
        items: gpGrupoexp
    });
    function validateChanges(record, changes) {
        if (record.data.idgrupoexplotacion === "")
            adicionarGrupoexp(record.data.nombre, record.data.km);
        else
            modificarGrupoexp(record.data.idgrupoexplotacion, record.data.nombre, record.data.km);
    }
    function adicionarGrupoexp(nombre, km) {
        MostrarBarraProgreso('Adicionando grupo de explotaci&oacute;n...');
        Ext.Ajax.request({
            url: 'addgrupoexplotacion',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('El grupo de explotaci&oacute;n fue adicionado correctamente.');
                    stGrupoexp.reload();
                }
                else if (responseData == 2)
                    MensajeError('El grupo de explotaci&oacute;n que intenta adicionar ya existe.<br>Verifique el nombre del grupo de explotaci&oacute;n que desea adicionar.');
                else
                    MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
            },
            params: {
                nombre: nombre,
                km: km
            }
        });
    }
    function modificarGrupoexp(idgrupoexplotacion, nombre, km) {
        MostrarBarraProgreso('Modificando grupo de explotaci&oacute;n...');
        Ext.Ajax.request({
            url: 'modgrupoexplotacion',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('El grupo de explotaci&oacute;n fue modificado correctamente.');
                    stGrupoexp.reload();
                }
                else if (responseData == 2)
                    MensajeError('El grupo de explotaci&oacute;n que intenta modificar ya existe.<br>Verifique el nombre del grupo de explotaci&oacute;n que desea modificar.');
                else
                    MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                lMask.hide();
            },
            params: {
                idgrupoexplotacion: idgrupoexplotacion,
                nombre: nombre,
                km: km
            }
        });
    }
    function eliminarGrupoexp() {
        function confirmar(btn) {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar grupo de explotaci&oacute;n', '&iquest;Est&aacute; seguro que desea eliminar el grupo de explotaci&oacute;n seleccionado?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando grupo de explotaci&oacute;n...');
            Ext.Ajax.request({
                url: 'delgrupoexplotacion',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion('El grupo de explotaci&oacute;n fue eliminado correctamente.');
                        stGrupoexp.reload();
                    }
                    else if (responseData == 2)
                        MensajeError('El grupo de explotaci&oacute;n tiene datos asociados y no puede ser eliminado.');
                    else
                        MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                },
                params: {
                    idgrupoexplotacion: smGrupoexp.getSelected().data.idgrupoexplotacion
                }
            });
        }
    }
    function Buscar(cadena) {
        stGrupoexp.baseParams.criterio = cadena;
        stGrupoexp.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
});