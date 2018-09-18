/* global Ext, lMask */
Ext.onReady(function() {
    var btnAdicionar = new Ext.Button({
        id: 'btnAdicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar marca-modelo',
        disabled: false,
        handler: function() {
            reMarcamodelo.stopEditing();
            reMarcamodelo.insertRow();
        }
    });
    var btnModificar = new Ext.Button({
        id: 'btnModificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar marca-modelo',
        disabled: true,
        handler: function() {
            if (gpMarcamodelo.getSelectionModel().getSelected()) {
                reMarcamodelo.startEditing(gpMarcamodelo.getSelectionModel().getSelected());
            } else {
                MensajeInformacion("No se ha seleccionado ninguna marca-modelo.");
            }
        }
    });
    var btnEliminar = new Ext.Button({
        id: 'btnEliminar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar marca-modelo',
        disabled: true,
        handler: function() {
            if (gpMarcamodelo.getSelectionModel().getSelected()) {
                if (gpMarcamodelo.getSelectionModel().getSelected().data.idmarcamodelo.toString().length > 0) {
                    eliminarMarcamodelo();
                }
            } else {
                MensajeInformacion("No se ha seleccionado ninguna marca-modelo.");
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 200,
        store: stMarcamodelo,
        fnOnSearch: function() {
            Buscar(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            Buscar(sfBuscar.getValue());
        }
    });
    var arrTipocombust = [['GASOLINA 96oct.'], ['GASOLINA 94oct.'], ['GASOLINA 90oct.'], ['GASOLINA 80oct.'], ['DIESEL']];
    var stTipocombust = new Ext.data.SimpleStore({
        fields: [{
                name: 'combustible'
            }]
    });
    stTipocombust.loadData(arrTipocombust);
    var stTipovehic = new Ext.data.Store({
        autoLoad: true,
        url: 'gettipovehiculo',
        reader: new Ext.data.JsonReader({
            root: 'data',
            totalProperty: 'total'
        }, [{
                name: 'idtipovehiculo'
            }, {
                name: 'nombre'
            }])
    });
    var stMarcamodelo = new Ext.data.Store({
        id: 'stMarcamodelo',
        url: 'getmarcamodelo',
        reader: new Ext.data.JsonReader({
            root: 'data',
            totalProperty: 'total'
        }, [{
                name: 'idmarcamodelo'
            }, {
                name: 'idtipovehiculo'
            }, {
                name: 'nombre'
            }, {
                name: 'tipocombustible'
            }, {
                name: 'normaconsumo'
            }, {
                name: 'tipovehiculo', mapping: 'Tipovehiculo.nombre'
            }, {
                name: 'periodomantenimiento'
            }]),
        baseParams: {
            criterio: ''
        },
        listeners: {
            load: function(e)
            {
                if (stMarcamodelo.getCount() > 0) {
                    smMarcamodelo.selectFirstRow();
                }
                lMask.hide();
                smMarcamodelo.fireEvent('rowdeselect');
            }
        }
    });
    stMarcamodelo.load({
        params: {
            start: 0,
            limit: 20
        }
    });
    var smMarcamodelo = new Ext.grid.RowSelectionModel({
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
    var reMarcamodelo = new Ext.grid.RowEditor({
        id: 'reMarcamodelo',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpMarcamodelo').getBottomToolbar().enable();
                if (gpMarcamodelo.getSelectionModel().getSelected()) {
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
                Ext.getCmp('gpMarcamodelo').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnAdicionar.setDisabled(false);
                btnModificar.setDisabled(false);
                btnEliminar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gpMarcamodelo').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gpMarcamodelo = new Ext.grid.GridPanel({
        id: 'gpMarcamodelo',
        autoExpandColumn: 'nombre',
        store: stMarcamodelo,
        sm: smMarcamodelo,
        plugins: reMarcamodelo,
        border: false,
        loadMask: true,
        stripeRows: true,
        columns: [
            {
                id: 'nombre',
                header: 'Nombre',
                sortable: true,
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
                id: 'tipocombustible',
                header: 'Tipo combustible',
                sortable: true,
                width: 130,
                dataIndex: 'tipocombustible',
                editor: new Ext.form.ComboBox({
                    tabIndex: 2,
                    mode: 'local',
                    id: 'cbTipocombust',
                    store: stTipocombust,
                    valueField: 'combustible',
                    displayField: 'combustible',
                    resizable: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    selectOnFocus: true,
                    maskRe: /^[ a-zA-Z]+$/,
                    editable: true,
                    allowBlank: false,
                    anchor: '100%'
                })
            }, {
                id: 'normaconsumo',
                header: 'Norma consumo(L)',
                sortable: true,
                width: 110,
                dataIndex: 'normaconsumo',
                editor: new Ext.form.TextField({
                    tabIndex: 3,
                    id: 'tfNormaconsumo',
                    maxLength: 50,
                    selectOnFocus: true,
                    allowBlank: false,
                    maskRe: /^([0-9\.]+ ?[0-9\.]*)+$/,
                    regex: /^([0-9\.]+ ?[0-9\.]*)+$/,
                    regexText: "Este valor es incorrecto.",
                    invalidText: "No es valor v&aacute;lido."
                })
            }, {
                id: 'tipovehiculo',
                header: 'Tipo veh&iacute;culo',
                sortable: true,
                width: 130,
                dataIndex: 'tipovehiculo',
                editor: new Ext.form.ComboBox({
                    tabIndex: 4,
                    mode: 'local',
                    id: 'cbTipovehic',
                    store: stTipovehic,
                    valueField: 'idtipovehiculo',
                    displayField: 'nombre',
                    resizable: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    selectOnFocus: true,
                    maskRe: /^[ a-zA-Z]+$/,
                    editable: true,
                    allowBlank: false,
                    anchor: '100%'
                }),
                renderer: function(value, metaData, record, rowIndex, colIndex) {
                    if (!Ext.isEmpty(value) && typeof value == 'number') {
                        return stTipovehic.getAt(stTipovehic.find('idtipovehiculo', value)).data.nombre;
                    } else
                        return value;
                }
            }, {
                id: 'periodomantenimiento',
                header: 'Per&iacute;odo mantenimiento',
                sortable: true,
                width: 120,
                dataIndex: 'periodomantenimiento',
                editor: new Ext.form.TextField({
                    tabIndex: 5,
                    id: 'tfPeriodomnto',
                    maxLength: 50,
                    selectOnFocus: true,
                    allowBlank: false,
                    maskRe: /^([0-9]+ ?[0-9]*)+$/,
                    regex: /^([0-9]+ ?[0-9]*)+$/,
                    regexText: "Este valor es incorrecto.",
                    invalidText: "No es valor v&aacute;lido."
                })
            }, {
                id: 'idmarcamodelo',
                header: 'idmarcamodelo',
                width: 80,
                hidden: true,
                dataIndex: 'idmarcamodelo'
            }, {
                header: 'idtipovehiculo',
                width: 80,
                hidden: true,
                dataIndex: 'idtipovehiculo'
            }],
        tbar: [btnAdicionar, btnModificar, btnEliminar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stMarcamodelo,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });

    new Ext.Viewport({
        layout: 'fit',
        items: gpMarcamodelo
    });
    function validateChanges(record, changes) {
        if (record.data.idmarcamodelo === "")
            adicionarMarcamodelo(record.data.nombre, record.data.tipocombustible, record.data.normaconsumo, record.data.tipovehiculo, record.data.periodomantenimiento);
        else
            modificarMarcamodelo(record.data.idmarcamodelo, record.data.nombre, record.data.tipocombustible, record.data.normaconsumo, record.data.tipovehiculo, record.data.periodomantenimiento);
    }
    function adicionarMarcamodelo(nombre, tipocomb, norma, tipovehiculo, periodomnto) {
        MostrarBarraProgreso('Adicionando marca-modelo...');
        Ext.Ajax.request({
            url: 'addmarcamodelo',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('La marca-modelo fue adicionada correctamente.');
                    stMarcamodelo.reload();
                }
                else if (responseData == 2)
                    MensajeError('La marca-modelo que intenta adicionar ya existe.<br>Verifique el nombre de la marca-modelo que desea adicionar.');
                else {
                    MensajeError('No fue posible adicionar la nueva marca-modelo.');
                }
            },
            params: {
                nombre: nombre,
                tipocomb: tipocomb,
                norma: norma,
                idtipovehiculo: tipovehiculo,
                periodomnto: periodomnto
            }
        });
    }
    function modificarMarcamodelo(idmarcamodelo, nombre, tipocomb, norma, tipovehiculo, periodomnto) {
        MostrarBarraProgreso('Modificando marca-modelo...');
        Ext.Ajax.request({
            url: 'modmarcamodelo',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('La marca-modelo fue modificada correctamente.');
                    stMarcamodelo.reload();
                }
                else if (responseData == 2)
                    MensajeError('La marca-modelo que intenta modificar ya existe.<br>Verifique el nombre de la marca-modelo que desea modificar.');
                else {
                    MensajeError('No fue modificar adicionar la marca-modelo.');
                }
            },
            params: {
                idmarcamodelo: idmarcamodelo,
                nombre: nombre,
                tipocomb: tipocomb,
                norma: norma,
                idtipovehiculo: tipovehiculo,
                periodomnto: periodomnto
            }
        });
    }
    function eliminarMarcamodelo() {
        function confirmar(btn) {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar marca-modelo', '&iquest;Est&aacute; seguro que desea eliminar la marca-modelo seleccionada?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando marca-modelo...');
            Ext.Ajax.request({
                url: 'delmarcamodelo',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion('La marca-modelo fue eliminada correctamente.');
                        stMarcamodelo.reload();
                    }
                    else if (responseData == 2) {
                        MensajeError('La marca-modelo tiene datos asociados y no puede ser eliminada.');
                    }
                    else {
                        MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                    }
                },
                params: {
                    idmarcamodelo: smMarcamodelo.getSelected().data.idmarcamodelo
                }
            });
        }
    }
    function Buscar(criterio) {
        stMarcamodelo.baseParams.criterio = criterio;
        stMarcamodelo.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
});